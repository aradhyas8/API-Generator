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
    }

`