# GraphQL-Neo4j Integration Project

This project demonstrates the integration between GraphQL and Neo4j database using the official Neo4j GraphQL library. It creates a GraphQL API that connects to a Neo4j graph database with movie and person entities.

## Features

- GraphQL API endpoints for querying and mutating graph data
- Neo4j as the underlying graph database
- Predefined Movie and Person types with relationships
- Schema defined in a separate .graphql file
- Secure credential management using environment variables
- Apollo Server implementation

## Prerequisites

- Node.js (version 16 or higher)
- pnpm package manager
- Neo4j Database (version 4.x or higher)

## Installation

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Create a `.env` file with your Neo4j connection details:
   ```bash
   NEO4J_URI=your_neo4j_uri
   NEO4J_USERNAME=your_username
   NEO4J_PASSWORD=your_password
   ```
4. Start the server: `pnpm start`

## Usage

The GraphQL endpoint is available at `http://localhost:4000/`. You can access the GraphQL Playground to explore the schema and execute queries.

Example query:
```graphql
{
  movies {
    title
    actors {
      name
    }
  }
}
```

## Project Structure

- `index.ts` - Main application entry point
- `schema.graphql` - GraphQL schema definition
- `.env` - Environment variables (not committed to repo)

## Security

Credentials are loaded from environment variables to prevent exposing sensitive information in the source code.

## Contributing

Feel free to submit issues and enhancement requests. Pull requests are welcome!
