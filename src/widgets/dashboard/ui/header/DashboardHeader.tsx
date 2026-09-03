import { Bell, Plus, Search, TextAlignEnd } from "lucide-react";

interface DashboardHeaderProps {
  name: string;
  subtitle?: string;
  notificationCount?: number;
  onMenuOpen?: () => void;
  onListProduce?: () => void;
}

const DashboardHeader = ({
  name,
  subtitle = "Here's what's happening on your farm today.",
  notificationCount = 0,
  onMenuOpen,
  onListProduce,
}: DashboardHeaderProps) => {
  return (
    <header className="flex w-full flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-7">
      {/* Greeting */}
      <div className="flex w-full min-w-0 items-center justify-between gap-3 lg:w-auto">
        <div className="w-full min-w-0 lg:w-auto">
          <div className="flex w-full items-center justify-between gap-3">
            <h1 className="text-lg font-semibold tracking-tight text-gray-800 md:text-xl">
              Welcome, {name}.
            </h1>

            <div className="flex shrink-0 items-center gap-1 lg:hidden">
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
              >
                <Bell size={22} strokeWidth={1.8} className="text-gray-900" />

                {notificationCount > 0 && (
                  <span className="absolute right-0.5 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={onMenuOpen}
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center text-gray-800"
              >
                <TextAlignEnd className="h-5 w-5" />
              </button>
            </div>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Mobile search */}
      <div className="relative w-full md:w-69 md:self-end lg:hidden">
        <Search
          size={20}
          strokeWidth={2}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-900"
        />

        <input
          type="search"
          placeholder="Search anything..."
          className="h-11 w-full rounded-xl border-gray-200 bg-background pl-4 pr-12 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400"
        />
      </div>

      {/* Right side */}
      <div className="hidden w-full items-center justify-end gap-3 lg:flex lg:w-auto lg:gap-8">
        {/* Search */}
        <div className="relative hidden w-69 md:block">
          <Search
            size={20}
            strokeWidth={2}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-900"
          />

          <input
            type="search"
            placeholder="Search anything..."
            className="h-11 w-full rounded-xl border-gray-200 bg-background pl-4 pr-12 text-sm text-gray-900 shadow-md outline-none transition placeholder:text-gray-400 focus:border-gray-400"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative hidden h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-gray-100 lg:flex"
        >
          <Bell size={22} strokeWidth={1.8} className="text-gray-900" />

          {notificationCount > 0 && (
            <span className="absolute right-0.5 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        {/* List Produce */}
        <button
          type="button"
          onClick={onListProduce}
          className="hidden h-11 items-center gap-2 rounded-xl bg-green-800 px-5 text-sm font-medium text-white transition hover:bg-green-900 lg:flex"
        >
          <Plus size={19} strokeWidth={2} />
          <span>List Produce</span>
        </button>
      </div>
    </header>
  );
}

export {DashboardHeader};