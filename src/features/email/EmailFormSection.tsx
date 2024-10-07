import { Typography } from "@/components/ui/typography";
import { SectionLayout } from "../landing/SectionLayout";
import { EmailForm } from "./EmailForm";

export const EmailFormSection = () => {
  return (
    <SectionLayout
      size="lg"
      className="relative flex w-full flex-col items-center gap-16"
    >
      <div className="relative m-auto flex max-w-xl flex-col gap-4 text-center">
        <Typography
          variant="small"
          className="font-extrabold uppercase text-primary"
        >
          Be the first to know
        </Typography>
        <Typography variant="h2" className="text-center text-4xl lg:text-5xl">
          Get news from our facility{" "}
          <span className="text-gradient bg-gradient-to-r from-orange-600 via-red-400 to-yellow-400 font-mono font-extrabold uppercase">
            LES DEUX GRISES
          </span>
        </Typography>
        <Typography variant="h3">
          We love to share how we treat our family members to grow them
          properly.
        </Typography>
        <div className="mx-auto mt-6 w-full max-w-md">
          <EmailForm
            submitButtonLabel="Join"
            successMessage="Thank you for joining the waiting list"
          />
        </div>
      </div>
    </SectionLayout>
  );
};
