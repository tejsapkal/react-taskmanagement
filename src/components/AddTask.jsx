import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = ({ addTask }) => {
  const [form, setForm] = useState({
    task: "",
    description: "",
    deadline: "",
    username: "", 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(form); 
    navigate("/task-list");
  };

  const inputStyle = "w-full px-4 py-2 border rounded-lg outline-none";
  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-4xl font-extrabold text-center text-pink-600 mb-8">
          Add New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
           <input
            id="username"
            placeholder="Your Name"
            value={form.username}
            onChange={handleChange}
            required
            className={inputStyle}
          />

          <input
            id="task"
            placeholder="Task Title"
            value={form.task}
            onChange={handleChange}
            required
            className={inputStyle}
          />

          <textarea
            id="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            required
            className={inputStyle}
          />

          <input
            id="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg shadow-md">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
