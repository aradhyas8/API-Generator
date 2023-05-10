const { generate } = require('openapi-typescript-codegen');
const ApiConfig = require('../models/ApiConfig');

const generateApiConfig = async (apiConfigId) => {
    const apiConfig = await ApiConfig.findById(apiConfigId);

    if(!apiConfig) {
        throw new Error('API Configuration not found');
    }

    const openApiSpec = convertApiConfigToOpenApiSpec(apiConfig);
    const generateCode = generate(openApiSpec);

    return generateCode;
};

