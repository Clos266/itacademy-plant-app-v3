import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useEventParticipants } from "../useEventParticipants";

// Mock the auth hook
vi.mock("../useAuth", () => ({
  useAuth: () => ({
    user: { id: "test-user" },
    isAuthenticated: true,
  }),
}));

// Mock the event participant service
vi.mock("../../services/eventParticipantService", () => ({
  getEventParticipantsWithDetails: vi.fn().mockResolvedValue({
    success: true,
    data: [],
  }),
  getUserParticipations: vi.fn().mockResolvedValue({
    success: true,
    data: [],
  }),
  createParticipant: vi.fn().mockResolvedValue({
    success: true,
    data: {
      id: "1",
      event_id: "event-1",
      user_id: "user-1",
      plant_id: "plant-1",
    },
  }),
  deleteParticipant: vi.fn().mockResolvedValue({
    success: true,
  }),
}));

describe("useEventParticipants Hook", () => {
  it("should have all required properties", () => {
    const { result } = renderHook(() => useEventParticipants());

    expect(result.current).toHaveProperty("participants");
    expect(result.current).toHaveProperty("userParticipations");
    expect(result.current).toHaveProperty("loading");
    expect(result.current).toHaveProperty("error");
    expect(result.current).toHaveProperty("loadEventParticipants");
    expect(result.current).toHaveProperty("loadUserParticipations");
    expect(result.current).toHaveProperty("joinEvent");
    expect(result.current).toHaveProperty("leaveEvent");
    expect(result.current).toHaveProperty("isParticipating");
    expect(result.current).toHaveProperty("getUserParticipation");
    expect(result.current).toHaveProperty("getParticipantCount");
    expect(result.current).toHaveProperty("clearError");
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useEventParticipants("test-event-id"));

    expect(result.current.participants).toEqual([]);
    expect(result.current.userParticipations).toEqual([]);
    expect(result.current.loading).toBe(true); // Loading starts as true
    expect(result.current.error).toBe(null);
  });

  it("should have function types for all actions", () => {
    const { result } = renderHook(() => useEventParticipants());

    expect(typeof result.current.loadEventParticipants).toBe("function");
    expect(typeof result.current.loadUserParticipations).toBe("function");
    expect(typeof result.current.joinEvent).toBe("function");
    expect(typeof result.current.leaveEvent).toBe("function");
    expect(typeof result.current.isParticipating).toBe("function");
    expect(typeof result.current.getUserParticipation).toBe("function");
    expect(typeof result.current.getParticipantCount).toBe("function");
    expect(typeof result.current.clearError).toBe("function");
  });

  it("should initialize with eventId parameter", () => {
    const { result } = renderHook(() => useEventParticipants("event-1"));

    // Hook should initialize without throwing errors even with eventId
    expect(result.current).toBeDefined();
    expect(result.current.participants).toEqual([]);
  });

  it("should handle authentication requirement", () => {
    const { result } = renderHook(() => useEventParticipants());

    // Hook should initialize without throwing errors
    expect(result.current).toBeDefined();
  });

  it("should have utility functions that return proper types", () => {
    const { result } = renderHook(() => useEventParticipants());

    // Utility functions should return expected types
    expect(typeof result.current.isParticipating("event-1")).toBe("boolean");
    expect(typeof result.current.getParticipantCount).toBe("function");
  });
});
