import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return savedTasks;
  });

  const addTask = (newTask) => {
    const taskWithId = { id: uuidv4(), ...newTask };
    const updatedTasks = [...tasks, taskWithId];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 transition-colors duration-300">
      <div className="container mx-auto p-4">
       <header className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-orange-400">Task Manager</h1>
          <p className="text-gray-600">Stay organized and productive 🚀</p>
        </header>
        
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} /> 
          <Route path="/dashboard" element={<DashboardPage tasks={tasks} />} />
          <Route path="/add-task" element={<AddTask addTask={addTask} />} />
          <Route path="/task-list" element={<TaskList tasks={tasks} deleteTask={deleteTask} />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;
