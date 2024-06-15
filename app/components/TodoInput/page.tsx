// components/TodoInput.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const TodoInput = ({ addTodo }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-3 rounded-lg border border-gray-300 w-full max-w-[80%] text-lg shadow-sm"
        placeholder="Add a new task..."
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        type="submit"
        className="ml-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-2xl shadow-sm"
      >
        Add
      </motion.button>
    </form>
  );
};

export default TodoInput;
