"use client";
import dynamic from "next/dynamic";
import Header from '@/app/components/Header';
import {AuthProvider} from "@/app/context/AuthContext";

const ManageCallSettingsPage = dynamic(() => import('@/app/components/ManageCallSettingsPage'), { ssr: false });

export default function ManagePage() {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-black">
                <Header />
                <main className="container mx-auto py-8 bg-black">
                    <ManageCallSettingsPage />
                </main>
            </div>
        </AuthProvider>
    );
}
