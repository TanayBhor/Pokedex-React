import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonCards } from '../components/PokemonCards';
import Loading from './Loading';

const PokemonByType = () => {
  const { typeName } = useParams();
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypeData = async () => {
      try {
        // setLoading(true);

        const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
        const data = await response.json();

        const pokemonOfType = data.pokemon.map(p => p.pokemon);
        // const limitedPokemon = pokemonOfType.slice(0, 30);

        // Fetch detailed data for each Pokémon
        const detailedData = await Promise.all(
          pokemonOfType.map(async (p) => {
            const res = await fetch(p.url);
            return await res.json(); // full object: name, sprites, types, etc.
          })
        );

        setPokemonList(detailedData);
        
          setLoading(false)

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTypeData();
  }, [typeName]);

  return (
    <div className='main-container'>
      <div className='cards'>
        {loading ? (
          <Loading />
        ) : (
          pokemonList.map((pokemon) => (
            <PokemonCards key={pokemon.id} pokemonData={pokemon} />
          ))
        )}
      </div>
    </div>
  );
};

export default PokemonByType;
