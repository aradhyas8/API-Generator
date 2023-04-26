const express = requrie('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

dotenv.config();


mongoose.connect(process.env.MONGO_URI, { newUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context : ({ req }) => ({ req })
})

server.applyMiddleware({ app });

app.listen(5000, ()=> {
    console.log('Server is runinng on port 5000')
});