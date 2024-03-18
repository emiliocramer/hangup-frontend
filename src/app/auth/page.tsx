"use client";
import dynamic from 'next/dynamic';
import Header from '@/app/components/body/Header';
import {AuthProvider} from "@/app/context/AuthContext";

const CreateNewUser = dynamic(() => import('@/app/components/auth/CreateNewUser'), { ssr: false });
const Login = dynamic(() => import('@/app/components/auth/Login'), { ssr: false });


export default function TwilioPage() {
    return (
        <AuthProvider>
            <Header />
            <main className="container mx-auto py-8">
                <CreateNewUser />
                <Login />
            </main>
        </AuthProvider>
    );
}




