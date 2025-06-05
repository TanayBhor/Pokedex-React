import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { Navigation } from '../../components/Navigation';
import gsap from 'gsap';
import '../../styles/PokemonDetail.css';
import typeStyles from '../../typeStyles.json'

const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const detailRef = useRef(null);
  

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => setPokemon(data));
  }, [name]);

  useEffect(() => {
    if (detailRef.current) {
      gsap.fromTo(
        detailRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [pokemon]);

  const handleBack = () => {
    if (detailRef.current) {
      gsap.to(detailRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => navigate('/')
      });
    } else {
      navigate('/');
    }
  };
  
  if (!pokemon) return null;

  return (
    <div className="detail-overlay">
      <div className="detail-card" ref={detailRef}>
        <div className="detail-header"
          style={{
            background: typeStyles.gradients[pokemon.types[0].type.name]
          }}>
          <div className="back-button" onClick={handleBack}>
            <IoArrowBack className="back-button-icon" />
          </div>

          <div className="pokemon-info">
            <h1>{pokemon.name.toUpperCase()}</h1>
            <img
              src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default}
              alt={pokemon.name}
              className="sprite-pixel"
            />
          </div>
        </div>

        <div className="detail-content">
          <Navigation />
          <Outlet context={pokemon} />
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
