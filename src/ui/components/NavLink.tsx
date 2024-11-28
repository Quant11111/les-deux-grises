import themeVariables from "@/utils/themeVariables";
import Link from "next/link";

export default function NavLink({
  text,
  linkWord,
  locale,
  isActive,
}: {
  text: string;
  linkWord: string;
  locale: string;
  isActive: boolean;
}) {
  return (
    <Link
      className="aboutlink"
      href={`/${locale}/${linkWord}`}
      style={{
        paddingBottom: "0.5rem",
        color: isActive
          ? themeVariables.cloudyMist
          : themeVariables.neutralEarth,
        borderBottom: isActive
          ? `0.1rem solid ${themeVariables.cloudyMist}`
          : "none",
      }}
    >
      {text}
    </Link>
  );
}
