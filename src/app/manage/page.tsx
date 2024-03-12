"use client";
import Link from 'next/link';
import dynamic from "next/dynamic";
import {AuthProvider} from "@/app/context/AuthContext";

const ManagePersonalProfilePage = dynamic(() => import('@/app/components/ManagePersonalProfilePage'), { ssr: false });

export default function ManagePage() {
    return (
        <AuthProvider>
            <ManagePersonalProfilePage />
        </AuthProvider>
    );
}


