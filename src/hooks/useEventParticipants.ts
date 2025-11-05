import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { EventParticipant, EventParticipantWithDetails } from "@/types";
import {
  getEventParticipantsWithDetails,
  getUserParticipations,
  createParticipant,
  deleteParticipant,
} from "@/services/eventParticipantService";

export function useEventParticipants(eventId?: string) {
  const { user } = useAuth();
  const [participants, setParticipants] = useState<
    EventParticipantWithDetails[]
  >([]);
  const [userParticipations, setUserParticipations] = useState<
    EventParticipant[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load participants for a specific event with user and plant details
  const loadEventParticipants = async (targetEventId: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getEventParticipantsWithDetails(targetEventId);
      if (result.success && result.data) {
        setParticipants(result.data);
      } else {
        setError(result.error || "Error loading participants");
        setParticipants([]);
      }
    } catch (err) {
      setError("Error loading participants");
      setParticipants([]);
    } finally {
      setLoading(false);
    }
  };

  // Load all participations for current user
  const loadUserParticipations = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getUserParticipations(user.id);
      if (result.success && result.data) {
        setUserParticipations(result.data);
      } else {
        setError(result.error || "Error loading user participations");
        setUserParticipations([]);
      }
    } catch (err) {
      setError("Error loading user participations");
      setUserParticipations([]);
    } finally {
      setLoading(false);
    }
  };

  // Join an event with a specific plant
  const joinEvent = async (eventId: string, plantId: string) => {
    if (!user) {
      setError("User not authenticated");
      return { success: false, error: "User not authenticated" };
    }

    setLoading(true);
    setError(null);

    try {
      const result = await createParticipant({
        event_id: eventId,
        user_id: user.id,
        plant_id: plantId,
      });

      if (result.success) {
        // Reload participations after joining
        await loadUserParticipations();
        if (eventId) {
          await loadEventParticipants(eventId);
        }
        return { success: true };
      } else {
        setError(result.error || "Error joining event");
        return { success: false, error: result.error };
      }
    } catch (err: any) {
      const errorMsg = err.message || "Error joining event";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Leave an event (by participation ID)
  const leaveEventByParticipantId = async (participantId: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await deleteParticipant(participantId);
      if (result.success) {
        // Reload participations after leaving
        await loadUserParticipations();
        if (eventId) {
          await loadEventParticipants(eventId);
        }
        return { success: true };
      } else {
        setError(result.error || "Error leaving event");
        return { success: false, error: result.error };
      }
    } catch (err: any) {
      const errorMsg = err.message || "Error leaving event";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Leave an event (by event ID - convenience function)
  const leaveEvent = async (targetEventId: string) => {
    const participation = getUserParticipation(targetEventId);

    if (!participation) {
      const errorMsg = "User is not participating in this event";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }

    return await leaveEventByParticipantId(participation.id);
  };

  // Check if user is participating in a specific event
  const isParticipating = (targetEventId: string): boolean => {
    return userParticipations.some((p) => p.event_id === targetEventId);
  };

  // Get user's participation for a specific event
  const getUserParticipation = (
    targetEventId: string
  ): EventParticipant | undefined => {
    return userParticipations.find((p) => p.event_id === targetEventId);
  };

  // Get participant count for an event
  const getParticipantCount = (targetEventId: string): number => {
    return participants.filter((p) => p.event_id === targetEventId).length;
  };

  // Load data when eventId or user changes
  useEffect(() => {
    if (user) {
      loadUserParticipations();
    } else {
      setUserParticipations([]);
    }
  }, [user]);

  useEffect(() => {
    if (eventId) {
      loadEventParticipants(eventId);
    }
  }, [eventId]);

  return {
    // Data
    participants,
    userParticipations,
    loading,
    error,

    // Actions
    loadEventParticipants,
    loadUserParticipations,
    joinEvent,
    leaveEvent,

    // Utilities
    isParticipating,
    getUserParticipation,
    getParticipantCount,

    // Clear error
    clearError: () => setError(null),
  };
}
