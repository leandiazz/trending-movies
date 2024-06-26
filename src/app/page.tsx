import { MovieCard } from "@/components/MovieCard";
import { Movie } from "@/interfaces/movies";

const getMovies = async () => {
  const movies = await fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTY0YzEwZjQzZGY2YTU3OTc1NWZhZTAzNWNlMmFjYSIsIm5iZiI6MTcxOTI5NTg3Ni40NTQyNjgsInN1YiI6IjY2N2E1ZWNmNGM1M2RjNDk1OTA3ODRiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BP1IiO59r2hyBjTmT-LTWiHBf2FGLmA4KK_bYrUYWMI",
    },
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
