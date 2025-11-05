import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { Profile } from "@/types";
import { supabase } from "@/services/supabaseClient";
import { getProfile, updateProfile } from "@/services/profileService";

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user profile
  const loadProfile = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getProfile(user.id);
      if (result.success && result.data) {
        setProfile(result.data);
      } else {
        // Profile doesn't exist yet, this is normal for new users
        setProfile(null);
      }
    } catch (err) {
      setError("Error loading profile");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Create new profile
  const createUserProfile = async (profileData: {
    nickname: string;
    avatar?: string | null;
  }) => {
    if (!user) {
      setError("User not authenticated");
      return { success: false, error: "User not authenticated" };
    }

    setLoading(true);
    setError(null);

    try {
      // Create profile directly with Supabase using the auth user ID
      const { data: newProfile, error } = await supabase
        .from("profiles")
        .insert([
          {
            id: user.id,
            ...profileData,
          },
        ])
        .select("*")
        .single();

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      if (newProfile) {
        setProfile(newProfile);
        return { success: true };
      }

      return { success: false, error: "Unknown error creating profile" };
    } catch (err: any) {
      const errorMsg = err.message || "Error creating profile";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Update existing profile
  const updateUserProfile = async (profileData: Partial<Profile>) => {
    if (!user || !profile) {
      setError("No profile to update");
      return { success: false, error: "No profile to update" };
    }

    setLoading(true);
    setError(null);

    try {
      const result = await updateProfile(profile.id, profileData);
      if (result.success && result.data) {
        setProfile(result.data);
        return { success: true };
      } else {
        setError(result.error || "Error updating profile");
        return { success: false, error: result.error };
      }
    } catch (err: any) {
      const errorMsg = err.message || "Error updating profile";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Check if user has a profile
  const hasProfile = (): boolean => {
    return profile !== null;
  };

  // Load profile when user changes
  useEffect(() => {
    if (user) {
      setLoading(true); // Set loading before starting
      loadProfile();
    } else {
      setProfile(null);
      setError(null);
      setLoading(false);
    }
  }, [user]);

  return {
    // Data
    profile,
    loading,
    error,

    // Actions
    loadProfile,
    createUserProfile,
    updateUserProfile,

    // Utilities
    hasProfile,

    // Clear error
    clearError: () => setError(null),
  };
}
