"use client";
import Link from 'next/link';
import {useAuth} from '@/app/context/AuthContext';

export default function Header() {
    const { userId, logout } = useAuth();

    return (
        <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">HangUp</h1>
            <nav>
                <ul className="flex space-x-4 items-center">
                    <li>
                        <Link href="/twilio">
                            <a className="px-4 py-2 hover:text-gray-300 rounded-md">
                                Manage Twilio Preferences
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/manage">
                            <a className="px-4 py-2 hover:text-gray-300 rounded-md">
                                Manage Profile
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/call-settings">
                            <a className="px-4 py-2 hover:text-gray-300 rounded-md">
                                Call Settings
                            </a>
                        </Link>
                    </li>
                    {userId ? (
                        <li>
                            <button
                                className="px-4 py-2 hover:text-gray-300 rounded-md bg-gray-700"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </li>
                    ) : (
                        <Link href="/twilio">
                            <a className="px-4 py-2 hover:text-gray-300 rounded-md bg-gray-700">
                                Login with Twilio
                            </a>
                        </Link>
                    )}
                </ul>
            </nav>
        </header>
    );
}
