import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useProfile } from "../useProfile";

// Mock the auth hook
vi.mock("../useAuth", () => ({
  useAuth: () => ({
    user: { id: "test-user" },
    isAuthenticated: true,
  }),
}));

// Mock the profile service
vi.mock("../../services/profileService", () => ({
  getProfile: vi.fn().mockResolvedValue({
    success: true,
    data: null,
  }),
  updateProfile: vi.fn().mockResolvedValue({
    success: true,
    data: { id: "test-user", nickname: "Test User" },
  }),
}));

// Mock supabase client
vi.mock("../../services/supabaseClient", () => ({
  supabase: {
    from: vi.fn().mockReturnValue({
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: null, error: null }),
        }),
      }),
    }),
  },
}));

describe("useProfile Hook", () => {
  it("should have all required properties", () => {
    const { result } = renderHook(() => useProfile());

    expect(result.current).toHaveProperty("profile");
    expect(result.current).toHaveProperty("loading");
    expect(result.current).toHaveProperty("error");
    expect(result.current).toHaveProperty("loadProfile");
    expect(result.current).toHaveProperty("createUserProfile");
    expect(result.current).toHaveProperty("updateUserProfile");
    expect(result.current).toHaveProperty("hasProfile");
    expect(result.current).toHaveProperty("clearError");
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useProfile());

    expect(result.current.profile).toBe(null);
    expect(result.current.loading).toBe(true); // Starts loading on mount
    expect(result.current.error).toBe(null);
  });

  it("should have function types for all actions", () => {
    const { result } = renderHook(() => useProfile());

    expect(typeof result.current.loadProfile).toBe("function");
    expect(typeof result.current.createUserProfile).toBe("function");
    expect(typeof result.current.updateUserProfile).toBe("function");
    expect(typeof result.current.hasProfile).toBe("function");
    expect(typeof result.current.clearError).toBe("function");
  });

  it("should handle authentication requirement", () => {
    const { result } = renderHook(() => useProfile());

    // Hook should initialize without throwing errors
    expect(result.current).toBeDefined();
  });

  it("should have hasProfile utility function", () => {
    const { result } = renderHook(() => useProfile());

    // hasProfile should be a function that returns boolean
    expect(typeof result.current.hasProfile).toBe("function");
    expect(typeof result.current.hasProfile()).toBe("boolean");
  });
});
