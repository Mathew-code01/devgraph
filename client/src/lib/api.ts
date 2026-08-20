// client/src/lib/api.ts

/**
 * DevGraph — Frontend API Client
 *
 * Responsibility:
 * - Centralize all HTTP communication.
 * - Keep components free from raw fetch() calls.
 * - Expose developer, project, technology and graph endpoints.
 */

import type { Developer } from "../types/developer";

import type {
  GraphData,
  GraphOverview,
  RelatedTechnology,
  Technology,
} from "../types/graph";

import type { Project } from "../types/project";

const API_URL = (
  import.meta.env.VITE_API_URL ??
  "http://localhost:5000/api"
).replace(/\/+$/, "");

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  let payload: unknown = null;

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    payload = await response.json();
  }

  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : `Request failed with status ${response.status}.`;

    throw new Error(message);
  }

  return payload as T;
}

export const api = {
  developers: {
    list: (page = 1, limit = 20, search = "") =>
      request<PaginatedResponse<Developer>>(
        `/developers?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
      ),

    get: (id: string) =>
      request<ApiResponse<Developer>>(
        `/developers/${encodeURIComponent(id)}`,
      ),
  },

  projects: {
    list: (page = 1, limit = 20) =>
      request<PaginatedResponse<Project>>(
        `/projects?page=${page}&limit=${limit}`,
      ),

    get: (id: string) =>
      request<ApiResponse<Project>>(
        `/projects/${encodeURIComponent(id)}`,
      ),
  },

  technologies: {
    list: () =>
      request<ApiResponse<Technology[]>>(
        "/technologies",
      ),

    get: (id: string) =>
      request<ApiResponse<Technology>>(
        `/technologies/${encodeURIComponent(id)}`,
      ),
  },

  graph: {
    /**
     * Developer graph
     */
    developer: (id: string, depth = 2) =>
      request<ApiResponse<GraphData>>(
        `/graph/developers/${encodeURIComponent(id)}?depth=${depth}`,
      ),

    /**
     * Project graph
     */
    project: (projectId: string, depth = 2) =>
      request<ApiResponse<GraphData>>(
        `/graph/projects/${encodeURIComponent(projectId)}?depth=${depth}`,
      ),

    /**
     * Graph overview
     */
    overview: () =>
      request<ApiResponse<GraphOverview>>(
        "/graph/overview",
      ),

    /**
     * Developers connected to a technology
     */
    developersByTechnology: (technologyId: string) =>
      request<ApiResponse<Developer[]>>(
        `/graph/technology/${encodeURIComponent(
          technologyId,
        )}/developers`,
      ),

    /**
     * Technologies related to another technology
     */
    relatedTechnologies: (technologyId: string) =>
      request<ApiResponse<RelatedTechnology[]>>(
        `/graph/technology/${encodeURIComponent(
          technologyId,
        )}/related`,
      ),
  },

  health: () =>
    request("/health"),
};