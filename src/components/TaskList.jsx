import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

const TaskList = ({ tasks = [], deleteTask }) => {
  const [localTasks, setLocalTasks] = useState(tasks);

  useEffect(() => {
    const stored = localStorage.getItem("taskList");
    if (stored) {
      try {
        setLocalTasks(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse tasks from localStorage", e);
      }
    } else {
      setLocalTasks(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(localTasks));
  }, [localTasks]);

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    const updated = localTasks.filter((task) => task.id !== taskId);
    setLocalTasks(updated);
  };

  const handleToggleCompletion = (taskId) => {
    const updatedTasks = localTasks.map((task) =>
      task.id === taskId
        ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
        : task
    );
    setLocalTasks(updatedTasks);
    localStorage.setItem("taskList", JSON.stringify(updatedTasks));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <div className="bg-white p-4 rounded shadow max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Task List</h2>

        {localTasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks available.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-2 border">Task</th>
                <th className="p-2 border">Deadline</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {localTasks.map((task) => (
                <tr key={task.id} className="text-center hover:bg-gray-100">
                  <td className="p-2 border">{task?.task || "Untitled"}</td>
                  <td className="p-2 border">{task?.deadline || "No deadline"}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleToggleCompletion(task.id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {task.status === "completed" ? "Undo" : "Complete"}
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-500 ml-2"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TaskList;
