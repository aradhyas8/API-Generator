const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../graphql/schemas/typeDefs');
const resolvers = require('../graphql/resolvers/resolvers');
const { getUserIdFromToken } = require('../services/authService');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    const userId = getUserIdFromToken(token);
    console.log("User ID:", userId);

    return { userId };
  },
});


module.exports = apolloServer;
