const { UserService, AuthService, ProjectService, ApiConfigService,} = require('../../services');

const resolvers = {
    Query: {
        me: (parent, args, context) => UserService.getUserById(context.userId),
        project: (parent, { id }, context) => ProjectService.getProjectById(id),
        apiConfig: (parent, { id }, context) => ApiConfigService.getApiConfigById(id),
        apiConfigs: (parent, args, context) => ApiConfigService.getApiConfigsbyProject(args.projectId),
    },

    Mutation: {
        signUp: async(parent, {name, email, password }) => AuthService.signUp(name, email, password),
        signIn : async(parent, {email, password}) => AuthService.signIn(email, password),
        createProject: async (parent, { input }, context) => ProjectService.createProject(context.userId, input),
        updateProject: async (parent, { id, input }, context) => ProjectService.updateProject(id, input),
        deleteProject: async (parent, { id }, context) => ProjectService.deleteProject(id),
        createApiConfig: async (parent, { projectId, input }, context) => ApiConfigService.createApiConfig(projectId, input),
        updateApiConfig: async (parent, { id, input }, context) => ApiConfigService.updateApiConfig(id, input),
        deleteApiConfig: async (parent, { id }, context) => ApiConfigService.deleteApiConfig(id),
  },

    User: {
        projects: (parent, args, context) => ProjectService.getProjectsByUser(parent.id),
    },

    Project: {
        user: (parent, args, context) => UserService.getUserById(parent.userId),
        apiConfigs: (parent, args, context) => ApiConfigService.getApiConfigsByProject(parent.id),
      },
    
    ApiConfig: {
        project: (parent, args, context) => ProjectService.getProjectById(parent.projectId),
      },
    };

    module.exports = resolvers;
