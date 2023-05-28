import React, { useState } from 'react';
import { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_API_CONFIG = gql`
  mutation CreateApiConfig($projectId: ID!, $input: ApiConfigInput!) {
    createApiConfig(projectId: $projectId, input: $input) {
      id
      endpoints {
        path
      }
    }
  }
`;

//function APIPage(props) {

function APIPage(props) {
  const incomingProjectId = props.location.state?.projectId;
  const [apiConfig, setApiConfig] = useState({
    projectId: incomingProjectId,
    projectName: '',
    endpoints: [
      {
        path: '',
        method: '',
        parameters: [{ name: '', type: '', required: false }],
        response: [{ key: '', type: '' }]
      }
    ]
  });

  useEffect(()=> {
    setApiConfig((prevState)=>({
        ...prevState, projectId: incomingProjectId
    })); 
  }, [incomingProjectId]);

  const [createApiConfig] = useMutation(CREATE_API_CONFIG);

  const handleInputChange = (event, index, field, subIndex) => {
    const { name, value } = event.target;

    setApiConfig((prevState) => {
      const updatedConfig = { ...prevState };

      if (subIndex !== undefined) {
        updatedConfig.endpoints[index][field][subIndex][name] = value;
      } else if (field) {
        updatedConfig.endpoints[index][name] = value;
      } else {
        updatedConfig[name] = value;
      }

      return updatedConfig;
    });
  };

  const addField = (index, field) => {
    setApiConfig((prevState) => {
      const updatedConfig = { ...prevState };
      updatedConfig.endpoints[index][field].push({});

      return updatedConfig;
    });
  };

  const removeField = (index, field, subField) => {
    setApiConfig((prevState) => {
      const updatedConfig = { ...prevState };

      if (subField) {
        updatedConfig.endpoints[index][field].splice(subField, 1);
      } else {
        updatedConfig.endpoints.splice(index, 1);
      }

      return updatedConfig;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createApiConfig({
        variables: {
          projectId: apiConfig.projectId,
          input: {
            projectName: apiConfig.projectName,
            endpoints: apiConfig.endpoints
          }
        }
      });

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl mb-5">API Configuration</h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="projectId" className="block mb-1">
          Project ID
        </label>
        <input
          type="text"
          id="projectId"
          name="projectId"
          value={apiConfig.projectId}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="projectName" className="block mb-1">
          Project Name
        </label>
        <input
          type="text"
          id="projectName"
          name="projectName"
          value={apiConfig.projectName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
        {apiConfig.endpoints.map((endpoint, index) => (
          <div key={index}>
            <h3>Endpoint {index + 1}</h3>
            <div>
              <label htmlFor={`path-${index}`} className="block mb-1">
                Path
              </label>
              <input
                type="text"
                id={`path-${index}`}
                name={`path-${index}`}
                value={endpoint.path}
                onChange={(e) => handleInputChange(e, index, 'endpoints', 'path')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor={`method-${index}`} className="block mb-1">
                Method
              </label>
              <select
                id={`method-${index}`}
                name={`method-${index}`}
                value={endpoint.method}
                onChange={(e) => handleInputChange(e, index, 'endpoints', 'method')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select method</option>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div>
              <h4>Parameters</h4>
              {endpoint.parameters.map((param, paramIndex) => (
                <div key={paramIndex}>
                  <input
                    type="text"
                    name={`paramName-${index}-${paramIndex}`}
                    placeholder="Parameter Name"
                    value={param.name}
                    onChange={(e) =>
                      handleInputChange(e, index, 'parameters', paramIndex, 'name')
                    }
                    className="mr-2"
                  />
                  <input
                    type="text"
                    name={`paramType-${index}-${paramIndex}`}
                    placeholder="Parameter Type"
                    value={param.type}
                    onChange={(e) =>
                      handleInputChange(e, index, 'parameters', paramIndex, 'type')
                    }
                    className="mr-2"
                  />
                  <input
                    type="checkbox"
                    name={`paramRequired-${index}-${paramIndex}`}
                    checked={param.required}
                    onChange={(e) =>
                      handleInputChange(e, index, 'parameters', paramIndex, 'required')
                    }
                    className="mr-2"
                  />
                  <label htmlFor={`paramRequired-${index}-${paramIndex}`}>Required</label>
                  <button
                    type="button"
                    onClick={() => removeField(index, 'parameters', paramIndex)}
                  >
                    Remove Parameter
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField(index, 'parameters')}
              >
                Add Parameter
              </button>
            </div>
            <div>
              <h4>Responses</h4>
              {endpoint.response.map((response, responseIndex) => (
                <div key={responseIndex}>
                  <input
                    type="text"
                    name={`responseKey-${index}-${responseIndex}`}
                    placeholder="Response Key"
                    value={response.key}
                    onChange={(e) =>
                      handleInputChange(e, index, 'response', responseIndex, 'key')
                    }
                    className="mr-2"
                  />
                  <input
                    type="text"
                    name={`responseType-${index}-${responseIndex}`}
                    placeholder="Response Type"
                    value={response.type}
                    onChange={(e) =>
                      handleInputChange(e, index, 'response', responseIndex, 'type')
                    }
                    className="mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeField(index, 'response', responseIndex)}
                  >
                    Remove Response
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField(index, 'response')}
              >
                Add Response
              </button>
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-500"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default APIPage;
