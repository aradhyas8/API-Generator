import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_PROJECT_MUTATION = gql`
    mutation createProject($name: String!, $description: String!) {
        createProject(name: $name, description: $description) {
            id
            name
        }
    }
`;

const CREATE_API_CONFIG_MUTATION = gql`
    mutation createApiConfig($projectId: ID!, $input: ApiConfigInput!) {
        createApiConfig(projectId: $projectId, input: $input) {
            id
            endpoints {
              path
            }
        }
    }
`;

function APIPage() {
    const [createProject, { data }] = useMutation(CREATE_PROJECT_MUTATION);
    const [createApiConfig] = useMutation(CREATE_API_CONFIG_MUTATION);
    const [project, setProject] = useState({ name: '', description: '' });
    const [apiConfig, setApiConfig] = useState({
        endpoints: [{
            path: '',
            method: '',
            response: [{
                key: '',
                type: '',
                properties: [{
                    key: '',
                    type: ''
                }]
            }]
        }]
    });

    const handleProjectChange = (event) => {
        setProject({
            ...project,
            [event.target.name]: event.target.value
        });
    };

    const handleApiConfigChange = (event, endpointIndex, responseIndex, propertyIndex) => {
        const updatedApiConfig = { ...apiConfig };
        if (propertyIndex !== undefined) {
            updatedApiConfig.endpoints[endpointIndex].response[responseIndex].properties[propertyIndex][event.target.name] = event.target.value;
        } else if (responseIndex !== undefined) {
            updatedApiConfig.endpoints[endpointIndex].response[responseIndex][event.target.name] = event.target.value;
        } else {
            updatedApiConfig.endpoints[endpointIndex][event.target.name] = event.target.value;
        }
        setApiConfig(updatedApiConfig);
    };

    const handleProjectSubmit = (event) => {
        event.preventDefault();
        createProject({ variables: project });
    };

    const handleApiConfigSubmit = (event) => {
        event.preventDefault();
        createApiConfig({ variables: { projectId: data?.createProject?.id, input: apiConfig } });
    };

    return (
        <div className="p-10">
            {/* ... existing project creation form ... */}

            {data?.createProject && (
                <>
                    <h1 className="text-4xl mb-5">API Configuration for {data.createProject.name}</h1>
                    <form className="space-y-5" onSubmit={handleApiConfigSubmit}>
                        {apiConfig.endpoints.map((endpoint, endpointIndex) => (
                            <div key={endpointIndex}>
                                {/* ... existing endpoint form fields ... */}
                                {endpoint.response.map((response, responseIndex) => (
                                    <div key={responseIndex}>
                                        {/* ... existing response form fields ... */}
                                        {response.properties.map((property, propertyIndex) => (
                                            <div key={propertyIndex}>
                                                {/* Form fields for property key and type */}
                                                <input type="text" name="key" value={property.key} onChange={e => handleApiConfigChange(e, endpointIndex, responseIndex, propertyIndex)} />
                                                <input type="text" name="type" value={property.type} onChange={e => handleApiConfigChange(e, endpointIndex, responseIndex, propertyIndex)} />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-500">Create API Configuration</button>
                    </form>
                </>
            )}
        </div>
    );
}

export default APIPage;
