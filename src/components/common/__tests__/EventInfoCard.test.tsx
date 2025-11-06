import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { EventInfoCard } from "../EventInfoCard";
import { EventWithDetails } from "../../../types";

// Mock the hooks
vi.mock("../../../hooks/useAuth", () => ({
  useAuth: () => ({
    user: { id: "test-user" },
    isAuthenticated: true,
  }),
}));

vi.mock("../../../hooks/usePlants", () => ({
  usePlants: () => ({
    plants: [],
    loading: false,
  }),
}));

vi.mock("../../../hooks/useEventParticipants", () => ({
  useEventParticipants: () => ({
    participants: [],
    loading: false,
  }),
}));

const mockEvent: EventWithDetails = {
  id: "1",
  title: "Plant Workshop",
  description: "Learn about plant care",
  date: "2024-01-15",
  location: "Community Garden",
  image_url: "test-image.jpg",
  creator_id: "creator-1",
  created_at: "2024-01-01T00:00:00.000Z",
  isUpcoming: true,
  attendees: 10,
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("EventInfoCard Component", () => {
  it("renders event information correctly", () => {
    renderWithRouter(<EventInfoCard event={mockEvent} />);

    expect(screen.getByText("Plant Workshop")).toBeInTheDocument();
    expect(screen.getByText("Learn about plant care")).toBeInTheDocument();
    expect(screen.getByText("Community Garden")).toBeInTheDocument();
  });

  it("displays attendee count", () => {
    renderWithRouter(<EventInfoCard event={mockEvent} />);

    expect(screen.getByText(/10 people attending/i)).toBeInTheDocument();
  });

  it("shows formatted date information", () => {
    renderWithRouter(<EventInfoCard event={mockEvent} />);

    expect(screen.getByText(/Monday, January 15, 2024/)).toBeInTheDocument();
  });

  it("renders edit button when no join functionality is available", () => {
    renderWithRouter(<EventInfoCard event={mockEvent} />);

    const editButton = screen.getByRole("button", { name: /edit event/i });
    expect(editButton).toBeInTheDocument();
  });
});
