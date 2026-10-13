import { Heart, Star } from "lucide-react";

export default function MovieCard({
    movie,
    isFavorite,
    onToggleFavorite,
    onSelect
}) {
    return (
        <article className="group overflow-hidden rounded-xl border border-white/10 bg-zinc-900 transition hover:-translate-y-1 hover:border-violet-500/50">
            <div className="relative aspect-2/3 overflow-hidden">
                <img
                    src={movie.poster}
                    alt={`Imagem ilustrativa de ${movie.title}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <button
                    onClick={() => onToggleFavorite(movie.id)}
                    aria-label={
                        isFavorite
                            ? "Remover dos favoritos"
                            : "Adicionar aos favoritos"
                    }
                    className="absolute right-3 top-3 rounded-full bg-black/60 p-2 backdrop-blur transition hover:bg-black/90"
                >
                    <Heart
                        size={20}
                        className={
                            isFavorite
                                ? "fill-red-500 text-red-500"
                                : "text-white"
                        }
                    />
                </button>

                <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-sm">
                    <Star size={15} className="fill-yellow-400 text-yellow-400" />
                    <span>{movie.rating}</span>
                </div>
            </div>

            <div className="space-y-3 p-4">
                <div>
                    <h3 className="truncate text-lg font-semibold text-white">
                        {movie.title}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-400">
                        {movie.year} · {movie.genre}
                    </p>
                </div>

                <button
                    onClick={() => onSelect(movie)}
                    className="w-full rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium transition hover:bg-violet-500"
                >
                    Ver detalhes
                </button>
            </div>
        </article>
    );
}