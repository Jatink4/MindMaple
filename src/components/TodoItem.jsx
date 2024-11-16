import React, { useState, useEffect } from "react";
import { useTodo } from "../contexts";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const [remainingTime, setRemainingTime] = useState(todo.remainingTime || "");
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [comment, setComment] = useState(todo.comment || "");

  const { updatedTodo, deleteTodo, toggleComplete } = useTodo();

  useEffect(() => {
    if (todo.dueDate) {
      const interval = setInterval(() => {
        const timeLeft = calculateRemainingTime(todo.dueDate);
        setRemainingTime(timeLeft);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [todo.dueDate]);

  const calculateRemainingTime = (dueDate) => {
    const now = new Date();
    const timeDiff = new Date(dueDate) - now;

    if (timeDiff <= 0) {
      return "Time’s up!";
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days ${hours} hr ${minutes} min left`;
  };

  const editTodo = () => {
    updatedTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  const deletedTodo = () => {
    deleteTodo(todo.id);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const saveComment = () => {
    updatedTodo(todo.id, { ...todo, comment });
  };

  return (
    <div
      className={`flex flex-col border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <div className="flex items-center gap-x-3">
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        <input
          type="text"
          className={`border outline-none w-80 bg-transparent rounded-lg ${
            isTodoEditable ? "border-black/10 px-2" : "border-transparent"
          } ${todo.completed ? "line-through" : ""}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
        {todo.dueDate && (
          <div className="text-sm text-gray-600">{remainingTime}</div>
        )}
         {/* Dropdown Icon to Toggle Comment Section */}
         <button
          className="w-8 h-8 rounded-lg text-sm border border-black/10 bg-gray-50 hover:bg-gray-100 flex justify-center items-center"
          onClick={() => setIsCommentVisible((prev) => !prev)}
        >
          {isCommentVisible ? "🔽" : "➕"}
        </button>
        <button
          className="w-8 h-8 rounded-lg text-sm border border-black/10 bg-gray-50 hover:bg-gray-100 flex justify-center items-center"
          onClick={() => {
            if (todo.completed) return;
            if (isTodoEditable) {
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todo.completed}
        >
          {isTodoEditable ? "📁" : "✏️"}
        </button>
        <button
          className="w-8 h-8 rounded-lg text-sm border border-black/10 bg-gray-50 hover:bg-gray-100 flex justify-center items-center"
          onClick={deletedTodo}
        >
          ❌
        </button>
       
      </div>

      {/* Comment Section */}
      {isCommentVisible && (
        <div className="mt-2">
          <label className="text-xs text-gray-400">Comments/Notes:</label>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            onBlur={saveComment} // Save comment on blur
            className="w-full mt-1 p-2 bg-gray-100 rounded-md"
            rows="3"
            placeholder="Add a note..."
          />
          <button
            onClick={saveComment}
            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-md"
          >
            Save Comment
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
