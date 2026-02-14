import * as dotenv from 'dotenv';
dotenv.config();

import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const uri = process.env.NEO4J_URI as string;
const username = process.env.NEO4J_USERNAME as string;
const password = process.env.NEO4J_PASSWORD as string;

const driver = neo4j.driver(
    uri,
    neo4j.auth.basic(username, password)
);

// Get current directory in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load GraphQL schema from external file
const typeDefs = readFileSync(resolve(__dirname, 'schema.graphql'), 'utf8');

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
