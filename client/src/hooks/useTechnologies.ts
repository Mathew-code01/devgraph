// client/src/hooks/useTechnologies.ts


/**
 * DevGraph — Technology Data Hook
 */

import { useQuery } from "@tanstack/react-query";

import { api } from "../lib/api";

export function useTechnologies() {
  return useQuery({
    queryKey: ["technologies"],

    queryFn: () =>
      api.technologies.list(),

    staleTime: 60_000,
  });
}

export function useTechnology(
  id?: string,
) {
  return useQuery({
    queryKey: [
      "technology",
      id,
    ],

    queryFn: () =>
      api.technologies.get(id!),

    enabled: Boolean(id),

    staleTime: 60_000,
  });
}