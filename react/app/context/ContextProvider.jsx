"use client";
import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    logout: () => {}, 
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("ACCESS_TOKEN");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const updateToken = (newToken) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem("ACCESS_TOKEN", newToken);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const logout = () => {
        setUser(null); 
        setToken(null); 
        localStorage.removeItem("ACCESS_TOKEN"); 
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken: updateToken,
                logout, 
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
