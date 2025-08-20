"use client";
import axios from "axios";
import AnimatedContent from "./AnimatedContent";

const TodoList = ({ todos, fetchTodos }) => {
  const handleToggle = async (id, completed) => {
    try {
      await axios.put(`/api/todos/${id}`, {
        completed: !completed,
      });
      fetchTodos();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <AnimatedContent
          key={todo._id}
          distance={150}
          direction="horizontal"
          reverse={false}
          config={{ tension: 80, friction: 20 }}
          initialOpacity={0.2}
          animateOpacity
          scale={1.1}
          threshold={0.2}
        >
          <li className="flex justify-between items-center p-2 border rounded">
            <span
              onClick={() => handleToggle(todo._id, todo.completed)}
              className={`cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.task}
            </span>
            <button
              onClick={() => handleDelete(todo._id)}
              className="bg-red-500 cursor-pointer text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        </AnimatedContent>
      ))}
    </ul>
  );
};

export default TodoList;
