import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFilters } from "../useFilters";

describe("useFilters Hook", () => {
  it("should initialize with default values", () => {
    // Act
    const { result } = renderHook(() => useFilters());

    // Assert
    expect(result.current.search).toBe("");
    expect(result.current.showAvailable).toBe(true);
  });

  it("should update search value", () => {
    // Arrange
    const { result } = renderHook(() => useFilters());

    // Act
    act(() => {
      result.current.setSearch("test search");
    });

    // Assert
    expect(result.current.search).toBe("test search");
  });

  it("should update showAvailable value", () => {
    // Arrange
    const { result } = renderHook(() => useFilters());

    // Act
    act(() => {
      result.current.setShowAvailable(false);
    });

    // Assert
    expect(result.current.showAvailable).toBe(false);
  });
});
