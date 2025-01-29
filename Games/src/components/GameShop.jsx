import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './GameShop.css';

function GameShop() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState('all');
  const apiKey = '50b08e21f28f47feacd53f489c0bf9d4';
  const navigate = useNavigate();  // Hook for navigation

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setCart(storedCart);
    setWishlist(storedWishlist);
  }, []);

  const fetchGameData = async () => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setGames(json.results);
      setError('');
    } catch (error) {
      setError('Unable to fetch data');
      console.error("Error fetching game data:", error);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  const handleAddToCart = (game) => {
    const newCart = [...cart, game];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleAddToWishlist = (game) => {
    const newWishlist = [...wishlist, game];
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  const handleGameClick = (game) => {
    navigate(`/game/${game.id}`, { state: { game } });
  };

  const filteredGames = games.filter(game => {
    if (filter === 'best-selling') return game.bestSelling;
    if (filter === 'trending') return game.trending;
    if (filter === 'free') return game.price === 0;
    return true;
  });

  return (
    <div className="container">
      <div className="header">
        <h1>Online Game Shop</h1>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All Games</option>
          <option value="best-selling">Best Selling</option>
          <option value="trending">Trending</option>
          <option value="free">Free</option>
        </select>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="card">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <div key={game.id} className="game-card">
              <img src={game.background_image} alt={game.name} onClick={() => handleGameClick(game)} />
              <h2 onClick={() => handleGameClick(game)}>{game.name}</h2>
              <p>Price: ${game.price || 'Free'}</p>
              <button onClick={() => handleAddToCart(game)}>Add to Cart</button>
              <button onClick={() => handleAddToWishlist(game)}>Add to Wishlist</button>
            </div>
          ))
        ) : (
          <p className="loading">No games found.</p>
        )}
      </div>
    </div>
  );
}

export default GameShop;
