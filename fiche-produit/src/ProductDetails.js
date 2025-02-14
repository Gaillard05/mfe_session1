import React from 'react';
import './ProductDetails.css';

const ProductDetails = ({ movie, onBack }) => {
  console.log('Movie data:', movie);
  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <img src={movie.posterUrl || "https://via.placeholder.com/250x375"} alt={movie.title} />
        <div className="product-details-content">
          <h1>{movie.isSeries ? 'Série' : 'Film'}</h1>
          <h2>{movie.title}</h2>
          
          <div className="product-details-meta">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genre}</span>
            {movie.isSeries && (
              <>
                <span>•</span>
                <span>{movie.seasons} saison{movie.seasons > 1 ? 's' : ''}</span>
              </>
            )}
          </div>

          <div className="product-details-rating">
            ★ {movie.rating}/5
          </div>

          <p className="product-details-description">{movie.description}</p>

          {movie.trailerUrl && (
            <div className="product-details-trailer">
              <h3>Bande Annonce</h3>
              <iframe
                width="100%"
                height="250"
                src={movie.trailerUrl}
                title={`${movie.title} trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          
          <button className="product-details-button" onClick={onBack}>
            Retour au Catalogue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;