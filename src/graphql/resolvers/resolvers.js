const  UserService  = require('../../services/userService.js');
const  AuthService = require('../../services/authService.js');
const ApiConfigService  = require('../../services/apiConfigService.js');
const  ProjectService  = require('../../services/projectService.js');
const { signUp, signIn } = require('../../services/authService.js');
const { db } = require('../../models/User.js');
const { codeGenerator } = require('../../services/CodeGenerationService.js');


const resolvers = {
  Query: {
    me: (parent, args, context) => UserService.getUserById(context.userId),
    project: (parent, { id }, context) => ProjectService.getProjectById(id),
    apiConfig: (parent, { id }, context) =>
      ApiConfigService.getApiConfigById(id),
    apiConfigs: (parent, args, context) =>
      ApiConfigService.getApiConfigsbyProject(args.projectId),
      getProjectsByUser: (parent, args, context)=> 
      ProjectService.getProjectsByUser(context.userId),
      generateCode: async(_, { id }) => {
        const apiConfig = await ApiConfigService.getApiConfigById(id);
        const code = codeGenerator(apiConfig);
        return code;
      }
  },

  Mutation: {
    signUp: async (parent, { name, email, password }) =>
      AuthService.signUp(name, email, password),
    signIn: async (parent, { email, password }) =>
      AuthService.signIn(email, password),
    createProject: async (parent, { input }, context) =>
      ProjectService.createProject(context.userId, input),
    updateProject: async (parent, { id, input }, context) =>
      ProjectService.updateProject(id, input),
    deleteProject: async (parent, { id }, context) =>
      ProjectService.deleteProject(id),
    createApiConfig: async (parent, { projectId, input }, context) =>
      ApiConfigService.createApiConfig(projectId, input),
    updateApiConfig: async (parent, { id, input }, context) =>
      ApiConfigService.updateApiConfig(id, input),
    deleteApiConfig: async (parent, { id }, context) =>
      ApiConfigService.deleteApiConfig(id),
  },

  User: {
    projects: (parent, args, context) =>
      ProjectService.getProjectsByUser(parent.id),
  },

  Project: {
    user: (parent, args, context) => UserService.getUserById(parent.userId),
    apiConfigs: (parent, args, context) =>
      ApiConfigService.getApiConfigsByProject(parent.id),
  },

  ApiConfig: {
    project: (parent, args, context) =>
      ProjectService.getProjectById(parent.projectId),
  },
};

module.exports = resolvers;
