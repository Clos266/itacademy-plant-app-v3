import { useState, useEffect } from "react";
import { BaseModal } from "./BaseModal";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "./ImageUploader";
import { Plant, UpdatePlantData } from "@/types";

interface EditPlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant?: Plant;
  onSave: (plantData: UpdatePlantData & { file?: File }) => void;
}

export function EditPlantModal({
  isOpen,
  onClose,
  plant,
  onSave,
}: EditPlantModalProps) {
  const [name, setName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [available, setAvailable] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  // Resetear o cargar datos cuando se abre/cierra o cambia la planta
  useEffect(() => {
    if (plant) {
      setName(plant.name);
      setScientificName(plant.scientific_name);
      setAvailable(plant.is_available);
      setFile(null); // Reset image file
    } else {
      // Limpiar formulario para nueva planta
      setName("");
      setScientificName("");
      setAvailable(true);
      setFile(null);
    }
  }, [plant, isOpen]);

  const handleSave = () => {
    const plantData = {
      name,
      scientific_name: scientificName,
      is_available: available,
      file: file || undefined,
    };
    onSave(plantData);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Plant"
      description="Update your plant information below."
      onConfirm={handleSave}
      confirmLabel="Update Plant"
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
          onChange={setFile}
          label="Plant Image"
        />
      </form>
    </BaseModal>
  );
}
