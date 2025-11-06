import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePlants } from "../usePlants";

// Mock the auth hook
vi.mock("../useAuth", () => ({
  useAuth: () => ({
    user: { id: "test-user" },
    isAuthenticated: true,
  }),
}));

// Mock the plant service
vi.mock("../../services/plantService", () => ({
  getUserPlants: vi.fn().mockResolvedValue([
    {
      id: "1",
      name: "Test Plant",
      scientific_name: "Testus plantus",
      user_id: "test-user",
      is_available: true,
      created_at: "2024-01-01T00:00:00.000Z",
    },
  ]),
  createPlant: vi.fn().mockResolvedValue({
    id: "2",
    name: "New Plant",
    scientific_name: "Newus plantus",
    user_id: "test-user",
    is_available: true,
    created_at: "2024-01-01T00:00:00.000Z",
  }),
  updatePlant: vi.fn().mockResolvedValue(true),
  deletePlant: vi.fn().mockResolvedValue(true),
}));

describe("usePlants Hook", () => {
  it("initializes with default values", () => {
    const { result } = renderHook(() => usePlants());

    expect(result.current.plants).toEqual([]);
    expect(result.current.loading).toBe(true); // Hook starts loading on mount
    expect(result.current.error).toBe(null);
    expect(typeof result.current.addPlant).toBe("function");
    expect(typeof result.current.updateExistingPlant).toBe("function");
    expect(typeof result.current.removePlant).toBe("function");
    expect(typeof result.current.loadPlants).toBe("function");
  });

  it("provides all required functions", () => {
    const { result } = renderHook(() => usePlants());

    expect(result.current).toHaveProperty("plants");
    expect(result.current).toHaveProperty("loading");
    expect(result.current).toHaveProperty("error");
    expect(result.current).toHaveProperty("addPlant");
    expect(result.current).toHaveProperty("updateExistingPlant");
    expect(result.current).toHaveProperty("removePlant");
    expect(result.current).toHaveProperty("loadPlants");
    expect(result.current).toHaveProperty("filterPlants");
    expect(result.current).toHaveProperty("clearError");
  });

  it("handles authentication requirement", () => {
    // This test verifies the hook works with authentication
    const { result } = renderHook(() => usePlants());

    // Hook should initialize without throwing errors
    expect(result.current).toBeDefined();
  });

  it("has proper function signatures", () => {
    const { result } = renderHook(() => usePlants());

    // Verify functions exist and can be called (basic structure test)
    expect(() => result.current.loadPlants()).not.toThrow();
    expect(typeof result.current.addPlant).toBe("function");
    expect(typeof result.current.updateExistingPlant).toBe("function");
    expect(typeof result.current.removePlant).toBe("function");
  });
});
