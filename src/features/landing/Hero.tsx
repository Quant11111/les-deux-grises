import { LogoSvg } from "@/components/svg/LogoSvg";

export const Hero = () => {
  return (
    <main className="max-w-screen relative m-auto my-12 flex min-h-screen max-w-7xl items-center justify-center gap-4 bg-grassGreen px-8 max-lg:flex-col">
      <LogoSvg size={400} color="#E3DDD2" />
    </main>
  );
};
