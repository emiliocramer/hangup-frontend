"use client";
import dynamic from "next/dynamic";
import Header from '@/app/components/body/Header';
import {AuthProvider} from "@/app/context/AuthContext";

const ManagePersonalProfilePage = dynamic(() => import('@/app/components/call/ManagePersonalProfilePage'), { ssr: false });

export default function ManagePage() {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-black">
                <Header />
                <main className="container mx-auto py-8 bg-black">
                    <ManagePersonalProfilePage />
                </main>
            </div>
        </AuthProvider>
    );
}

