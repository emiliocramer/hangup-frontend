"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
    userId: string | null;
    login: (userId: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUserId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const login = (newUserId: string) => {
        console.log("logging in, new user ID: ", newUserId)
        localStorage.setItem('userId', newUserId);
        setUserId(newUserId);
    };

    const logout = () => {
        localStorage.removeItem('userId');
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
