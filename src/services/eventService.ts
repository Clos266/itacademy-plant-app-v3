import { supabase, ServiceResponse } from "./supabaseClient";
import { Event, CreateEventData, UpdateEventData } from "@/types";
import { uploadImage } from "./imageService";

const TABLE_NAME = "events";

// Create
export async function createEvent(
  data: CreateEventData & { image?: File }
): Promise<ServiceResponse<Event>> {
  // Subir imagen si existe
  if (data.image) {
    const imageUrl = await uploadImage(data.image, "events");
    if (imageUrl) {
      data.image_url = imageUrl;
    }
  }

  // Remover image del objeto y crear evento
  const { image, ...eventData } = data;

  const { data: event, error } = await supabase
    .from(TABLE_NAME)
    .insert([eventData])
    .select("*")
    .single();

  return { data: event || undefined, error: error?.message, success: !error };
}

// Read
export async function getEvent(id: string): Promise<ServiceResponse<Event>> {
  const { data: event, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();

  return { data: event || undefined, error: error?.message, success: !error };
}

export async function getAllEvents(): Promise<ServiceResponse<Event[]>> {
  const { data: events, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("date", { ascending: false });

  return { data: events || [], error: error?.message, success: !error };
}

export async function getUserEvents(
  userId: string
): Promise<ServiceResponse<Event[]>> {
  const { data: events, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("creator_id", userId)
    .order("date", { ascending: false });

  return { data: events || [], error: error?.message, success: !error };
}

// Update
export async function updateEvent(
  id: string,
  data: UpdateEventData & { image?: File }
): Promise<ServiceResponse<Event>> {
  // Subir nueva imagen si existe
  if (data.image) {
    const imageUrl = await uploadImage(data.image, "events");
    if (imageUrl) {
      data.image_url = imageUrl;
    } else {
      // No actualizar image_url si falló la subida
      delete data.image_url;
    }
  }

  const { image, ...updateData } = data;

  const { data: event, error } = await supabase
    .from(TABLE_NAME)
    .update(updateData)
    .eq("id", id)
    .select("*")
    .single();

  return { data: event || undefined, error: error?.message, success: !error };
}

// Delete
export async function deleteEvent(
  id: string
): Promise<ServiceResponse<boolean>> {
  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);

  return { data: !error, error: error?.message, success: !error };
}
