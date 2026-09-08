"use client";

import { Search } from "lucide-react";
import { DropdownSelect } from "@/features/auth/shared/dropdown-select";
import { AnimatedSearchPlaceholder } from "@/shared/ui";

type ProduceFilterProps = {
  search: string;
  status: string;
  sort: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

const filterTriggerClassName =
  "h-10 rounded-lg border border-black/[0.08] bg-background px-3 py-2 text-xs shadow-sm";

const ProduceFilter = ({
  search,
  status,
  sort,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: ProduceFilterProps) => {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-[minmax(0,1.6fr)_minmax(150px,1fr)_minmax(170px,1fr)]">
      <label className="relative col-span-2 block sm:col-span-1">
        <span className="sr-only">Search produce</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
          strokeWidth={1.8}
        />
        {!search && (
          <AnimatedSearchPlaceholder
            value={search}
            phrases={["Search for farm produce...", "Search by crop or listing..."]}
            className="left-9 right-3 text-muted-foreground/80"
          />
        )}
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder=""
          aria-label="Search produce"
          className="relative z-10 h-10 w-full rounded-lg border border-black/8 bg-transparent px-3 pl-9 text-xs text-muted-foreground shadow-sm outline-none transition placeholder:text-muted-foreground/80 focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
        />
      </label>

      <DropdownSelect
        label="Filter by status"
        value={status}
        options={[
          { label: "All Status", value: "all" },
          { label: "Available", value: "Available" },
          { label: "Low Stock", value: "Low Stock" },
          { label: "Sold Out", value: "Sold Out" },
        ]}
        onChange={(event) => onStatusChange(event.target.value)}
        triggerClassName={filterTriggerClassName}
        menuClassName="bg-background"
      />

      <DropdownSelect
        label="Sort produce"
        value={sort}
        options={[
          { label: "Sort by: Recently Added", value: "recent" },
          { label: "Sort by: Name", value: "name" },
          { label: "Sort by: Status", value: "status" },
        ]}
        onChange={(event) => onSortChange(event.target.value)}
        triggerClassName={filterTriggerClassName}
        menuClassName="bg-background"
      />
    </div>
  );
};

export { ProduceFilter };
