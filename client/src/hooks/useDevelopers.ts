// client/src/hooks/useDevelopers.ts

import { useQuery } from "@tanstack/react-query";

import { api } from "../lib/api";

/**
 * Developer list
 */
export function useDevelopers(page = 1, limit = 20, search = "") {
  return useQuery({
    queryKey: ["developers", page, limit, search],

    queryFn: () => api.developers.list(page, limit, search),

    staleTime: 30_000,
  });
}

/**
 * Single developer
 */
export function useDeveloper(developerId?: string) {
  return useQuery({
    queryKey: ["developer", developerId],

    queryFn: () => {
      if (!developerId) {
        throw new Error("Developer ID is required.");
      }

      return api.developers.get(developerId);
    },

    enabled: Boolean(developerId),

    staleTime: 30_000,
  });
}

/**
 * Project graph
 *
 * The query is disabled until a project ID
 * is available.
 */
export function useProjectGraph(projectId?: string, depth = 2) {
  return useQuery({
    queryKey: ["project-graph", projectId, depth],

    queryFn: () => {
      if (!projectId) {
        throw new Error("Project ID is required.");
      }

      return api.graph.project(projectId, depth);
    },

    enabled: Boolean(projectId),

    staleTime: 30_000,

    retry: 1,
  });
}