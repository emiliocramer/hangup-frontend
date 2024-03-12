import axios from 'axios';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from 'next/router';

export default function CreateTwilioUserPage() {
    const [accountSid, setAccountSid] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission status
    const [error, setError] = useState('');
    const { login, logout } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            logout()
            const response = await axios.post('http://localhost:5014/api/twilio/create-user', {
                account_sid: accountSid,
                auth_token: authToken
            });
            alert(response.data.message);
            login(response.data.user_id);
            await router.push('/manage')
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorResponse = err.response?.data.error ? err.response.data.error : 'An unexpected error occurred. Please try again.';
                setError(errorResponse);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-1/2 mx-auto mt-10">
            <h1 className="text-center mb-4">Add a Twilio User</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                    type="text"
                    placeholder="Account SID"
                    value={accountSid}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountSid(e.target.value)}
                />
                <input
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                    type="password"
                    placeholder="Auth Token"
                    value={authToken}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthToken(e.target.value)}
                />
                <button className="w-full p-2 bg-blue-500 text-white rounded-md" type="submit" disabled={isSubmitting}>Submit</button>
            </form>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <div className="mt-4 text-center">
                <Link href="/">
                    <a className="text-blue-500">Back to Home</a>
                </Link>
            </div>
        </div>
    );
}
