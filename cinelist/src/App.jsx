import { useEffect, useState } from "react";
import {
  Film,
  Heart,
  Search,
  Clapperboard,
  X
} from "lucide-react";

import { movies } from "./data/movies";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";

const STORAGE_KEY = "cinelist-favorites";

function loadFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (id) =>
        Number.isInteger(id) &&
        movies.some((movie) => movie.id === id)
    );
  } catch {
    return [];
  }
}

export default function App() {
  const [favorites, setFavorites] = useState(loadFavorites);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Todos");
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error("Não foi possível salvar os favoritos:", error);
    }
  }, [favorites]);

  const genres = [
    "Todos",
    ...new Set(movies.map((movie) => movie.genre))
  ];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      genre === "Todos" || movie.genre === genre;

    const matchesFavorites =
      !showFavorites || favorites.includes(movie.id);

    return (
      matchesSearch &&
      matchesGenre &&
      matchesFavorites
    );
  });

  function toggleFavorite(id) {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(id)
        ? currentFavorites.filter(
          (favoriteId) => favoriteId !== id
        )
        : [...currentFavorites, id]
    );
  }

  function openCatalog() {
    setShowFavorites(false);
    setSelectedMovie(null);
  }

  function openFavorites() {
    setShowFavorites(true);
    setSelectedMovie(null);
    setGenre("Todos");
    setSearch("");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Cabeçalho */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={openCatalog}
            className="flex shrink-0 items-center gap-2"
          >
            <span className="rounded-xl bg-violet-600 p-2">
              <Clapperboard size={23} />
            </span>

            <span className="text-xl font-bold tracking-tight">
              Cine<span className="text-violet-400">List</span>
            </span>
          </button>

          <nav className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={openCatalog}
              className={`hidden rounded-lg px-3 py-2 text-sm transition sm:block ${!showFavorites
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:text-white"
                }`}
            >
              Catálogo
            </button>

            <button
              onClick={openFavorites}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${showFavorites
                  ? "bg-violet-600 text-white"
                  : "text-zinc-300 hover:bg-white/10"
                }`}
            >
              <Heart
                size={17}
                className={
                  showFavorites ? "fill-current" : ""
                }
              />

              <span className="hidden sm:inline">
                Favoritos
              </span>

              <span className="rounded-full bg-black/20 px-2 py-0.5 text-xs">
                {favorites.length}
              </span>
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Apresentação */}
        <section className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-sm text-violet-300">
            <Film size={15} />
            Seu próximo filme favorito
          </div>

          <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            {showFavorites
              ? "Minha lista de favoritos"
              : "Explore o universo do cinema."}
          </h1>

          <p className="mt-3 max-w-xl leading-relaxed text-zinc-400">
            {showFavorites
              ? "Todos os filmes que você guardou para assistir depois."
              : "Descubra histórias, explore filmes e monte sua própria coleção."}
          </p>
        </section>

        {/* Pesquisa */}
        <section className="mb-8 space-y-4">
          <div className="relative max-w-xl">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Pesquisar filmes pelo título..."
              aria-label="Pesquisar filmes"
              className="w-full rounded-xl border border-white/10 bg-zinc-900 py-3.5 pl-12 pr-12 outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Limpar pesquisa"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Filtros de gênero */}
          {!showFavorites && (
            <div className="flex flex-wrap gap-2">
              {genres.map((item) => (
                <button
                  key={item}
                  onClick={() => setGenre(item)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${genre === item
                      ? "border-violet-500 bg-violet-600 text-white"
                      : "border-white/10 bg-zinc-900 text-zinc-400 hover:border-white/30 hover:text-white"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Título da seção */}
        <section>
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {showFavorites
                ? "Filmes salvos"
                : "Filmes para descobrir"}
            </h2>

            <span className="text-sm text-zinc-500">
              {filteredMovies.length}{" "}
              {filteredMovies.length === 1
                ? "filme"
                : "filmes"}
            </span>
          </div>

          {/* Catálogo */}
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={favorites.includes(movie.id)}
                  onToggleFavorite={toggleFavorite}
                  onSelect={setSelectedMovie}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-zinc-900/40 px-6 text-center">
              <div className="mb-4 rounded-full bg-white/5 p-4">
                {showFavorites ? (
                  <Heart
                    size={28}
                    className="text-zinc-500"
                  />
                ) : (
                  <Search
                    size={28}
                    className="text-zinc-500"
                  />
                )}
              </div>

              <h3 className="text-lg font-semibold">
                {showFavorites
                  ? "Sua lista está vazia"
                  : "Nenhum filme encontrado"}
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
                {showFavorites
                  ? "Explore o catálogo e adicione seus filmes favoritos usando o coração."
                  : "Tente pesquisar outro título ou selecionar um gênero diferente."}
              </p>

              {showFavorites && (
                <button
                  onClick={openCatalog}
                  className="mt-5 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium hover:bg-violet-500"
                >
                  Explorar catálogo
                </button>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Detalhes do filme selecionado */}
      <MovieDetails
        movie={selectedMovie}
        isFavorite={
          selectedMovie
            ? favorites.includes(selectedMovie.id)
            : false
        }
        onToggleFavorite={toggleFavorite}
        onClose={() => setSelectedMovie(null)}
      />

      <footer className="border-t border-white/10 px-4 py-6 text-center text-sm text-zinc-500">
        CineList · Descubra sua próxima história.
      </footer>
    </div>
  );
}