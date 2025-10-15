import React from "react";

const TaskFilters = ({ filter, setFilter }) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
      <select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <select value={filter.priority} onChange={(e) => setFilter({ ...filter, priority: e.target.value })}>
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Normal">Normal</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default TaskFilters;
