import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useEvents } from "../useEvents";

// Mock the auth hook
vi.mock("../useAuth", () => ({
  useAuth: () => ({
    user: { id: "test-user" },
    isAuthenticated: true,
  }),
}));

// Mock the event service
vi.mock("../../services/eventService", () => ({
  getAllEventsWithAttendees: vi.fn().mockResolvedValue({
    success: true,
    data: [],
  }),
  createEvent: vi.fn().mockResolvedValue({
    success: true,
    data: { id: "1", title: "Test Event" },
  }),
  updateEvent: vi.fn().mockResolvedValue({
    success: true,
    data: { id: "1", title: "Updated Event" },
  }),
  deleteEvent: vi.fn().mockResolvedValue({
    success: true,
  }),
}));

describe("useEvents Hook", () => {
  it("should have all required properties", () => {
    const { result } = renderHook(() => useEvents());

    expect(result.current).toHaveProperty("events");
    expect(result.current).toHaveProperty("loading");
    expect(result.current).toHaveProperty("error");
    expect(result.current).toHaveProperty("loadEvents");
    expect(result.current).toHaveProperty("addEvent");
    expect(result.current).toHaveProperty("updateExistingEvent");
    expect(result.current).toHaveProperty("removeEvent");
    expect(result.current).toHaveProperty("filterEvents");
    expect(result.current).toHaveProperty("clearError");
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useEvents());

    expect(result.current.events).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });
});
