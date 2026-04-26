import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import BottomBar from "./components/BottomBar";
import FilmCard from "./components/FilmCard";
import FilmListView from "./components/FilmListView";
import Lightbox from "./components/Lightbox";
import Nav from "./components/Nav";
import { films } from "./data/films";

const App = () => {
  const [activeSide, setActiveSide] = useState("all");
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [selectedFilmId, setSelectedFilmId] = useState(null);
  const [gridColumns, setGridColumns] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const [isGridTransitioning, setIsGridTransitioning] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const gridTransitionTimerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const applyDefaultColumns = () => {
      const mobile = mediaQuery.matches;
      setIsMobile(mobile);
      setGridColumns(mobile ? 1 : 2);
    };

    applyDefaultColumns();
    mediaQuery.addEventListener("change", applyDefaultColumns);
    return () => mediaQuery.removeEventListener("change", applyDefaultColumns);
  }, []);

  useEffect(() => {
    return () => {
      if (gridTransitionTimerRef.current) {
        window.clearTimeout(gridTransitionTimerRef.current);
      }
    };
  }, []);

  const handleGridColumnsChange = (nextColumns) => {
    if (nextColumns === gridColumns) return;

    if (gridTransitionTimerRef.current) {
      window.clearTimeout(gridTransitionTimerRef.current);
    }

    setIsGridTransitioning(true);
    setGridColumns(nextColumns);
    gridTransitionTimerRef.current = window.setTimeout(() => {
      setIsGridTransitioning(false);
      gridTransitionTimerRef.current = null;
    }, 180);
  };

  const filteredFilms = useMemo(() => {
    let visibleFilms = films;

    if (activeSide === "all") {
      visibleFilms = films;
    } else {
      visibleFilms = films.filter((film) => film.side === activeSide);
    }

    return visibleFilms;
  }, [activeSide]);

  const displayIndexById = useMemo(() => {
    return new Map(films.map((film, index) => [film.id, index + 1]));
  }, []);

  const selectedFilm = useMemo(() => {
    return filteredFilms.find((film) => film.id === selectedFilmId) ?? null;
  }, [filteredFilms, selectedFilmId]);

  const handleNavSelect = (key) => {
    if (key === "about") {
      setIsAboutOpen((open) => !open);
      return;
    }
    setActiveSide(key);
    setIsAboutOpen(false);
  };

  const openFilm = (film) => {
    if (film.availability === "unavailable") return;
    setSelectedFilmId(film.id);
    document.body.style.overflow = "hidden";
  };

  const closeFilm = () => {
    setSelectedFilmId(null);
    document.body.style.overflow = "";
  };

  const navigateFilm = (direction) => {
    if (!selectedFilm) return;
    const currentIndex = filteredFilms.findIndex((film) => film.id === selectedFilm.id);
    if (currentIndex < 0) return;

    const nextIndex =
      direction === "next"
        ? (currentIndex + 1) % filteredFilms.length
        : (currentIndex - 1 + filteredFilms.length) % filteredFilms.length;

    setSelectedFilmId(filteredFilms[nextIndex].id);
  };

  return (
    <div className="min-h-screen bg-transparent text-[var(--text)]">
      <Nav
        activeSide={activeSide}
        isAboutOpen={isAboutOpen}
        onNavSelect={handleNavSelect}
      />

      <motion.aside
        initial={false}
        animate={{
          opacity: isAboutOpen ? 1 : 0,
          y: isAboutOpen ? 0 : -8,
          pointerEvents: isAboutOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed inset-x-2 bottom-14 top-14 z-40 overflow-y-auto border border-black bg-white p-3 text-[12px] leading-[1.5] tracking-[0.005em] shadow-[0_6px_30px_rgba(0,0,0,0.14)] sm:inset-x-auto sm:bottom-auto sm:right-5 sm:w-[min(96vw,74ch)] sm:max-h-[calc(100vh-84px)] sm:p-5 sm:text-[13px] sm:leading-[1.55]"
      >
        <div className="border-b border-black pb-2">
          <h2 className="text-[18px] font-medium leading-tight">Screening The Enemy</h2>
          <p className="mt-1 text-[13px] italic leading-snug">
            Competing Images in Cold War Cinema, 1947-1991
          </p>
        </div>
        <div className="space-y-5 pt-4 text-black">
          <div>
            Between 1947 and 1991, Hollywood and the Soviet film industry operated as
            parallel ideological machines, each producing and reinforcing an image of
            the other as the enemy. This archive argues that neither side was simply
            making entertainment. They were making weapons.
          </div>
          <div>
            The research question driving this project is: how did Hollywood and Soviet
            cinema mutually construct images of each other during the Cold War, and to
            what extent did each side&apos;s films respond to and mirror the other? The
            answer lies not just in what appears on screen, but in the material
            conditions that put it there.
          </div>

          <div>
            <h3 className="mb-2 text-[13px] font-medium leading-snug tracking-[0.01em]">
              The Machine Behind the Image
            </h3>
            <p>
              In the Soviet Union, film production ran through Goskino, the state
              committee for cinematography, which controlled funding, distribution, and
              approval at every stage. Scripts required sign-off before a frame was
              shot. Directors answered to the Cultural Ministry. The result was a cinema
              that could only exist with the explicit blessing of the state, which meant
              that anti-American sentiment was not a byproduct of Soviet filmmaking, it
              was often its mandate.
            </p>
            <p className="mt-3">
              Hollywood operated through a different structure, but one no less
              controlling. The major studios, MGM, 20th Century Fox, Warner Bros.,
              Republic Pictures, financed and greenlit projects with an eye toward
              profitability and, during the early Cold War, political safety. The House
              Un-American Activities Committee (HUAC) cast a long shadow over the
              industry from 1947 onward, and the studios knew it. Producing an
              anti-communist film was not just patriotic, it was self-protective. The
              ideology and the economics pointed in the same direction.
            </p>
            <p className="mt-3">
              In both systems, artists navigated powerful gatekeepers. The propaganda was
              rarely forced at gunpoint. More often it was funded, approved, distributed,
              and celebrated, which made it far more effective.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-[13px] font-medium leading-snug tracking-[0.01em]">
              The Cinematic Arms Race
            </h3>
            <p>
              This archive organizes its holdings across five phases of the Cold War: the
              Early Cold War (1947-1953), the Post-Stalin Thaw (1953-1962), the Cuban
              Missile Crisis Era (1962-1968), Detente (1969-1979), and the Reagan
              Escalation (1980-1991). Across each phase, the two industries are placed in
              direct comparison, not because they were in conversation with each other
              openly, but because the films rhyme in ways that reveal a shared logic.
              Each side was consolidating national identity at home by projecting threat
              abroad.
            </p>
            <p className="mt-3">
              The villainization of Soviet characters in American spy thrillers and the
              depiction of American imperialism in Soviet war films are not accidents of
              artistic temperament. They are products of systems, financial,
              bureaucratic, and political, that shaped what could be made, who could make
              it, and what it was allowed to say.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-[13px] font-medium leading-snug tracking-[0.01em]">
              About This Project
            </h3>
            <p>
              <em>Screening The Enemy</em> was developed as a final project for Russia
              and America (DSC, Section B) at The New School, Spring 2026. It was built
              as an interactive web archive designed to present Cold War cinema as a
              living, comparative record, not a syllabus.
            </p>
          </div>
        </div>
      </motion.aside>

      <main className="pb-14 pt-14">
        {viewMode === "grid" ? (
          <div
            className={`grid transform-gpu transition-[opacity,transform] duration-200 ease-out ${
              isGridTransitioning ? "scale-[0.998] opacity-90" : "scale-100 opacity-100"
            }`}
            style={{ gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` }}
          >
            {filteredFilms.map((film) => (
              <FilmCard
                key={`film-${film.id}`}
                film={film}
                onOpen={openFilm}
                gridColumns={gridColumns}
                displayIndex={displayIndexById.get(film.id)}
              />
            ))}
          </div>
        ) : (
          <FilmListView films={filteredFilms} onOpen={openFilm} />
        )}
      </main>

      <BottomBar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        gridColumns={gridColumns}
        isMobile={isMobile}
        onGridColumnsChange={handleGridColumnsChange}
      />

      <Lightbox
        film={selectedFilm}
        onClose={closeFilm}
        onNext={() => navigateFilm("next")}
        onPrev={() => navigateFilm("prev")}
      />
    </div>
  );
};

export default App;
