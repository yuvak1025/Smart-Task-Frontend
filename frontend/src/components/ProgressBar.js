import React from "react";

const ProgressBar = ({ tasks }) => {
  // Ensure tasks is an array to avoid runtime errors
  const taskArray = Array.isArray(tasks) ? tasks : [];
  const total = taskArray.length;
  const completed = taskArray.filter((t) => t.status === "Completed").length;

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const containerStyle = {
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "15px",
    height: "20px",
  };

  const fillerStyle = {
    height: "100%",
    width: `${percentage}%`,
    backgroundColor: "#4f46e5",
    transition: "width 0.5s ease-in-out",
  };

  return (
    <div>
      <div style={containerStyle}>
        <div style={fillerStyle}></div>
      </div>
      <p style={{ textAlign: "right", margin: "0", fontWeight: "bold", color: "#333" }}>
        {percentage}% Completed
      </p>
    </div>
  );
};

export default ProgressBar;
