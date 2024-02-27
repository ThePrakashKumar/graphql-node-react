import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolver.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello!");
});

const init = async () => {
  // create an apollo server
  // we need to provide typeDefs and resolvers
  // type defs are the schema of our data
  // resolvers ar the method which returns us the required data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // all the request with /graphgl will hit here
  app.use("/graphql", expressMiddleware(server));
};

init();

app.listen(3000, () => {
  console.log("Server Stared!");
});
