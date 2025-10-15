import React, { useState, useEffect } from "react";
import API from "../services/api";

const TaskForm = ({ fetchTasks, editingTask, setEditingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  // When editingTask changes, populate form
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setStatus(editingTask.status || "Pending");
      setPriority(editingTask.priority || "Medium");
      setDueDate(editingTask.due_date ? editingTask.due_date.split("T")[0] : "");
    } else {
      setTitle("");
      setDescription("");
      setStatus("Pending");
      setPriority("Medium");
      setDueDate("");
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        // Update task
        await API.put(`/tasks/${editingTask._id}`, {
          title,
          description,
          status,
          priority,
          due_date: dueDate, // match backend
        });
        setEditingTask(null);
      } else {
        // Create task
        await API.post("/tasks", {
          title,
          description,
          status,
          priority,
          due_date: dueDate,
        });
      }
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving task");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm; // ✅ Make sure this is at the bottom
