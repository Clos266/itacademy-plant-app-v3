import { useState } from "react";
import { Plant } from "@/types";

export function useModals() {
  // Add plant modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({
    name: "",
    sciName: "",
    file: null as File | null,
  });

  // Edit plant modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  // Add modal actions
  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
    resetAddForm();
  };

  const resetAddForm = () => {
    setAddFormData({
      name: "",
      sciName: "",
      file: null,
    });
  };

  const updateAddForm = (field: keyof typeof addFormData, value: any) => {
    setAddFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Edit modal actions
  const openEditModal = (plant: Plant) => {
    setSelectedPlant(plant);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedPlant(null);
  };

  return {
    // Add modal state
    addModalOpen,
    addFormData,

    // Edit modal state
    editModalOpen,
    selectedPlant,

    // Add modal actions
    openAddModal,
    closeAddModal,
    resetAddForm,
    updateAddForm,

    // Edit modal actions
    openEditModal,
    closeEditModal,
  };
}
