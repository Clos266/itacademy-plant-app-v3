import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useModals } from "../useModals";

describe("useModals Hook", () => {
  it("should have all required properties", () => {
    const { result } = renderHook(() => useModals());

    // State properties
    expect(result.current).toHaveProperty("addModalOpen");
    expect(result.current).toHaveProperty("addFormData");
    expect(result.current).toHaveProperty("editModalOpen");
    expect(result.current).toHaveProperty("selectedPlant");

    // Action properties
    expect(result.current).toHaveProperty("openAddModal");
    expect(result.current).toHaveProperty("closeAddModal");
    expect(result.current).toHaveProperty("resetAddForm");
    expect(result.current).toHaveProperty("updateAddForm");
    expect(result.current).toHaveProperty("openEditModal");
    expect(result.current).toHaveProperty("closeEditModal");
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useModals());

    expect(result.current.addModalOpen).toBe(false);
    expect(result.current.editModalOpen).toBe(false);
    expect(result.current.selectedPlant).toBe(null);
    expect(result.current.addFormData).toEqual({
      name: "",
      sciName: "",
      file: null,
    });
  });

  it("should have function types for all actions", () => {
    const { result } = renderHook(() => useModals());

    expect(typeof result.current.openAddModal).toBe("function");
    expect(typeof result.current.closeAddModal).toBe("function");
    expect(typeof result.current.resetAddForm).toBe("function");
    expect(typeof result.current.updateAddForm).toBe("function");
    expect(typeof result.current.openEditModal).toBe("function");
    expect(typeof result.current.closeEditModal).toBe("function");
  });

  it("should toggle add modal state", () => {
    const { result } = renderHook(() => useModals());

    act(() => {
      result.current.openAddModal();
    });

    expect(result.current.addModalOpen).toBe(true);

    act(() => {
      result.current.closeAddModal();
    });

    expect(result.current.addModalOpen).toBe(false);
  });

  it("should handle edit modal with plant selection", () => {
    const { result } = renderHook(() => useModals());

    const mockPlant = {
      id: "1",
      name: "Test Plant",
      scientific_name: "Testus plantus",
      user_id: "user-1",
      is_available: true,
      created_at: "2024-01-01T00:00:00.000Z",
    };

    act(() => {
      result.current.openEditModal(mockPlant);
    });

    expect(result.current.editModalOpen).toBe(true);
    expect(result.current.selectedPlant).toEqual(mockPlant);

    act(() => {
      result.current.closeEditModal();
    });

    expect(result.current.editModalOpen).toBe(false);
    expect(result.current.selectedPlant).toBe(null);
  });

  it("should update form data correctly", () => {
    const { result } = renderHook(() => useModals());

    act(() => {
      result.current.updateAddForm("name", "New Plant");
    });

    expect(result.current.addFormData.name).toBe("New Plant");

    act(() => {
      result.current.updateAddForm("sciName", "Newus plantus");
    });

    expect(result.current.addFormData.sciName).toBe("Newus plantus");
  });
});
