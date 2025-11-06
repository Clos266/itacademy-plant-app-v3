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
import { usePlants } from "@/hooks/usePlants";
import { useModals } from "@/hooks/useModals";
import { useFilters } from "@/hooks/useFilters";

export default function MyPlants() {
  // Custom hooks for business logic
  const {
    plants,
    loading,
    error,
    addPlant,
    updateExistingPlant,
    removePlant,
    filterPlants,
  } = usePlants();
  const { search, showAvailable, setSearch, setShowAvailable } = useFilters();
  const {
    addModalOpen,
    addFormData,
    editModalOpen,
    selectedPlant,
    openAddModal,
    closeAddModal,
    updateAddForm,
    openEditModal,
    closeEditModal,
  } = useModals();

  // Filter plants based on current filters
  const filteredPlants = filterPlants(plants, search, showAvailable);

  // Handle saving new plant
  const handleSave = async () => {
    if (!addFormData.name.trim()) return;

    const result = await addPlant({
      name: addFormData.name.trim(),
      scientific_name: addFormData.sciName.trim(),
      image_url: null, // Se establecerá automáticamente por el servicio
      is_available: true,
      file: addFormData.file || undefined, // Pasar el archivo directamente
    });

    if (result.success) {
      closeAddModal();
    }
  };

  // Handle editing existing plant
  const handleEditSave = async (plantData: UpdatePlantData) => {
    if (!selectedPlant) return;

    const result = await updateExistingPlant(selectedPlant.id, plantData);
    if (result.success) {
      closeEditModal();
    }
  };

  // Handle plant deletion
  const handleDelete = async (plantId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta planta?")) return;
    await removePlant(plantId);
  };

  return (
    <>
      {/* Encabezado */}
      <PageHeader>
        <PageHeaderHeading>My Plants</PageHeaderHeading>
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
          toggleValue={showAvailable}
          onToggleChange={setShowAvailable}
          toggleLabels={{ on: "Available", off: "All" }}
          placeholder="search plants..."
        />

        <Button onClick={openAddModal} disabled={loading}>
          {loading ? "Loading..." : "+ Add New Plant"}
        </Button>
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Loading plants...
                  </TableCell>
                </TableRow>
              ) : filteredPlants.length > 0 ? (
                filteredPlants.map((plant: Plant) => (
                  <TableRow key={plant.id}>
                    <TableCell>
                      {plant.image_url ? (
                        <img
                          src={plant.image_url}
                          alt={plant.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          🌱
                        </div>
                      )}
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
                          onClick={() => openEditModal(plant)}
                          disabled={loading}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(plant.id)}
                          disabled={loading}
                        >
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
                    {error
                      ? "Error loading plants. Please try again."
                      : "No plants found matching your criteria."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal para añadir planta */}
      <BaseModal
        isOpen={addModalOpen}
        onClose={closeAddModal}
        title="Add New Plant"
        description="Fill in the details below to add a new plant."
        onConfirm={handleSave}
        confirmLabel={loading ? "Creating..." : "Add Plant"}
      >
        <form className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Common name"
            value={addFormData.name}
            onChange={(e) => updateAddForm("name", e.target.value)}
            required
            disabled={loading}
          />
          <Input
            type="text"
            placeholder="Scientific name"
            value={addFormData.sciName}
            onChange={(e) => updateAddForm("sciName", e.target.value)}
            disabled={loading}
          />
          <ImageUploader
            value={null}
            onChange={(file) => updateAddForm("file", file)}
            label="Upload Plant Image"
          />
        </form>
      </BaseModal>

      {/* Modal de edición de planta */}
      <EditPlantModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        onSave={handleEditSave}
        plant={selectedPlant || undefined}
      />
    </>
  );
}
