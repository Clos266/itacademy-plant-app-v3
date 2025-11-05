// Database Types - Based on Supabase schema
// These interfaces match exactly with the database tables

export interface Profile {
  id: string; // uuid
  created_at: string; // timestamp with time zone
  nickname: string;
  avatar?: string | null;
}

export interface Plant {
  id: string; // uuid
  created_at: string; // timestamp with time zone
  user_id: string; // uuid reference to profiles
  name: string;
  scientific_name: string;
  image_url?: string | null;
  is_available: boolean;
  // Optional fields for UI (may not be in initial DB schema)
  description?: string;
  care?: string;
}

export interface Event {
  id: string; // uuid
  created_at: string; // timestamp with time zone
  title: string;
  date: string; // date (ISO format YYYY-MM-DD)
  location: string;
  image_url: string;
  creator_id: string; // uuid reference to profiles
  description?: string | null;
}

export interface EventParticipant {
  id: string; // uuid
  created_at: string; // timestamp with time zone
  event_id: string; // uuid reference to events
  user_id: string; // uuid reference to profiles
  plant_id: string; // uuid reference to plants
}

// Extended types for UI components
// These include computed properties and joined data

export interface EventWithDetails extends Event {
  // Computed properties
  isUpcoming: boolean;
  attendees: number; // Count of participants

  // Optional joined data
  creator?: Profile;
  participants?: EventParticipant[];
  userPlants?: Plant[]; // Plants available for the current user
}

export interface PlantWithOwner extends Plant {
  owner?: Profile;
}

export interface EventParticipantWithDetails extends EventParticipant {
  event?: Event;
  user?: Profile;
  plant?: Plant;
}

// Form data types (for creating/editing)
// These omit auto-generated fields like id and created_at

export type CreateEventData = Omit<Event, "id" | "created_at">;
export type UpdateEventData = Partial<CreateEventData>;

export type CreatePlantData = Omit<Plant, "id" | "created_at">;
export type UpdatePlantData = Partial<CreatePlantData>;

export type CreateProfileData = Omit<Profile, "id" | "created_at">;
export type UpdateProfileData = Partial<CreateProfileData>;

export type CreateEventParticipantData = Omit<
  EventParticipant,
  "id" | "created_at"
>;

// UI State types
export interface FilterState {
  search: string;
  showAvailable?: boolean;
  showUpcoming?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface ModalState {
  isOpen: boolean;
  mode: "create" | "edit" | "view";
  data?: any; // Will be typed specifically in components
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
