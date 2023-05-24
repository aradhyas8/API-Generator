import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_USER_PROJECTS = gql`
  query GetUserProjects {
    getProjectsByUser {
      id
      name
      user {
        id
        name
      }
    }
  }
`;

function Dashboard() {
  const token = localStorage.getItem('token');

  const { loading, error, data } = useQuery(GET_USER_PROJECTS, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="p-10">
      <h1 className="text-4xl mb-5">API Dashboard</h1>

      {data && data.getProjectsByUser && data.getProjectsByUser.length > 0 ? (
        <ul className="space-y-4">
          {data.getProjectsByUser.map(project => (
            <li key={project.id} className="border p-4 rounded-lg">
              <h2 className="text-2xl mb-2">{project.name}</h2>
              <p>User ID: {project.user.id}</p>
              <p>User Name: {project.user.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found.</p>
      )}

      <div className="mt-4">
        <Link to="/projectCreation" className="px-4 py-2 bg-blue-500 text-white">
          Create New Project
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
