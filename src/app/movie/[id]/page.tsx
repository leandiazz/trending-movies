import { Movie, MovieDetail } from "@/interfaces/movies";
import { Link } from "next-view-transitions";
import Image from "next/image";
import type { Metadata } from "next";

function getMovie(id: string): Promise<MovieDetail> {
  const movie = fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    next: { revalidate: 86400 },
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
  return movie;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const movie = await getMovie(params.id);
  return { title: movie.title, description: movie.overview };
}

export async function generateStaticParams() {
  const movies: Movie[] = await fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", {
    next: { revalidate: 86400 },
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  })
    .then((res) => res.json())
    .then((res) => res.results);

  return movies.map((movie) => movie.id);
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id);

  const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const blurImage = await fetch(image).then(async (res) => {
    return Buffer.from(await res.arrayBuffer()).toString("base64");
  });

  return (
    <article className="flex-col lg:flex-row flex max-w-7xl mx-auto justify-between py-20">
      <div className="py-32 mx-auto">
        <h2 style={{ viewTransitionName: `movie-title-${movie.id}` }} className="text-left font-semibold text-4xl">
          {movie.title}
        </h2>

        <div className="flex mt-10 gap-4">
          {movie.genres.map(({ id, name }) => (
            <span className="bg-slate-100 text-black px-3 py-1 rounded-2xl" key={id}>
              {name}
            </span>
          ))}
        </div>

        <p className="max-w-prose mt-10">{movie.overview}</p>

        <div className="mt-10 mb-20 flex flex-col gap-4 items-center w-fit">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <svg
                id="home_img"
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="32"
                viewBox="0 0 64 32"
                version="1.1"
              >
                <g fill="#F5C518">
                  <rect x="0" y="0" width="100%" height="100%" rx="4"></rect>
                </g>
                <g transform="translate(8.000000, 7.000000)" fill="#000000" fill-rule="nonzero">
                  <polygon points="0 18 5 18 5 0 0 0"></polygon>
                  <path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path>
                  <path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path>
                  <path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path>
                </g>
              </svg>
              <div className="flex items-center gap-1">
                <svg
                  height="18px"
                  width="18px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 47.94 47.94"
                  xmlSpace="preserve"
                >
                  <path
                    style={{ fill: "#ED8A19" }}
                    d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
              c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
              c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
              c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
              c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
              C22.602,0.567,25.338,0.567,26.285,2.486z"
                  />
                </svg>

                <p>
                  {Math.ceil(movie.vote_average)}
                  <span className="text-xs text-slate-400">/10</span>
                </p>
              </div>
            </div>
          </div>
          <span>{movie.vote_count} Reviews</span>
        </div>

        <Link
          className="bg-white flex w-fit gap-2 items-center text-black rounded-full px-6 py-3 text-lg font-semibold mx-auto lg:mx-0"
          href="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
          </svg>
          Go Home
        </Link>
      </div>

      <picture className="relative w-[500px] h-[750px] mx-auto -order-1 lg:order-1">
        <Image
          src={image}
          alt={`${movie.title} Poster`}
          fill
          quality={100}
          placeholder="blur"
          blurDataURL={`data:image/png;base64,${blurImage}`}
          style={{ objectFit: "cover", viewTransitionName: `movie-image-${movie.id}` }}
          className="rounded"
        />
      </picture>
    </article>
  );
}
