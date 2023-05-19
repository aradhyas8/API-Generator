// ErrorPage.js
import React from 'react';

function ErrorPage() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl text-gray-700 mb-4">Oops!</h1>
                <h2 className="text-4xl text-gray-500 mb-8">Something went wrong...</h2>
                <p className="text-2xl text-gray-500">The page you're looking for might have been moved, deleted, or might never existed.</p>
                <a className="mt-10 bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-600" href="/">Go Home</a>
            </div>
        </div>
    );
}

export default ErrorPage;
