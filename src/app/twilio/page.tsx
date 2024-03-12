"use client";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {AuthProvider} from "@/app/context/AuthContext";

const CreateTwilioUserPage = dynamic(() => import('@/app/components/CreateTwilioUserPage'), { ssr: false });

export default function TwilioPage() {
    return (
        <AuthProvider>
            <CreateTwilioUserPage />
        </AuthProvider>
    );
}




