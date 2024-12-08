"use client";

import DefaultLayout from "@/app/components/DefaultLayout";
import axios from "axios";
import { useState } from "react";

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    author_id: "",
    doer_id: "",
    bill: "",
    status:"",
    due_date: "",
    description: "",
    short_description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/api/tasks", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Task created:", response.data);
      alert("Task created successfully!");

      setFormData({
        title: "",
        author_id: "",
        doer_id: "",
        bill: "",
        status:"",
        due_date: "",
        description: "",
        short_description: "",
      });
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="items-center flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col w-[50%] items-center">
          <h1 className="text-2xl font-bold">Create Task</h1>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="author_id">Author</label>
          <input
            type="text"
            name="author_id"
            value={formData.author_id}
            onChange={handleChange}
            required
          />
          <label htmlFor="doer_id">Doer</label>
          <input
            type="text"
            name="doer_id"
            value={formData.doer_id}
            onChange={handleChange}
            required
          />
          <label htmlFor="bill">Bill</label>
          <input
            type="number"
            name="bill"
            value={formData.bill}
            onChange={handleChange}
            required
          />
          <label htmlFor="status">Status</label>
          <select 
            name="status" 
            className="p-2 btn-add w-full"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select status</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="on_hold">On Hold</option>
            <option value="done">Done</option>
          </select>

          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            name="due_date" 
            value={formData.due_date}
            onChange={handleChange}
            required
          />
          <label htmlFor="description">Full description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            cols="30"
            rows="10"
            className="w-full p-2"
            required
          ></textarea>
          <label htmlFor="short_description">Short description</label>
          <textarea
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
            cols="30"
            rows="3"
            className="w-full p-2"
          ></textarea>
          <button type="submit" className="btn-add mt-4 w-48" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </DefaultLayout>
  );
};

export default CreateTask;
