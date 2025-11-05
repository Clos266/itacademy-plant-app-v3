import { useState } from "react";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/common/FilterBar";
import { EditEventModal } from "@/components/common/EditEventModal";
import { EventInfoCard } from "@/components/common/EventInfoCard";
import { EventWithDetails, UpdateEventData } from "@/types";

export default function Events() {
  // Estado de filtros
  const [search, setSearch] = useState("");
  const [showUpcoming, setShowUpcoming] = useState(true);

  // Estado de modales
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventWithDetails | null>(
    null
  );

  // Estado de vista detallada
  const [selectedEventForView, setSelectedEventForView] =
    useState<EventWithDetails | null>(null);

  // Estado de eventos unidos (simulado - en una app real vendría del backend)
  const [joinedEvents, setJoinedEvents] = useState<string[]>(["1", "3"]); // IDs de eventos a los que se ha unido

  // Datos de eventos (convertidos a la nueva estructura)
  const mockEvents = [
    {
      id: 1,
      title: "Plant Exchange Market",
      location: "Central Park",
      date: "2025-11-15",
      description:
        "Join us for a community plant exchange event where you can trade your favorite plants.",
      attendees: 24,
      isUpcoming: true,
      image: "/api/placeholder/300/200?text=Plant+Exchange",
    },
    {
      id: 2,
      title: "Succulent Workshop",
      location: "Community Garden",
      date: "2025-11-20",
      description:
        "Learn how to care for succulents and create beautiful arrangements.",
      attendees: 15,
      isUpcoming: true,
      image: "/api/placeholder/300/200?text=Succulent+Workshop",
    },
    {
      id: 3,
      title: "Urban Gardening Talk",
      location: "Library Hall",
      date: "2025-11-25",
      description:
        "Expert tips on growing plants in small urban spaces and apartments.",
      attendees: 32,
      isUpcoming: true,
      image: "/api/placeholder/300/200?text=Urban+Gardening",
    },
    {
      id: 4,
      title: "Seed Swap Festival",
      location: "Botanical Garden",
      date: "2025-12-01",
      description:
        "Bring your seeds and swap them with other gardening enthusiasts.",
      attendees: 45,
      isUpcoming: true,
      image: "/api/placeholder/300/200?text=Seed+Swap",
    },
    {
      id: 5,
      title: "Houseplant Care Clinic",
      location: "Green Thumb Store",
      date: "2025-12-05",
      description:
        "Get your houseplants diagnosed and learn proper care techniques.",
      attendees: 18,
      isUpcoming: true,
      image: "/api/placeholder/300/200?text=Plant+Care",
    },
    {
      id: 6,
      title: "Herb Garden Workshop",
      location: "Farmer's Market",
      date: "2025-12-10",
      description: "Start your own herb garden with this hands-on workshop.",
      attendees: 22,
      isUpcoming: true,
      image: "/api/placeholder/300/200?text=Herb+Garden",
    },
    {
      id: 7,
      title: "Plant Photography Tour",
      location: "Nature Reserve",
      date: "2025-10-15",
      description:
        "Capture the beauty of plants with our guided photography tour.",
      attendees: 12,
      isUpcoming: false,
      image: "/api/placeholder/300/200?text=Photography+Tour",
    },
    {
      id: 8,
      title: "Summer Plant Care",
      location: "Garden Center",
      date: "2025-10-20",
      description:
        "Learn how to keep your plants healthy during the summer months.",
      attendees: 28,
      isUpcoming: false,
      image: "/api/placeholder/300/200?text=Summer+Care",
    },
    {
      id: 9,
      title: "Spring Plant Festival",
      location: "Community Center",
      date: "2025-10-30",
      description:
        "Celebrate spring with fellow plant lovers and fun activities.",
      attendees: 55,
      isUpcoming: false,
      image: "/api/placeholder/300/200?text=Plant+Festival",
    },
  ];

  // Convertir datos mock a la nueva estructura
  const allEvents: EventWithDetails[] = mockEvents.map((event) => ({
    id: event.id.toString(),
    created_at: "2024-11-01T10:00:00Z",
    title: event.title,
    location: event.location,
    date: event.date,
    description: event.description,
    image_url: event.image,
    creator_id: "user-1",
    attendees: event.attendees,
    isUpcoming: event.isUpcoming,
  }));

  // Aplicar filtros
  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      (event.description &&
        event.description.toLowerCase().includes(search.toLowerCase()));

    const matchesUpcoming = showUpcoming ? event.isUpcoming : !event.isUpcoming;

    return matchesSearch && matchesUpcoming;
  });

  // Funciones para manejar eventos
  const handleCreateEvent = (eventData: UpdateEventData) => {
    console.log("Creating new event:", eventData);
    // Aquí iría la lógica para crear el evento en el backend
    setCreateModalOpen(false);
  };

  const handleEditEvent = (eventData: UpdateEventData) => {
    console.log("Updating event:", eventData);
    // Aquí iría la lógica para actualizar el evento en el backend
    setEditModalOpen(false);
    setSelectedEvent(null);
  };

  const handleJoinEvent = (eventId: string) => {
    setJoinedEvents((prev) => [...prev, eventId]);
    console.log("Joined event:", eventId);
    // Aquí iría la lógica para unirse al evento en el backend
  };

  const handleLeaveEvent = (eventId: string) => {
    setJoinedEvents((prev) => prev.filter((id) => id !== eventId));
    console.log("Left event:", eventId);
    // Aquí iría la lógica para salirse del evento en el backend
  };

  const openEditModal = (event: EventWithDetails) => {
    setSelectedEvent(event);
    setEditModalOpen(true);
  };

  return (
    <>
      {/* Encabezado */}
      <PageHeader>
        <PageHeaderHeading>My Events</PageHeaderHeading>
      </PageHeader>

      {/* Filtros y botón */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          toggleValue={showUpcoming}
          onToggleChange={setShowUpcoming}
          toggleLabels={{ on: "Upcoming", off: "Past" }}
          placeholder="search events..."
        />

        <Button onClick={() => setCreateModalOpen(true)}>
          + Add New Event
        </Button>
      </div>

      {/* Grid de eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedEventForView(event)}
          >
            <CardHeader>
              {/* Image Placeholder */}
              <div className="w-full h-72 bg-muted rounded-lg mb-4 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-muted-foreground opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    📍 {event.location}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                      event.isUpcoming
                        ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                        : "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20"
                    }`}
                  >
                    {event.isUpcoming ? "Upcoming" : "Past"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {event.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  👥 {event.attendees}{" "}
                  {event.isUpcoming ? "attending" : "attended"}
                </span>
                {joinedEvents.includes(event.id) && (
                  <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                    Joined
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredEvents.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">
              No events found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Modal de información del evento */}
      {selectedEventForView && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-8 overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedEventForView(null);
            }
          }}
        >
          <div className="relative w-full max-w-2xl h-fit max-h-[80vh] overflow-y-auto scrollbar-thin">
            <EventInfoCard
              event={selectedEventForView}
              isJoined={joinedEvents.includes(selectedEventForView.id)}
              canEdit={true} // Habilitado para mostrar el botón de edición
              onEdit={() => openEditModal(selectedEventForView)}
              onJoin={() => handleJoinEvent(selectedEventForView.id)}
              onLeave={() => handleLeaveEvent(selectedEventForView.id)}
            />
          </div>
        </div>
      )}

      {/* Modal para crear evento */}
      <EditEventModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSave={handleCreateEvent}
      />

      {/* Modal para editar evento */}
      <EditEventModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent || undefined}
        onSave={handleEditEvent}
      />
    </>
  );
}
