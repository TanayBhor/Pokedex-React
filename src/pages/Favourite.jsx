import { useEffect, useState } from 'react';
import { PokemonCards } from '../components/PokemonCards';
import '../styles/Favourite.css'

const Favourite = () => {
  const [favourites, setFavourites] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(favs);
  }, []);

  useEffect(() => {
    async function fetchFavPokemon() {
      const data = await Promise.all(
        favourites.map(async (name) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          return res.json();
        })
      );
      setPokemonList(data);
    }

    if (favourites.length > 0) fetchFavPokemon();
  }, [favourites]);

  return (
    favourites.length>0 ? 
    (<section className="fav-cards-container">
      <ul className="fav-cards">
        {pokemonList.map((p) => (
          <PokemonCards key={p.id} pokemonData={p} />
        ))}
      </ul>
    </section>) 
    : (<section className="fav-cards-container">
      <ul className="no-cards"><p>No fav</p></ul>
    </section>)
  );
};

export default Favourite;
