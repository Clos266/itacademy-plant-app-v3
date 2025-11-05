import { useState, useEffect } from "react";
import { BaseModal } from "./BaseModal";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "./ImageUploader";
import { Plant, UpdatePlantData } from "@/types";

interface EditPlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant?: Plant;
  onSave: (plantData: UpdatePlantData) => void;
}

export function EditPlantModal({
  isOpen,
  onClose,
  plant,
  onSave,
}: EditPlantModalProps) {
  const [name, setName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [description, setDescription] = useState("");
  const [care, setCare] = useState("");
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState<File | null>(null);

  // Resetear o cargar datos cuando se abre/cierra o cambia la planta
  useEffect(() => {
    if (plant) {
      setName(plant.name);
      setScientificName(plant.scientific_name);
      setDescription(plant.description || "");
      setCare(plant.care || "");
      setAvailable(plant.is_available);
      setImage(null); // Reset image file
    } else {
      // Limpiar formulario para nueva planta
      setName("");
      setScientificName("");
      setDescription("");
      setCare("");
      setAvailable(true);
      setImage(null);
    }
  }, [plant, isOpen]);

  const handleSave = () => {
    const plantData = {
      name,
      scientific_name: scientificName,
      description,
      care,
      is_available: available,
      image_url: image ? URL.createObjectURL(image) : plant?.image_url,
    };
    onSave(plantData);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={plant ? "Edit Plant" : "Add New Plant"}
      description={
        plant
          ? "Update your plant information below."
          : "Fill in the details below to add a new plant to your collection."
      }
      onConfirm={handleSave}
      confirmLabel={plant ? "Update Plant" : "Add Plant"}
    >
      <form className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          type="text"
          placeholder="Scientific name"
          value={scientificName}
          onChange={(e) => setScientificName(e.target.value)}
        />

        <textarea
          className="w-full p-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground resize-none"
          placeholder="Plant description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          className="w-full p-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground resize-none"
          placeholder="Care instructions"
          rows={3}
          value={care}
          onChange={(e) => setCare(e.target.value)}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="available"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
            className="rounded border-border"
          />
          <label htmlFor="available" className="text-sm text-foreground">
            Available for exchange
          </label>
        </div>

        <ImageUploader
          value={plant?.image_url}
          onChange={setImage}
          label="Plant Image"
        />
      </form>
    </BaseModal>
  );
}
