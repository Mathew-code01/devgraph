// client/src/hooks/useGraph.ts


/**
 * DevGraph — Graph Data Hooks
 */

import { useQuery } from "@tanstack/react-query";

import { api } from "../lib/api";
import type {
  ApiResponse,
} from "../lib/api";
import type {
  GraphData,
  GraphOverview,
} from "../types/graph";

export function useDeveloperGraph(
  developerId?: string,
  depth = 2,
) {
  return useQuery<
    ApiResponse<GraphData>,
    Error
  >({
    queryKey: [
      "developer-graph",
      developerId,
      depth,
    ],

    queryFn: () =>
      api.graph.developer(
        developerId!,
        depth,
      ),

    enabled: Boolean(
      developerId,
    ),

    staleTime: 30_000,
  });
}

export function useProjectGraph(projectId?: string, depth = 2) {
  return useQuery<ApiResponse<GraphData>, Error>({
    queryKey: ["project-graph", projectId, depth],

    queryFn: () => api.graph.project(projectId!, depth),

    enabled: Boolean(projectId),

    staleTime: 30_000,
  });
}

export function useGraphOverview() {
  return useQuery<
    ApiResponse<GraphOverview>,
    Error
  >({
    queryKey: [
      "graph-overview",
    ],

    queryFn: () =>
      api.graph.overview(),

    staleTime: 60_000,
  });
}