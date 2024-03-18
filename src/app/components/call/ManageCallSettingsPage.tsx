import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAuth } from "@/app/context/AuthContext";
import axios from 'axios';
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function ManageCallSettingsPage() {
    const { userId } = useAuth();
    const [callSettings, setCallSettings] = useState({
        opening_line: '',
        closing_line: '',
    })
    const [activeNumber, setActiveNumber] = useState('');
    const [selectedNumber, setSelectedNumber] = useState('');
    const [availableNumbers, setAvailableNumbers] = useState([]);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (userId) {
            axios.get(`https://hang-up-c98880200178.herokuapp.com/api/call-settings/${userId}`)
                .then(response => setCallSettings(response.data))
                .catch(error => setError('Failed to fetch call settings'));

            axios.get(`https://hang-up-c98880200178.herokuapp.com/api/twilio/get-active-number/${userId}`)
                .then(response => {
                    setActiveNumber(response.data.active_number);
                })
                .catch(error => {
                    console.error(error);
                    setError('Failed to fetch active number');
                });

            axios.get('https://hang-up-c98880200178.herokuapp.com/api/twilio/get-available-numbers')
                .then(response => setAvailableNumbers(response.data))
                .catch(error => setError('Failed to fetch available numbers'));
        }
    }, [userId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCallSettings(prevSettings => ({
            ...prevSettings,
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
            await axios.put(`https://hang-up-c98880200178.herokuapp.com/api/call-settings/${userId}`, callSettings);
            await router.push('/')
        } catch (error) {
            setError('Failed to update call settings');
        }
    };

    const handleSubmitSelectNumber = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put(`https://hang-up-c98880200178.herokuapp.com/api/twilio/assign-number/${userId}`, selectedNumber);
        } catch (error) {
            setError('Failed to update call settings');
        }

        axios.get(`https://hang-up-c98880200178.herokuapp.com/api/twilio/get-active-number/${userId}`)
            .then(response => {
                setActiveNumber(response.data.active_number);
            })
            .catch(error => {
                console.error(error);
                setError('Failed to fetch active number');
            });
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
        <div className="max-w-2xl bg-gray-800 mx-auto rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Manage Your Assistant</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    {activeNumber && (
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="active_number">
                                Active Number
                            </label>
                            <div
                                id="active_number"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-400 text-gray-600"
                            >
                                {activeNumber}
                            </div>
                        </div>
                    )}
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="full_name">
                        Opening Line
                    </label>
                    <input
                        name="opening_line"
                        value={callSettings.opening_line}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Enter your desired opening line"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="birthdate">
                        Closing Line
                    </label>
                    <input
                        name="closing_line"
                        value={callSettings.closing_line}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Enter your desired closing line"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update Your Assistant
                    </button>
                    <Link href="/">
                        <a className="text-blue-500 hover:text-blue-600">Back to Home</a>
                    </Link>
                </div>
            </form>
            <form onSubmit={handleSubmitSelectNumber}>
                <h2 className="text-2xl font-bold mb-4 mt-8">It looks like you dont yet have a number linked to your account. Select one from below to connect your assistant!</h2>
                <h2 className="text-2xl font-bold mb-4 mt-8">Available Numbers</h2>
                <div className="mb-4">
                    {availableNumbers.map(({ number, friendlyName }, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                type="radio"
                                id={number}
                                name="selectedNumber"
                                value={number}
                                onChange={(e) => setSelectedNumber(e.target.value)}
                                checked={selectedNumber === number}
                                className="mr-2"
                            />
                            <label htmlFor={number}>{friendlyName} ({number})</label>
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Select Number
                </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}
