"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GuestLayout from "../components/GuestLayout";
import { useStateContext } from "../context/ContextProvider";

export default function Login() {
    const { setUser, setToken, token } = useStateContext(); 
    const router = useRouter(); 

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        if (token) {
            router.push("/dashboard");
        }
    }, [token, router]);

    const onSubmit = async (ev) => {
        ev.preventDefault(); 
        setError(null); 

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login", {
                email,
                password,
            }, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'), 
                }
            });

            setUser(response.data.user);
            setToken(response.data.token); 

            router.push("/dashboard");
        } catch (err) {
            setError("Error during login: " + (err.response ? err.response.data.message : err.message)); 
        }
    };

    return (
        <div>
            <GuestLayout>
                <div className="login-signup-form animated fadeInDown">
                    <div className="form">
                        <form onSubmit={onSubmit}>
                            <h1 className="title">Login into your account</h1>
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
                            <button className="btn btn-block">Login</button>
                            {error && <p className="error-message">{error}</p>} 
                            <p className="message">
                                Not Registered? <Link href="/Signup">create an account</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </GuestLayout>
        </div>
    );
}
