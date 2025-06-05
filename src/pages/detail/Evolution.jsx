import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/Evolution.css';

const Evolution = () => {
  const pokemon = useOutletContext();
  const [evolutionChain, setEvolutionChain] = useState([]);

  // pokemonData.sprites.other.dream_world.front_default

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        // Step 1: Get species data
        const speciesRes = await fetch(pokemon.species.url);
        const speciesData = await speciesRes.json();
        console.log(pokemon)
        // Step 2: Get evolution chain data
        const evolutionRes = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionRes.json();

        // Step 3: Parse evolution chain recursively
        const chain = [];
        const traverseChain = (node) => {
          if (!node) return;
          chain.push(node.species.name);
          if (node.evolves_to.length > 0) {
            traverseChain(node.evolves_to[0]); // Assumes linear evolution
          }
        };

        traverseChain(evolutionData.chain);

        // Step 4: Get sprite image for each Pokémon
        const detailedChain = await Promise.all(
          chain.map(async (name) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await res.json();
            return {
              name: data.name,
              image: data.sprites.other.dream_world.front_default,
            };
          })
        );

        setEvolutionChain(detailedChain);
      } catch (error) {
        console.error('Failed to load evolution chain:', error);
      }
    };

    if (pokemon) fetchEvolutionChain();
  }, [pokemon]);

  if (!pokemon) return null;

  return (
    <div className="evolution-container">
      {evolutionChain.map((poke, index) => (
        <React.Fragment key={poke.name}>
          <div className="evolution-item">
            <img src={poke.image} alt={poke.name} />
            <p>{poke.name}</p>
          </div>
          {index < evolutionChain.length - 1 && <span className="arrow">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Evolution;
