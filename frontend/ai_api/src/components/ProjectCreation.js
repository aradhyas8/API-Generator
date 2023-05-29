import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const CREATE_PROJECT = gql`
  mutation createProject($name: String!, $description: String) {
    createProject(input: { name: $name, description: $description }) {
      id
      name
    }
  }
`;

function ProjectCreation() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projectCreated, setProjectCreated] = useState(false);
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  const [createProject] = useMutation(CREATE_PROJECT, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
  });

  const [projectId, setProjectId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await createProject({
        variables: { name, description },
      });

      if (response && response.data && response.data.createProject) {
        const { id, name } = response.data.createProject;
        console.log(`Project created with ID: ${id} and Name: ${name}`);
        // Do something with the created project, such as updating the UI or navigating to a different page
        setProjectId(id);
        setProjectCreated(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl mb-4 font-bold">Create a New Project</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="block mb-1">
          Project Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block mb-2 w-full border-2 border-gray-300 rounded px-2 py-1"
          required
        />

        <label htmlFor="description" className="block mb-1">
          Project Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block mb-2 w-full border-2 border-gray-300 rounded px-2 py-1"
        ></textarea>

        {error && <p>Error: {error}</p>}

        {!projectCreated ? (
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Create Project'}
          </button>
        ) : (
          <>
            <p>Project Created</p>
            <div className="flex">
              <Link to={{pathname:`/apiPage/${projectId}`}}className="mt-4 px-4 py-2 bg-blue-500 text-white">
                Head to API Page
              </Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ProjectCreation;
