const { gql } = require('apollo-server');


module.exports = gql`

type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    apis: [API!]!

};

module.exports = typeDefs;



`