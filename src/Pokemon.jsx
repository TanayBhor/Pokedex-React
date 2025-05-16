import { useEffect, useState } from 'react'
import './index.css'

export const Pokemon = () => {

    const[pokemon, setPokemon] = useState([])
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState(null)

    const API = 'https://pokeapi.co/api/v2/pokemon?limit=10'

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
            console.log(detailedResponses);
            setPokemon(detailedResponses)
            setLoading(false)
            
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(error)
        }
    }

    useEffect(()=>{
        fetchPokemon()
    },[])

    return(
        <>
            <section className='container'>

                <header>
                    <h1>Let's catch Pokémon</h1>

                    <div>{pokemon.map((e)=>{
                        return(
                            <img src={e.sprites.other.dream_world.front_default} alt="" />
                        )
                    })}</div>
                </header>

            </section>
        </>
    )
}