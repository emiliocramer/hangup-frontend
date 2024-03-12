import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAuth } from "@/app/context/AuthContext";
import axios from 'axios';
import Link from "next/link";
import {useRouter} from "next/router";

export default function ManagePersonalProfilePage() {
    const { userId } = useAuth();
    const [profile, setProfile] = useState({
        full_name: '',
        birthdate: '',
        available_schedule: '',
        city: '',
        profession: '',
        interests: '',
    });
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5014/api/profile/${userId}`)
                .then(response => setProfile(response.data))
                .catch(error => setError('Failed to fetch profile data'));
        }
    }, [userId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5014/api/profile/${userId}`, profile);
            await router.push('/')
        } catch (error) {
            setError('Failed to update profile');
        }
    };

    if (!userId) {
        return (
            <div>
                <p>You must log in to view this page</p>
                <Link href="/">
                    <a className="text-blue-500">Back to Home</a>
                </Link>
            </div>
        );
    }

    return (
        <div className="w-3/4 mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6 text-center">Manage Your Profile</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="full_name">
                        Full Name
                    </label>
                    <input
                        name="full_name"
                        value={profile.full_name}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Enter your full name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="birthdate">
                        Birthdate
                    </label>
                    <input
                        name="birthdate"
                        value={profile.birthdate}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Enter your birthdate"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="available_schedule">
                        Available Schedule
                    </label>
                    <textarea
                        name="available_schedule"
                        value={profile.available_schedule}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Enter your available schedule"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
                        City
                    </label>
                    <input
                        name="city"
                        value={profile.city}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Enter your city"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="profession">
                        Profession
                    </label>
                    <input
                        name="profession"
                        value={profile.profession}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress} // Prevent form submission on Enter key
                        placeholder="Enter your profession"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="interests">
                        Interests
                    </label>
                </div>
                <textarea
                    name="interests"
                    value={profile.interests}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter your interests separated by commas"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mt-4 text-center">
                <Link href="/">
                    <a className="text-blue-500">Back to Home</a>
                </Link>
            </div>
        </div>
    );
}
