const { generate } = require('openapi-typescript-codegen');
const ApiConfig = require('../models/ApiConfig');

const generateApiCode = async (apiConfigId) => {
  const apiConfig = await ApiConfig.findById(apiConfigId);

  if (!apiConfig) {
    throw new Error('API configuration not found');
  }

  const openApiSpec = convertApiConfigToOpenApiSpec(apiConfig);
  const generatedCode = generate(openApiSpec);

  return generatedCode;
};

const convertApiConfigToOpenApiSpec = (apiConfig) => {
  const openApiSpec = {
    openapi: '3.0.0',
    info: {
      title: apiConfig.projectName,
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Local server',
      },
    ],
    paths: {},
  };

  apiConfig.endpoints.forEach((endpoint) => {
    const path = endpoint.path;
    const method = endpoint.method.toLowerCase();

    if (!openApiSpec.paths[path]) {
      openApiSpec.paths[path] = {};
    }

    openApiSpec.paths[path][method] = {
      parameters: endpoint.parameters.map((param) => ({
        name: param.name,
        in: 'query',
        required: param.required,
        schema: {
          type: param.type.toLowerCase(),
        },
      })),
      responses: {
        '200': {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: endpoint.response,
              },
            },
          },
        },
      },
    };
  });

  return openApiSpec;
};

module.exports = {
  generateApiCode,
};
