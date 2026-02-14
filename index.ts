import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const driver = neo4j.driver(
    "neo4j+s://2b023a18.databases.neo4j.io",
    neo4j.auth.basic("neo4j", "u9Ymg-gjIz940zqVW_EXJHybuStXGXiIuaheazw74cs")
);

const typeDefs = `#graphql
    type Movie @node {
        title: String
        actors: [Actor!]! @relationship(type: "ACTED_IN", direction: IN)
    }

    type Actor @node {
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
