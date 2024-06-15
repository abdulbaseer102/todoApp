'use client'
import { AnimatePresence, motion } from 'framer-motion';
import TodoItem from '../TodoItems/page';
import { Key } from 'react';

const TodoList = ({ todos, toggleComplete, removeTodo, updateTodo, clearCompleted, toggleFilter }:any) => {
  const handleClearCompleted = () => {
    const completedIds = todos.filter((todo: { completed: any; }) => todo.completed).map((todo: { id: any; }) => todo.id);
    clearCompleted(completedIds);
  };

  return (
    <div className="max-w-[40%] mx-auto">
    
      <div className="flex justify-between mb-4">
        <button
          onClick={handleClearCompleted}
          className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2 hover:bg-red-600"
        >
          Clear Completed
        </button>
        <button
          onClick={() => toggleFilter('all')} // Call toggleFilter with 'all' argument
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 hover:bg-blue-600"
        >
          All
        </button>
        <button
          onClick={() => toggleFilter('active')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600"
        >
          Active
        </button>
        <button
          onClick={() => toggleFilter('completed')}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Completed
        </button>
        
      </div>
      {todos.length === 0 && <p className="text-center text-gray-500">No tasks to display.</p>}
      <AnimatePresence>
        {todos.map((todo: { id: Key | null | undefined; }) => (
          <motion.div key={todo.id} layout>
            <TodoItem
              todo={todo}
              toggleComplete={toggleComplete}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
