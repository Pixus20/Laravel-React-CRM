"use client";

import DefaultLayout from "./components/DefaultLayout";

export default function Home() {
   return (
      <DefaultLayout>
         <div className="video-container">
            <video autoPlay loop muted className="w-full h-auto">
               <source src="/Back.mp4" type="video/mp4" />
               Ваш браузер не підтримує відео.
            </video>
         </div>
      </DefaultLayout>
   );
}
