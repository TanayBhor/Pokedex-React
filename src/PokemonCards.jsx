import './PokemonCards.css'
import './index.css'


export const PokemonCards = ({pokemonData})=>{
  
    return(
        <li className='individual-pokemon-card'>
            

            <figure className='pokemon-image-container'> {/*pokemon image */}

                <div className='svg-container'> {/*svg file*/}

                  <img src="./assets/star-line.svg" alt="" />

                </div>

                <img className='pokemon-image' src={pokemonData.sprites.other.dream_world.front_default} alt="" />

            </figure>

            <div className='pokemon-name'> {/*Pokemon Name */}
              <h1>{pokemonData.name.toUpperCase()}</h1>
            </div>

            <div className='types-container'>  {/*pokemon type */}

                {pokemonData.types.length === 1 ? (

                  <p>
                    {pokemonData.types[0].type.name.toUpperCase()}
                  </p>

                ) : (

                pokemonData.types.map((type, index) => (

                  <p key={index}>
                    {type.type.name.toUpperCase()}
                  </p>
                  
                ))

                )}

            </div>

        </li>
    )
  }