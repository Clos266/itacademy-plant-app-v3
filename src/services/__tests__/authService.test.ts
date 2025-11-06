import { describe, it, expect, vi, beforeEach } from "vitest";
import { signIn, signOut } from "../authService";

// Mock supabase
vi.mock("../supabaseClient", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      signUp: vi.fn(),
      getUser: vi.fn(),
      onAuthStateChange: vi.fn(),
    },
  },
}));

describe("AuthService - Basic Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("signIn", () => {
    it("should return success when login is successful", async () => {
      // Arrange
      const { supabase } = await import("../supabaseClient");

      vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
        data: {
          user: {
            id: "123",
            email: "test@example.com",
            created_at: "2024-01-01",
          } as any,
          session: null,
        },
        error: null,
      } as any);

      // Act
      const result = await signIn({
        email: "test@example.com",
        password: "password",
      });

      // Assert
      expect(result.success).toBe(true);
      expect(result.data?.email).toBe("test@example.com");
    });

    it("should return error when login fails", async () => {
      // Arrange
      const { supabase } = await import("../supabaseClient");

      vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
        data: { user: null, session: null },
        error: { message: "Invalid credentials" } as any,
      } as any);

      // Act
      const result = await signIn({
        email: "test@example.com",
        password: "wrong",
      });

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe("Invalid credentials");
    });
  });

  describe("signOut", () => {
    it("should return success when signout is successful", async () => {
      // Arrange
      const { supabase } = await import("../supabaseClient");

      vi.mocked(supabase.auth.signOut).mockResolvedValue({
        error: null,
      } as any);

      // Act
      const result = await signOut();

      // Assert
      expect(result.success).toBe(true);
    });
  });
});
