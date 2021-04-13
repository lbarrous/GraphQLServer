require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const muscleDatabase = require("./datasources/muscle");
const resolvers = require('./resolvers');
const knexConfig = {
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_SCHEMA
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ 
    muscleDatabase: new muscleDatabase(knexConfig)
  })
 });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`Muscle server ready at ${url}`);
});
