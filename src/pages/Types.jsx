import React from 'react'
import '../styles/Types.css'
import { NavLink } from 'react-router-dom'

const Types = () => {

  const types = []

  const typeNames = [
  'normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
  'bug', 'ghost', 'steel', 'fire', 'water', 'grass',
  'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'
];


  for(let i=1; i<=18; i++){
    const typeApi = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${i}.png`

    types.push({
    name: typeNames[i - 1],
    image: typeApi
  });
  }

  return (
    <div className='types-page-container'>
      <div className='types-grid'>
      
          {types.map((type, index) => {
            return (
              <NavLink to={`/type/${type.name}`} key={index}>
                <img
                src={type.image}
                alt={type.name}
                className='type-icon'
              /></NavLink>
            );
          })}
      </div>
    </div>
  )
}

export default Types