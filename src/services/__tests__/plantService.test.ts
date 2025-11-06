import { describe, it, expect, vi } from "vitest";
import {
  createPlant,
  getPlant,
  getAllPlants,
  getUserPlants,
  updatePlant,
  deletePlant,
} from "../plantService";

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
          order: vi.fn().mockResolvedValue({ data: [], error: null }),
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

// Mock the image service
vi.mock("../imageService", () => ({
  uploadImage: vi.fn().mockResolvedValue("mock-image-url"),
}));

describe("Plant Service", () => {
  it("should have all required functions", () => {
    expect(typeof createPlant).toBe("function");
    expect(typeof getPlant).toBe("function");
    expect(typeof getAllPlants).toBe("function");
    expect(typeof getUserPlants).toBe("function");
    expect(typeof updatePlant).toBe("function");
    expect(typeof deletePlant).toBe("function");
  });

  it("createPlant should be callable", async () => {
    const result = await createPlant({
      name: "Test Plant",
      scientific_name: "Testus plantus",
      user_id: "user-1",
      is_available: true,
    });

    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("error");
  });

  it("getPlant should be callable", async () => {
    const result = await getPlant("1");
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("error");
  });

  it("getAllPlants should be callable", async () => {
    const result = await getAllPlants();
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("error");
  });

  it("getUserPlants should be callable", async () => {
    const result = await getUserPlants("user-1");
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("error");
  });

  it("updatePlant should be callable", async () => {
    const result = await updatePlant("1", {
      name: "Updated Plant",
      is_available: false,
    });
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("error");
  });

  it("deletePlant should be callable", async () => {
    const result = await deletePlant("1");
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("error");
  });
});
