import { supabase, ServiceResponse } from "./supabaseClient";
import { EventParticipant, CreateEventParticipantData } from "@/types";

const TABLE_NAME = "event_participants";

// Create
export async function createParticipant(
  data: CreateEventParticipantData
): Promise<ServiceResponse<EventParticipant>> {
  const { data: participant, error } = await supabase
    .from(TABLE_NAME)
    .insert([data])
    .select("*")
    .single();

  return {
    data: participant || undefined,
    error: error?.message,
    success: !error,
  };
}

// Read
export async function getParticipant(
  id: string
): Promise<ServiceResponse<EventParticipant>> {
  const { data: participant, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();

  return {
    data: participant || undefined,
    error: error?.message,
    success: !error,
  };
}

export async function getEventParticipants(
  eventId: string
): Promise<ServiceResponse<EventParticipant[]>> {
  const { data: participants, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: true });

  return { data: participants || [], error: error?.message, success: !error };
}

export async function getUserParticipations(
  userId: string
): Promise<ServiceResponse<EventParticipant[]>> {
  const { data: participations, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data: participations || [], error: error?.message, success: !error };
}

// Update
export async function updateParticipant(
  id: string,
  plantId: string
): Promise<ServiceResponse<EventParticipant>> {
  const { data: participant, error } = await supabase
    .from(TABLE_NAME)
    .update({ plant_id: plantId })
    .eq("id", id)
    .select("*")
    .single();

  return {
    data: participant || undefined,
    error: error?.message,
    success: !error,
  };
}

// Delete
export async function deleteParticipant(
  id: string
): Promise<ServiceResponse<boolean>> {
  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);

  return { data: !error, error: error?.message, success: !error };
}

// Join Event (convenience function)
export async function joinEvent(
  eventId: string,
  userId: string,
  plantId: string
): Promise<ServiceResponse<EventParticipant>> {
  return createParticipant({
    event_id: eventId,
    user_id: userId,
    plant_id: plantId,
  });
}

// Leave Event (convenience function)
export async function leaveEvent(
  eventId: string,
  userId: string
): Promise<ServiceResponse<boolean>> {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("event_id", eventId)
    .eq("user_id", userId);

  return { data: !error, error: error?.message, success: !error };
}
