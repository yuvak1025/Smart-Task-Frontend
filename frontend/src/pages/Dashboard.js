import React, { useEffect, useState } from "react";
import API from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters";
import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: "", priority: "" });
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      let res = await API.get("/tasks");
      // Backend responses use { success, data } shape. data may be the array of tasks.
      // Accept both shapes: res.data (array) or res.data.data (array)
      let data = res?.data?.data ?? res?.data ?? [];
      if (!Array.isArray(data)) data = [];

      // Apply filters
      if (filter.status) data = data.filter((t) => t.status === filter.status);
      if (filter.priority) data = data.filter((t) => t.priority === filter.priority);

      setTasks(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const containerStyle = {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const sectionStyle = {
    marginBottom: "30px",
  };

  return (
    <div style={{ backgroundColor: "#e0e7ff", minHeight: "100vh", paddingBottom: "50px" }}>
      <Navbar />
      <div style={containerStyle}>
        <h2 style={headingStyle}>Dashboard</h2>

        <div style={sectionStyle}>
          <TaskForm fetchTasks={fetchTasks} editingTask={editingTask} setEditingTask={setEditingTask} />
        </div>

        <div style={sectionStyle}>
          <TaskFilters filter={filter} setFilter={setFilter} />
        </div>
        <ProgressBar tasks={tasks} />
        <div>
          {loading ? (
            <p style={{ textAlign: "center", color: "#555" }}>Loading tasks...</p>
          ) : (
            <TaskList tasks={tasks} fetchTasks={fetchTasks} setEditingTask={setEditingTask} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
