const Project = require('../models/Project');

const createProject = async (userId, projectData) => {
    const project = new Project({ ...projectData, user: userId });
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
    const project = await Project.findById(projectId);

    if(!project) {
        throw new Error('Project not found');
    }

    return project;
};

const getProjectsByUser = async (userId) => {
    const projects = await Project.find({ user: userId });

    if(!projects) {
        throw new Error('No projects found for this user');
    }

    return projects;
};

module.exports ={ createProject, updateProject, deleteProject, getProjectById, getProjectsByUser };