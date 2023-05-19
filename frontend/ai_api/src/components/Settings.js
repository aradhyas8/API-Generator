// SettingsPage.js
import React, { useState } from 'react';

function SettingsPage() {
    const [apiUrl, setApiUrl] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Save settings to local storage or server
        localStorage.setItem('apiUrl', apiUrl);
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <h2 className="pb-4 text-2xl font-bold text-center">Settings</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apiUrl">
                            API URL
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="apiUrl" 
                            type="text"
                            value={apiUrl} 
                            onChange={e => setApiUrl(e.target.value)}
                            placeholder="API URL" />
                    </div>

                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SettingsPage;
