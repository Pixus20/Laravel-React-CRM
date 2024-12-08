// import { useEffect, useState } from 'react';
// import { fetchTasks } from '../../axios-client.js';

// const AllTask = () => {
//   const [tasks, setTasks] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadTasks = async () => {
//       try {
//         const data = await fetchTasks();
//         setTasks(data);
//       } catch (err) {
//         setError('Failed to fetch tasks. Please try again.');
//       }
//     };

//     loadTasks();
//   }, []);

//   const handleCardClick = (taskId) => {
//     window.location.href = `/dashboard/${taskId}`;
//   };

//   return (
//     <div className="tasks-container flex flex-wrap">
//       {error && <p className="text-red-500">{error}</p>}
//       {tasks.map((task) => (
//         <div
//           key={task.id}
//           className={`task-card h-[200px] w-[200px] m-3 flex flex-col items-start justify-center p-1 rounded-md cursor-pointer relative
//             ${task.status === 'done' ? 'bg-purple-500' : 'bg-green-400'}`}
//           onClick={() => handleCardClick(task.id)}
//         >
//           {task.status === 'done' && (
//             <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
//               DONE
//             </div>
//           )}
//           <div className={`${task.status === 'done' ? 'absolute inset-0 bg-black bg-opacity-50 filter blur-sm' : ''}`} />
//           <h1><b>Title:</b> {task.title}</h1>
//           <p><b>Assigned by:</b> {task.author ? task.author.name : 'N/A'}</p>
//           <p><b>Bill:</b> {task.bill}</p>
//           <p><b>Status:</b>{task.status}</p>
//           <p><b>Short Description: </b>{task.short_description}</p>
//           <p><b>Created at:</b> {new Date(task.created_at).toLocaleDateString()}</p>
//           <p><b>Due date: </b>{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AllTask;



import { useEffect, useState } from 'react';
import { fetchTasks } from '../../axios-client.js';

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to fetch tasks. Please try again.');
      }
    };

    loadTasks();
  }, []);

  const handleCardClick = (taskId) => {
    window.location.href = `/dashboard/${taskId}`;
  };

  const isDueSoon = (dueDate) => {
    const currentDate = new Date();
    const due = new Date(dueDate);
    const timeDiff = due - currentDate;
    const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
    return timeDiff <= twoDaysInMilliseconds && timeDiff > 0;
  };

  return (
    <div className="tasks-container flex flex-wrap">
      {error && <p className="text-red-500">{error}</p>}
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-card h-[200px] w-[200px] m-3 flex flex-col items-start justify-center p-1 rounded-md cursor-pointer relative
            ${task.status === 'done' ? 'bg-purple-500' : ''}
            ${task.status === 'on_hold' ? 'bg-gray-400' : ''}
            ${task.status === 'in_progress' ? 'bg-orange-500' : ''}
          `}
          onClick={() => handleCardClick(task.id)}
        >
          {task.status === 'done' && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
              DONE
            </div>
          )}
          <div className={`${task.status === 'done' ? 'absolute inset-0 bg-black bg-opacity-50 filter blur-sm' : ''}`} />
          
          <h1><b>Title:</b> {task.title}</h1>
          <p><b>Assigned by:</b> {task.author ? task.author.name : 'N/A'}</p>
          <p><b>Bill:</b> {task.bill}</p>
          <p><b>Status:</b>{task.status}</p>
          <p><b>Short Description: </b>{task.short_description}</p>
          <p><b>Created at:</b> {new Date(task.created_at).toLocaleDateString()}</p>
          <p><b>Due date: </b>{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}</p>
          
          {isDueSoon(task.due_date) && task.status !== 'done' && (
            <div className="absolute bottom-0 left-0 w-full border-b-8 border-red-700"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllTask;
