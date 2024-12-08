// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import DefaultLayout from "../components/DefaultLayout";

// import Upload from '../public/Photo-Upload.webp';

// const Userinfo = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         console.log("Fetching user with ID 1...");
//         const response = await axios.get("http://localhost:8000/api/users/1");
//         console.log("Response received:", response.data);
//         setUser(response.data);
//       } catch (error) {
//         console.error("Error fetching user:", error.response || error.message);
//         setError("Failed to load user information");
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <DefaultLayout>
//       <div className="userinfo">
//         {error && <p className="text-red-500">{error}</p>}
//         {user ? (
//           <div>
//             <h1 className="text-2xl font-bold mb-3">User Information</h1>
//             <p><strong>Name:</strong> {user.name}</p>
//             <p className="my-3"><strong>Email:</strong> {user.email}</p>
//             <div className="Username flex items-center">
//               <p className="mr-2"><strong>Nickname:</strong> </p>
//               <input type="text" className="w-40 h-10 mt-3" />
//             </div>
//             <div className="Birthday flex items-center">
//               <p className="mr-5 "><b>Date of <br /> birthday:</b></p>
//               <input type="date " className="w-40 h-10 mt-3"  />
//             </div>
//             <div className="User_Photo flex items-center gap-4 mt-4">
//               <p><strong>Photo:</strong></p>
//               <label className="cursor-pointer flex items-center">
//                 <img
//                   src={Upload.src}
//                   alt="User Upload"
//                   className="rounded-full w-16 h-16 border-2 border-gray-300"
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (file) {
//                       console.log("File selected:", file.name);
//                     }
//                   }}
//                 />
//               </label>
//             </div>
            
//             <button className="btn-add my-3">Update</button>
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </DefaultLayout>
//   );
// };

// export default Userinfo;


"use client";

import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../axios-client.js"; // Імпортуємо функцію з axiosClient
import DefaultLayout from "../components/DefaultLayout";

import Upload from "../public/Photo-Upload.webp";

const Userinfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchCurrentUser(); // Викликаємо функцію з axiosClient
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error.response || error.message);
        setError("Failed to load user information");
      }
    };

    fetchUser();
  }, []);

  return (
    <DefaultLayout>
      <div className="userinfo">
        {error && <p className="text-red-500">{error}</p>}
        {user ? (
          <div>
            <h1 className="text-2xl font-bold mb-3">User Information</h1>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p className="my-3">
              <strong>Email:</strong> {user.email}
            </p>
            <div className="Username flex items-center">
              <p className="mr-2">
                <strong>Nickname:</strong>{" "}
              </p>
              <input type="text" className="w-40 h-10 mt-3" />
            </div>
            <div className="Birthday flex items-center">
              <p className="mr-5 ">
                <b>Date of <br /> birthday:</b>
              </p>
              <input type="date" className="w-40 h-10 mt-3" />
            </div>
            <div className="User_Photo flex items-center gap-4 mt-4">
              <p>
                <strong>Photo:</strong>
              </p>
              <label className="cursor-pointer flex items-center">
                <img
                  src={Upload.src}
                  alt="User Upload"
                  className="rounded-full w-16 h-16 border-2 border-gray-300"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      console.log("File selected:", file.name);
                    }
                  }}
                />
              </label>
            </div>

            <button className="btn-add my-3">Update</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Userinfo;
