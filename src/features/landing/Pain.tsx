"use client";

import { Typography } from "@/components/ui/typography";
import { SectionLayout } from "./SectionLayout";

export const PainSection = () => {
  return (
    <SectionLayout
      variant="default"
      size="base"
      className="flex flex-col items-center justify-center gap-4"
    >
      <div className="flex w-full flex-col items-center gap-3 lg:gap-4 xl:gap-6">
        <Typography variant="h1">Our Horses, Our Family!</Typography>
        <Typography variant="large">Why is love so important ?</Typography>
        <div className="flex items-start gap-4 max-lg:flex-col">
          <div className="flex-1 rounded-lg bg-red-500/20 p-4 lg:p-6">
            <Typography variant="h3" className="text-red-500">
              😞 Breed with knowledge
            </Typography>
            <ul className="ml-4 mt-4 flex list-disc flex-col gap-2 text-lg text-foreground/80">
              <li>I guess they eat well</li>
              <li>Low willpower during growth</li>
              <li>Less confidence</li>
              <li>More tempered</li>
            </ul>
          </div>
          <div className="flex-1 rounded-lg bg-green-500/20 p-4 lg:p-6">
            <Typography variant="h3" className="text-green-500">
              😎 Knowledge, love, dedication
            </Typography>
            <ul className="ml-4 mt-4 flex list-disc flex-col gap-2 text-lg text-foreground/80">
              <li>Horse used to connect with humans</li>
              <li>Trust and vitality enhanced</li>
              <li>More resistant to common deseases</li>
              <li>They still eat well !</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
