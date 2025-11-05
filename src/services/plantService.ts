import { supabase, ServiceResponse } from "./supabaseClient";
import { Plant, CreatePlantData, UpdatePlantData } from "@/types";
import { uploadImage } from "./imageService";

const TABLE_NAME = "plants";

// Create
export async function createPlant(
  data: CreatePlantData & { file?: File }
): Promise<ServiceResponse<Plant>> {
  // Subir imagen si existe
  if (data.file) {
    const imageUrl = await uploadImage(data.file);
    if (imageUrl) {
      data.image_url = imageUrl;
    }
  }

  // Remover file del objeto y crear planta
  const { file, ...plantData } = data;

  const { data: plant, error } = await supabase
    .from(TABLE_NAME)
    .insert([plantData])
    .select("*")
    .single();

  return { data: plant || undefined, error: error?.message, success: !error };
}

// Read
export async function getPlant(id: string): Promise<ServiceResponse<Plant>> {
  const { data: plant, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();

  return { data: plant || undefined, error: error?.message, success: !error };
}

export async function getAllPlants(): Promise<ServiceResponse<Plant[]>> {
  const { data: plants, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("created_at", { ascending: false });

  return { data: plants || [], error: error?.message, success: !error };
}

export async function getUserPlants(
  userId: string
): Promise<ServiceResponse<Plant[]>> {
  const { data: plants, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data: plants || [], error: error?.message, success: !error };
}

// Update
export async function updatePlant(
  id: string,
  data: UpdatePlantData & { file?: File }
): Promise<ServiceResponse<Plant>> {
  // Subir nueva imagen si existe
  if (data.file) {
    const imageUrl = await uploadImage(data.file);
    if (imageUrl) {
      data.image_url = imageUrl;
    } else {
      // No actualizar image_url si falló la subida
      delete data.image_url;
    }
  }

  const { file, ...updateData } = data;
  const { data: plant, error } = await supabase
    .from(TABLE_NAME)
    .update(updateData)
    .eq("id", id)
    .select("*")
    .single();

  return { data: plant || undefined, error: error?.message, success: !error };
}

// Delete
export async function deletePlant(
  id: string
): Promise<ServiceResponse<boolean>> {
  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
  return { data: !error, error: error?.message, success: !error };
}
