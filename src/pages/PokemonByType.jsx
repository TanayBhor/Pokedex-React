import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonCards } from '../components/PokemonCards'; 

const PokemonByType = () => {
  const { typeName } = useParams();
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypeData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
        const data = await response.json();

        const pokemonOfType = data.pokemon.map((p) => p.pokemon);
        const limitedPokemon = pokemonOfType.slice(0, 30); // Optional limit

        const detailedData = await Promise.all(
          limitedPokemon.map(async (p) => {
            const res = await fetch(p.url);
            return res.json();
          })
        );

        setPokemonList(detailedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTypeData();
  }, [typeName]);

  return (
    <section className="type-pokemon-page">
      <h2>Pokémon of type: {typeName.charAt(0).toUpperCase() + typeName.slice(1)}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="type-pokemon-list">
          {pokemonList.map((pokemon) => (
            <PokemonCards key={pokemon.id} pokemonData={pokemon} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default PokemonByType;
