// "use client";

// import Link from "next/link";
// import GuestLayout from "../components/GuestLayout";

// export default function Signup() {

//    const onSubmit =(ev)=>{
//       ev.preventDefault()
//    }

//    return (
//       <div>
//          <GuestLayout>
//             <div className="login-signup-form animated fadeInDown">
//                <div className="form">
//                <form onSubmit={onSubmit}>
//                      <h1 className="title">Signup for free </h1>
//                      <input type="text" placeholder="Full name"/>
//                      <input type="email" placeholder="Email"/>
//                      <input type="password" placeholder="Password"/>
//                      <input type="password" placeholder="Password confirmation"/>
//                      <button className="btn btn-block">Create account</button>
//                      <p className="message ">
//                         Have an account?  <Link href="/login" >Sign In</Link>
//                      </p>
//                   </form>
//                </div>
//             </div>
//          </GuestLayout>
//       </div>
//    );
// }




"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GuestLayout from "../components/GuestLayout";

export default function Signup() {
   const router = useRouter();
   const [fullName, setFullName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [passwordConfirmation, setPasswordConfirmation] = useState("");
   const [error, setError] = useState(null);
   const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Новий стан

   const onSubmit = async (ev) => {
      ev.preventDefault();

      try {
         const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
            full_name: fullName,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
         });

         console.log("Registration successful", response.data);
         setError(null); // Скидаємо помилки, якщо реєстрація пройшла успішно
         setShowSuccessMessage(true); // Показуємо повідомлення
         
         // Перенаправляємо через 2 секунди
         setTimeout(() => {
            setShowSuccessMessage(false);
            router.push("/login");
         }, 2000);
      } catch (error) {
         console.error("Error during registration:", error);
         if (error.response && error.response.data) {
            setError(error.response.data.message || "Registration failed. Please check your details and try again.");
         } else {
            setError("Network error. Please try again later.");
         }
         setShowSuccessMessage(false); // Забираємо повідомлення про успіх при помилці
      }
   };

   return (
      <div>
         <GuestLayout>
            <div className="login-signup-form animated fadeInDown">
               <div className="form">
                  <form onSubmit={onSubmit}>
                     <h1 className="title">Signup for free</h1>
                     <input
                        type="text"
                        placeholder="Full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                     />
                     <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                     <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                     <input
                        type="password"
                        placeholder="Password confirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                     />
                     {error && <p className="error">{error}</p>}
                     {showSuccessMessage && <p className="success">Registration successful! Redirecting to sign in...</p>}
                     <button type="submit" className="btn btn-block">
                        Create account
                     </button>
                     <p className="message">
                        Have an account? <Link href="/login">Sign In</Link>
                     </p>
                  </form>
               </div>
            </div>
         </GuestLayout>
      </div>
   );
}