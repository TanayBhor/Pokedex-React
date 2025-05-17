import { useEffect, useState } from 'react'
import './index.css'
import { PokemonCards } from './PokemonCards'

export const Pokemon = () => {

    const[pokemon, setPokemon] = useState([]) // manages pokemon state
    const[loading, setLoading] = useState(true) // manages loading state
    const[error, setError] = useState(null) // manages error state
    const[search, setSearch] = useState('')

    const API = 'https://pokeapi.co/api/v2/pokemon?limit=30'

    async function fetchPokemon(){
        try {
            const res = await fetch(API)
            const data = await res.json()

            const detailedPokemonData = data.results.map(async (curPokemon)=>{
                const res = await fetch(curPokemon.url)
                const data = await res.json()

                return data;
            })

            const detailedResponses = await Promise.all(detailedPokemonData);
            setPokemon(detailedResponses)

            setTimeout(() => {
                setLoading(false)
            }, 5000)
            
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(error)
        }
    }

    useEffect(()=>{
        fetchPokemon()
    },[])


    // const searchData = pokemon.filter((currPokemon)=>{
    //     return currPokemon.name.toLowerCase().includes(search.toLowerCase())
    // })

    if(loading){
        return(
            <div className='loading-container'>
                <h1>Loading...</h1>
            </div>
        )
    }

    if(error){
        return(
            <div>
                <h1>{error.message}</h1>
            </div>
        )
    }

    return(
        <>
            <section className='main-container'>

                <header>

                    <div className='pokemon-input-container'>
                        <input className='pokemon-input' type="text" />
                    </div>

                    {/* <div className='hamburger-icon'> */}
                        <img className='hamburger-icon' src="./assets/menu-fill.svg" alt="" />
                    {/* </div> */}

                </header>

                <div className='card-container'>

                    <ul className="cards">
                        {
                            pokemon.map((currentPokemon)=>{
                                return (
                                    <PokemonCards key={currentPokemon.id} pokemonData={currentPokemon} />
                                )
                            })
                        }
                    </ul>

                </div>

            </section>
        </>
    )
}