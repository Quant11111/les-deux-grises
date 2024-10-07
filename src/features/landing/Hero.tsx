import { LogoSvg } from "@/components/svg/LogoSvg";

export const Hero = () => {
  return (
    <main className="min-w-screen max-w-screen relative  flex min-h-screen max-w-7xl items-center justify-center gap-4 bg-grassGreen px-8 max-lg:flex-col">
      <LogoSvg size={400} color="#E3DDD2" />
    </main>
  );
};
