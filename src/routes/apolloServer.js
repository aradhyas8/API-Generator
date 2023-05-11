const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { getUserIdFromToken } = require('./services/AuthService');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const userId = getUserIdFromToken(token);

    return { userId };
  },
});

module.exports = apolloServer;
