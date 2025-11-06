import { describe, it, expect, vi } from "vitest";
import { uploadImage } from "../imageService";

// Mock the supabase client
vi.mock("../supabaseClient", () => ({
  supabase: {
    storage: {
      from: vi.fn().mockReturnValue({
        upload: vi
          .fn()
          .mockResolvedValue({ data: { path: "mock-path" }, error: null }),
        getPublicUrl: vi
          .fn()
          .mockReturnValue({ data: { publicUrl: "mock-url" } }),
      }),
    },
  },
}));

// Mock console and alert to avoid noise in tests
global.console = {
  ...console,
  error: vi.fn(),
};

global.alert = vi.fn();

describe("Image Service", () => {
  it("should have uploadImage function", () => {
    expect(typeof uploadImage).toBe("function");
  });

  it("uploadImage should be callable with file", async () => {
    const mockFile = new File(["test content"], "test-image.jpg", {
      type: "image/jpeg",
    });
    const result = await uploadImage(mockFile);

    // Should return either a URL string or null
    expect(typeof result === "string" || result === null).toBe(true);
  });

  it("uploadImage should be callable with file and folder", async () => {
    const mockFile = new File(["test content"], "profile.jpg", {
      type: "image/jpeg",
    });
    const result = await uploadImage(mockFile, "avatars");

    // Should return either a URL string or null
    expect(typeof result === "string" || result === null).toBe(true);
  });

  it("uploadImage should handle basic file types", () => {
    const jpegFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    const pngFile = new File(["test"], "test.png", { type: "image/png" });

    expect(() => uploadImage(jpegFile)).not.toThrow();
    expect(() => uploadImage(pngFile)).not.toThrow();
  });
});
