import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { Plant, CreatePlantData, UpdatePlantData } from "@/types";
import {
  getUserPlants,
  createPlant,
  updatePlant,
  deletePlant,
} from "@/services/plantService";

export function usePlants() {
  const { user } = useAuth();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load plants for current user
  const loadPlants = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getUserPlants(user.id);
      if (result.success && result.data) {
        setPlants(result.data);
      } else {
        setError(result.error || "Error loading plants");
        setPlants([]);
      }
    } catch (err) {
      setError("Error loading plants");
      setPlants([]);
    } finally {
      setLoading(false);
    }
  };

  // Create new plant with file support
  const addPlant = async (
    plantData: Omit<CreatePlantData, "user_id"> & { file?: File }
  ) => {
    if (!user) {
      setError("User not authenticated");
      return { success: false, error: "User not authenticated" };
    }

    setLoading(true);
    setError(null);

    try {
      const result = await createPlant({
        ...plantData,
        user_id: user.id,
      });

      if (result.success) {
        await loadPlants(); // Reload to get updated list
        return { success: true };
      } else {
        setError(result.error || "Error creating plant");
        return { success: false, error: result.error };
      }
    } catch (err: any) {
      const errorMsg = err.message || "Error creating plant";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Update existing plant with file support
  const updateExistingPlant = async (
    plantId: string,
    plantData: UpdatePlantData & { file?: File }
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await updatePlant(plantId, plantData);
      if (result.success) {
        await loadPlants(); // Reload to get updated list
        return { success: true };
      } else {
        setError(result.error || "Error updating plant");
        return { success: false, error: result.error };
      }
    } catch (err: any) {
      const errorMsg = err.message || "Error updating plant";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Delete plant
  const removePlant = async (plantId: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await deletePlant(plantId);
      if (result.success) {
        await loadPlants(); // Reload to get updated list
        return { success: true };
      } else {
        setError(result.error || "Error deleting plant");
        return { success: false, error: result.error };
      }
    } catch (err: any) {
      const errorMsg = err.message || "Error deleting plant";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Filter plants by search and availability
  const filterPlants = (
    plants: Plant[],
    search: string,
    showAvailable: boolean
  ) => {
    return plants.filter((plant: Plant) => {
      const matchesSearch =
        plant.name.toLowerCase().includes(search.toLowerCase()) ||
        plant.scientific_name.toLowerCase().includes(search.toLowerCase());

      const matchesAvailability = showAvailable ? plant.is_available : true;

      return matchesSearch && matchesAvailability;
    });
  };

  // Load plants when user changes
  useEffect(() => {
    if (user) {
      loadPlants();
    } else {
      setPlants([]);
      setError(null);
    }
  }, [user]);

  return {
    // Data
    plants,
    loading,
    error,

    // Actions
    loadPlants,
    addPlant,
    updateExistingPlant,
    removePlant,

    // Utilities
    filterPlants,

    // Clear error
    clearError: () => setError(null),
  };
}
