import { Button } from "@/shared/ui/button";

const CTASection = ({ id }: { id?: string }) => {
  return (
    <section id={id} className="w-full bg-[#F9F7F0]  py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex min-h-104 w-full max-w-7xl flex-col items-center justify-center rounded-[48px] bg-[#1B4633] px-6 py-16 text-center sm:px-10 lg:min-h-72">
        <h2 className="max-w-5xl text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-white">
          Ready to move agriculture forward?
        </h2>

        <p className="mt-8 max-w-3xl text-base leading-relaxed text-[#8FD49D] sm:text-lg md:text-xl">
          Join the network already connecting farms to markets across six
          states.
        </p>

        <div className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Button
            type="button"
            label="Join AgriSync"
            variant="primary"
            size="lg"
            href="/role"
            className="bg-[#D5EAD9] text-[#1B4633] hover:brightness-100"
          />

          <Button
            type="button"
            label="Become a Driver"
            variant="outline"
            size="lg"
            href="/signup?role=driver"
            className="border border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
          />
        </div>
      </div>
    </section>
  );
};

export { CTASection };