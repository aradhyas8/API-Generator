const { gql } = require('apollo-server-express')

const typeDefs = gql `

type Query {

    getApiDocumentation(api:ID!): Documetnatio
}

`