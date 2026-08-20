// client/src/hooks/useProjects.ts


/**
 * DevGraph — Project Data Hooks
 */

import { useQuery } from "@tanstack/react-query";

import { api } from "../lib/api";

import type { ApiResponse, PaginatedResponse } from "../lib/api";

import type { Project } from "../types/project";

export function useProjects(
  page = 1,
  limit = 20,
) {
  return useQuery<
    PaginatedResponse<Project>,
    Error
  >({
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

export function useProject(
  id?: string,
) {
  return useQuery<
    ApiResponse<Project>,
    Error
  >({
    queryKey: [
      "project",
      id,
    ],

    queryFn: () =>
      api.projects.get(id as string),

    enabled: Boolean(id),

    staleTime: 60_000,
  });
}