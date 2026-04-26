export const phases = [
  { key: "1947", title: "Early Cold War", range: "1947-1953" },
  { key: "1953", title: "Post-Stalin Thaw", range: "1953-1962" },
  { key: "1962", title: "Cuban Missile Crisis Era", range: "1962-1968" },
  { key: "1969", title: "Detente", range: "1969-1979" },
  { key: "1980", title: "Reagan Escalation", range: "1980-1991" },
];

const unavailablePoster =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
      <rect width="100%" height="100%" fill="#8f97a8"/>
      <rect x="20" y="20" width="600" height="360" fill="#a9b0be" stroke="#6f7786" stroke-width="2"/>
      <text x="50%" y="48%" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#4b5363" letter-spacing="2">NOT AVAILABLE</text>
      <text x="50%" y="58%" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="12" fill="#4b5363">Archive ID pending</text>
    </svg>`
  );

const createFilm = (film) => {
  const hasArchive = Boolean(film.archiveId);
  const hasYouTube = Boolean(film.youtubeId);
  const hasDirectEmbed = Boolean(film.embedUrl);
  const availability = hasArchive
    ? "archive"
    : hasYouTube
      ? "youtube"
      : hasDirectEmbed
        ? "embed"
        : "unavailable";

  let posterUrl = unavailablePoster;
  let previewUrl = "";
  let embedUrl = "";

  if (availability === "archive") {
    posterUrl = `https://archive.org/services/img/${film.archiveId}`;
    previewUrl = `https://archive.org/download/${film.archiveId}/${film.archiveId}.mp4`;
    embedUrl = `https://archive.org/embed/${film.archiveId}`;
  } else if (availability === "youtube") {
    posterUrl = `https://i.ytimg.com/vi/${film.youtubeId}/hqdefault.jpg`;
    embedUrl = `https://www.youtube.com/embed/${film.youtubeId}`;
  } else if (availability === "embed") {
    embedUrl = film.embedUrl;
  }

  return {
    ...film,
    availability,
    posterUrl,
    previewUrl,
    embedUrl,
    note:
      film.note ??
      "Archive ID is still TBD. This entry is listed for the curatorial archive but is not playable yet.",
  };
};

const rawFilms = [
  {
    id: 1,
    title: "The Iron Curtain",
    year: 1948,
    director: "William Wellman",
    country: "USA",
    studio: "20th Century Fox",
    side: "hollywood",
    phase: "1947",
    duration: "1:26:48",
    archiveId: "the-iron-curtain-1948_202507",
    tags: ["spy", "domestic"],
  },
  {
    id: 2,
    title: "The Russian Question",
    year: 1947,
    director: "Mikhail Romm",
    country: "USSR",
    studio: "Mosfilm",
    side: "soviet",
    phase: "1947",
    duration: "1:27:15",
    youtubeId: "W_cI2XSyfYg",
    tags: ["media", "ideology"],
  },
  {
    id: 3,
    title: "The Red Menace",
    year: 1949,
    director: "R.G. Springsteen",
    country: "USA",
    studio: "Republic Pictures",
    side: "hollywood",
    phase: "1947",
    duration: "1:27:01",
    archiveId: "trm00988752",
    tags: ["propaganda"],
  },
  {
    id: 4,
    title: "Meeting on the Elbe",
    year: 1949,
    director: "Grigori Alexandrov",
    country: "USSR",
    studio: "Mosfilm",
    side: "soviet",
    phase: "1947",
    duration: "1:38:23",
    youtubeId: "P0Etni9MdaY",
    tags: ["postwar"],
  },
  {
    id: 6,
    title: "The Secret Mission",
    year: 1950,
    director: "Mikhail Romm",
    country: "USSR",
    studio: "Mosfilm",
    side: "soviet",
    phase: "1947",
    duration: "Unknown",
    tags: ["intelligence"],
  },
  {
    id: 7,
    title: "I Was a Communist for the FBI",
    year: 1951,
    director: "Gordon Douglas",
    country: "USA",
    studio: "Warner Bros.",
    side: "hollywood",
    phase: "1947",
    duration: "1:22:53",
    archiveId: "i-was-a-communist-for-the-fbi-1951",
    tags: ["fbi"],
  },
  {
    id: 8,
    title: "Silvery Dust",
    year: 1953,
    director: "Abram Room",
    country: "USSR",
    studio: "Mosfilm",
    side: "soviet",
    phase: "1947",
    duration: "Unknown",
    tags: ["industry"],
  },
  {
    id: 9,
    title: "Walk East on Beacon",
    year: 1952,
    director: "Alfred Werker",
    country: "USA",
    studio: "Columbia Pictures",
    side: "hollywood",
    phase: "1947",
    duration: "1:37:38",
    youtubeId: "8TomksXHDx4",
    tags: ["espionage"],
  },
  {
    id: 10,
    title: "My Son John",
    year: 1952,
    director: "Leo McCarey",
    country: "USA",
    studio: "Paramount Pictures",
    side: "hollywood",
    phase: "1947",
    duration: "2:02:15",
    youtubeId: "_Eib5uGiY9k",
    tags: ["family"],
  },
  {
    id: 11,
    title: "Big Jim McLain",
    year: 1952,
    director: "Edward Ludwig",
    country: "USA",
    studio: "Warner Bros.",
    side: "hollywood",
    phase: "1947",
    duration: "1:20:24",
    tags: ["political"],
  },
  {
    id: 12,
    title: "Pickup on South Street",
    year: 1953,
    director: "Samuel Fuller",
    country: "USA",
    studio: "20th Century Fox",
    side: "hollywood",
    phase: "1947",
    duration: "1:20:24",
    archiveId: "pickup-on-south-street-1953_202506",
    tags: ["crime"],
  },
  {
    id: 13,
    title: "Invasion of the Body Snatchers",
    year: 1956,
    director: "Don Siegel",
    country: "USA",
    studio: "Allied Artists",
    side: "hollywood",
    phase: "1953",
    duration: "1:20:42",
    archiveId: "invasion-of-the-body-snatchers-colorized-1956-720p",
    tags: ["sci-fi"],
  },
  {
    id: 14,
    title: "The Cranes Are Flying",
    year: 1957,
    director: "Mikhail Kalatozov",
    country: "USSR",
    studio: "Mosfilm",
    side: "soviet",
    phase: "1953",
    duration: "1:36:22",
    youtubeId: "2rINnJat-5k",
    tags: ["war drama"],
  },
  {
    id: 15,
    title: "Strategic Air Command",
    year: 1955,
    director: "Anthony Mann",
    country: "USA",
    studio: "Paramount Pictures",
    side: "hollywood",
    phase: "1953",
    duration: "Unknown",
    tags: ["military"],
  },
  {
    id: 16,
    title: "Letter Never Sent",
    year: 1960,
    director: "Mikhail Kalatozov",
    country: "USSR",
    studio: "Mosfilm",
    side: "soviet",
    phase: "1953",
    duration: "1:36:25",
    youtubeId: "qPScCOavuY8",
    tags: ["adventure"],
  },
  {
    id: 17,
    title: "Kiss Me Deadly",
    year: 1955,
    director: "Robert Aldrich",
    country: "USA",
    studio: "United Artists",
    side: "hollywood",
    phase: "1953",
    duration: "1:45:59",
    archiveId: "kissmedeadly1955_202001",
    tags: ["noir"],
  },
  {
    id: 18,
    title: "Ballad of a Soldier",
    year: 1959,
    director: "Grigori Chukhrai",
    country: "USSR",
    studio: "Mosfilm",
    side: "soviet",
    phase: "1953",
    duration: "1:27:51",
    youtubeId: "Vsnius8Ka_I",
    tags: ["thaw"],
  },
  {
    id: 19,
    title: "On the Beach",
    year: 1959,
    director: "Stanley Kramer",
    country: "USA",
    studio: "United Artists",
    side: "hollywood",
    phase: "1953",
    duration: "2:14:31",
    archiveId: "on-the-beach-1959",
    tags: ["nuclear"],
  },
  {
    id: 20,
    title: "Nine Days in One Year",
    year: 1962,
    director: "Mikhail Romm",
    country: "USSR",
    studio: "Mosfilm",
    side: "soviet",
    phase: "1953",
    duration: "1:48:55",
    youtubeId: "HGf-cZZDH3s",
    tags: ["science"],
  },
  {
    id: 21,
    title: "The Manchurian Candidate",
    year: 1962,
    director: "John Frankenheimer",
    country: "USA",
    studio: "United Artists",
    side: "hollywood",
    phase: "1962",
    duration: "2:06:56",
    archiveId: "the-manchurian-candidate",
    tags: ["psychological"],
  },
  {
    id: 22,
    title: "Welcome, or No Trespassing",
    year: 1964,
    director: "Elem Klimov",
    country: "USSR",
    studio: "Mosfilm",
    side: "soviet",
    phase: "1962",
    duration: "1:13:19",
    youtubeId: "X-4LQzazwUs",
    tags: ["satire"],
  },
  {
    id: 23,
    title: "Dr. Strangelove",
    year: 1964,
    director: "Stanley Kubrick",
    country: "USA",
    studio: "Columbia Pictures",
    side: "hollywood",
    phase: "1962",
    duration: "1:34:58",
    archiveId: "dr-strangelove-or-how-i-learned-to-stop-worrying-and-love-the-bomb",
    tags: ["nuclear"],
  },
  {
    id: 24,
    title: "I Am Cuba",
    year: 1964,
    director: "Mikhail Kalatozov",
    country: "USSR-Cuba",
    studio: "ICAIC-Mosfilm",
    side: "soviet",
    phase: "1962",
    duration: "1:52:09",
    tags: ["cuba"],
  },
  {
    id: 25,
    title: "Fail-Safe",
    year: 1964,
    director: "Sidney Lumet",
    country: "USA",
    studio: "Columbia Pictures",
    side: "hollywood",
    phase: "1962",
    duration: "1:52:09",
    archiveId: "fail-safe-1964-sidney-lumet",
    tags: ["thriller"],
  },
  {
    id: 26,
    title: "Kill Him!",
    year: 1965,
    director: "Naum Ardashnikov",
    country: "USSR",
    studio: "Mosfilm",
    side: "soviet",
    phase: "1962",
    duration: "1:44:12",
    tags: ["spy"],
  },
  {
    id: 27,
    title: "The Spy Who Came in from the Cold",
    year: 1965,
    director: "Martin Ritt",
    country: "UK/USA",
    studio: "Paramount Pictures",
    side: "hollywood",
    phase: "1962",
    duration: "1:52:24",
    archiveId: "the-spy-who-came-in-from-the-cold-1965",
    tags: ["spy"],
  },
  {
    id: 28,
    title: "Neutral Waters",
    year: 1968,
    director: "Vera Stroeva",
    country: "USSR",
    studio: "Mosfilm",
    side: "soviet",
    phase: "1962",
    duration: "2:37:17",
    tags: ["naval"],
  },
  {
    id: 29,
    title: "Three Days of the Condor",
    year: 1975,
    director: "Sydney Pollack",
    country: "USA",
    studio: "Paramount Pictures",
    side: "hollywood",
    phase: "1969",
    duration: "1:44:12",
    archiveId: "sam6_hardwarexpress_2621",
    tags: ["conspiracy"],
  },
  {
    id: 30,
    title: "Officers",
    year: 1971,
    director: "Vladimir Rogovoy",
    country: "USSR",
    studio: "Gorky Film Studio",
    side: "soviet",
    phase: "1969",
    duration: "Unknown",
    tags: ["military"],
  },
  {
    id: 31,
    title: "The Deer Hunter",
    year: 1978,
    director: "Michael Cimino",
    country: "USA",
    studio: "Universal Pictures",
    side: "hollywood",
    phase: "1969",
    duration: "3:03:46",
    archiveId: "dvb5piz3r.onion_index.php",
    tags: ["vietnam"],
  },
  {
    id: 32,
    title: "Liberation (series)",
    year: "1970-71",
    director: "Yuri Ozerov",
    country: "USSR",
    studio: "Mosfilm",
    side: "soviet",
    phase: "1969",
    duration: "Unknown",
    tags: ["war epic"],
  },
  {
    id: 33,
    title: "The Bonus",
    year: 1974,
    director: "Sergei Mikaelyan",
    country: "USSR",
    studio: "Lenfilm",
    side: "soviet",
    phase: "1969",
    duration: "Unknown",
    tags: ["labor"],
  },
  {
    id: 34,
    title: "They Fought for Their Country",
    year: 1975,
    director: "Sergei Bondarchuk",
    country: "USSR",
    studio: "Mosfilm",
    side: "soviet",
    phase: "1969",
    duration: "2:37:17",
    youtubeId: "gOxKScK1KOU",
    tags: ["war"],
  },
  {
    id: 35,
    title: "Apocalypse Now",
    year: 1979,
    director: "Francis Ford Coppola",
    country: "USA",
    studio: "United Artists",
    side: "hollywood",
    phase: "1969",
    duration: "2:27:13",
    youtubeId: "HICGzPvcizk",
    tags: ["vietnam"],
  },
  {
    id: 36,
    title: "Red Dawn",
    year: 1984,
    director: "John Milius",
    country: "USA",
    studio: "MGM/UA",
    side: "hollywood",
    phase: "1980",
    duration: "Unknown",
    tags: ["reagan"],
  },
  {
    id: 37,
    title: "Solo Voyage",
    year: 1985,
    director: "Mikhail Tumanishvili",
    country: "USSR",
    studio: "Mosfilm",
    side: "soviet",
    phase: "1980",
    duration: "Unknown",
    tags: ["action"],
  },
  {
    id: 38,
    title: "Rocky IV",
    year: 1985,
    director: "Sylvester Stallone",
    country: "USA",
    studio: "MGM/UA",
    side: "hollywood",
    phase: "1980",
    duration: "Unknown",
    tags: ["sports"],
  },
  {
    id: 39,
    title: "TASS Is Authorized to Declare...",
    year: 1984,
    director: "Vladimir Fokin",
    country: "USSR",
    studio: "Gosteleradio",
    side: "soviet",
    phase: "1980",
    duration: "Unknown",
    tags: ["spy", "tv"],
  },
  {
    id: 40,
    title: "Invasion U.S.A.",
    year: 1985,
    director: "Joseph Zito",
    country: "USA",
    studio: "Cannon Films",
    side: "hollywood",
    phase: "1980",
    duration: "Unknown",
    tags: ["action"],
  },
  {
    id: 41,
    title: "The Spy Who Came to Me",
    year: 1989,
    director: "TBD",
    country: "USSR",
    studio: "TBD",
    side: "soviet",
    phase: "1980",
    duration: "Unknown",
    tags: ["spy"],
  },
  {
    id: 42,
    title: "The Hunt for Red October",
    year: 1990,
    director: "John McTiernan",
    country: "USA",
    studio: "Paramount Pictures",
    side: "hollywood",
    phase: "1980",
    duration: "Unknown",
    tags: ["submarine"],
  },
  {
    id: 43,
    title: "Afghan Breakdown",
    year: 1990,
    director: "Vladimir Bortko",
    country: "USSR",
    studio: "Lenfilm",
    side: "soviet",
    phase: "1980",
    duration: "Unknown",
    tags: ["afghanistan"],
  },
];

const stillModules = import.meta.glob("../assets/stills/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const stillByCode = Object.entries(stillModules).reduce((acc, [path, url]) => {
  const match = path.match(/\/(\d{3})\.[^/.]+$/);
  if (match) acc[match[1]] = url;
  return acc;
}, {});

const curatedNotesByCode = {
  "001":
    "One of the first explicitly anti-Soviet features, dramatizing Igor Gouzenko's defection from the Soviet embassy in Ottawa. The film frames Soviet espionage as an existential domestic threat hiding in plain sight, setting the template for the paranoid spy thriller that would define the decade.",
  "002":
    "Mikhail Romm's pointed response to American media culture. An American journalist is pressured by his publishers to write anti-Soviet propaganda, only to refuse and face professional ruin. The film presents US media as wholly captured by warmongering capital, a mirror image of exactly what Soviet studios were doing from the other side.",
  "003":
    "A Republic Pictures B-movie about communist recruitment of disillusioned American veterans. Low-budget and blunt, it reflects the studio system's willingness to churn out ideological product when HUAC pressure made anti-communism commercially safe and politically expedient.",
  "004":
    "Grigori Alexandrov's direct counterpart to The Iron Curtain. American officers in postwar Germany are portrayed as cynical imperialists eager to recruit Nazi collaborators. Released the same year as The Red Menace, it demonstrates how quickly each industry learned to answer the other's moves.",
  "005":
    "Based on the real testimony of Matt Cvetic, an FBI informant who infiltrated the American Communist Party. The film blurs fact and fiction to give institutional authority to anti-communist paranoia, presenting federal surveillance as heroic and necessary.",
  "006":
    "A semi-documentary thriller produced with direct FBI cooperation, presenting the bureau's counter-espionage work as methodical and righteous. The film's procedural style lends it a false neutrality, making its propaganda all the more effective.",
  "007":
    "Leo McCarey's domestic nightmare: a patriotic American family discovers their son has become a communist. The film locates the Cold War threat inside the home itself, coding intellectual ambition and dissent as symptoms of treasonous corruption.",
  "008":
    "Samuel Fuller's street-level take on the spy film. A petty pickpocket accidentally steals microfilm bound for Soviet agents. Fuller complicates the genre by centering criminal working-class characters, using anti-communism as backdrop rather than sermon without ever losing its ideological alignment.",
  "009":
    "Mikhail Kalatozov's Thaw-era masterpiece about a woman who loses her lover to the war. With Urusevsky's extraordinary mobile cinematography, the film shifts Soviet cinema away from triumphalist propaganda toward intimate human loss, signaling a new cultural opening after Stalin's death.",
  "010":
    "Four geologists on a mission in Siberia become trapped by a forest fire. Kalatozov frames Soviet labor and sacrifice in near-mythic terms, but the film's formal ambition outpaces its ideology, producing something that feels more like existential cinema than state messaging.",
  "011":
    "A young soldier is granted leave to visit his mother after a small act of battlefield heroism. Grigori Chukhrai's film builds Soviet national identity not through vilification of the enemy but through warmth and humanist detail, a strategic softening that proved far more persuasive abroad than overt propaganda.",
  "012":
    "Robert Aldrich's brutal, expressionist noir in which private detective Mike Hammer stumbles onto a nuclear MacGuffin. The film treats Cold War anxiety as ambient dread rather than named threat, reflecting a culture so saturated in nuclear fear it no longer needed to name it.",
  "013":
    "Ballad of a Soldier (1959, Soviet). (see entry 11 above - appears duplicated in the grid as ID-013)",
  "014":
    "Stanley Kramer's adaptation of Nevil Shute's novel imagines the aftermath of nuclear war, with survivors in Australia awaiting the radiation cloud. One of the few Hollywood films of the period to refuse triumphalism entirely, it was controversial precisely because it offered no enemy, only consequence.",
  "015":
    "Mikhail Romm's Thaw-era drama about nuclear physicists grappling with the ethics of their work. The Soviet scientist is portrayed as morally serious and intellectually independent, countering Western caricatures while quietly acknowledging the existential stakes of the arms race.",
  "016":
    "John Frankenheimer's paranoid masterwork about a Korean War veteran brainwashed by communist operatives to become an assassin. The film's genius is its equal-opportunity suspicion: communists and McCarthyites are both presented as manipulative and irrational, making it the genre's most subversive entry.",
  "017":
    "Elem Klimov's satirical comedy about a boy banned from a Young Pioneers summer camp who sneaks back in. Released after surviving intense censorship battles, the film uses humor to critique Soviet bureaucratic conformity, rare evidence that cracks in the ideological apparatus were visible from within.",
  "018":
    "Stanley Kubrick's definitive Cold War satire. A deranged general triggers nuclear annihilation and no one in the chain of command can stop it. The film dismantles the logic of mutually assured destruction by following it to its absurd conclusion, presenting both superpowers as captive to systems beyond any individual's control.",
  "019":
    "Released the same year as Dr. Strangelove and covering nearly identical territory, Sidney Lumet's film plays it entirely straight. American bombers are accidentally ordered to nuke Moscow and cannot be recalled. The horror is bureaucratic and systemic, not satirical, making it the era's most sobering nuclear thriller.",
  "020":
    "Martin Ritt's adaptation of John le Carre strips the spy genre of all romance. A burnt-out British agent discovers his mission is not what he was told and that his handlers are as morally compromised as the enemy. Cold War idealism is not just absent here, it is the target.",
  "021":
    "A CIA analyst returns from lunch to find his entire office murdered. Sydney Pollack's detente-era thriller turns American intelligence into the villain, reflecting a post-Watergate collapse of institutional trust that made paranoid cinema the dominant mode of the 1970s.",
  "022":
    "Michael Cimino's three-hour reckoning with Vietnam and its psychic wreckage. The Cold War proxy conflict is refracted through the lives of three working-class men from Pennsylvania. The film says almost nothing about ideology and everything about what the ideology costs.",
  "023":
    "Sergei Bondarchuk's large-scale adaptation of Sholokhov's novel about the Soviet retreat of 1942. Made during detente but deeply invested in wartime sacrifice mythology, the film reinforces the Great Patriotic War as the Soviet Union's central founding narrative and moral anchor.",
  "024":
    "Francis Ford Coppola's hallucinatory descent into the Vietnam War. Loosely adapted from Conrad's Heart of Darkness, the film frames American military intervention as a journey into moral collapse. By 1979, Hollywood's Cold War enemy had become America itself.",
};

export const films = rawFilms
  .map(createFilm)
  .filter((film) => film.availability !== "unavailable")
  .map((film, index) => {
    const code = String(index + 1).padStart(3, "0");
    const stillPoster = stillByCode[code];
    const curatedNote = curatedNotesByCode[code];
    return {
      ...film,
      posterUrl: stillPoster ?? film.posterUrl,
      note: curatedNote ?? film.note,
    };
  });
