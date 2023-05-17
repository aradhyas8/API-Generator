const { gql } = require('apollo-server-express');

const typeDefs = gql `

    type User {
        id : ID!
        name: String!
        email: String!
        password: String!
        projects: [Project]
    }

    type Project {
        id: ID!
        name: String!
        user: User!
        apiConfigs: [ApiConfig]
    }

    type ApiConfig {
        id: ID!
        project: Project!
        endpoints: [Endpoint]
    }

    type Endpoint {
        path: String!
        method: String!
        parameters: [Parameter]
        response: [Response]
    }

    type Parameter {
        name: String!
        type: String!
        required: Boolean!
    }

    type Response {
        key: String!
        type: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    input ProjectInput {
        name: String!
    }

    input ApiConfigInput {
        endpoints: [EndpointInput]!
    }

    input EndpointInput {
        path: String!
        method: String!
        parameters: [ParameterInput]
        response: [ResponseInput]
    }

    input ParameterInput {
        name: String!
        type: String!
        required: Boolean!
    }

    input ResponseInput {
        key: String!
        type: String!
    }

    type Query {
        me: User project(id: ID!): Project
        projects: [Project]
        apiConfig(id: ID!): ApiConfig
        apiConfigs: [ApiConfig]
    }

    type Mutation {
        signUp(name: String!, email: String!, password:String!): AuthPayload!
        signIn(email: String!, password: String!): AuthPayload!
        createProject(input: ProjectInput!): Project!
        updateProject(id: ID!, input: ProjectInput!): Project!
        deleteProject(id: ID!): Project!
        createApiConfig(projectId: ID!, input: ApiConfigInput!): ApiConfig!
        updateApiConfig(id: ID!, input: ApiConfigInput!): ApiConfig!
        deleteApiConfig(id: ID!): ApiConfig!
    }

`;

module.exports = typeDefs;