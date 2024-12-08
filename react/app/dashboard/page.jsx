"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import AllTask from "../components/Tasks/AllTask";
import { useStateContext } from "../context/ContextProvider";

const Dashboard = () => {
    const { user, token } = useStateContext(); 
    const router = useRouter(); 

    useEffect(() => {
        if (!token) {
            router.push("/"); 
        }
    }, [token, router]);
   }


export default function dashboard() {
   return (
      <DefaultLayout>
         <div>
            <AllTask/>
         <Link href="/tasks">
               <button className="btn-add">
                  Create task 
               </button>
            </Link> 
         </div>
      </DefaultLayout>
   );
}

