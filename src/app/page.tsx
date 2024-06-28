import { MovieCard } from "@/components/MovieCard";
import { Movie } from "@/interfaces/movies";

const getMovies = async () => {
  const movies = await fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", {
    next: { revalidate: 86400 },
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
  return movies;
};

export default async function Home() {
  const movies = await getMovies().then((movie) => movie.results);

  return (
    <main className="max-w-7xl mx-auto">
      <h1 className="mt-10 text-5xl font-bold text-center">Trending Movies</h1>
      <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-10 py-10">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </section>
    </main>
  );
}
