const FilmCard = ({ film, onOpen, gridColumns = 2, displayIndex }) => {
  const tagByTitle = {
    "The Iron Curtain": { country: "USA", genre: "Spy Thriller" },
    "The Russian Question": { country: "USSR", genre: "Political Drama" },
    "The Red Menace": { country: "USA", genre: "Propaganda Feature" },
    "Meeting on the Elbe": { country: "USSR", genre: "Political Drama" },
    "I Was a Communist for the FBI": { country: "USA", genre: "Docudrama" },
    "Walk East on Beacon": { country: "USA", genre: "Spy Thriller" },
    "My Son John": { country: "USA", genre: "Domestic Drama" },
    "Pickup on South Street": { country: "USA", genre: "Noir Thriller" },
    "The Cranes Are Flying": { country: "USSR", genre: "War Drama" },
    "Letter Never Sent": { country: "USSR", genre: "Adventure Drama" },
    "Ballad of a Soldier": { country: "USSR", genre: "War Drama" },
    "Kiss Me Deadly": { country: "USA", genre: "Noir Thriller" },
    "On the Beach": { country: "USA", genre: "Nuclear Drama" },
    "Nine Days in One Year": { country: "USSR", genre: "Science Drama" },
    "The Manchurian Candidate": { country: "USA", genre: "Political Thriller" },
    "Welcome, or No Trespassing": { country: "USSR", genre: "Satirical Comedy" },
    "Dr. Strangelove": { country: "USA", genre: "Satire" },
    "Fail-Safe": { country: "USA", genre: "Nuclear Thriller" },
    "The Spy Who Came in from the Cold": { country: "USA", genre: "Spy Thriller" },
    "Three Days of the Condor": { country: "USA", genre: "Paranoia Thriller" },
    "The Deer Hunter": { country: "USA", genre: "War Drama" },
    "They Fought for Their Country": { country: "USSR", genre: "War Epic" },
    "Apocalypse Now": { country: "USA", genre: "War Drama" },
    "I Am Cuba": { country: "USSR", genre: "Political Drama" },
  };

  const sideType =
    film.side === "hollywood" ? "Narrative / Propaganda" : "State Cinema";
  const tagMeta = tagByTitle[film.title];
  const sideLabel = tagMeta?.country ?? (film.side === "hollywood" ? "USA" : "USSR");
  const typeLabel = tagMeta?.genre ?? sideType;
  const isPlayable = film.availability !== "unavailable";
  const isSingleColumn = gridColumns === 1;
  const filmCode = String(displayIndex ?? film.id).padStart(3, "0");
  const mediaFrameClass = isSingleColumn
    ? "aspect-video w-[min(88vw,980px)]"
    : "aspect-video w-full max-w-[360px]";

  return (
    <button
      type="button"
      disabled={!isPlayable}
      onClick={() => {
        if (!isPlayable) return;
        onOpen(film);
      }}
      className={`relative flex flex-col overflow-hidden bg-white text-black text-left outline-none transition-colors duration-150 hover:bg-black/[0.02] focus-visible:ring-2 focus-visible:ring-black ${
        isSingleColumn ? "min-h-[430px]" : "min-h-[380px] md:min-h-[420px]"
      }`}
    >
      <div className="pointer-events-none absolute inset-2 border border-black" />
      <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-black" />
      <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-black" />
      <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-black" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-black" />

      <div className="relative z-10 flex items-start justify-between px-4 pb-3 pt-4 sm:px-5 sm:pt-5">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.1em] text-black">
            <span className="border border-black px-1 py-[1px]">ID-{filmCode}</span>
            <span>{film.side === "hollywood" ? "USA-WING" : "USSR-WING"}</span>
          </div>
          <div className="pointer-events-none mb-1 h-[1px] w-[180px] max-w-[55vw] bg-black" />
          <div className="text-[14px] font-medium leading-[1.15] text-black">
            {film.title}
          </div>
          <div className="mt-0.5 text-[10.5px] leading-[1.3] text-black/80">
            {film.year}
          </div>
          <div className="mt-0.5 text-[10.5px] leading-[1.3] text-black/80">
            {film.director}
          </div>
        </div>
        <span className="text-[10.5px] font-medium text-black">
          {film.duration}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 items-end p-4 sm:p-5">
        <div
          className={`hud-media-frame relative overflow-hidden border border-black bg-black ${mediaFrameClass}`}
        >
          <img
            src={film.posterUrl}
            alt={film.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {!isPlayable && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-black/20 bg-black/10 px-4 text-center">
              <span className="text-[10px] uppercase tracking-[0.14em] text-black">
                Not Available
              </span>
              <span className="text-[9px] leading-4 tracking-[0.03em] text-black">
                {film.note}
              </span>
            </div>
          )}
        </div>

        <div className="pointer-events-none absolute bottom-4 right-4 border border-black bg-white px-3 py-1.5 text-[9.5px] leading-[1.3] text-black sm:bottom-5 sm:right-5">
          <span className="block font-semibold">{sideLabel}</span>
          {typeLabel}
        </div>
      </div>
    </button>
  );
};

export default FilmCard;
