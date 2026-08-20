# DevGraph Architecture

## Overview

DevGraph is a graph-powered developer ecosystem explorer built for the Wexa AI CognoDB take-home assignment.

The application uses a React frontend, an Express/TypeScript backend, and CognoDB Cloud as the graph database.

The architecture is intentionally layered so that the frontend never communicates directly with the database.

## High-Level Architecture

```text
┌──────────────────────────────┐
│           Browser            │
│                              │
│      React + Vite UI         │
└──────────────┬───────────────┘
               │
               │ HTTPS / REST API
               ▼
┌──────────────────────────────┐
│       Express API            │
│       Node.js + TypeScript   │
│                              │
│ Routes                       │
│ Controllers                  │
│ Services                     │
└──────────────┬───────────────┘
               │
               │ Parameterized Cypher
               ▼
┌──────────────────────────────┐
│    Neo4j JavaScript Driver   │
│                              │
│ Official Neo4j Driver        │
└──────────────┬───────────────┘
               │
               │ Bolt / openCypher
               ▼
┌──────────────────────────────┐
│        CognoDB Cloud         │
│                              │
│       Graph Database         │
└──────────────────────────────┘
Architecture Layers
1. Presentation Layer

The presentation layer is the React frontend.

Technology used:

React
TypeScript
Vite
Tailwind CSS
React Router
TanStack Query
Lucide React
React Flow

Responsibilities:

Render the application interface
Display developers, projects, technologies, skills, companies, and domains
Handle navigation
Display loading states
Display empty states
Display API/database errors
Request data from the backend API
Visualize graph relationships

The frontend does not contain CognoDB credentials and does not connect directly to CognoDB.

2. API Layer

The API layer is implemented using Express and TypeScript.

Responsibilities:

Receive HTTP requests from the frontend
Validate request parameters
Route requests to the appropriate controller
Return consistent JSON responses
Handle HTTP-level errors
Apply security middleware

The API acts as the only communication boundary between the frontend and database.

3. Controller Layer

Controllers are responsible for handling HTTP concerns.

A controller should:

Receive the request.
Extract validated parameters.
Call the appropriate service.
Return the service result.
Pass unexpected errors to centralized error handling.

Controllers should not contain database queries.

Example flow:

HTTP Request
     ↓
Controller
     ↓
Service
     ↓
Database Query
4. Service Layer

The service layer contains application and data-access logic.

Responsibilities:

Execute graph-related operations
Call parameterized Cypher queries
Transform database results into API-friendly objects
Coordinate multi-hop graph traversals
Handle domain-specific logic

Keeping this logic outside controllers makes the application easier to test, maintain, and extend.

5. Database Layer

CognoDB Cloud is used as the graph database.

The backend communicates with CognoDB through the official Neo4j JavaScript driver.

Communication uses:

Bolt protocol
openCypher
Parameterized queries

The backend reads database credentials from environment variables.

COGNODB_URI
COGNODB_USERNAME
COGNODB_PASSWORD

These credentials are never sent to the frontend.

Request Flow

A typical request follows this flow:

User
 │
 ▼
React Component
 │
 ▼
TanStack Query
 │
 ▼
REST API
 │
 ▼
Express Route
 │
 ▼
Controller
 │
 ▼
Service
 │
 ▼
Parameterized Cypher
 │
 ▼
Neo4j Driver
 │
 ▼
CognoDB
 │
 ▼
Database Result
 │
 ▼
Service
 │
 ▼
Controller
 │
 ▼
JSON Response
 │
 ▼
React UI
Example Request
For example, when a user opens a developer profile:

GET /api/developers/:id

The request is handled as follows:

GET /api/developers/:id
        │
        ▼
Developer Route
        │
        ▼
Developer Controller
        │
        ▼
Developer Service
        │
        ▼
Parameterized Cypher
        │
        ▼
Neo4j Driver
        │
        ▼
CognoDB

The resulting developer data is then returned to the frontend as JSON.

Graph Traversal Request

Some endpoints require multiple graph hops.

For example, finding technologies connected to a developer through projects:

Developer
    │
    │ WORKED_ON
    ▼
Project
    │
    │ USES
    ▼
Technology

The backend performs this traversal in CognoDB rather than retrieving all records and constructing relationships in the browser.

Example:

MATCH (d:Developer)-[:WORKED_ON]->(p:Project)-[:USES]->(t:Technology)
WHERE d.id = $developerId
RETURN DISTINCT t
ORDER BY t.name
Security Architecture

Database credentials are stored exclusively in backend environment variables.

The frontend only receives the public API URL.

The frontend never receives:

COGNODB_URI
COGNODB_USERNAME
COGNODB_PASSWORD

Security-related middleware includes:

Helmet
CORS
Environment-based configuration
Parameterized Cypher queries

User-provided values are passed as Cypher parameters instead of being concatenated into query strings.

Error Handling

The backend is designed to fail gracefully when CognoDB is unavailable.

The application should distinguish between:

Validation errors
Not-found errors
Database connection errors
Unexpected server errors

The frontend provides:

Loading states
Empty states
Error states
API failure handling

Raw database errors and credentials should never be exposed to the client.

Deployment Architecture
Frontend

The frontend is deployed to Vercel.

Vercel
  │
  ▼
React + Vite

Production configuration:

Root Directory: client
Framework: Vite
Build Command: npm run build
Output Directory: dist

The frontend uses a public environment variable for the backend API URL.

Example:

VITE_API_URL=https://YOUR-RENDER-DOMAIN.onrender.com
Backend

The backend is deployed to Render.

Render
  │
  ▼
Node.js + Express
  │
  ▼
CognoDB Cloud

Render configuration:

Root Directory: server
Build Command: npm install && npm run build
Start Command: npm start

The CognoDB credentials are configured as Render environment variables.

Development Architecture

The repository is organized into separate frontend and backend applications.

devgraph/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── docs/
│   ├── architecture.md
│   ├── graph-model.md
│   └── implementation-notes.md
│
├── README.md
└── package.json
Architectural Principles

DevGraph follows these principles:

The frontend communicates only with the REST API.
Database credentials remain on the backend.
Controllers do not contain database queries.
Graph operations are handled through the service layer.
Cypher queries are parameterized.
The official Neo4j JavaScript driver is used for database communication.
Database failures are handled gracefully.
UI loading, empty, and error states are explicitly handled.
Graph traversal is performed by the database rather than manually reconstructed in the frontend.
The architecture keeps presentation, HTTP handling, business logic, and database access separated.
Summary

The final architecture is:

React + Vite
      │
      │ REST
      ▼
Express + TypeScript
      │
      ▼
Controllers
      │
      ▼
Services
      │
      ▼
Neo4j JavaScript Driver
      │
      │ Bolt / openCypher
      ▼
CognoDB Cloud

This architecture provides a clear separation of concerns while allowing DevGraph to demonstrate the strengths of graph-based data modeling and multi-hop traversal.



That entire block belongs in:


```text
docs/architecture.md