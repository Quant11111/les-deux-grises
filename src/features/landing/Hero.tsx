import { LogoSvg } from "@/components/svg/LogoSvg";

export const Hero = () => {
  return (
    <main className="relative flex  min-h-screen w-full items-center justify-center gap-4 bg-grassGreen px-8 ">
      <LogoSvg size={400} color="#E3DDD2" />
    </main>
  );
};
