const { gql } = require('apollo-server');

module.exports = gql`
type User { 
    name: String!
    email: String!
    password: String!
}
}

`