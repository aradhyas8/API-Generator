// APIPage.js
import React, { useState } from 'react';

function APIPage() {
    const [apiConfig, setApiConfig] = useState({
        endpoint: '',
        method: '',
        description: '',
        parameters: [],
        responses: []
    });

    const handleInputChange = (event) => {
        setApiConfig({
            ...apiConfig,
            [event.target.name]: event.target.value
        });
    };

    // Submit form
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(apiConfig);
        // Add your API call here
    };

    return (
        <div className="p-10">
            <h1 className="text-4xl mb-5">API Configuration</h1>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="endpoint" className="block mb-1">Endpoint</label>
                    <input type="text" id="endpoint" name="endpoint" onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="method" className="block mb-1">Method</label>
                    <select id="method" name="method" onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="">Select method</option>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="description" className="block mb-1">Description</label>
                    <textarea id="description" name="description" onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                {/* 
                    To handle parameters and responses, you may want to have 
                    some kind of dynamic form fields where you can add or remove fields on the fly.
                    This is a bit more complex and is out of scope for this example.
                */}
                <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-500">Save</button>
            </form>
        </div>
    );
}

export default APIPage;
