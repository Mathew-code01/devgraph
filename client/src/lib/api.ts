// client/src/lib/api.ts

/**
 * DevGraph — Frontend API Client
 *
 * Responsibility:
 * - Centralize all HTTP communication.
 * - Keep components free from raw fetch() calls.
 */

const API_URL = (
  import.meta.env.VITE_API_URL ?? "http://localhost:5000/api"
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

async function request<T>(path: string, options?: RequestInit): Promise<T> {
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
    list: (
      page = 1,
      limit = 20,
      search = "",
    ) =>
      request<
        PaginatedResponse<
          import("../types/developer").Developer
        >
      >(
        `/developers?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
      ),

    get: (id: string) =>
      request<
        ApiResponse<
          import("../types/developer").Developer
        >
      >(`/developers/${id}`),
  },

  projects: {
    list: (page = 1, limit = 20) =>
      request<
        PaginatedResponse<
          import("../types/project").Project
        >
      >(
        `/projects?page=${page}&limit=${limit}`,
      ),

    get: (id: string) =>
      request<
        ApiResponse<
          import("../types/project").Project
        >
      >(`/projects/${id}`),
  },

  technologies: {
    list: () =>
      request<
        ApiResponse<
          import("../types/graph").Technology[]
        >
      >("/technologies"),

    get: (id: string) =>
      request<
        ApiResponse<
          import("../types/graph").Technology
        >
      >(`/technologies/${id}`),
  },

  graph: {
    developer: (
      id: string,
      depth = 2,
    ) =>
      request<
        ApiResponse<
          import("../types/graph").GraphData
        >
      >(
        `/graph/developers/${id}?depth=${depth}`,
      ),

    overview: () =>
      request<
        ApiResponse<
          import("../types/graph").GraphOverview
        >
      >("/graph/overview"),

    developersByTechnology: (
      technologyId: string,
    ) =>
      request<
        ApiResponse<
          import("../types/developer").Developer[]
        >
      >(
        `/graph/technology/${technologyId}/developers`,
      ),

    relatedTechnologies: (
      technologyId: string,
    ) =>
      request<
        ApiResponse<
          import("../types/graph").RelatedTechnology[]
        >
      >(
        `/graph/technology/${technologyId}/related`,
      ),
  },

  health: () =>
    request("/health"),
};