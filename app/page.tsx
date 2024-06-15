'use client'
import { useState, useEffect, SetStateAction } from 'react';
import Head from 'next/head';
import Navbar from './components/navbar/page';
import Sidebar from './components/sidebar/page'; // Import the Sidebar component
import TodoInput from './components/TodoInput/page';
import TodoList from './components/TodoList/page';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    filterTodos(filter);
  }, [todos, filter]);

  const addTodo = (text: any) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id: any) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id: any) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: any, newText: any) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const clearCompleted = (completedIds: string | any[]) => {
    setTodos(todos.filter(todo => !completedIds.includes(todo.id)));
  };

  const toggleFilter = (type: SetStateAction<string>) => {
    setFilter(type);
  };

  const filterTodos = (type: string) => {
    switch (type) {
      case 'active':
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  return (
    <div>
      <Head>
        <title>Advanced Todo App</title>
        <meta name="description" content="An advanced todo app built with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
        <Navbar />
        <div className="flex flex-col items-center justify-center p-10">
          <h1 className="text-5xl font-bold mb-10 text-white">Todo App</h1>
          <div className="bg-white p-8 rounded-lg shadow-lg w-full  max-w-[100%] h-[100%]">
            <TodoInput addTodo={addTodo} />
            <TodoList
              todos={filter === 'all' ? todos : filteredTodos}
              toggleComplete={toggleComplete}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
              clearCompleted={clearCompleted}
              toggleFilter={toggleFilter}
            />
          </div>
        </div>
      </main>
    </div>
  );
}