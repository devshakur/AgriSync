const RouteHero = () => {
  return (
    <div className="w-full max-w-6xl px-4">
      <svg
        viewBox="0 0 700 200"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Animated route from farmer to driver to buyer"
      >
        <defs>
          <filter id="route-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M80 95 C175 30 225 155 350 95 S525 30 620 95"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="10 10"
          className="text-accent/25"
        />

        <path
          d="M80 95 C175 30 225 155 350 95 S525 30 620 95"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="14 18"
          className="animate-[dash_3s_linear_infinite] text-accent"
        />

        <circle
          r="7"
          fill="currentColor"
          filter="url(#route-glow)"
          className="text-accent"
        >
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            rotate="auto"
            path="M80 95 C175 30 225 155 350 95 S525 30 620 95"
          />
        </circle>

        <g transform="translate(80,95)">
          <circle r="60" className="fill-white stroke-accent stroke-2" />
          <circle r="56" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse text-accent/20" />

          <g transform="translate(-14,-14)" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
            <path d="M2 26c10-1 16-8 18-18-10 1-16 8-18 18Z" />
            <path d="M5 22c4-4 8-8 13-15" />
          </g>
        </g>

        <g transform="translate(350,95)">
          <circle r="60" className="fill-white stroke-accent stroke-2" />
          <circle r="56" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse text-accent/20" />

          <g transform="translate(-14,-14)" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
            <circle cx="7" cy="21" r="4" />
            <circle cx="23" cy="21" r="4" />
            <path d="M7 21h5l4-8h5l3 4" />
            <path d="M16 13l3-4h4" />
          </g>
        </g>

        <g transform="translate(620,95)">
          <circle r="60" className="fill-white stroke-accent stroke-2" />
          <circle r="56" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse text-accent/20" />

          <g transform="translate(-14,-14)" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
            <path d="M4 12h24l-2 13a3 3 0 0 1-3 2H9a3 3 0 0 1-3-2L4 12Z" />
            <path d="M10 12l3-8h6l3 8" />
          </g>
        </g>

        <text x="80" y="165" textAnchor="middle" className="fill-accent text-[15px] font-bold font-heading">
          Farmer
        </text>
        <text x="80" y="182" textAnchor="middle" className="fill-muted-foreground text-[11px]">
          Produce
        </text>

        <text x="350" y="165" textAnchor="middle" className="fill-accent text-[15px] font-bold font-heading">
          Driver
        </text>
        <text x="350" y="182" textAnchor="middle" className="fill-muted-foreground text-[11px]">
          Delivery
        </text>

        <text x="620" y="165" textAnchor="middle" className="fill-accent text-[15px] font-bold font-heading">
          Buyer
        </text>
        <text x="620" y="182" textAnchor="middle" className="fill-muted-foreground text-[11px]">
          Destination
        </text>
      </svg>
    </div>
  );
};

export { RouteHero };