const { ApolloServer } = require('apollo-server-lambda');
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
  }),
  playground: {
    endpoint: "/dev/graphql"
  }
});
exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: false,
  },
});