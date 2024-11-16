import React, { useState, useEffect } from 'react';
import { TodoProvider } from './contexts';
import { TodoForm, TodoItem } from './components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { DarkModeProvider } from './contexts/DarkModeContext.jsx';

function App() {
  const [todos, setTodos] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [filter, setFilter] = useState("all"); // Filter state: "all", "withTime", or "withoutTime"

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const parseRemainingTime = (timeString) => {
    if (!timeString) return Infinity; // Treat no time as highest priority
    const [days, hours, minutes] = timeString
      .split(' ')
      .filter((t) => !isNaN(t))
      .map(Number);
    return days * 24 * 60 + hours * 60 + minutes;
  };

  const sortTodosByRemainingTime = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      const timeA = parseRemainingTime(a.remainingTime);
      const timeB = parseRemainingTime(b.remainingTime);
      return timeA - timeB;
    });
    setTodos(sortedTodos);
  };

  const handleSortToggle = () => {
    setIsSorted((prev) => !prev);
    if (!isSorted) {
      sortTodosByRemainingTime();
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "withTime") return todo.remainingTime;
    if (filter === "withoutTime") return !todo.remainingTime;
    return true; // For "all" filter
  });

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <DarkModeProvider>
      <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
        <Navbar />
        <div className="min-h-screen py-8 bg-sky-100 text-gray-800 dark:bg-gray-900 dark:text-white">
          <div className="max-w-2xl mx-auto shadow-md shadow-sky-600 rounded-lg px-4 py-3">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
              <TodoForm />
            </div>

            {/* Sort Toggle Checkbox */}
            <div className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                checked={isSorted}
                onChange={handleSortToggle}
                id="sort-todos"
              />
              <label htmlFor="sort-todos" className="text-sm">Sort by remaining time</label>
            </div>

            {/* Filter Options */}
            <div className="mb-4 flex items-center gap-4">
              <label className="text-sm">Filter:</label>
              <div>
                <input
                  type="radio"
                  id="filter-all"
                  value="all"
                  checked={filter === "all"}
                  onChange={handleFilterChange}
                />
                <label htmlFor="filter-all" className="text-sm ml-1">All</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="filter-withTime"
                  value="withTime"
                  checked={filter === "withTime"}
                  onChange={handleFilterChange}
                />
                <label htmlFor="filter-withTime" className="text-sm ml-1">With Time</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="filter-withoutTime"
                  value="withoutTime"
                  checked={filter === "withoutTime"}
                  onChange={handleFilterChange}
                />
                <label htmlFor="filter-withoutTime" className="text-sm ml-1">Without Time</label>
              </div>
            </div>

            {/* Render Todos */}
            <div className="flex flex-wrap gap-y-3">
              {filteredTodos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </TodoProvider>
    </DarkModeProvider>
  );
}

export default App;
