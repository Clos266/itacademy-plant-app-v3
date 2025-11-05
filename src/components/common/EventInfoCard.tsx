import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BaseModal } from "@/components/common/BaseModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  MapPin,
  Users,
  Edit,
  UserPlus,
  UserMinus,
  Leaf,
} from "lucide-react";
import { EventWithDetails } from "@/types";
import { usePlants } from "@/hooks/usePlants";
import { useEventParticipants } from "@/hooks/useEventParticipants";

interface EventInfoCardProps {
  event: EventWithDetails;
  isJoined?: boolean;
  canEdit?: boolean;
  onEdit?: () => void;
  onJoin?: (plantId: string) => Promise<void>;
  onLeave?: () => Promise<void>;
}

export function EventInfoCard({
  event,
  isJoined = false,
  canEdit = true,
  onEdit,
  onJoin,
  onLeave,
}: EventInfoCardProps) {
  const eventDate = new Date(event.date);
  const isEventPast = eventDate < new Date();

  // Plant selection modal state
  const [showPlantSelector, setShowPlantSelector] = useState(false);
  const [selectedPlantId, setSelectedPlantId] = useState<string>("");
  const [joiningEvent, setJoiningEvent] = useState(false);
  const [leavingEvent, setLeavingEvent] = useState(false);

  // Get user plants for selection
  const { plants } = usePlants();
  const availablePlants = plants.filter((plant) => plant.is_available);

  // Get event participants
  const { participants, loading: participantsLoading } = useEventParticipants(
    event.id
  );

  const handleEditClick = () => {
    if (onEdit) {
      onEdit();
    }
  };

  const handleJoinClick = () => {
    if (availablePlants.length === 0) {
      alert(
        "You need to have at least one available plant to join this event."
      );
      return;
    }
    setShowPlantSelector(true);
  };

  const handleJoinConfirm = async () => {
    if (!selectedPlantId || !onJoin) return;

    setJoiningEvent(true);
    try {
      await onJoin(selectedPlantId);
      setShowPlantSelector(false);
      setSelectedPlantId("");
    } catch (error) {
      console.error("Error joining event:", error);
    } finally {
      setJoiningEvent(false);
    }
  };

  const handleLeaveClick = async () => {
    if (!onLeave) return;

    if (!confirm("Are you sure you want to leave this event?")) return;

    setLeavingEvent(true);
    try {
      await onLeave();
    } catch (error) {
      console.error("Error leaving event:", error);
    } finally {
      setLeavingEvent(false);
    }
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
          <div className="mb-6 flex justify-center">
            <img
              src={event.image_url}
              alt={event.title}
              className="w-64 h-64 object-cover rounded-lg border border-border"
            />
          </div>
        )}

        {/* Event Image Placeholder if no image */}
        {!event.image_url && (
          <div className="mb-6 flex justify-center">
            <div className="w-64 h-64 bg-muted rounded-lg border border-border flex items-center justify-center">
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
                <Button
                  onClick={handleJoinClick}
                  className="flex items-center gap-2"
                  disabled={availablePlants.length === 0}
                >
                  <UserPlus className="w-4 h-4" />
                  Join Event
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleLeaveClick}
                  disabled={leavingEvent}
                  className="flex items-center gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <UserMinus className="w-4 h-4" />
                  {leavingEvent ? "Leaving..." : "Leave Event"}
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

        {/* Participants List */}
        {participants && participants.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Event Participants ({participants.length})
            </h3>
            <div className="grid gap-3">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {participant.user?.nickname?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {participant.user?.nickname || "Anonymous"}
                    </p>
                    {participant.plant && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Leaf className="w-3 h-3" />
                        <span>{participant.plant.name}</span>
                        {participant.plant.scientific_name && (
                          <span className="italic">
                            ({participant.plant.scientific_name})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {participant.plant?.image_url && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={participant.plant.image_url}
                        alt={participant.plant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {participantsLoading && (
              <div className="text-center py-4 text-muted-foreground">
                Loading participants...
              </div>
            )}
          </div>
        )}

        {/* Plant Selection Modal */}
        <BaseModal
          isOpen={showPlantSelector}
          onClose={() => setShowPlantSelector(false)}
          title="Select a Plant for the Event"
        >
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Choose which plant you'd like to bring to this event:
            </p>

            {availablePlants.length === 0 ? (
              <div className="text-center py-8">
                <Leaf className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">
                  You don't have any available plants. Add a plant first to join
                  events.
                </p>
              </div>
            ) : (
              <div className="grid gap-3 max-h-60 overflow-y-auto">
                {availablePlants.map((plant) => (
                  <div
                    key={plant.id}
                    onClick={() => setSelectedPlantId(plant.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border-2 transition-colors ${
                      selectedPlantId === plant.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {plant.image_url ? (
                      <img
                        src={plant.image_url}
                        alt={plant.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{plant.name}</p>
                      {plant.scientific_name && (
                        <p className="text-sm text-muted-foreground italic">
                          {plant.scientific_name}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowPlantSelector(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleJoinConfirm}
                disabled={!selectedPlantId || joiningEvent}
                className="flex-1"
              >
                {joiningEvent ? "Joining..." : "Join Event"}
              </Button>
            </div>
          </div>
        </BaseModal>
      </CardContent>
    </Card>
  );
}
