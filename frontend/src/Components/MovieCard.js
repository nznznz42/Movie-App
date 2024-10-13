
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function MovieCard({ movie, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`); 
  };

  return (
    <div 
      style={{
        position: 'relative',
        width: '200px',
        height: '300px',
        border: '1px solid #ccc',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s', 
        transform: isHovered ? 'scale(1.05) translateY(-5px)' : 'scale(1)', 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick} 
    >
      <img 
        src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`} 
        alt={movie.title} 
        style={{ 
          width: '100%', 
          height: '100%', 
          opacity: isHovered ? 0.7 : 1, 
          transition: 'opacity 0.3s' 
        }} 
      />
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)', 
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{movie.title}</h3>
          <p style={{ margin: '5px 0', fontSize: '12px' }}>Release Date: {movie.release_date}</p>
          <p style={{ margin: '5px 0', fontSize: '12px' }}>Rating: {movie.vote_average}</p>
          {onDelete && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation(); 
                onDelete(movie.id);
              }}
              style={{ color: 'white', marginTop: '10px' }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      )}
    </div>
  );
}

export default MovieCard;
