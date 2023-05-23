import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold mb-4">Welcome to My API Configurator</h1>
            <p className="text-xl text-gray-700">Create and manage your APIs in a fast and easy way.</p>
            <div className="mt-8">
                <Link to="/login" className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-500">Get Started</Link>
            </div>
        </div>
    );
}

export default Home;
