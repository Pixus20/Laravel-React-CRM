"use client"
import DefaultLayout from "@/app/components/DefaultLayout.jsx";
import DeleteTask from "@/app/components/Tasks/DeleteTask.jsx";
import TaskStatus from "@/app/components/Tasks/TaskStatus.jsx";
import AddTimeBill from "@/app/components/TimeBill/AddTimeBill.jsx";
import Comments from "@/app/components/comments/comments.jsx";
import { useEffect, useState } from "react";
import { fetchTaskDetails } from '../../axios-client.js';

const TaskDetails = ({ params }) => {
  const { id } = params;
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const loadTask = async () => {
      try {
        const data = await fetchTaskDetails(id);
        setTask(data);
      } catch (err) {
        setError("Failed to load task details.");
      }
    };

    loadTask();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
   <DefaultLayout>
    <div className=" flex justify-between">
      <div className="task-details p-5 flex flex-col justify-center gap-2">
        <h1 className="text-2xl font-bold">Task Details</h1>
        <p><b>Title:</b> {task.title}</p>
        <p><b>Description:</b> {task.description}</p>
        <p><b>Assigned by:</b> {task.author ? task.author.name : "N/A"}</p>
        <p><b>Bill:</b> {task.bill}</p>
        <p><b>Created at:</b> {new Date(task.created_at).toLocaleDateString()}</p>
        <p><b>Due date:</b> {task.due_date ? new Date(task.due_date).toLocaleDateString() : "N/A"}</p>
      </div>
      <div className="Time mr-10">
        <AddTimeBill/>
      </div>
    </div>
    <DeleteTask taskId={task.id}/>
    <TaskStatus taskId={task.id} currentStatus={task.status}/>
    <Comments  taskId={task.id} authorId={task.author}/>
   </DefaultLayout>
  );
};

export default TaskDetails;
