import { Heart, Star, X } from "lucide-react";

export default function MovieDetails({
    movie,
    isFavorite,
    onToggleFavorite,
    onClose
}) {
    if (!movie) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-label={`Detalhes de ${movie.title}`}
                onClick={(event) => event.stopPropagation()}
                className="relative my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl"
            >
                <button
                    onClick={onClose}
                    aria-label="Fechar detalhes"
                    className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 hover:bg-black"
                >
                    <X size={22} />
                </button>

                <div className="grid md:grid-cols-[240px_1fr]">
                    <img
                        src={movie.poster}
                        alt={`Imagem ilustrativa de ${movie.title}`}
                        className="h-64 w-full object-cover md:h-full"
                    />

                    <div className="space-y-5 p-6 md:p-8">
                        <div>
                            <span className="text-sm font-medium text-violet-400">
                                {movie.genre}
                            </span>

                            <h2 className="mt-2 text-3xl font-bold">
                                {movie.title}
                            </h2>

                            <p className="mt-2 text-sm text-zinc-400">
                                {movie.year} · {movie.duration}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Star
                                size={20}
                                className="fill-yellow-400 text-yellow-400"
                            />
                            <span className="font-semibold">
                                {movie.rating}/10
                            </span>
                        </div>

                        <div>
                            <h3 className="mb-2 font-semibold">Sinopse</h3>
                            <p className="leading-relaxed text-zinc-300">
                                {movie.synopsis}
                            </p>
                        </div>

                        <p className="text-sm text-zinc-400">
                            Direção: {movie.director}
                        </p>

                        <button
                            onClick={() => onToggleFavorite(movie.id)}
                            className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition ${isFavorite
                                    ? "bg-red-500/15 text-red-400 hover:bg-red-500/25"
                                    : "bg-violet-600 text-white hover:bg-violet-500"
                                }`}
                        >
                            <Heart
                                size={19}
                                className={isFavorite ? "fill-current" : ""}
                            />
                            {isFavorite
                                ? "Remover dos favoritos"
                                : "Adicionar aos favoritos"}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}