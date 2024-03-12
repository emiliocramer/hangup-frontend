import { AuthProvider } from '@/app/context/AuthContext';
import Link from 'next/link';

export default function App() {
    return (
        <AuthProvider>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mb-6">Main Page</h1>
                <div className="space-x-4">
                    <Link href="/twilio">
                        <a className="bg-blue-500 text-white p-2 rounded">Add Twilio</a>
                    </Link>
                    <Link href="/manage">
                        <a className="bg-green-500 text-white p-2 rounded">Manage</a>
                    </Link>
                </div>
            </div>
        </AuthProvider>
    );
}
