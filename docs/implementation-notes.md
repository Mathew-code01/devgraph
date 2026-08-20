# DevGraph — Implementation Notes

## Project Purpose

DevGraph is a graph-powered developer ecosystem explorer built for the Wexa AI CognoDB take-home assignment.

The application models relationships between:

- Developers
- Projects
- Technologies
- Skills
- Companies
- Domains

The goal is to demonstrate that graph databases are useful when the important questions involve relationships and multi-hop connections.

## Technology

Frontend:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Lucide React
- React Flow

Backend:
- Node.js
- Express
- TypeScript
- Official Neo4j JavaScript driver
- Zod
- Helmet
- CORS
- dotenv

Database:
- CognoDB Cloud
- openCypher
- Bolt protocol

## Architecture

Browser
    ↓
React Client
    ↓
REST API
    ↓
Express Server
    ↓
Service Layer
    ↓
Neo4j Driver
    ↓
CognoDB

## Main User Experience

1. Dashboard
2. Browse developers
3. Browse projects
4. Explore technologies
5. Open developer/project details
6. Explore graph relationships visually
7. Search/filter connected entities

## Important Graph Concepts

Developer
Project
Technology
Skill
Company
Domain

Relationships will include:

DEVELOPER -[:WORKED_ON]-> PROJECT
DEVELOPER -[:KNOWS]-> TECHNOLOGY
DEVELOPER -[:HAS_SKILL]-> SKILL
PROJECT -[:USES]-> TECHNOLOGY
PROJECT -[:BELONGS_TO]-> DOMAIN
PROJECT -[:BUILT_FOR]-> COMPANY
TECHNOLOGY -[:RELATED_TO]-> TECHNOLOGY
DEVELOPER -[:WORKS_AT]-> COMPANY

## Wexa Requirements Checklist

- [ ] CognoDB Cloud instance created
- [ ] Environment variables configured
- [ ] Official Neo4j driver connected
- [ ] Thoughtful graph model
- [ ] Graph model documented
- [ ] Realistic seed data
- [ ] Seed script
- [ ] Parameterized Cypher
- [ ] Multi-hop traversal
- [ ] Relationally awkward graph query
- [ ] Functional frontend
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Responsive UI
- [ ] Graceful database failure handling
- [ ] README
- [ ] Architecture documentation
- [ ] Screenshots
- [ ] GitHub repository
- [ ] Hosted demo
- [ ] Screen recording
- [ ] Submission email

## Development Rule

Do not put database queries directly inside controllers.

Flow:

Route
→ Controller
→ Service
→ Query
→ Neo4j Driver
→ CognoDB

The frontend must communicate with the backend through the API.

Database credentials must never be exposed to the frontend.