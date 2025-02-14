import React from 'react';
import './styles.css';
import { useEffect, useState } from "react";

const Catalogue = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2066/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Erreur de chargement:", err));
  }, []);

  return (
    <section className="py-16 mx-auto sm:py-20">
      <div className="mx-auto flex justify-center object-center px-4 py-16 sm:py-24 lg:max-w-7xl">
        <div className="flex justify-center object-center flex-col gap-12 sm:gap-16">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
            Nos dernières sorties
          </h2>
          <div className="mx-auto grid gap-12 space-y-10 md:space-y-0 sm:gap-16 lg:grid-cols-4">
            {movies.map((movie) => (
              <div key={movie.id} className="group h-96 w-64 relative">
                {/* Image du film */}
                <img
                  className="object-cover cursor-pointer object-center h-full w-full rounded-xl transition-all duration-300"
                  src={movie.posterUrl}
                  alt={movie.name}
                />

                {/* Description et bouton, masqués par défaut et affichés au survol */}
                <div className="absolute inset-0 h-full w-full bg-black/80 text-white p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                  <p className="text-sm text-gray-300 mb-2">{movie.year} | {movie.genres}</p>
                  <p className="text-lg mb-4">{movie.description}</p>
                  <p className="text-lg font-semibold mb-2 text-white">{movie.rating} / 10</p>
                  <a href={movie.movieUrl} target="_blank" rel="noopener noreferrer">
                    <button className="my-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center">
                      <span>Voir le film</span>
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalogue; 