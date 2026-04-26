import { useEffect, useState } from "react";

const FilmListView = ({ films, onOpen }) => {
  const [selectedFilmId, setSelectedFilmId] = useState(films[0]?.id ?? null);

  useEffect(() => {
    if (!films.length) {
      setSelectedFilmId(null);
      return;
    }

    const stillExists = films.some((film) => film.id === selectedFilmId);
    if (!stillExists) {
      setSelectedFilmId(films[0].id);
    }
  }, [films, selectedFilmId]);

  if (!films.length) {
    return (
      <section className="px-4 py-8 text-sm text-black/60 sm:px-5">
        No films available for this filter.
      </section>
    );
  }

  return (
    <section className="px-4 py-3 sm:px-5">
      <div className="overflow-hidden border border-black bg-white md:hidden">
        <div className="max-h-[calc(100vh-180px)] overflow-y-auto bg-white">
          {films.map((film) => {
            const isSelected = film.id === selectedFilmId;
            const sideLabel = film.side === "hollywood" ? "USA" : "USSR";
            return (
              <button
                key={film.id}
                type="button"
                onClick={() => {
                  setSelectedFilmId(film.id);
                  onOpen(film);
                }}
                className={`w-full border-b border-black px-3 py-2.5 text-left transition last:border-b-0 ${
                  isSelected ? "bg-black text-white" : "hover:bg-black/[0.035]"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="truncate text-[12px] font-medium">{film.title}</div>
                  <div className="shrink-0 text-[10px] font-medium">{film.duration}</div>
                </div>
                <div className="mt-1 flex items-center gap-2 text-[9px] uppercase tracking-[0.08em] opacity-80">
                  <span>{film.year}</span>
                  <span>•</span>
                  <span>{film.director}</span>
                  <span>•</span>
                  <span>{sideLabel}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="hidden overflow-hidden border border-black bg-white md:block">
        <div className="grid grid-cols-[74px,1.3fr,1fr,100px,90px] border-b border-black text-[9px] font-medium uppercase tracking-[0.1em]">
          <div className="px-3 py-1.5">Year</div>
          <div className="px-3 py-1.5">Title</div>
          <div className="px-3 py-1.5">Director</div>
          <div className="px-3 py-1.5">Side</div>
          <div className="px-3 py-1.5 text-right">Duration</div>
        </div>

        <div className="max-h-[calc(100vh-180px)] overflow-y-auto bg-white">
          {films.map((film) => {
            const isSelected = film.id === selectedFilmId;
            const sideLabel = film.side === "hollywood" ? "USA" : "USSR";
            return (
              <button
                key={film.id}
                type="button"
                onClick={() => {
                  setSelectedFilmId(film.id);
                  onOpen(film);
                }}
                className={`grid w-full grid-cols-[74px,1.3fr,1fr,100px,90px] border-b border-black text-left text-[10.5px] leading-[1.35] tracking-[0.01em] transition last:border-b-0 ${
                  isSelected ? "bg-black text-white" : "hover:bg-black/[0.035]"
                }`}
              >
                <div className="px-3 py-2.5">{film.year}</div>
                <div className="truncate px-3 py-2.5 font-medium">{film.title}</div>
                <div className="truncate px-3 py-2.5">{film.director}</div>
                <div className="px-3 py-2.5">{sideLabel}</div>
                <div className="px-3 py-2.5 text-right font-medium">{film.duration}</div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FilmListView;
