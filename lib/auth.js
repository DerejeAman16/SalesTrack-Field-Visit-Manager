"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { USERS, initialVisits } from "./mockData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [usersList, setUsersList] = useState([...USERS]);
    const [visits, setVisits] = useState([...initialVisits]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load session and users from local storage if available
        const storedUser = localStorage.getItem("auth_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from local storage");
            }
        }

        const storedUsers = localStorage.getItem("app_users");
        if (storedUsers) {
            try {
                setUsersList(JSON.parse(storedUsers));
            } catch (e) { }
        }

        const storedVisits = localStorage.getItem("app_visits");
        if (storedVisits) {
            try {
                setVisits(JSON.parse(storedVisits));
            } catch (e) { }
        }

        setIsLoaded(true);
    }, []);

    const login = (username, password) => {
        const found = usersList.find((u) => u.username === username && u.password === password);
        if (found) {
            const { password, ...safeUser } = found; // Exclude password from session
            setUser(safeUser);
            localStorage.setItem("auth_user", JSON.stringify(safeUser));
            return safeUser;
        }
        throw new Error("Invalid username or password");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("auth_user");
    };

    const addUser = (newUser) => {
        const updatedUsers = [...usersList, newUser];
        setUsersList(updatedUsers);
        localStorage.setItem("app_users", JSON.stringify(updatedUsers));
    };

    const addVisit = (newVisit) => {
        const updatedVisits = [...visits, newVisit];
        setVisits(updatedVisits);
        localStorage.setItem("app_visits", JSON.stringify(updatedVisits));
    };

    if (!isLoaded) return <div className="min-h-screen bg-[#0f172a]" />; // Loading state

    return (
        <AuthContext.Provider value={{ user, usersList, visits, login, logout, addUser, addVisit }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
