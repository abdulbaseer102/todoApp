 'use client'

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from './components/navbar/page';
import TodoInput from './components/TodoInput/page';
import TodoList from './components/TodoList/page';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    filterTodos(filter);
  }, [todos, filter]);

  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleFilter = (type: 'all' | 'active' | 'completed') => {
    setFilter(type);
  };

  const filterTodos = (type: 'all' | 'active' | 'completed') => {
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
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[100%] h-[100%]">
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
