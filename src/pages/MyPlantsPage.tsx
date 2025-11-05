import { useState } from "react";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { FilterBar } from "@/components/common/FilterBar";
import { BaseModal } from "@/components/common/BaseModal";
import { ImageUploader } from "@/components/common/ImageUploader";
import { EditPlantModal } from "@/components/common/EditPlantModal";
import { Plant, UpdatePlantData } from "@/types";

export default function MyPlants() {
  // estado de filtros
  const [search, setSearch] = useState("");
  const [showAvailable, setShowAvailable] = useState(true);

  // estado del modal
  const [open, setOpen] = useState(false);

  // estado del modal de edición
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  // estado del formulario del modal
  const [name, setName] = useState("");
  const [sciName, setSciName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Datos de plantas (convertidos a la nueva estructura)
  const mockPlants = [
    {
      id: 1,
      name: "Fiddle Leaf Fig",
      scientific: "Ficus lyrata",
      available: true,
    },
    {
      id: 2,
      name: "Snake Plant",
      scientific: "Sansevieria trifasciata",
      available: true,
    },
    {
      id: 3,
      name: "Peace Lily",
      scientific: "Spathiphyllum wallisii",
      available: false,
    },
  ];

  // Convertir datos mock a la nueva estructura
  const allPlants: Plant[] = mockPlants.map((plant) => ({
    id: plant.id.toString(),
    created_at: "2024-11-01T10:00:00Z",
    user_id: "user-1",
    name: plant.name,
    scientific_name: plant.scientific,
    image_url: null,
    is_available: plant.available,
  }));

  // Aplicar filtros
  const filteredPlants = allPlants.filter((plant) => {
    const matchesSearch =
      plant.name.toLowerCase().includes(search.toLowerCase()) ||
      plant.scientific_name.toLowerCase().includes(search.toLowerCase());

    const matchesAvailability = showAvailable ? plant.is_available : true;

    return matchesSearch && matchesAvailability;
  });

  const handleSave = () => {
    console.log("New plant:", { name, sciName, file });
    setOpen(false);
    setName("");
    setSciName("");
    setFile(null);
  };

  const handleEditClick = (plant: Plant) => {
    setSelectedPlant(plant);
    setEditModalOpen(true);
  };

  const handleEditSave = (plantData: UpdatePlantData) => {
    console.log("Plant updated:", plantData);
    setEditModalOpen(false);
    setSelectedPlant(null);
  };

  return (
    <>
      {/* Encabezado */}
      <PageHeader>
        <PageHeaderHeading>My Plants</PageHeaderHeading>
      </PageHeader>

      {/* Filtros y botón */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          toggleValue={showAvailable}
          onToggleChange={setShowAvailable}
          toggleLabels={{ on: "Available", off: "Unavailable" }}
          placeholder="search plants..."
        />

        <Button onClick={() => setOpen(true)}>+ Add New Plant</Button>
      </div>

      {/* Tabla de plantas */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Common Name</TableHead>
                <TableHead>Scientific Name</TableHead>
                <TableHead>Available</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlants.length > 0 ? (
                filteredPlants.map((plant) => (
                  <TableRow key={plant.id}>
                    <TableCell>
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        🌱
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{plant.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {plant.scientific_name}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          plant.is_available ? "text-green-600" : "text-red-600"
                        }
                      >
                        {plant.is_available ? "Available" : "Not Available"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(plant)}
                        >
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No plants found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal para añadir planta */}
      <BaseModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="add new plant"
        description="fill in the details below to add a new plant."
        onConfirm={handleSave}
      >
        <form className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Common name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Scientific name"
            value={sciName}
            onChange={(e) => setSciName(e.target.value)}
          />
          <ImageUploader
            value={null}
            onChange={setFile}
            label="Upload Plant Image"
          />
        </form>
      </BaseModal>

      {/* Modal de edición de planta */}
      <EditPlantModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedPlant(null);
        }}
        onSave={handleEditSave}
        plant={selectedPlant || undefined}
      />
    </>
  );
}
