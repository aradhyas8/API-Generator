const express = require('express');
const cors = require('cors');
const apolloServer = require('./routes/apolloServer');
const { handleError } = require('./utils/errorHandler');
const connectDB = require('./db/index');
require('dotenv').config();
const typeDefs = require('./graphql/schemas/typeDefs');
 // Updated import path

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(cors());

// Enable JSON parsing
app.use(express.json());

// Start the server and apply middleware
const startServer = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
};

startServer();

// Error handling middleware
app.use((err, req, res, next) => {
  handleError(err, res);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
