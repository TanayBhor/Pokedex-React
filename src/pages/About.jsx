import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom';
import typeStyles from '../typeStyles.json'
import '../styles/About.css'

const About = () => {

  const pokemon = useOutletContext();

  const [weaknesses, setWeaknesses] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!pokemon) return;

    const fetchTypeRelations = async () => {
      const typeUrls = pokemon.types.map(t => t.type.url);

      const relations = await Promise.all(
        typeUrls.map(url => fetch(url).then(res => res.json()))
      );

      const weakSet = new Set();
      const strongSet = new Set();

      relations.forEach(type => {
        type.damage_relations.double_damage_from.forEach(({ name }) => weakSet.add(name));
        type.damage_relations.double_damage_to.forEach(({ name }) => strongSet.add(name));
      });

      setWeaknesses([...weakSet]);
      setStrengths([...strongSet]);
    };

    fetchTypeRelations();
  }, [pokemon]);

  useEffect(()=>{
    const fetchDescription = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`);
    const data = await res.json();

    const englishEntry = data.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );

    setDescription(englishEntry?.flavor_text.replace(/\f/g, ' ') || 'No description available.');
  };

  fetchDescription();
}, [pokemon]);

  if (!pokemon) return null;

  return (
    <div className='about-container'>
      <h2>{description}</h2>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Type: {pokemon.types[0].type.name}</p>
      <br />

      <h3>Strengths</h3>

      <div className="types-list">

        {strengths.map(type => (
          <span 

          className={`type-badge type-${type}`} 
          key={type}
          style={{ 

              backgroundColor: typeStyles.colors[type]

            }}>

            {type}

          </span>

        ))}

      </div>

      <h3>Weaknesses</h3>
      <div className="types-list">
        {weaknesses.map(type => (
          <span 
          className={`type-badge type-${type}`} 
          key={type}
          style={{ 

              backgroundColor: typeStyles.colors[type]

            }}>
            {type}
          </span>
        ))}
      </div>
    </div>
  )
}

export default About
