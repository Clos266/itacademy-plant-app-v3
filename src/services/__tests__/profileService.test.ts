import { describe, it, expect, vi } from "vitest";
import {
  createProfile,
  getProfile,
  getAllProfiles,
  updateProfile,
  deleteProfile,
} from "../profileService";

// Mock the supabase client
vi.mock("../supabaseClient", () => ({
  supabase: {
    from: vi.fn().mockReturnValue({
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: null, error: null }),
        }),
      }),
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: null, error: null }),
        }),
        order: vi.fn().mockResolvedValue({ data: [], error: null }),
      }),
      update: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: null }),
          }),
        }),
      }),
      delete: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: null }),
      }),
    }),
  },
}));

describe("Profile Service", () => {
  it("should have all required functions", () => {
    expect(typeof createProfile).toBe("function");
    expect(typeof getProfile).toBe("function");
    expect(typeof getAllProfiles).toBe("function");
    expect(typeof updateProfile).toBe("function");
    expect(typeof deleteProfile).toBe("function");
  });

  it("createProfile should be callable", async () => {
    const result = await createProfile({
      nickname: "TestUser",
    });
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("error");
  });

  it("getProfile should be callable", async () => {
    const result = await getProfile("user-1");
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("error");
  });

  it("getAllProfiles should be callable", async () => {
    const result = await getAllProfiles();
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("error");
  });

  it("updateProfile should be callable", async () => {
    const result = await updateProfile("user-1", {
      nickname: "UpdatedUser",
    });
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("error");
  });

  it("deleteProfile should be callable", async () => {
    const result = await deleteProfile("user-1");
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("error");
  });
});
