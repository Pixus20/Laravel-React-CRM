"use client";

import axios from "axios";
import { useState } from "react";

const TaskStatus = ({ taskId, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`http://localhost:8000/api/tasks/${taskId}/status`, { status }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Task status updated successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center m-3">
      <p className="uppercase"><b>Status</b></p>
      <select
        name="status"
        value={status}
        onChange={handleChange}
        className="p-2 btn-add"
      >
        <option value="assigned">Assigned</option>
        <option value="in_progress">In Progress</option>
        <option value="on_hold">On Hold</option>
        <option value="done">Done</option>
      </select>
      <button
        className="btn-add"
        onClick={handleUpdate}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TaskStatus;
