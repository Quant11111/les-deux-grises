import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { PropsWithChildren } from "react";

export type ReviewSmallProps = PropsWithChildren<{
  /**
   * An array of URLs to users avatar.
   */
  avatars: string[];
}>;

export const ReviewSmall = (props: ReviewSmallProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center">
        {props.avatars.map((avatar) => (
          <Avatar
            key={avatar}
            className="-mr-4 size-12 border-4 border-background last:mr-0"
          >
            <AvatarFallback>A</AvatarFallback>
            <AvatarImage src={avatar} alt="avatar" />
          </Avatar>
        ))}
      </div>
    </div>
  );
};
