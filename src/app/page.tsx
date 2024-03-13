import { AuthProvider } from '@/app/context/AuthContext';
import Link from 'next/link';
import Header from '@/app/components/body/Header';

export default function App() {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-black">
                <Header />
                <main className="container mx-auto py-8">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-4xl font-bold mb-6">Welcome to HangUp</h1>
                        <div className="space-x-4">
                            <Link href="/twilio">
                                <a className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                                    Create Account Using Twilio
                                </a>
                            </Link>
                            <Link href="/manage">
                                <a className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                                    Manage Personal Profile
                                </a>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </AuthProvider>
    );
}
