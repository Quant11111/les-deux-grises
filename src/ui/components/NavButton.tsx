import themeVariables from "@/utils/themeVariables";

export default function NavButton({
  text,
  onClick,
  isActive,
}: {
  text: string;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <>
      <button
        className="navbutton"
        style={{
          background: "transparent",
          color: isActive
            ? themeVariables.cloudyMist
            : themeVariables.neutralEarth,
          border: "none",
        }}
        onClick={() => onClick()}
      >
        {text}
      </button>
      <style jsx>{`
        .navbutton {
          cursor: pointer;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
}
