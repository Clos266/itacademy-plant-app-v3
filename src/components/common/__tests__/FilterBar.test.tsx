import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterBar } from "../FilterBar";

describe("FilterBar Component", () => {
  const defaultProps = {
    searchValue: "",
    onSearchChange: vi.fn(),
    toggleValue: true,
    onToggleChange: vi.fn(),
    toggleLabels: { on: "Available", off: "All" },
    placeholder: "Search...",
  };

  it("should render with default props", () => {
    // Act
    render(<FilterBar {...defaultProps} />);

    // Assert
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("should call onSearchChange when typing", () => {
    // Arrange
    const mockOnSearchChange = vi.fn();
    render(<FilterBar {...defaultProps} onSearchChange={mockOnSearchChange} />);

    // Act
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "test search" } });

    // Assert
    expect(mockOnSearchChange).toHaveBeenCalledWith("test search");
  });

  it("should call onToggleChange when clicked", () => {
    // Arrange
    const mockOnToggleChange = vi.fn();
    render(<FilterBar {...defaultProps} onToggleChange={mockOnToggleChange} />);

    // Act
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);

    // Assert
    expect(mockOnToggleChange).toHaveBeenCalledWith(false);
  });

  it("should display correct toggle text based on value", () => {
    // Test "on" state
    const { rerender } = render(
      <FilterBar {...defaultProps} toggleValue={true} />
    );
    expect(screen.getByText("Available")).toBeInTheDocument();

    // Test "off" state
    rerender(<FilterBar {...defaultProps} toggleValue={false} />);
    expect(screen.getByText("All")).toBeInTheDocument();
  });
});
