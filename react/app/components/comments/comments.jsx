// import axios from "axios";
// import { useState } from "react";

// const Comments = ({ taskId, authorId }) => {
//   const [comment, setComment] = useState("");
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleCreateComment = async () => {
//     if (!comment.trim()) {
//       setError("Comment cannot be empty.");
//       return;
//     }

//     try {
//       setError(null);
//       setSuccess(null);

//       const response = await axios.post("http://localhost:8000/api/comments", {
//         author_id: authorId,
//         task_id: taskId,
//         comment,
//       });

//       console.log("Comment added:", response.data);
//       setSuccess("Comment added successfully!");
//       setComment("");
//     } catch (error) {
//       console.error("Error adding comment:", error);
//       setError("Failed to add comment. Please try again.");
//     }
//   };

//   return (
//     <div className="relative">
//       <div className="flex flex-col">
//         <label htmlFor="comment"><b>Comment for task:</b></label>
//         <textarea
//           name="comment"
//           cols="30"
//           rows="10"
//           className="p-2"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         ></textarea>
//         {error && <p className="text-red-500 mt-2">{error}</p>}
//         {success && <p className="text-green-500 mt-2">{success}</p>}
//       </div>
//       <button
//         className="btn-add absolute right-5 bottom-[-50px]"
//         onClick={handleCreateComment}
//       >
//         Create
//       </button>
//     </div>
//   );
// };

// export default Comments;


import axios from "axios";
import { useEffect, useState } from "react";

const Comments = ({ taskId }) => {
  const [comment, setComment] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("authToken"); 

        if (token) {
          const response = await axios.get("http://localhost:8000/api/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setCurrentUserId(response.data.id); 
        } else {
          setError("No token found, please log in.");
        }
      } catch (err) {
        console.error("Error fetching current user:", err);
        setError("Failed to fetch user data. Please try again.");
      }
    };

    fetchCurrentUser();
  }, []);

  const handleCreateComment = async () => {
    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    if (!currentUserId) {
      setError("User is not logged in.");
      return;
    }

    try {
      setError(null);
      setSuccess(null);

      const response = await axios.post("http://localhost:8000/api/comments", {
        author_id: currentUserId,
        task_id: taskId,
        comment,
      });

      console.log("Comment added:", response.data);
      setSuccess("Comment added successfully!");
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment. Please try again.");
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col">
        <label htmlFor="comment"><b>Comment for task:</b></label>
        <textarea
          name="comment"
          cols="30"
          rows="10"
          className="p-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>
      <button
        className="btn-add absolute right-5 bottom-[-50px]"
        onClick={handleCreateComment}
      >
        Create
      </button>
    </div>
  );
};

export default Comments;
