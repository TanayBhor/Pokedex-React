import { useEffect, useState } from 'react';
import '../styles/PokemonCards.css'
import '../styles/index.css'
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import typeStyles from '../typeStyles.json'

export const PokemonCards = ({ pokemonData }) => {

  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false);

  const getTypeId = (typeName) => {
    const typeMap = {
      normal: 1,
      fighting: 2,
      flying: 3,
      poison: 4,
      ground: 5,
      rock: 6,
      bug: 7,
      ghost: 8,
      steel: 9,
      fire: 10,
      water: 11,
      grass: 12,
      electric: 13,
      psychic: 14,
      ice: 15,
      dragon: 16,
      dark: 17,
      fairy: 18
    };
    return typeMap[typeName];
  };

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    setIsFavourite(favs.includes(pokemonData.name));
  }, [pokemonData.name]);

  const toggleFavourite = (e) => {
    e.stopPropagation();
    let favs = JSON.parse(localStorage.getItem('favourites')) || [];
    if (favs.includes(pokemonData.name)) {
      favs = favs.filter(name => name !== pokemonData.name);
    } else {
      favs.push(pokemonData.name);
    }
    localStorage.setItem('favourites', JSON.stringify(favs));
    setIsFavourite(!isFavourite);
  };


  return (
    <li className='individual-pokemon-card'
      onClick={() => navigate(`/pokemon/${pokemonData.name}`)}
      style={{ 
        background: typeStyles.gradients[pokemonData.types[0].type.name], 
        boxShadow: typeStyles.boxShadow[pokemonData.types[0].type.name]
      }}
    >

      <button 
      onClick={toggleFavourite} 
      className={`favourite-btn ${isFavourite ? 'beat' : ''}`}>

        {isFavourite ? <IoMdHeart fill='#e63946' /> : <IoMdHeartEmpty fill='#444444'/> }

      </button>

      <figure className='pokemon-image-container'> {/*pokemon image */}
        <img className='pokemon-image' src={pokemonData.sprites.other.dream_world.front_default} alt="" />
      </figure>

      <div className='pokemon-details'>

        {/* <div className='pokemon-namee'> */}
          <h1>{pokemonData.name.toUpperCase()}</h1>
        {/* </div> */}

        <div className='types-container'>
          {pokemonData.types.map((type, index) => {
            const typeName = type.type.name.toLowerCase();
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${getTypeId(typeName)}.png`;

            return (
              <img
                key={index}
                src={imageUrl}
                alt={typeName}
                className='type-icon'
                style={{
                  height: '1.4rem',
                  marginBottom: '1.5rem',
                }}
              />
            );
          })}
        </div>
      </div>
    </li>
  )
}