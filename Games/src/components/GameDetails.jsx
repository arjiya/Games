import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GameDetails.css';

function GameDetails() {
  const { id } = useParams(); 
  const [game, setGame] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiKey = '50b08e21f28f47feacd53f489c0bf9d4';

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
        if (!response.ok) throw new Error('Failed to fetch game details');
        const data = await response.json();
        setGame(data);
      } catch (error) {
        setError('Game details not available.');
        console.error("Error fetching game details:", error);
      }

      const handleAddToCart = (game) => {
        const newCart = [...cart, game];
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        navigate('/cart'); 
      };
      
      const handleAddToWishlist = (game) => {
        const newWishlist = [...wishlist, game];
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        navigate('/wishlist'); 
      };
      
    };

    fetchGameDetails();
  }, [id]);

  if (error) return <p className="error-message">{error}</p>;
  if (!game) return <p className="loading">Loading...</p>;

  return (
    <div className="game-details-container">
      <h1>{game.name}</h1>
      <img src={game.background_image} alt={game.name} />
      <p>{game.description_raw || 'No description available.'}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

export default GameDetails;
