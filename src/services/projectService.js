const Project = require('../models/Project');
const mongoose = require('mongoose');

const createProject = async (userId, projectData) => {
    if (!userId) {
      throw new Error('User ID is required');
    }
  
    const project = new Project({
      ...projectData,
      userId: userId,
    });
  
    await project.save();
  
    return project;
  };

const updateProject = async (projectId, updates) => {
    const project = await Project.findById(projectId);

    if(!project) {
        throw new Error('Project not found');
    }

    Object.keys(updates).forEach((update) => (project[update] = updates[update]));
    await project.save();

    return project;
};

const deleteProject = async(projectId) => {
    const project = await Project.findByIdAndDelete(projectId);

    if(!project) {
        throw new Error('Project not found');
    }

    return project;
};

const getProjectById = async (projectId) => {
    const project = await Project.findOne({id: projectId});

    if(!project) {
        throw new Error('Project not found');
    }

    return project;
    //return Project;
};

const getProjectsByUser = async (userId) => {
    const projects = await Project.find({ userId: userId });

    if(!projects) {
        throw new Error('No projects found for this user');
    }

    return projects;
};

module.exports ={ createProject, updateProject, deleteProject, getProjectById, getProjectsByUser };