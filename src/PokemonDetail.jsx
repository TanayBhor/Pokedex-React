import { Navigate, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import './styles/PokemonDetail.css'
import { IoArrowBack } from "react-icons/io5";

const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => setPokemon(data));
  }, [name]);

  if (!pokemon) return;

  return (
    <>
      <div className='pokemon-detail-container'>

        <div className='back-button' onClick={() => navigate(`/`)}>
          <IoArrowBack className='back-button-icon'/>
        </div>

        <div className='pokemon-name'>
          <h1>{pokemon.name.toUpperCase()}</h1>
        </div>

        <div className='pokemon-gif'>
          <img src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} alt={pokemon.name} className="sprite-pixel"/>
        </div>
      </div>
      <Navigation />
      <Outlet context={pokemon} />
    </>
  );
};

export default PokemonDetail;
