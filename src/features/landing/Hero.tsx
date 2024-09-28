import { CircleSvg } from "@/components/svg/CircleSvg";
import { LogoSvg } from "@/components/svg/LogoSvg";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Typography } from "../../components/ui/typography";
import { ReviewSmall } from "./review/ReviewSmall";

export const Hero = () => {
  return (
    <main className="relative m-auto my-12 flex min-h-[700px] w-full max-w-7xl items-center gap-4 px-8 max-lg:flex-col">
      <div className="relative hidden flex-1 flex-col items-start gap-4 md:flex lg:gap-3 xl:gap-8">
        <Typography variant="h1" className="!leading-tight">
          We breed our horses with{" "}
          <span className="inline-block">
            {" "}
            <span className="relative inline-block  rounded-lg bg-terracotaEarth px-2 text-background">
              <span>love</span>
              <CircleSvg className="fill-red-400" />
            </span>{" "}
            and{" "}
            <span className="relative inline-block rounded-lg bg-corporateBlue px-2 text-background">
              <span>dedication</span>
              <CircleSvg className="fill-coolBlueGrey" />
            </span>
          </span>
        </Typography>
        <Typography variant="large">
          We love horses, our horses are good, rly they are the best wtf. Comme
          and wisit our haras, see how happy they are.
        </Typography>

        <Link
          href="#pricing"
          className={cn(buttonVariants({ size: "lg", variant: "default" }))}
        >
          <Heart size={20} className="mr-2" /> Discover our family !
        </Link>

        <ReviewSmall
          avatars={[
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqkmM_i1HR9AP2Ce5915gUrzqKlutHYXCWEQ&s",
            "https://greenpet.com.au/wp-content/uploads/2016/07/dreamstime_l_24343297-sm-300x300.jpg",
            "https://sohorsesellerie.com/wp-content/uploads/2024/01/657407c60381c-cc48c3684162586def06471403c900e89e398674_DYARAYBR_DYARAY_05_101.jpg-300x300.webp",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqkmM_i1HR9AP2Ce5915gUrzqKlutHYXCWEQ&s",
            "https://greenpet.com.au/wp-content/uploads/2016/07/dreamstime_l_24343297-sm-300x300.jpg",
            "https://sohorsesellerie.com/wp-content/uploads/2024/01/657407c60381c-cc48c3684162586def06471403c900e89e398674_DYARAYBR_DYARAY_05_101.jpg-300x300.webp",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqkmM_i1HR9AP2Ce5915gUrzqKlutHYXCWEQ&s",
            "https://greenpet.com.au/wp-content/uploads/2016/07/dreamstime_l_24343297-sm-300x300.jpg",
            "https://sohorsesellerie.com/wp-content/uploads/2024/01/657407c60381c-cc48c3684162586def06471403c900e89e398674_DYARAYBR_DYARAY_05_101.jpg-300x300.webp",
          ]}
        />
      </div>
      <div className="flex flex-1 justify-end">
        <LogoSvg height={400} className="mt-20 md:mt-10" />
      </div>
    </main>
  );
};
