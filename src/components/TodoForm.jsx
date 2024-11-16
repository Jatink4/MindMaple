import React, { useState } from 'react';
import { useTodo } from '../contexts';
import Calendar from 'react-calendar'; // Import the Calendar component
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

function TodoForm() {
  const [todo, setTodo] = useState("");
  const [dueDate, setDueDate] = useState(null); // Store due date and time
  const [showCalendar, setShowCalendar] = useState(false); // Toggle for calendar visibility
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo) return;

    // If a due date is set, calculate remaining time and store it
    const remainingTime = dueDate ? calculateRemainingTime(dueDate) : "";

    // Add the todo to the list
    addTodo({
      todo,
      completed: false,
      dueDate,
      remainingTime, // Store the remaining time in the todo object
    });

    // Save to localStorage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({
      todo,
      completed: false,
      dueDate,
      remainingTime,
    });
    localStorage.setItem('todos', JSON.stringify(todos));

    setTodo(""); // Reset todo input
    setDueDate(null); // Reset due date
  };

  const calculateRemainingTime = (dueDate) => {
    const now = new Date();
    const timeDiff = new Date(dueDate) - now;

    if (timeDiff <= 0) {
      return 'Time’s up!';
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days ${hours} hr ${minutes} min left`;
  };

  return (
    <form onSubmit={add} className="flex  justify-between items-center ">
    {/* Todo Input */}
    <input
      type="text"
      placeholder="Write Todo..."
      className="w-full justify-between items-center border border-black/10 rounded-tl-md rounded-bl-md px-3 outline-none duration-150 bg-white/20 py-1.5"
      value={todo}
      onChange={(e) => setTodo(e.target.value)}
    />

    {/* Calendar Button */}
    <button
      type="button"
      onClick={() => setShowCalendar(!showCalendar)}
      className="text-sm bg-blue-500 text-white p-2 "
    >
     Date
    </button>

    {/* Submit Button */}
    <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded-tr-md rounded-br-md shrink-0" onClick={add}>
      Add Todo
    </button>

    {/* Calendar Dropdown */}
      {showCalendar && (
        <div
          className="calendar-container absolute mt-2 z-10 p-4 shadow-lg rounded-lg 
         dark:bg-gray-800 dark:text-white  bg-sky-50 text-black"
          
        >
          <Calendar
            onChange={(date) => setDueDate(date)}
            value={dueDate}
            className=" dark:bg-gray-700 dark:text-white bg-white text-black"
            
          />
          <div className="flex items-center gap-2 mt-4  dark:bg-gray-700 dark:text-white bg-white text-black">
            <input
              type="time"
              value={dueDate ? dueDate.toTimeString().slice(0, 5) : ""}
              onChange={(e) => {
                if (dueDate) {
                  const updatedDate = new Date(dueDate);
                  const [hours, minutes] = e.target.value.split(":");
                  updatedDate.setHours(hours, minutes);
                  setDueDate(updatedDate);
                }
              }}
              className="border p-2 rounded-lg w-full 
            dark:bg-gray-700 dark:text-white bg-white text-black
              "
            />
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowCalendar(false)}
              className="rounded-lg px-4 py-1
               dark:bg-red-600 dark:text-white bg-red-500 text-white
              "
            >
              Close Calendar
            </button>
          </div>
        </div>
      )}
  </form>
  );
}

export default TodoForm;
