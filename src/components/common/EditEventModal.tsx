import { useState, useEffect } from "react";
import { BaseModal } from "./BaseModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "./ImageUploader";
import { EventWithDetails, UpdateEventData } from "@/types";

type EditEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  event?: EventWithDetails;
  onSave: (eventData: UpdateEventData & { image?: File }) => void;
  onDelete?: (eventId: string) => Promise<{ success: boolean }>;
};

export function EditEventModal({
  isOpen,
  onClose,
  event,
  onSave,
  onDelete,
}: EditEventModalProps) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // Resetear o cargar datos cuando se abre/cierra o cambia el evento
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setLocation(event.location);
      setDate(event.date);
      setDescription(event.description || "");
      setImage(null); // Reset image file
    } else {
      // Limpiar formulario para nuevo evento
      setTitle("");
      setLocation("");
      setDate("");
      setDescription("");
      setImage(null);
    }
  }, [event, isOpen]);

  const handleSave = () => {
    const eventData = {
      title,
      location,
      date,
      description,
      image: image || undefined, // Pasar el archivo File, no la URL temporal
    };
    onSave(eventData);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleDelete = async () => {
    if (event) {
      const confirmed = window.confirm(
        "¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer."
      );

      if (confirmed) {
        if (onDelete) {
          const result = await onDelete(event.id);
          if (result.success) {
            onClose();
          }
        }
      }
    }
  };
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={event ? "Edit Event" : "Create New Event"}
      description={
        event
          ? "Update the event information below."
          : "Fill in the details below to create a new plant exchange event."
      }
      onConfirm={handleSave}
      confirmLabel={event ? "Update Event" : "Create Event"}
    >
      {/* Delete Button - Only show when editing an existing event */}
      {event && (
        <div className="mb-4 pb-4 border-b border-border">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="flex items-center gap-2"
          >
            🗑️ Delete Event
          </Button>
        </div>
      )}

      <form className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <Input
          type="date"
          placeholder="Event date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <textarea
          className="w-full p-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground resize-none"
          placeholder="Event description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <ImageUploader
          value={event?.image_url}
          onChange={setImage}
          label="Event Image"
          helpText="Upload an image for your event"
        />
      </form>
    </BaseModal>
  );
}
