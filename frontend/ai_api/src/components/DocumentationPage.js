// DocumentationPage.js
import React from 'react';

function DocumentationPage() {
    return (
        <div className="p-10">
            <h1 className="text-4xl mb-4 font-bold">API Documentation</h1>

            <h2 className="text-2xl mt-6 mb-2 font-bold">GET /tasks</h2>
            <p>Returns a list of tasks.</p>

            <h2 className="text-2xl mt-6 mb-2 font-bold">POST /tasks</h2>
            <p>Creates a new task.</p>

            <h2 className="text-2xl mt-6 mb-2 font-bold">GET /tasks/{'{id}'}</h2>
            <p>Returns the task with the given id.</p>

            <h2 className="text-2xl mt-6 mb-2 font-bold">PUT /tasks/{'{id}'}</h2>
            <p>Updates the task with the given id.</p>

            <h2 className="text-2xl mt-6 mb-2 font-bold">DELETE /tasks/{'{id}'}</h2>
            <p>Deletes the task with the given id.</p>
        </div>
    );
}

export default DocumentationPage;
