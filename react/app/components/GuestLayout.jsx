"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import './GuestLayout.css';

import back1 from '../public/back1.jpg';
import back10 from '../public/back10.jpg';
import back11 from '../public/back11.jpg';
import back12 from '../public/back12.jpg';
import back2 from '../public/back2.jpg';
import back3 from '../public/back3.jpg';
import back4 from '../public/back4.jpeg';
import back5 from '../public/back5.webp';
import back6 from '../public/back6.webp';
import back7 from '../public/back7.webp';
import back8 from '../public/back8.jpg';
import back9 from '../public/back9.jpg';


export default function GuestLayout({ children }) {
   const { token } = useStateContext();
   const router = useRouter();
   const [backgroundImage, setBackgroundImage] = useState("");

   useEffect(() => {
      if (token) {
         router.push("/");
      }
   }, [token, router]);

   useEffect(() => {
      const backgrounds = [back1, back2, back3, back4, back5, back6, back7,back8,back9,back10,back11,back12];
      const randomImage = backgrounds[Math.floor(Math.random() * backgrounds.length)];
      setBackgroundImage(randomImage.src);
   }, []);

   return (
      <div>
         <main
            className="back_img_guest"
            style={{
               backgroundImage: `url(${backgroundImage})`,
            }}
         >
            {children}
         </main>
      </div>
   );
}
