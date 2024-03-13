"use client";
import dynamic from 'next/dynamic';
import Header from '@/app/components/Header';
import {AuthProvider} from "@/app/context/AuthContext";

const CreateTwilioUserPage = dynamic(() => import('@/app/components/CreateTwilioUserPage'), { ssr: false });

export default function TwilioPage() {
    return (
        <AuthProvider>
            <Header />
            <main className="container mx-auto py-8">
                <CreateTwilioUserPage />
            </main>
        </AuthProvider>
    );
}




