import axios from 'axios';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from 'next/navigation';

export default function CreateTwilioUserPage() {
    const [accountSid, setAccountSid] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const { login, logout } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            logout()
            const createUserResponse = await axios.post('https://hang-up-c98880200178.herokuapp.com/api/twilio/create-user', {
                account_sid: accountSid,
                auth_token: authToken
            });
            const userId = createUserResponse.data.user_id;
            await axios.post('https://hang-up-c98880200178.herokuapp.com/api/twilio/configure-phone', {
                account_sid: accountSid,
                auth_token: authToken,
                user_id: userId
            });
            login(createUserResponse.data.user_id);

            alert(createUserResponse.data.message);
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
        <div className="max-w-md bg-gray-800 mx-auto rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Add a Twilio User</h1>
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
                <button
                    className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    type="submit"
                    disabled={isSubmitting}
                >
                    Submit
                </button>
            </form>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <div className="mt-4 text-center">
                <Link href="/">
                    <a className="text-blue-500 hover:text-blue-600">Back to Home</a>
                </Link>
            </div>
        </div>
    );
}
