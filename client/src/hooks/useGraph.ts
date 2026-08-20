// client/src/hooks/useGraph.ts


/**
 * DevGraph — Graph Data Hooks
 */

import { useQuery } from "@tanstack/react-query";

import { api } from "../lib/api";

export function useDeveloperGraph(
  developerId?: string,
  depth = 2,
) {
  return useQuery({
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

    enabled: Boolean(developerId),

    staleTime: 30_000,
  });
}

export function useGraphOverview() {
  return useQuery({
    queryKey: ["graph-overview"],

    queryFn: () =>
      api.graph.overview(),

    staleTime: 60_000,
  });
}