"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStateContext } from "../context/ContextProvider";
import Logo from '../public/Logo_CRM.jpg';
import LogoutButton from './Logout';
import TotalBill from './bill/TotalBill';

export default function DefaultLayout({ children }) {
   const { user,token } = useStateContext();
   const router = useRouter();

   useEffect(() => {
      if (!token) {
         router.push("/login"); 
      }
   }, [token, router]);

   const onLogout =(ev)=>{
      ev.preventDefault()
      

   }

   return (
      <div id="defaultLayout">
         <aside>
            <Link href='/'>
               <div >
                  <Image src={Logo} alt="CRM Logo" width={200} height={200} />
               </div>
            </Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/Users">Users</Link>
            <Link href="/tasks">Create Tasks</Link>
            <Link href="/timebill">Time Bill</Link>
         </aside>
         <div className="content">
            <header>
               <TotalBill/>
               <div className='gap-4 px-5 flex justify-between'>
               <Link href='/userinfo'><button className='btn'>Profile</button> </Link>
               <LogoutButton/>
               </div>
            </header>
            <main>{children}</main>
         </div>
      </div>
   );
}
