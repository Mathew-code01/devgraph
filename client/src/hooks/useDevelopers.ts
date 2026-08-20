// client/src/hooks/useDevelopers.ts

/**
 * DevGraph — Developer Data Hook
 */

import {
  useQuery,
} from "@tanstack/react-query";

import { api } from "../lib/api";

export function useDevelopers(
  page = 1,
  limit = 20,
  search = "",
) {
  return useQuery({
    queryKey: [
      "developers",
      page,
      limit,
      search,
    ],

    queryFn: () =>
      api.developers.list(
        page,
        limit,
        search,
      ),

    staleTime: 30_000,
  });
}

export function useDeveloper(id?: string) {
  return useQuery({
    queryKey: ["developer", id],

    queryFn: () =>
      api.developers.get(id!),

    enabled: Boolean(id),

    staleTime: 60_000,
  });
}