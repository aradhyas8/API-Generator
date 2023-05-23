import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
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
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="p-10">
      <h1 className="text-4xl mb-5">API Dashboard</h1>
      <ul className="space-y-4">
        {data.projects.map(project => (
          <li key={project.id} className="border p-4 rounded-lg">
            <h2 className="text-2xl mb-2">{project.name}</h2>
            <p>User ID: {project.user.id}</p>
            <p>User Name: {project.user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
