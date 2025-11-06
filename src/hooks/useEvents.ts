import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { Event, EventWithDetails } from "@/types";
import {
  getAllEventsWithAttendees,
  createEvent,
  updateEvent,
  deleteEvent,
} from "@/services/eventService";

export function useEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all events
  const loadEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getAllEventsWithAttendees();
      if (result.success && result.data) {
        setEvents(result.data);
      } else {
        setError(result.error || "Error loading events");
        setEvents([]);
      }
    } catch (err) {
      setError("Error loading events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Create new event
  const addEvent = async (
    eventData: Omit<Event, "id" | "created_at" | "creator_id"> & {
      image?: File;
    }
  ) => {
    if (!user) {
      setError("User not authenticated");
      return { success: false, error: "User not authenticated" };
    }

    setLoading(true);
    setError(null);

    try {
      const eventToCreate = {
        title: eventData.title,
        date: eventData.date,
        location: eventData.location,
        image_url: eventData.image_url,
        description: eventData.description,
        creator_id: user.id,
        image: eventData.image,
      };

      const result = await createEvent(eventToCreate);

      if (result.success) {
        await loadEvents(); // Reload to get updated list
        return { success: true };
      } else {
        setError(result.error || "Error creating event");
        return { success: false, error: result.error };
      }
    } catch (err: any) {
      const errorMsg = err.message || "Error creating event";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Update existing event
  const updateExistingEvent = async (
    eventId: string,
    eventData: Partial<Event> & { image?: File }
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await updateEvent(eventId, eventData);
      if (result.success) {
        await loadEvents(); // Reload to get updated list
        return { success: true };
      } else {
        setError(result.error || "Error updating event");
        return { success: false, error: result.error };
      }
    } catch (err: any) {
      const errorMsg = err.message || "Error updating event";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Delete event
  const removeEvent = async (eventId: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await deleteEvent(eventId);
      if (result.success) {
        await loadEvents(); // Reload to get updated list
        return { success: true };
      } else {
        setError(result.error || "Error deleting event");
        return { success: false, error: result.error };
      }
    } catch (err: any) {
      const errorMsg = err.message || "Error deleting event";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Filter events by search and upcoming status
  const filterEvents = (
    events: EventWithDetails[],
    search: string,
    showUpcoming: boolean
  ) => {
    return events.filter((event: EventWithDetails) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase()) ||
        (event.description &&
          event.description.toLowerCase().includes(search.toLowerCase()));

      const matchesUpcoming = showUpcoming ? event.isUpcoming : true;

      return matchesSearch && matchesUpcoming;
    });
  };

  // Load events when component mounts
  useEffect(() => {
    loadEvents();
  }, []);

  return {
    // Data
    events,
    loading,
    error,

    // Actions
    loadEvents,
    addEvent,
    updateExistingEvent,
    removeEvent,

    // Utilities
    filterEvents,

    // Clear error
    clearError: () => setError(null),
  };
}
