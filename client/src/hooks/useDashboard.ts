/**
 * DevGraph — Dashboard Data Hooks
 */

import { useQuery } from "@tanstack/react-query";

import { api } from "../lib/api";
import type { Project } from "../types/project";
import type { Technology } from "../types/graph";

export function useDashboardProjects(limit = 5) {
  return useQuery<Project[], Error>({
    queryKey: ["dashboard-projects", limit],

    queryFn: async () => {
      const response = await api.projects.list(1, limit);

      return response.data;
    },

    staleTime: 30_000,
  });
}

export function useDashboardTechnologies(limit = 8) {
  return useQuery<Technology[], Error>({
    queryKey: ["dashboard-technologies", limit],

    queryFn: async () => {
      const response = await api.technologies.list();

      return response.data.slice(0, limit);
    },

    staleTime: 30_000,
  });
}
