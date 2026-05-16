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
    <>
      <Link
        className={`navlink${isActive ? " navlink-active" : ""}`}
        href={`/${locale}/${linkWord}`}
        style={{
          color: isActive
            ? themeVariables.cloudyMist
            : themeVariables.neutralEarth,
        }}
      >
        {text}
      </Link>
      <style jsx>{`
        :global(.navlink) {
          position: relative;
          padding-bottom: 4px;
          letter-spacing: 0.06em;
          transition: color var(--duration-base) var(--ease-out);
        }

        :global(.navlink)::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background-color: ${themeVariables.neutralEarth};
          transform: scaleX(0);
          transform-origin: center;
          transition: transform var(--duration-base) var(--ease-out);
        }

        :global(.navlink:hover) {
          color: ${themeVariables.cloudyMist} !important;
        }

        :global(.navlink:hover)::after {
          transform: scaleX(1);
        }

        :global(.navlink-active)::after {
          background-color: ${themeVariables.cloudyMist};
          transform: scaleX(1);
        }
      `}</style>
    </>
  );
}
