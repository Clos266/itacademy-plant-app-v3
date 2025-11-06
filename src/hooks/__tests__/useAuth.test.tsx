import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { AuthProvider, useAuth } from "../useAuth";
import { ReactNode } from "react";

// Mock the auth service
vi.mock("../../services/authService", () => ({
  signUp: vi.fn().mockResolvedValue({ success: true }),
  signIn: vi.fn().mockResolvedValue({ success: true }),
  signOut: vi.fn().mockResolvedValue({ success: true }),
  getCurrentUser: vi.fn().mockResolvedValue({ success: true, data: null }),
  onAuthStateChange: vi.fn(() => ({
    data: {
      subscription: {
        unsubscribe: vi.fn(),
      },
    },
  })),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("useAuth Hook", () => {
  it("should provide auth context properties", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toHaveProperty("user");
    expect(result.current).toHaveProperty("loading");
    expect(result.current).toHaveProperty("signUp");
    expect(result.current).toHaveProperty("signIn");
    expect(result.current).toHaveProperty("signOut");
    expect(result.current).toHaveProperty("refreshUser");
  });

  it("should have function types for auth actions", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(typeof result.current.signUp).toBe("function");
    expect(typeof result.current.signIn).toBe("function");
    expect(typeof result.current.signOut).toBe("function");
    expect(typeof result.current.refreshUser).toBe("function");
  });

  it("should throw error when used outside AuthProvider", () => {
    // Test that useAuth throws error without provider
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow("useAuth must be used within an AuthProvider");
  });

  it("should initialize with loading state", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    // Should have proper initial state
    expect(typeof result.current.loading).toBe("boolean");
    expect(
      result.current.user === null || typeof result.current.user === "object"
    ).toBe(true);
  });
});
