import { InfoCard } from "../info-card";

const TransportationCard = () => {
  return (
    <InfoCard
      title="Transportation"
      description="Moving harvested produce from farms to storage, homes, or markets is expensive and unreliable. Poor rural roads push up costs, and farmers are often at the mercy of individual riders charging whatever the trip demands."
      
      icon={
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="6" cy="17" r="3" />
          <circle cx="18" cy="17" r="3" />
          <path d="M6 17h4l3-6h4l2 3" />
          <path d="M13 11l2-3h3" />
        </svg>
        
      }
    />
  );
}

export {TransportationCard};