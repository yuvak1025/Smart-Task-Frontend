import React from "react";
import API from "../services/api";

const TaskList = ({ tasks, fetchTasks, setEditingTask }) => {
  const taskArray = Array.isArray(tasks) ? tasks : [];
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this task?")) {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    }
  };

  return (
    <div>
      {taskArray.map((task) => (
        <div key={task._id} style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>
          <p>Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : "-"}</p>
          <button onClick={() => setEditingTask(task)}>Edit</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
