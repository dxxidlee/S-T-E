const PhaseHeader = ({ index, title, range }) => {
  return (
    <>
      <div className="col-span-full flex items-baseline gap-4 border-b border-black/15 bg-black/5 px-4 py-4 sm:gap-5 sm:px-5">
        <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--text-light)]">
          Phase {index + 1}
        </span>
        <span className="text-[10px] tracking-[0.1em]">{title}</span>
        <span className="text-[9px] text-[var(--text-light)]">{range}</span>
      </div>
      <div className="col-span-full hidden grid-cols-2 border-b border-black/15 bg-black/5 md:grid">
        <div className="border-r border-black/15 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-[var(--text-light)] sm:px-5">
          Hollywood / USA
        </div>
        <div className="px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-[var(--text-light)] sm:px-5">
          Soviet Union / USSR
        </div>
      </div>
    </>
  );
};

export default PhaseHeader;
