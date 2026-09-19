"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpDown, Check, MoreHorizontal, Truck, X } from "lucide-react";
import { EmptyState } from "@/shared/ui/empty-state";
import { TablePagination, TablePulse } from "@/widgets/dashboard/ui/table";

export type DriverRequestRow = {
  id: string;
  produce: string;
  quantity: string;
  pickup: string;
  destination: string;
  preferredPickupDate: string;
  preferredPickupAt: string;
  isAccepted: boolean;
  isInTransit: boolean;
  isDelivered: boolean;
};

export type DriverRequestStatus = "New" | "Accepted" | "In Transit" | "Delivered";

type SortKey = "id" | "produce" | "quantity" | "route" | "pickupDate" | "status";
type SortDir = "asc" | "desc";

type TableVariant = "full" | "compact";

type DriverRequestsTableProps = {
  requests: DriverRequestRow[];
  isLoading?: boolean;
  pageSize?: number;
  embedded?: boolean;
  variant?: TableVariant;
  selectedId?: string | null;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (request: DriverRequestRow) => void;
  onAccept?: (request: DriverRequestRow) => void;
  onReject?: (request: DriverRequestRow) => void;
};

const SKELETON_ROWS = 5;
const FULL_GRID = "grid-cols-[0.9fr_1.1fr_0.7fr_1.4fr_1fr_0.8fr_40px]";
const COMPACT_GRID = "grid-cols-[0.9fr_1.4fr_0.8fr_40px]";
const MENU_WIDTH = 128;
const MENU_HEIGHT = 84;

export const shortRequestId = (id: string) => `#${id.slice(-6).toUpperCase()}`;

export const getDriverRequestStatus = (request: DriverRequestRow): DriverRequestStatus => {
  if (request.isDelivered) return "Delivered";
  if (request.isInTransit) return "In Transit";
  if (request.isAccepted) return "Accepted";
  return "New";
};

export const driverStatusStyles: Record<DriverRequestStatus, string> = {
  New: "bg-[#FFF5DF] text-[#C77A09]",
  Accepted: "bg-[#E7F5EC] text-[#2D8A54]",
  "In Transit": "bg-[#E8F0FA] text-[#3B6FA8]",
  Delivered: "bg-[#E7F5EC] text-[#2D8A54]",
};

const mobileBarStyles: Record<DriverRequestStatus, string> = {
  New: "bg-[#E2911F]",
  Accepted: "bg-[#1B5A3B]",
  "In Transit": "bg-[#3B6FA8]",
  Delivered: "bg-[#1B5A3B]",
};

const quantityValue = (quantity: string) => Number.parseFloat(quantity) || 0;

const pickupDateValue = (value: string) => {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

type RequestActionsProps = {
  request: DriverRequestRow;
  onAccept?: (request: DriverRequestRow) => void;
  onReject?: (request: DriverRequestRow) => void;
};

const RequestActions = ({ request, onAccept, onReject }: RequestActionsProps) => {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const canAct = !request.isAccepted && !request.isInTransit && !request.isDelivered;

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;

      const spaceBelow = window.innerHeight - rect.bottom;
      const openUp = spaceBelow < MENU_HEIGHT + 8;

      setMenuPos({
        top: openUp ? rect.top - MENU_HEIGHT - 4 : rect.bottom + 4,
        left: Math.max(8, Math.min(rect.right - MENU_WIDTH, window.innerWidth - MENU_WIDTH - 8)),
      });
    };

    updatePosition();

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    window.addEventListener("resize", updatePosition);
    document.addEventListener("scroll", updatePosition, true);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      window.removeEventListener("resize", updatePosition);
      document.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  if (!canAct) {
    return <span className="inline-block w-7" />;
  }

  return (
    <div
      className="relative shrink-0"
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-label={`Actions for ${shortRequestId(request.id)}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition hover:bg-emerald-50 hover:text-[#1B5A3B]"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open
        ? createPortal(
            <div
              ref={menuRef}
              role="menu"
              style={{ top: menuPos.top, left: menuPos.left }}
              className="fixed z-80 w-32 overflow-hidden rounded-lg border border-black/8 bg-white p-1 shadow-[0_12px_30px_rgba(33,31,26,0.14)]"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onAccept?.(request);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs text-[#1B5A3B] transition hover:bg-emerald-50"
              >
                <Check className="h-3.5 w-3.5" />
                Accept
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onReject?.(request);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs text-red-700 transition hover:bg-red-50"
              >
                <X className="h-3.5 w-3.5" />
                Reject
              </button>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};

type SortHeaderProps = {
  label: string;
  column: SortKey;
  active: SortKey;
  direction: SortDir;
  onSort: (column: SortKey) => void;
};

const SortHeader = ({ label, column, active, direction, onSort }: SortHeaderProps) => (
  <button
    type="button"
    onClick={() => onSort(column)}
    className="inline-flex items-center gap-1 text-left uppercase tracking-[0.08em] transition hover:text-gray-700"
  >
    {label}
    <ArrowUpDown className={`h-3 w-3 ${active === column ? "text-[#1B5A3B]" : "opacity-40"}`} />
    <span className="sr-only">
      {active === column ? (direction === "asc" ? "sorted ascending" : "sorted descending") : "sort"}
    </span>
  </button>
);

const DriverRequestsTable = ({
  requests,
  isLoading = false,
  pageSize = 5,
  embedded = false,
  variant = "full",
  selectedId = null,
  emptyTitle = "No delivery requests",
  emptyDescription = "Open requests for drivers will appear here once they are available.",
  onRowClick,
  onAccept,
  onReject,
}: DriverRequestsTableProps) => {
  const isCompact = variant === "compact";
  const grid = isCompact ? COMPACT_GRID : FULL_GRID;
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>(isCompact ? "id" : "pickupDate");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (column: SortKey) => {
    if (sortKey === column) {
      setSortDir((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(column);
      setSortDir("asc");
    }
    setPage(1);
  };

  const sorted = useMemo(() => {
    const next = [...requests];
    next.sort((left, right) => {
      const statusLeft = getDriverRequestStatus(left);
      const statusRight = getDriverRequestStatus(right);
      let comparison = 0;

      if (sortKey === "id") comparison = left.id.localeCompare(right.id);
      else if (sortKey === "produce") comparison = left.produce.localeCompare(right.produce);
      else if (sortKey === "quantity") comparison = quantityValue(left.quantity) - quantityValue(right.quantity);
      else if (sortKey === "route") {
        comparison = `${left.pickup} ${left.destination}`.localeCompare(`${right.pickup} ${right.destination}`);
      } else if (sortKey === "pickupDate") {
        comparison = pickupDateValue(left.preferredPickupAt) - pickupDateValue(right.preferredPickupAt);
      } else comparison = statusLeft.localeCompare(statusRight);

      return sortDir === "asc" ? comparison : -comparison;
    });
    return next;
  }, [requests, sortDir, sortKey]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const openRow = (request: DriverRequestRow) => onRowClick?.(request);
  const rowTone = (id: string) =>
    selectedId === id ? "bg-emerald-50" : "hover:bg-emerald-50/70";

  return (
    <div
      className={`w-full max-w-full min-w-0 overflow-visible rounded-2xl bg-white ${
        embedded ? "" : "border-0 md:border md:border-black/6"
      }`}
    >
      <div className="hidden md:block">
        <div
          className={`grid ${grid} items-center border-b border-black/6 px-4 py-3 text-[10px] font-medium text-muted-foreground lg:px-5`}
        >
          <SortHeader label="Request ID" column="id" active={sortKey} direction={sortDir} onSort={handleSort} />
          <SortHeader label="Produce" column="produce" active={sortKey} direction={sortDir} onSort={handleSort} />
          {isCompact ? null : (
            <>
              <SortHeader label="Quantity" column="quantity" active={sortKey} direction={sortDir} onSort={handleSort} />
              <SortHeader label="Route" column="route" active={sortKey} direction={sortDir} onSort={handleSort} />
              <SortHeader
                label="Pickup Date"
                column="pickupDate"
                active={sortKey}
                direction={sortDir}
                onSort={handleSort}
              />
            </>
          )}
          <SortHeader label="Status" column="status" active={sortKey} direction={sortDir} onSort={handleSort} />
          <span />
        </div>

        {isLoading
          ? Array.from({ length: SKELETON_ROWS }, (_, index) => (
              <div
                key={`driver-request-skeleton-${index}`}
                className={`grid ${grid} items-center border-b border-black/6 px-4 py-3.5 last:border-0 lg:px-5`}
              >
                <TablePulse className="h-3 w-14" />
                <TablePulse className="h-3 w-20" />
                {isCompact ? null : (
                  <>
                    <TablePulse className="h-3 w-10" />
                    <TablePulse className="h-3 w-28" />
                    <TablePulse className="h-3 w-16" />
                  </>
                )}
                <TablePulse className="h-5 w-14 rounded-md" />
                <TablePulse className="h-7 w-7" />
              </div>
            ))
          : visible.map((request) => {
              const status = getDriverRequestStatus(request);
              return (
                <div
                  key={request.id}
                  role="button"
                  tabIndex={0}
                  aria-current={selectedId === request.id ? "true" : undefined}
                  onClick={() => openRow(request)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openRow(request);
                    }
                  }}
                  className={`grid ${grid} cursor-pointer items-center border-b border-black/6 px-4 py-3.5 text-left last:border-0 lg:px-5 ${rowTone(request.id)}`}
                >
                  <span className="font-mono text-[11px] font-medium text-muted-foreground">
                    {shortRequestId(request.id)}
                  </span>
                  <span className="truncate pr-2 text-xs font-medium text-gray-800">{request.produce}</span>
                  {isCompact ? null : (
                    <>
                      <span className="text-xs text-muted-foreground">{request.quantity}</span>
                      <span className="min-w-0 truncate pr-2 text-xs text-muted-foreground">
                        {request.pickup} → {request.destination}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">{request.preferredPickupDate}</span>
                    </>
                  )}
                  <span>
                    <span className={`inline-flex rounded-md px-2.5 py-1 text-[9px] font-medium ${driverStatusStyles[status]}`}>
                      {status}
                    </span>
                  </span>
                  <RequestActions request={request} onAccept={onAccept} onReject={onReject} />
                </div>
              );
            })}
      </div>

      <div className="space-y-3 md:hidden">
        {isLoading
          ? Array.from({ length: SKELETON_ROWS }, (_, index) => (
              <div
                key={`driver-request-mobile-skeleton-${index}`}
                className="flex w-full items-center gap-3 rounded-xl border border-black/6 bg-white px-4 py-4"
              >
                <TablePulse className="h-9 w-1 rounded-full" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <TablePulse className="h-3 w-14" />
                    <TablePulse className="h-5 w-14 rounded-md" />
                  </div>
                  <TablePulse className="h-3 w-24" />
                  {isCompact ? null : <TablePulse className="h-3 w-36" />}
                </div>
              </div>
            ))
          : visible.map((request) => {
              const status = getDriverRequestStatus(request);
              return (
                <div
                  key={request.id}
                  role="button"
                  tabIndex={0}
                  aria-current={selectedId === request.id ? "true" : undefined}
                  onClick={() => openRow(request)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openRow(request);
                    }
                  }}
                  className={`flex w-full max-w-full min-w-0 cursor-pointer items-center gap-3 rounded-xl border border-black/6 bg-white px-4 py-4 text-left shadow-sm transition ${rowTone(request.id)}`}
                >
                  <div className={`h-9 w-1 shrink-0 rounded-full ${mobileBarStyles[status]}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-mono text-[10px] font-semibold text-muted-foreground">
                        {shortRequestId(request.id)}
                      </span>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <span className={`rounded-md px-2 py-1 text-[9px] font-medium ${driverStatusStyles[status]}`}>
                          {status}
                        </span>
                        <RequestActions request={request} onAccept={onAccept} onReject={onReject} />
                      </div>
                    </div>
                    <p className="mt-1.5 truncate text-xs font-semibold text-[#1B5A3B]">{request.produce}</p>
                    {isCompact ? null : (
                      <>
                        <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                          <span>{request.quantity}</span>
                          <span className="px-1.5 text-muted-foreground/50">·</span>
                          <span>
                            {request.pickup} → {request.destination}
                          </span>
                        </p>
                        <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">
                          {request.preferredPickupDate}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
      </div>

      {!isLoading && requests.length === 0 ? (
        <EmptyState icon={Truck} title={emptyTitle} description={emptyDescription} className="min-h-45 px-5 py-10" />
      ) : null}

      {!isLoading && requests.length > 0 ? (
        <TablePagination
          page={currentPage}
          pageSize={pageSize}
          totalItems={sorted.length}
          itemLabel="requests"
          onPageChange={(next) => setPage(Math.max(1, Math.min(next, totalPages)))}
        />
      ) : null}
    </div>
  );
};

export { DriverRequestsTable };
