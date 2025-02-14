import React from 'react';
import './styles.css';
import { useEffect, useState } from "react";

const Catalogue = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        const apiKey = '15d2ea6d0dc1d476efbca3eba2b9bbfb';
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR`
        );

        const data = await response.json();

        if (data.results) {
          setMovies(data.results);
        }
      } catch (err) {
        console.error("Erreur de chargement :", err);
      }
    };

    fetchCatalogue();


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
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />

                {/* Description et bouton, masqués par défaut et affichés au survol */}
                <div className="absolute inset-0 h-full w-full bg-black/80 text-white p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                  <p className="text-sm text-gray-300 mb-2">
                    {movie.release_date ? movie.release_date.split("-")[0] : "Date inconnue"}
                  </p>
                  <p className="text-lg mb-4">{movie.overview.substring(0, 100)}...</p>
                  <p className="text-lg font-semibold mb-2 text-white">{movie.vote_average} / 10</p>
                  <a href="#" className="my-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center">
                    <span>Voir le film</span>
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