const { gql } = require('apollo-server-express')

const typeDefs = gql `

type Query {
    #Get doc by specific API ID.
    getApiDocumentation(api:ID!): Documentation
}

type Mutation {
    #Generate doc by specific Api ID.
    generateApiDocumentation(api:ID!): Documentation
}

type Documentation{
    id: ID!
    apiId: ID!
    name: String!
    content: String!
}

`;

module.exports = typeDefs;