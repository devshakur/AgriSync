interface ExtraInfoProps {
heading: string;
description: string;
info?: string;
}

const ExtraInfo = ({ heading, description, info }: ExtraInfoProps) => {
  return (
        <section className="w-full bg-[#F9F7F0]">
  <div className="mx-auto max-w-5xl px-6 text-center">
    <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent ">
     {heading}
    </p>

    {/* Heading */}
    <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-semibold leading-[1.1] tracking-[-0.04em] text-[#073B32] ">
      {description}
    </h2>

    {/* Description */}
    <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-[#4B514F] ">
      {info}
    </p>
  </div>
</section>
  
  )
}

export { ExtraInfo };