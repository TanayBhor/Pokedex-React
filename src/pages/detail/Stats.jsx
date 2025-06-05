import React from 'react'
import { useOutletContext, useParams } from 'react-router-dom';
import '../../styles/Stats.css'

const Stats = () => {

  const pokemon = useOutletContext();

  if (!pokemon) return;

  return (
    <div className="stats-container">

      <div className="stats-list">

        {pokemon.stats.map((statObj, index) => {
          const statName = statObj.stat.name.replace('-', ' ');
          const statValue = statObj.base_stat;

          return (
            <div className="stat-item" key={index}>

              <div className="stat-label">
                {statName.toUpperCase()}
              </div>

              <div className="stat-value">
                {statValue}
              </div>

              <div className="stat-bar-wrapper">

                <div
                  className="stat-bar-fill"
                  style={{
                    width: `${Math.min(statValue, 100)}%`,
                    backgroundColor: statValue > 100 ? '#4CAF50' : '#2196F3',
                  }}
                />
                
              </div>

            </div>
          );
        })}

      </div>
    </div>
  )
}

export default Stats