import { Header } from "@/component/shared/header";
import { EyeBrow } from "@/component/ui/eyebrow";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col gap-4 font-heading">
      <Header />
      <div className="mx-auto pt-13 pb-2.5 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <EyeBrow>
          Nigerian Agri-Logistics · Abuja · Kano · Kaduna · Nasarawa · Niger ·
          Plateau
        </EyeBrow>
        <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl  text-center text-green-950 font-bold leading-[1.1] sm:text-5xl md:text-6xl">
          From Farm to Market,
        
          <span className="block text-secondary">Made Simple.</span>
        </h1>
        <div>
        <Image src={"/assests/images/Agrisync-truck.png"} width={500} height={200} alt="deleivery-truck" />
        </div>
        </div>
        <h4 className="max-w-175  text-center text-lg text-muted-foreground sm:text-xl">
          AgriLink connects farmers, drivers, and buyers to move fresh produce faster, sell directly, and earn more
        </h4>
      </div>
    </div>
  );
}
