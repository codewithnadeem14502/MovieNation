import React from "react";
import WatchedMovie from "./WatchedMovie";

const WatchMoiveList = ({ watched, onDeleteMovie }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </ul>
  );
};

export default WatchMoiveList;
