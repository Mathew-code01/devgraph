# DevGraph Graph Model

## Overview

DevGraph models a developer ecosystem as a graph of people, projects, technologies, skills, companies, and domains.

The graph is designed around relationships rather than isolated records.

The primary node types are:

- Developer
- Project
- Technology
- Skill
- Company
- Domain

The primary relationships are:

- WORKED_ON
- KNOWS
- HAS_SKILL
- USES
- BELONGS_TO
- BUILT_FOR
- RELATED_TO
- WORKS_AT

## Why a Graph Model?

The important questions in DevGraph involve relationships and multi-hop connections.

For example:

> Which technologies are connected to a developer through projects belonging to a particular domain?

This requires traversing:

```text
Developer
    │
    │ WORKED_ON
    ▼
Project
    │
    │ USES
    ▼
Technology

A graph database allows these relationships to be traversed directly.

This makes relationship-heavy queries easier to express and avoids manually reconstructing relationships across multiple relational join tables.

Graph Overview
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
Node Types
Developer

Represents an individual developer.

Example properties:

Developer {
  id
  name
  email
  location
  bio
  avatar
}

Example:

(:Developer {
  id: "dev-001",
  name: "Ada Okafor",
  location: "Lagos, Nigeria"
})
Project

Represents a software project.

Example properties:

Project {
  id
  name
  description
  url
  status
}

Example:

(:Project {
  id: "project-001",
  name: "DevGraph",
  description: "Developer ecosystem explorer",
  status: "active"
})
Technology

Represents a programming language, framework, database, platform, or other technical technology.

Example properties:

Technology {
  id
  name
  category
}

Examples:

React
TypeScript
Node.js
Neo4j
CognoDB
Python
PostgreSQL
Skill

Represents a professional or technical skill.

Example properties:

Skill {
  id
  name
  category
}

Examples:

Graph Modeling
API Development
Frontend Development
Backend Development
System Design
Database Design
Company

Represents an organization associated with developers or projects.

Example properties:

Company {
  id
  name
  industry
  location
}
Domain

Represents the business or application domain associated with a project.

Example properties:

Domain {
  id
  name
  description
}

Examples:

FinTech
HealthTech
Developer Tools
E-commerce
Artificial Intelligence
Education
Relationships
Developer → Project
DEVELOPER -[:WORKED_ON]-> PROJECT

Represents a developer's contribution to a project.

Example:

(:Developer)-[:WORKED_ON]->(:Project)
Developer → Technology
DEVELOPER -[:KNOWS]-> TECHNOLOGY

Represents a technology known or used by a developer.

Example:

(:Developer)-[:KNOWS]->(:Technology)
Developer → Skill
DEVELOPER -[:HAS_SKILL]-> SKILL

Represents a skill possessed by a developer.

Example:

(:Developer)-[:HAS_SKILL]->(:Skill)
Project → Technology
PROJECT -[:USES]-> TECHNOLOGY

Represents technologies used to build a project.

Example:

(:Project)-[:USES]->(:Technology)
Project → Domain
PROJECT -[:BELONGS_TO]-> DOMAIN

Represents the domain or category of a project.

Example:

(:Project)-[:BELONGS_TO]->(:Domain)
Project → Company
PROJECT -[:BUILT_FOR]-> COMPANY

Represents the company or organization a project was built for.

Example:

(:Project)-[:BUILT_FOR]->(:Company)
Technology → Technology
TECHNOLOGY -[:RELATED_TO]-> TECHNOLOGY

Represents a relationship between technologies.

Examples:

React → RELATED_TO → TypeScript
Node.js → RELATED_TO → Express
Neo4j → RELATED_TO → CognoDB
Developer → Company
DEVELOPER -[:WORKS_AT]-> COMPANY

Represents a developer's current or associated company.

Example:

(:Developer)-[:WORKS_AT]->(:Company)
Complete Relationship Model
Developer
   │
   ├── WORKED_ON ──────► Project
   │                       │
   │                       ├── USES ─────────► Technology
   │                       │
   │                       ├── BELONGS_TO ───► Domain
   │                       │
   │                       └── BUILT_FOR ────► Company
   │
   ├── KNOWS ───────────► Technology
   │
   ├── HAS_SKILL ───────► Skill
   │
   └── WORKS_AT ────────► Company


Technology
   │
   └── RELATED_TO ──────► Technology
Graph Properties

Node identifiers should be stable and unique.

For example:

Developer.id
Project.id
Technology.id
Skill.id
Company.id
Domain.id

Names are intended primarily for display and search, while IDs provide stable references for API requests and graph queries.

Relationship Properties

Relationships may also contain properties when additional context is required.

For example:

(:Developer)-[:WORKED_ON {
  role: "Lead Developer",
  startedAt: "2025-01-01"
}]->(:Project)

Another example:

(:Developer)-[:KNOWS {
  level: "advanced"
}]->(:Technology)

Relationship properties should only be added when they represent useful domain information.

Example Seed Graph

A simplified example graph could look like:

Mathew
  │
  ├── WORKED_ON ──► DevGraph
  │                    │
  │                    ├── USES ──► React
  │                    ├── USES ──► TypeScript
  │                    ├── USES ──► Node.js
  │                    └── BELONGS_TO ──► Developer Tools
  │
  ├── KNOWS ───────► React
  ├── KNOWS ───────► TypeScript
  ├── HAS_SKILL ───► Graph Modeling
  │
  └── WORKS_AT ────► Example Company
Multi-Hop Traversal

One of the core graph operations in DevGraph is finding technologies used by projects worked on by a specific developer.

The traversal is:

Developer
    │
    │ WORKED_ON
    ▼
Project
    │
    │ USES
    ▼
Technology

Cypher:

MATCH (d:Developer)-[:WORKED_ON]->(p:Project)-[:USES]->(t:Technology)
WHERE d.id = $developerId
RETURN DISTINCT t
ORDER BY t.name

The $developerId value is supplied as a query parameter.

No user input is concatenated into the Cypher query.

Relationally Awkward Query

DevGraph also demonstrates a query involving several independent relationships.

The goal is to find developers who:

Work on projects.
Use a particular technology.
Belong to a particular domain.
Work for a company associated with those developers.

Cypher:

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

This query demonstrates why graph traversal is valuable for DevGraph.

Instead of manually joining multiple relationship tables, the query follows the relationships directly.

Example Query: Developer Skills

Find all skills belonging to a developer:

MATCH (d:Developer)-[:HAS_SKILL]->(s:Skill)
WHERE d.id = $developerId
RETURN s
ORDER BY s.name
Example Query: Developer Projects

Find projects worked on by a developer:

MATCH (d:Developer)-[:WORKED_ON]->(p:Project)
WHERE d.id = $developerId
RETURN p
ORDER BY p.name
Example Query: Project Technologies

Find all technologies used by a project:

MATCH (p:Project)-[:USES]->(t:Technology)
WHERE p.id = $projectId
RETURN t
ORDER BY t.name
Example Query: Related Technologies

Find technologies related to a given technology:

MATCH (t:Technology)-[:RELATED_TO]->(related:Technology)
WHERE t.id = $technologyId
RETURN related
ORDER BY related.name
Example Query: Developer Graph

Retrieve a developer and the connected ecosystem around them:

MATCH (d:Developer)
WHERE d.id = $developerId


OPTIONAL MATCH (d)-[:WORKED_ON]->(p:Project)
OPTIONAL MATCH (d)-[:KNOWS]->(t:Technology)
OPTIONAL MATCH (d)-[:HAS_SKILL]->(s:Skill)
OPTIONAL MATCH (d)-[:WORKS_AT]->(c:Company)


RETURN
  d,
  collect(DISTINCT p) AS projects,
  collect(DISTINCT t) AS technologies,
  collect(DISTINCT s) AS skills,
  collect(DISTINCT c) AS companies

This type of query can power the developer detail and graph visualization views.

Query Parameterization

All application queries use parameters.

Correct:

MATCH (d:Developer)
WHERE d.id = $developerId
RETURN d

with:

{
  developerId: "dev-001"
}

Avoid constructing Cypher using string concatenation.

Incorrect:

"MATCH (d:Developer) WHERE d.id = '" + developerId + "' RETURN d"

Parameterized queries improve safety, maintainability, and query reuse.

Graph Design Principles

The DevGraph model follows several principles:

Nodes represent meaningful entities.
Relationships represent meaningful connections.
Stable IDs are used to identify entities.
Relationship types describe how entities are connected.
Multi-hop relationships are intentionally modeled.
Queries use parameters rather than string concatenation.
Graph traversal is performed by CognoDB.
The frontend consumes graph information through the backend API.
Summary

The core DevGraph model is:

Developer
 ├── WORKED_ON ──────► Project
 │                       ├── USES ─────────► Technology
 │                       ├── BELONGS_TO ───► Domain
 │                       └── BUILT_FOR ────► Company
 │
 ├── KNOWS ───────────► Technology
 ├── HAS_SKILL ───────► Skill
 └── WORKS_AT ────────► Company


Technology
 └── RELATED_TO ──────► Technology

This model gives DevGraph a relationship-first structure that supports direct graph traversal, multi-hop exploration, and relationship-heavy discovery.