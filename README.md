# DevGraph

A graph-powered developer ecosystem explorer built with React, Node.js, and CognoDB Cloud.

DevGraph demonstrates how graph databases can model and explore relationships between developers, projects, technologies, skills, companies, and domains.

## Live Demo

Frontend: `https://YOUR-VERCEL-DOMAIN.vercel.app`

Backend API: `https://YOUR-RENDER-DOMAIN.onrender.com`

## Project Overview

DevGraph is a developer ecosystem explorer created for the Wexa AI CognoDB take-home assignment.

The application allows users to:

* Browse developers
* Browse projects
* Explore technologies and skills
* View developer and project details
* Search and filter connected entities
* Explore graph relationships visually
* Navigate multi-hop relationships between entities

The core idea is to make relationships first-class data rather than treating them as secondary joins.

## Why a Graph Database?

A relational database can represent this domain, but many of the application's most interesting questions require traversing multiple relationships.

For example:

> Which technologies are connected to a developer through projects that belong to a particular domain?

A graph query can traverse these relationships directly:

```text
Developer
   ↓ WORKED_ON
Project
   ↓ USES
Technology
```

This becomes increasingly valuable as the number of relationships grows.

DevGraph therefore uses CognoDB Cloud as the graph layer and the official Neo4j JavaScript driver to communicate with it using openCypher over the Bolt protocol.

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* TanStack Query
* Lucide React
* React Flow

### Backend

* Node.js
* Express
* TypeScript
* Official Neo4j JavaScript driver
* Zod
* Helmet
* CORS
* dotenv

### Database

* CognoDB Cloud
* openCypher
* Bolt protocol

## Architecture

```text
Browser
   │
   ▼
React + Vite
   │
   │ REST API
   ▼
Express API
   │
   ▼
Service Layer
   │
   ▼
Neo4j JavaScript Driver
   │
   │ Bolt / openCypher
   ▼
CognoDB Cloud
```

The frontend never connects directly to CognoDB.

Database credentials remain exclusively on the backend.

## Graph Data Model

```text
                         ┌──────────────┐
                         │   Company    │
                         └──────┬───────┘
                                │
                           WORKS_AT
                                │
                                ▼
┌──────────────┐          ┌──────────────┐
│  Developer   │─────────▶│   Project    │
└──────┬───────┘ WORKED_ON└──────┬───────┘
       │                          │
       │ KNOWS                    │ USES
       ▼                          ▼
┌──────────────┐          ┌──────────────┐
│ Technology   │◀────────▶│    Skill     │
└──────┬───────┘ RELATED_TO└──────────────┘
       │
       │
       ▼
┌──────────────┐
│    Domain    │
└──────────────┘
```

### Nodes

* `Developer`
* `Project`
* `Technology`
* `Skill`
* `Company`
* `Domain`

### Relationships

```text
DEVELOPER -[:WORKED_ON]-> PROJECT

DEVELOPER -[:KNOWS]-> TECHNOLOGY

DEVELOPER -[:HAS_SKILL]-> SKILL

PROJECT -[:USES]-> TECHNOLOGY

PROJECT -[:BELONGS_TO]-> DOMAIN

PROJECT -[:BUILT_FOR]-> COMPANY

TECHNOLOGY -[:RELATED_TO]-> TECHNOLOGY

DEVELOPER -[:WORKS_AT]-> COMPANY
```

## Example Graph Traversal

A two-hop traversal can find technologies used by projects worked on by a developer:

```cypher
MATCH (d:Developer)-[:WORKED_ON]->(p:Project)-[:USES]->(t:Technology)
WHERE d.id = $developerId
RETURN DISTINCT t
ORDER BY t.name
```

This demonstrates a multi-hop graph traversal:

```text
Developer
   ↓
Project
   ↓
Technology
```

## Relationally Awkward Query

DevGraph also supports relationship-heavy queries that become cumbersome when represented through many relational join tables.

For example, finding developers who:

1. work on projects,
2. use a particular technology,
3. belong to a particular domain,
4. and work for a company connected to those projects.

The graph representation allows these relationships to be traversed directly.

Example:

```cypher
MATCH
  (d:Developer)-[:WORKED_ON]->(p:Project)-[:USES]->(t:Technology),
  (p)-[:BELONGS_TO]->(domain:Domain),
  (d)-[:WORKS_AT]->(company:Company)
WHERE
  t.name = $technology
  AND domain.name = $domain
RETURN DISTINCT
  d,
  p,
  t,
  domain,
  company
ORDER BY d.name
```

All user-provided values are passed as parameters rather than concatenated into Cypher.

## Backend Architecture

The backend follows a layered architecture:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Cypher Query
  ↓
Neo4j Driver
  ↓
CognoDB
```

Database queries are intentionally kept out of controllers.

This keeps HTTP handling, business logic, and database access separated and easier to maintain.

## Project Structure

```text
devgraph/
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
│   └── ...
│
├── README.md
├── package.json
└── LICENSE
```

## Local Development

### Requirements

* Node.js 22+
* npm
* CognoDB Cloud account

### 1. Clone the repository

```bash
git clone https://github.com/Mathew-code01/devgraph.git
cd devgraph
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure backend environment variables

Create:

```text
server/.env
```

Add the CognoDB connection details provided by CognoDB Cloud.

Example:

```env
COGNODB_URI=bolt+s://your-instance-id.databases.cognodb.cloud
COGNODB_USERNAME=cognodb
COGNODB_PASSWORD=your-password
```

Do not commit this file.

### 5. Configure frontend environment variables

Create:

```text
client/.env
```

Example:

```env
VITE_API_URL=http://localhost:5000
```

Use the actual API variable name defined by the frontend configuration.

### 6. Start the backend

```bash
cd server
npm run dev
```

### 7. Start the frontend

```bash
cd client
npm run dev
```

The frontend will then be available through the Vite development server.

## CognoDB Setup

1. Create an account at CognoDB Cloud.
2. Create a free C0 instance.
3. Copy the generated Bolt connection URI.
4. Save the generated `cognodb` password securely.
5. Add the credentials to the backend environment variables.
6. Run the project's seed script.

The database password should never be committed to Git or exposed to the frontend.

## Seed Data

The repository contains a seed script for loading realistic developer ecosystem data into CognoDB.

The seed data includes relationships between:

* Developers
* Projects
* Technologies
* Skills
* Companies
* Domains

The dataset is intentionally sized for the CognoDB free tier while still providing enough relationships to demonstrate meaningful graph traversal.

## Error Handling

The backend handles database failures gracefully rather than exposing raw database errors to users.

The application provides:

* Loading states
* Empty states
* Error states
* API failure handling
* Database connection failure handling

## Production Deployment

### Frontend

The React application is deployed to Vercel.

Vercel configuration:

```text
Root Directory: client
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

The frontend receives only the public API URL through a Vite environment variable.

### Backend

The Express API is deployed to Render.

Render configuration:

```text
Root Directory: server
Build Command: npm install && npm run build
Start Command: npm start
```

CognoDB credentials are configured as Render environment variables and are never exposed to the browser.

## Screenshots

### Dashboard

Add the dashboard screenshot here:

```text
docs/screenshots/dashboard.png
```

### Developer Explorer

Add the developer explorer screenshot here:

```text
docs/screenshots/developers.png
```

### Project Explorer

Add the project explorer screenshot here:

```text
docs/screenshots/projects.png
```

### Graph Explorer

Add the graph visualization screenshot here:

```text
docs/screenshots/graph.png
```

## Wexa Requirements Checklist

* [x] CognoDB Cloud instance
* [x] Environment variables
* [x] Official Neo4j driver
* [x] Graph data model
* [x] Graph model documented
* [x] Seed data
* [x] Seed script
* [x] Parameterized Cypher queries
* [x] Multi-hop traversal
* [x] Relationally awkward graph query
* [x] Functional frontend
* [x] Loading states
* [x] Empty states
* [x] Error states
* [x] Responsive UI
* [x] Graceful database failure handling
* [x] README
* [x] Architecture documentation
* [ ] Final screenshots
* [x] GitHub repository
* [x] Hosted demo
* [ ] Screen recording
* [ ] Submission email

## Security

Database credentials are stored exclusively in environment variables.

The frontend has no access to:

```text
COGNODB_URI
COGNODB_USERNAME
COGNODB_PASSWORD
```

All database access is performed by the backend API.

## Author

Mathew Oloyede

GitHub: https://github.com/Mathew-code01
