const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../graphql/schemas/typeDefs');
const resolvers = require('../graphql/resolvers/resolvers');

const apolloServer = new ApolloServer({
    typeDefs, resolvers,
    context : ({ req }) => {
        const token = req.headers.authorization || '';

        const userId = AuthService.getUserIdFromToken(token);

        return { userId }; 
    },
});

module.exports = apolloServer;

