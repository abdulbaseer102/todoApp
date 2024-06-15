// components/TodoItem.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const TodoItem = ({ todo, toggleComplete, removeTodo, updateTodo }:any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    updateTodo(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      layout
      className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-3"
    >
      {isEditing ? (
        <form onSubmit={handleUpdate} className="flex items-center w-full">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="p-2 mr-2 rounded border border-gray-300 flex-grow"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="px-3 py-2 bg-green-500 text-white rounded"
          >
            Save
          </motion.button>
        </form>
      ) : (
        <>
          <div className="flex items-center w-full">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              className="mr-5"
            />
            <span className={`text-3xl flex-grow ${todo.completed ? 'line-through text-gray-400' : ''}`}>
              {todo.text}
            </span>
          </div>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => removeTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default TodoItem;
