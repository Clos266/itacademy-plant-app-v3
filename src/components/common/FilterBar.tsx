import { Input } from "@/components/ui/input";

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  toggleValue: boolean;
  onToggleChange: (value: boolean) => void;
  toggleLabels: { on: string; off: string };
  placeholder?: string;
}

export function FilterBar({
  searchValue,
  onSearchChange,
  toggleValue,
  onToggleChange,
  toggleLabels,
  placeholder = "search...",
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-muted/30 rounded-xl shadow-sm border border-border">
      <Input
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full sm:w-1/2"
      />

      <div className="flex items-center gap-2">
        <label
          htmlFor="filter-toggle"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {toggleValue ? toggleLabels.on : toggleLabels.off}
        </label>
        <button
          type="button"
          role="switch"
          aria-checked={toggleValue}
          onClick={() => onToggleChange(!toggleValue)}
          className={`peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
            toggleValue ? "bg-primary" : "bg-input"
          }`}
        >
          <span
            className={`pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform ${
              toggleValue ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
