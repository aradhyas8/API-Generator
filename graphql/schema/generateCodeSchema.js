const { gql } = require('apollo-server-express');

const typeDefs = gql `

type Query {
    #Get generated code by ID.
    getApiCode(apiID : ID!): Code
}

type Mutation {
    #Mutation to generate code by Specific ID.
    generateApiCode(apiID: ID!): Code
}

type Code { 
    id: ID!
    apiID: ID!
    content: String!
}

`;

module.exports = typeDefs;