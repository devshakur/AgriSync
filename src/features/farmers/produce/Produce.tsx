"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { StatCardsCarousel } from "@/widgets/dashboard/ui/statcard/StatCardCarousel";
import { ProduceTable } from "@/widgets/dashboard/ui/table";
import { ProduceModal } from "@/widgets/dashboard";
import type { ProduceCardProps } from "@/widgets/dashboard/ui/producecard/ProduceCard";
import { farmerProduce, produceStats } from "@/features/farmers/constant";
import { ProduceFilter } from "@/widgets/produce/produce-filter";

const Produce = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("recent");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduce, setEditingProduce] = useState<ProduceCardProps | undefined>();

  const filteredProduce = farmerProduce
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesStatus = status === "all" || product.status === status;

      return matchesSearch && matchesStatus;
    })
    .sort((first, second) => {
      if (sort === "name") return first.name.localeCompare(second.name);
      if (sort === "status") return first.status.localeCompare(second.status);
      return 0;
    });

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-primary">My Produce</h3>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              aria-label="List new produce"
              title="List new produce"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
          <h6 className="text-muted-foreground">Manage all your farm listings</h6>
        </div>
      </div>

      <StatCardsCarousel cards={produceStats} interval={3500} />

      <ProduceFilter
        search={search}
        status={status}
        sort={sort}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onSortChange={setSort}
      />

      <div className="mt-8">
        <h3 className="mb-4 font-heading text-lg font-semibold tracking-tight text-muted-foreground">
          Your Listings
        </h3>
        <ProduceTable
          produce={filteredProduce}
          onEdit={setEditingProduce}
        />
      </div>

      <ProduceModal
        key={isCreateModalOpen ? "create-open" : "create-closed"}
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <ProduceModal
        key={editingProduce?.id ?? "edit-closed"}
        open={Boolean(editingProduce)}
        produce={editingProduce}
        onClose={() => setEditingProduce(undefined)}
      />
    </div>
  );
};

export { Produce };