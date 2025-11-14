import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("taskList")) || [];
    setTasks(stored);
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = total - completed;
  const rate = total ? Math.round((completed / total) * 100) : 0;

  const pieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];
  const COLORS = ["green", "orange"]; 

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-8">
        <h2 className="text-2xl font-bold text-center">🏠 Taskly</h2>
        <nav className="space-y-6">
          <Link to="/add-task" className="block p-2 bg-gray-800 rounded">➕ Add Task</Link>
          <Link to="/task-list" className="block p-2 bg-gray-800 rounded">📋 Task List</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600">📋 Total Tasks</p>
            <p className="text-xl font-bold">{total}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600">✅ Completed</p>
            <p className="text-xl font-bold">{completed}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600">📈 Completion Rate</p>
            <p className="text-xl font-bold">{rate}%</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">📉 Task Completion Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
