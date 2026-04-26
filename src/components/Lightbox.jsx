import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const Lightbox = ({
  film,
  onClose,
  onNext,
  onPrev,
}) => {
  const [metaOpen, setMetaOpen] = useState(false);
  const logoLetters = ["S", "T", "E"];

  useEffect(() => {
    setMetaOpen(false);
  }, [film?.id]);

  const embedSrc = useMemo(() => {
    if (!film) return "";
    if (film.availability === "youtube") {
      return `${film.embedUrl}?autoplay=1&mute=1&rel=0`;
    }
    if (film.availability === "embed") {
      const separator = film.embedUrl.includes("?") ? "&" : "?";
      return `${film.embedUrl}${separator}autoplay=1&muted=1`;
    }
    return `${film.embedUrl}?autoplay=1&muted=1`;
  }, [film]);

  useEffect(() => {
    if (!film) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [film, onClose, onNext, onPrev]);

  if (!film) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex h-dvh flex-col bg-white text-black"
      >
        <div className="fixed inset-x-0 top-0 z-10 flex items-start justify-between px-2 pt-3 sm:px-5">
          <div className="flex items-start gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-8 items-center gap-1 overflow-hidden border border-black bg-white px-1 shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
              aria-label="Back to home"
            >
              {logoLetters.map((letter) => (
                <span
                  key={letter}
                  className="flex min-h-[26px] w-[26px] items-center justify-center border border-black bg-black text-[12px] font-medium leading-none text-white"
                >
                  {letter}
                </span>
              ))}
            </button>
            <div className="hidden min-h-8 items-center border border-black bg-white px-3 text-[10px] font-medium tracking-[0.04em] shadow-[0_4px_14px_rgba(0,0,0,0.12)] md:flex">
              {film.title} ({film.year})
            </div>
          </div>
          <div className="ml-2 flex min-h-8 items-center gap-1 overflow-hidden border border-black bg-white px-1 shadow-[0_4px_14px_rgba(0,0,0,0.12)] sm:ml-3 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setMetaOpen((open) => !open)}
              className={`ix-control-button min-h-[26px] whitespace-nowrap px-2.5 text-[9.5px] font-medium tracking-[0.04em] sm:px-4 sm:text-[10px] ${
                metaOpen ? "active" : ""
              }`}
            >
              <span className="sm:hidden">Info</span>
              <span className="hidden sm:inline">Information & Credits</span>
            </button>
          </div>
        </div>

        <div
          className="relative flex flex-1 items-center justify-center px-2 pb-14 pt-14 sm:px-6"
          onClick={onClose}
        >
          <div className="relative z-[1] w-full max-w-6xl border border-black bg-white p-3 sm:p-5">
            <div className="border border-black bg-black p-2 sm:p-3" onClick={(event) => event.stopPropagation()}>
              <iframe
                title={film.title}
                src={embedSrc}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="aspect-video w-full border-none bg-black"
              />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {metaOpen && (
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-2 bottom-14 top-14 z-20 overflow-hidden border border-black bg-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] sm:inset-x-auto sm:right-5 sm:w-[min(92vw,372px)]"
            >
              <div className="border-b border-black px-4 py-2.5">
                <h3 className="text-[11px] font-medium tracking-[0.04em]">
                  Information & Credits
                </h3>
              </div>
              <div className="max-h-full overflow-y-auto px-4 py-3">
                <MetaRow label="Title" value={film.title} />
                <MetaRow label="Year" value={String(film.year)} />
                <MetaRow label="Country / Studio" value={`${film.country} / ${film.studio}`} />
                <MetaRow label="Director" value={film.director} />
                <MetaRow label="Curatorial Note" value={film.note} />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <div className="fixed bottom-3 left-2 z-20 text-[10px] tracking-[0.04em] sm:left-5">
          <div className="flex min-h-8 items-center gap-1 overflow-hidden border border-black bg-white px-1 shadow-[0_4px_14px_rgba(0,0,0,0.12)] sm:gap-2.5">
            <button type="button" onClick={onClose} className="ix-control-button min-h-[26px] px-2 font-medium">
              Back
            </button>
            <button type="button" onClick={onPrev} className="ix-control-button min-h-[26px] px-2 font-medium">
              Prev
            </button>
            <button type="button" onClick={onNext} className="ix-control-button min-h-[26px] px-2 font-medium">
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const MetaRow = ({ label, value }) => {
  return (
    <div className="border-b border-black py-2.5 last:border-b-0">
      <div className="mb-1 text-[8.5px] uppercase tracking-[0.1em] text-black/70">{label}</div>
      <div className="text-[10.5px] leading-[1.45] tracking-[0.01em] text-black">{value}</div>
    </div>
  );
};

export default Lightbox;
