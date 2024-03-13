"use client";
import dynamic from 'next/dynamic';
import Header from '@/app/components/body/Header';
import {AuthProvider} from "@/app/context/AuthContext";
import TwilioTutorialComponent from '@/app/components/twilio/TwilioTutorialComponent'; // Import the tutorial component

const CreateTwilioUserPage = dynamic(() => import('@/app/components/twilio/CreateTwilioUserPage'), { ssr: false });

export default function TwilioPage() {
    return (
        <AuthProvider>
            <Header />
            <main className="container mx-auto py-8">
                <CreateTwilioUserPage />
                <TwilioTutorialComponent />
            </main>
        </AuthProvider>
    );
}




