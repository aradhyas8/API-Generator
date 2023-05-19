// Dashboard.js
import React, { useState, useEffect } from 'react';

function Dashboard() {
    const [apis, setApis] = useState([]);

    // Fetch APIs from backend when component mounts
    useEffect(() => {
        fetchApis();
    }, []);

    const fetchApis = async () => {
        try {
            // Fetch APIs from your backend
            // For example:
            const response = await fetch('/api/apis');
            const data = await response.json();

            setApis(data);
        } catch (error) {
            console.error('Failed to fetch APIs:', error);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-4xl mb-5">API Dashboard</h1>
            <ul className="space-y-4">
                {apis.map(api => (
                    <li key={api._id} className="border p-4 rounded-lg">
                        <h2 className="text-2xl mb-2">{api.endpoint}</h2>
                        <p>Method: {api.method}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
