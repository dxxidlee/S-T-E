import { useClock } from "../hooks/useClock";

const links = [
  { key: "all", label: "All Films" },
  { key: "hollywood", label: "USA" },
  { key: "soviet", label: "USSR" },
  { key: "about", label: "About" },
];

const Nav = ({ activeSide, isAboutOpen, onNavSelect }) => {
  const clock = useClock();
  const logoLetters = ["S", "T", "E"];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-start justify-between px-2 pt-3 sm:px-5">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex min-h-8 items-center gap-1 overflow-hidden border border-black bg-white px-1 shadow-[0_4px_14px_rgba(0,0,0,0.12)]">
          {logoLetters.map((letter) => (
            <span
              key={letter}
              className="flex min-h-[26px] w-[26px] items-center justify-center border border-black bg-black text-[12px] font-medium leading-none text-white"
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="hidden min-h-8 items-center border border-black bg-white px-3 text-[10px] font-medium tracking-[0.04em] shadow-[0_4px_14px_rgba(0,0,0,0.12)] md:flex">
          {clock}
        </div>
      </div>
      <div className="ml-2 flex max-w-[calc(100vw-100px)] min-h-8 items-center gap-1 overflow-x-auto border border-black bg-white px-1 shadow-[0_4px_14px_rgba(0,0,0,0.12)] sm:ml-3 sm:max-w-none sm:gap-2.5">
        {links.map((link) => {
          const isActive = link.key === "about" ? isAboutOpen : activeSide === link.key;
          return (
            <button
              key={link.key}
              type="button"
              onClick={() => onNavSelect(link.key)}
              className={`ix-control-button min-h-[26px] shrink-0 whitespace-nowrap px-2.5 text-[9.5px] font-medium tracking-[0.04em] sm:px-4 sm:text-[10px] ${
                isActive ? "active" : ""
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
