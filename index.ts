import * as dotenv from 'dotenv';
dotenv.config();

import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Load environment variables
const uri = process.env.NEO4J_URI as string;
const username = process.env.NEO4J_USERNAME as string;
const password = process.env.NEO4J_PASSWORD as string;

const driver = neo4j.driver(
    uri,
    neo4j.auth.basic(username, password)
);

const typeDefs = `#graphql
    type Movie @node {
        title: String
        actors: [Person!]! @relationship(type: "ACTED_IN", direction: IN)
    }

    type Person @node {
        name: String
        movies: [Movie!]! @relationship(type: "ACTED_IN", direction: OUT)
    }
`;

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

(async () => {
    const schema = await neoSchema.getSchema();

    const server = new ApolloServer({
        schema,
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`🚀 Server ready at ${url}`);
})();
