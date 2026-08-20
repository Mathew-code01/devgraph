// client/src/hooks/useProjects.ts


/**
 * DevGraph — Project Data Hook
 */

import { useQuery } from "@tanstack/react-query";

import { api } from "../lib/api";

export function useProjects(
  page = 1,
  limit = 20,
) {
  return useQuery({
    queryKey: [
      "projects",
      page,
      limit,
    ],

    queryFn: () =>
      api.projects.list(
        page,
        limit,
      ),

    staleTime: 30_000,
  });
}

export function useProject(id?: string) {
  return useQuery({
    queryKey: ["project", id],

    queryFn: () =>
      api.projects.get(id!),

    enabled: Boolean(id),

    staleTime: 60_000,
  });
}