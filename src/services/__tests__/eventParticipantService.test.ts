import { describe, it, expect, vi } from "vitest";
import {
  createParticipant,
  getParticipant,
  getEventParticipants,
  getEventParticipantsWithDetails,
  getUserParticipations,
  updateParticipant,
  deleteParticipant,
  joinEvent,
  leaveEvent,
} from "../eventParticipantService";

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
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ error: null }),
        }),
      }),
    }),
  },
}));

describe("Event Participant Service", () => {
  it("should have all required functions", () => {
    expect(typeof createParticipant).toBe("function");
    expect(typeof getParticipant).toBe("function");
    expect(typeof getEventParticipants).toBe("function");
    expect(typeof getEventParticipantsWithDetails).toBe("function");
    expect(typeof getUserParticipations).toBe("function");
    expect(typeof updateParticipant).toBe("function");
    expect(typeof deleteParticipant).toBe("function");
    expect(typeof joinEvent).toBe("function");
    expect(typeof leaveEvent).toBe("function");
  });

  it("createParticipant should be callable", async () => {
    const result = await createParticipant({
      event_id: "event-1",
      user_id: "user-1",
      plant_id: "plant-1",
    });
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("error");
  });

  it("getEventParticipants should be callable", async () => {
    const result = await getEventParticipants("event-1");
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("error");
  });

  it("joinEvent should be callable", async () => {
    const result = await joinEvent("event-1", "user-1", "plant-1");
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("error");
  });

  it("leaveEvent should be callable", async () => {
    const result = await leaveEvent("event-1", "user-1");
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("error");
  });
});
