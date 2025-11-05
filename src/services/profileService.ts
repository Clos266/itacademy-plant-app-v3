import { supabase, ServiceResponse } from "./supabaseClient";
import { Profile, CreateProfileData, UpdateProfileData } from "@/types";

const TABLE_NAME = "profiles";

// Create
export async function createProfile(
  data: CreateProfileData
): Promise<ServiceResponse<Profile>> {
  const { data: profile, error } = await supabase
    .from(TABLE_NAME)
    .insert([data])
    .select("*")
    .single();

  return { data: profile || undefined, error: error?.message, success: !error };
}

// Read
export async function getProfile(
  id: string
): Promise<ServiceResponse<Profile>> {
  const { data: profile, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();

  return { data: profile || undefined, error: error?.message, success: !error };
}

export async function getAllProfiles(): Promise<ServiceResponse<Profile[]>> {
  const { data: profiles, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("created_at", { ascending: false });

  return { data: profiles || [], error: error?.message, success: !error };
}

// Update
export async function updateProfile(
  id: string,
  data: UpdateProfileData
): Promise<ServiceResponse<Profile>> {
  const { data: profile, error } = await supabase
    .from(TABLE_NAME)
    .update(data)
    .eq("id", id)
    .select("*")
    .single();

  return { data: profile || undefined, error: error?.message, success: !error };
}

// Delete
export async function deleteProfile(
  id: string
): Promise<ServiceResponse<boolean>> {
  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);

  return { data: !error, error: error?.message, success: !error };
}
