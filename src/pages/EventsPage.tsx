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
import { useEvents } from "@/hooks/useEvents";
import { useFilters } from "@/hooks/useFilters";
import { useEventParticipants } from "@/hooks/useEventParticipants";

export default function Events() {
  // Custom hooks for business logic
  const {
    events,
    loading,
    error,
    filterEvents,
    addEvent,
    updateExistingEvent,
  } = useEvents();
  const {
    search,
    showAvailable: showUpcoming,
    setSearch,
    setShowAvailable: setShowUpcoming,
  } = useFilters();
  const { userParticipations, isParticipating, joinEvent, leaveEvent } =
    useEventParticipants();

  // Estado de modales
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventWithDetails | null>(
    null
  );

  // Estado de vista detallada
  const [selectedEventForView, setSelectedEventForView] =
    useState<EventWithDetails | null>(null);

  // Filter events based on current filters
  const filteredEvents = filterEvents(events, search, showUpcoming);

  // Funciones para manejar eventos
  const handleCreateEvent = async (
    eventData: UpdateEventData & { image?: File }
  ) => {
    const result = await addEvent({
      title: eventData.title || "",
      date: eventData.date || "",
      location: eventData.location || "",
      image_url: "", // Se llenará automáticamente al subir la imagen
      description: eventData.description || null,
      image: eventData.image || undefined, // Pasar el archivo File
    });

    if (result.success) {
      setCreateModalOpen(false);
    } else {
      console.error("Failed to create event:", result.error);
    }
  };

  const handleEditEvent = async (
    eventData: UpdateEventData & { image?: File }
  ) => {
    if (!selectedEvent) return;

    const result = await updateExistingEvent(selectedEvent.id, eventData);
    if (result.success) {
      setEditModalOpen(false);
      setSelectedEvent(null);
    } else {
      console.error("Failed to update event:", result.error);
    }
  };

  const handleJoinEvent = async (eventId: string) => {
    // TODO: Open plant selection modal
    // For now, we'll use a placeholder plant ID
    const dummyPlantId = "placeholder-plant-id";

    const result = await joinEvent(eventId, dummyPlantId);
    if (!result.success) {
      console.error("Failed to join event:", result.error);
    }
  };

  const handleLeaveEvent = async (eventId: string) => {
    const participation = userParticipations.find(
      (p) => p.event_id === eventId
    );
    if (participation) {
      const result = await leaveEvent(eventId);
      if (!result.success) {
        console.error("Failed to leave event:", result.error);
      }
    }
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

      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

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
        {loading ? (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">Loading events...</p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedEventForView(event)}
            >
              <CardHeader>
                {/* Event Image */}
                {event.image_url &&
                !event.image_url.includes("/api/placeholder/") ? (
                  <div className="w-full h-72 mb-4">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ) : (
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
                )}

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
                  {isParticipating(event.id) && (
                    <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                      Joined
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}

        {!loading && filteredEvents.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">
              {error
                ? "Error loading events. Please try again."
                : "No events found matching your criteria."}
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
              isJoined={isParticipating(selectedEventForView.id)}
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
