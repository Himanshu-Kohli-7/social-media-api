const { ApolloServer } = require("apollo-server-express");
const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const typeDefs = require("./functions/GraphQl/schema.graphql");
const resolvers = require("./functions/GraphQl/resolver.js");
const router = express.Router();

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Create an Express app
const app = express();

// Create an ApolloServer instance
const server = new ApolloServer({ typeDefs, resolvers });

// Apply ApolloServer middleware to Express app
server.start().then(() => {
  server.applyMiddleware({ app });

  // Define a port for the server
  const PORT = process.env.PORT || 4000;

  // Start the server
  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
});

app.use("./netlify/fucntions/api", router);
module.exports.handler = serverless(app);
