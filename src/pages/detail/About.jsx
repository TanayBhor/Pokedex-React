import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom';
import typeStyles from '../../typeStyles.json'
import '../../styles/About.css'

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

  useEffect(() => {
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

      <div className='pokemon-height'>
        <h3>Height</h3> <span>{pokemon.height}</span>
      </div>

      <div className='pokemon-weight'>
        <h3>Weight</h3> <span>{pokemon.weight}</span>
      </div>


      <div className="type-effectiveness">
        <div className="effectiveness-row">
          <h3>Strong against</h3>
          <div className="types-list">
            {strengths.map((type, i) => (
              <span
                className={`type-badge type-${type}`}
                key={`strong-${i}`}
                style={{ backgroundColor: typeStyles.colors[type] }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="effectiveness-row">
          <h3>Weak against</h3>
          <div className="types-list">
            {weaknesses.map((type, i) => (
              <span
                className={`type-badge type-${type}`}
                key={`weak-${i}`}
                style={{ backgroundColor: typeStyles.colors[type] }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default About
