import Navbar from "./components/Navbar";
import MainLayout from "./components/MainLayout";
import { useState } from "react";
import NumResult from "./components/NumResult";
import Box from "./components/Box";

import MoiveList from "./components/MoiveList";
import WatchSummary from "./components/WatchSummary";
import WatchMoiveList from "./components/WatchMoiveList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import { useMovie } from "./components/useMovie";
import { useLocalStorageState } from "./components/useLocalStorageState";

// const KEY = `269360c9`;

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovie(query);

  // const [watched, setWatched] = useState(function () {
  //   const storedValue = localStorage.getItem("watched");
  //   return JSON.parse(storedValue);
  // });
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function HandleselectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function HandleCloseMovie() {
    setSelectedId(null);
  }
  function HandleWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function HandleDeleteMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID != id));
  }
  // useEffect(
  //   function () {
  //     localStorage.setItem("watched", JSON.stringify(watched));
  //   },
  //   [watched]
  // );
  // useEffect(
  //   function () {
  //     const controller = new AbortController();
  //     async function fetchMovie() {
  //       try {
  //         setIsLoading(true);
  //         setError("");
  //         const res = await fetch(
  //           `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
  //           { signal: controller.signal }
  //         );
  //         if (!res.ok) throw new Error("Something Went Wrong!! ");
  //         const data = await res.json();
  //         if (data.Response === "False") throw new Error("Moive not found");
  //         setMovies(data.Search);
  //         setError("");
  //       } catch (err) {
  //         if (err.name !== "AbortError") {
  //           setError(err.message);
  //         }
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //     if (query.length < 3) {
  //       setMovies([]);
  //       setError("");
  //       return;
  //     }
  //     HandleCloseMovie();
  //     fetchMovie();

  //     return function () {
  //       controller.abort();
  //     };
  //   },
  //   [query]
  // );

  return (
    <>
      <Navbar query={query} setQuery={setQuery}>
        {/* here we are component composition -> to avoid the props drilling */}
        <NumResult movies={movies} />
      </Navbar>
      <MainLayout>
        <Box>
          {/* {isLoading ? <Loader /> : <MoiveList movies={movies} />} */}
          {!isLoading && !error && (
            <MoiveList movies={movies} onSelectMovie={HandleselectedMovie} />
          )}
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={HandleCloseMovie}
              HandleWatchedMovie={HandleWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchSummary watched={watched} />

              <WatchMoiveList
                watched={watched}
                onDeleteMovie={HandleDeleteMovie}
              />
            </>
          )}
        </Box>
        {/* <WatchBox /> */}
      </MainLayout>
    </>
  );
}
