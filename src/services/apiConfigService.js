const ApiConfig = require('../models/ApiConfig');

const createApiConfig = async (projectId, apiConfigData) =>  {
    const apiConfig = new ApiConfig({ ...apiConfigData, project: projectId });
    await apiConfig.save();
    return apiConfig;
};

const updateApiConfig = async (apiConfigId, updates ) => {
    const apiConfig = await ApiConfig.findById(apiConfigId);

    if(!apiConfig) {
        throw new Error('API configuration not found');
    }

    Object.keys(updates).forEach((update) => (apiConfig[update] = updates[update]));
    await apiConfig.save();

    return apiConfig;
}; 

const deleteApiConfig = async (apiConfigId) => {
    const apiConfig = await ApiConfig.findByIdAndDelete(apiConfigId);

    if(!apiConfig) {
        throw new Error('API configuration not found');
    }

    return apiConfig;
};

const getApiConfigById = async (apiConfigId) => {
    const apiConfig = await ApiConfig.findById(apiConfigId);

    if(!apiConfig) {
        throw new Error('API configuration not found');
    }
    return apiConfig;
}

const getApiConfigsByProject = async (projectId) => {
    const apiConfigs = await ApiConfig.find({ project: projectId });
  
    if (!apiConfigs) {
      throw new Error('No API configurations found for this project');
    }
    return apiConfigs;
};


module.exports = { createApiConfig, deleteApiConfig, updateApiConfig, getApiConfigById, getApiConfigsByProject };