const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose')

const MONGODB = "mongodb+srv://aradhyas8:Xfactor%40021@cluster0.dmb4s9g.mongodb.net/?retryWrites=true&w=majority"



//ApolloServer
// typeDefs: GraphQL TypeDefinitions
//Resolvers : How do we resolve queries/mutations.

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');


const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB,{useNewUrlParser:true})
.then(()=>{
    console.log('MONGO DB is connected');
    return server.listen({port:5000});
})
.then((res)=>{
    console.log(`Server is running at ${res.url}`);
})
