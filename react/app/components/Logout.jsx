"use client";

import { useRouter } from "next/navigation";
import { useStateContext } from "../context/ContextProvider";

const LogoutButton = () => {
   const { logout } = useStateContext(); 
   const router = useRouter(); 

   const handleLogout = () => {
      logout(); 
      router.push("/login"); 
   };

   return (
      <button onClick={handleLogout} className="btn">
         Logout
      </button>
   );
};

export default LogoutButton;
