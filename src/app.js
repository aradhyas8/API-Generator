const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
connectDB();

// GraphQL setup will come here later

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
/* AI API Generator */