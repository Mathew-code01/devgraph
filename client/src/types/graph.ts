// client/src/types/graph.ts

/**
 * DevGraph — Graph Domain Types
 */

export interface Technology {
  id: string;
  name: string;
  category?: string;
  developerCount?: number;
  projectCount?: number;
}

export interface GraphNode {
  id: string;
  label: string;
  type: string;
  properties: Record<
    string,
    unknown
  >;
}

export interface GraphRelationship {
  source: string;
  target: string;
  type: string;
}

export interface GraphData {
  nodes: GraphNode[];
  relationships: GraphRelationship[];
}

export interface GraphOverview {
  nodes: Array<{
    type: string;
    count: number;
  }>;

  relationships: Array<{
    type: string;
    count: number;
  }>;
}

export interface RelatedTechnology {
  id: string;
  name: string;
  sharedProjects: number;
}

