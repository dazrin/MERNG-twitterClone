// Dependancy imports
const { ApolloServer } = require('apollo-server'); // Open-source GraphQL server compatible with any GraphQL client
const mongoose = require('mongoose'); // Object Data Modeling (ODM) library for MongoDB and NodeJS; used to translate between objects in code and the representation of those objects in MongoDB

// Relative imports
const resolvers = require('./graphql/resolvers'); // Contains code to handle things like Queries, Mutations of the database, Posts, and Login validation/ data
const { MONGODB } = require('./config.js'); // Contains our MongoDB database information; also contains sensitive data
const typeDefs = require ('./graphql/typeDefs'); // Contains type definitions for each kind of object that is being stored in our database

// Creating our server instance; contains our typeDefinitions and resolvers
const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }) 
});

// Establish Connection
mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 5000});
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    });