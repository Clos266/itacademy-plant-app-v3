import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Users,
  Edit,
  UserPlus,
  UserMinus,
} from "lucide-react";
import { EditEventModal } from "./EditEventModal";
import { EventWithDetails, UpdateEventData } from "@/types";

interface EventInfoCardProps {
  event: EventWithDetails;
  isJoined?: boolean;
  canEdit?: boolean;
  onEdit?: () => void;
  onJoin?: () => void;
  onLeave?: () => void;
}

export function EventInfoCard({
  event,
  isJoined = false,
  canEdit = true,
  onEdit,
  onJoin,
  onLeave,
}: EventInfoCardProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const eventDate = new Date(event.date);
  const isEventPast = eventDate < new Date();

  const handleEditClick = () => {
    setEditModalOpen(true);
    if (onEdit) {
      onEdit();
    }
  };

  const handleSaveEdit = (eventData: UpdateEventData) => {
    // Aquí se podría actualizar el evento en el estado padre
    const updatedEvent = {
      ...event,
      ...eventData,
    };
    console.log("Event updated:", updatedEvent);
    setEditModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl font-bold text-card-foreground mb-2">
              {event.title}
            </CardTitle>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>
                  {event.attendees}{" "}
                  {event.attendees === 1 ? "person" : "people"}{" "}
                  {event.isUpcoming ? "attending" : "attended"}
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="ml-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                event.isUpcoming
                  ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
              }`}
            >
              {event.isUpcoming ? "Upcoming" : "Past Event"}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Event Image */}
        {event.image_url && (
          <div className="mb-6">
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-64 object-cover rounded-lg border border-border"
            />
          </div>
        )}

        {/* Event Image Placeholder if no image */}
        {!event.image_url && (
          <div className="mb-6">
            <div className="w-full h-64 bg-muted rounded-lg border border-border flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Event Image</p>
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            About this event
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Edit Button - Only show if user can edit */}
          {canEdit && (
            <Button
              variant="outline"
              onClick={handleEditClick}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Event
            </Button>
          )}

          {/* Join/Leave Buttons - Only show for upcoming events */}
          {event.isUpcoming && !isEventPast && (
            <>
              {!isJoined ? (
                <Button onClick={onJoin} className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Join Event
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={onLeave}
                  className="flex items-center gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <UserMinus className="w-4 h-4" />
                  Leave Event
                </Button>
              )}
            </>
          )}

          {/* Past Event Message */}
          {!event.isUpcoming && (
            <div className="text-muted-foreground text-sm italic">
              This event has already taken place.
            </div>
          )}
        </div>

        {/* Additional Info for Joined Users */}
        {isJoined && event.isUpcoming && (
          <div className="mt-4 p-4 bg-accent rounded-lg">
            <p className="text-sm text-accent-foreground">
              ✅ You're registered for this event! We'll send you a reminder
              closer to the date.
            </p>
          </div>
        )}
      </CardContent>

      {/* Edit Event Modal */}
      <EditEventModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEdit}
        event={event}
      />
    </Card>
  );
}
