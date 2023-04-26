const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Query {
    #Returns an array of all existing APIs in the DB.
 getApis: [Api]
    #Takes an API ID and returns a single matching object.
 getApiById(apiId:ID): Api
}

type Mutation {
    #Takes ApiInput argument which is an 'ApiInput object and creates a new api based on the information provided.
    createApi{apiInput: ApiInput!}: Api
    #Takes an ApiID argument and an apiInput argument, which is an 'ApiInput' object and updates the existing API with the provided information and returns an updated API Object.
    updateApi(apiId: ID!, apiInput: ApiInput!): Api
    #Takes apiID and deletes the matching api from the db.
    deleteApi(apiId: ID!): String
}

type Api{
    id: ID!
    name: String!
    parameters: [String]!
    responses:[String]!
    endpoint:String!
}

input: ApiInput {
    name: String!
    parameters: [String]!
    responses: [String]!
    endpoint: String!
}


`;

module.exports = typeDefs;

