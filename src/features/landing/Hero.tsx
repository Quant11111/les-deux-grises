import { LogoSvg } from "@/components/svg/LogoSvg";

export const Hero = () => {
  return (
    <main className="relative m-auto my-12 flex min-h-screen w-full max-w-7xl items-center justify-center gap-4 bg-grassGreen px-8 max-lg:flex-col">
      <LogoSvg height={400} color="#E3DDD2" />
    </main>
  );
};
