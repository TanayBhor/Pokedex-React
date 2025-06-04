import { useState } from 'react';
import './styles/PokemonCards.css'
import './styles/index.css'
import { RiStarLine, RiStarFill } from 'react-icons/ri';
import { GoStar, GoStarFill } from "react-icons/go";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import typeStyles from './typeStyles.json'


export const PokemonCards = ({ pokemonData }) => {

  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  return (
    <li className='individual-pokemon-card'
      onClick={() => navigate(`/pokemon/${pokemonData.name}`)}>

      <div className='svg-container'>

        <div
          onClick={() => setClicked(!clicked)}
          style={{ cursor: 'pointer' }}
          className={`${clicked ? "beat" : ""}`}
        >
          {clicked ? (
            <IoMdHeart size={30} color="#F10C45" border="1px solid black" />
          ) : (
            <IoMdHeartEmpty size={30} color="black" />
          )}
        </div>

      </div>


      <figure className='pokemon-image-container'> {/*pokemon image */}

        <img className='pokemon-image' src={pokemonData.sprites.other.dream_world.front_default} alt="" />

      </figure>

      <div className='pokemon-details'>

        <div className='pokemon-namee'> {/*Pokemon Name */}
          <h1>{pokemonData.name.toUpperCase()}</h1>
        </div>

        <div className='types-container'>  {/*pokemon type */}

          {pokemonData.types.map((type, index) => (

            <p
              key={index}
              style={{
                backgroundColor: typeStyles.colors[type.type.name.toLowerCase()]
              }}>

              {type.type.name.toUpperCase()}

            </p>

          ))}

        </div>

      </div>

    </li>
  )
}