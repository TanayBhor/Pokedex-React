import { useEffect, useState } from 'react'
import './styles/Pokemon.css'
import { PokemonCards } from './PokemonCards'

export const Pokemon = () => {

    const[pokemon, setPokemon] = useState([]) // manages pokemon state
    const[loading, setLoading] = useState(true) // manages loading state
    const[error, setError] = useState(null) // manages error state
    const[search, setSearch] = useState('')
    const[page, setPage] = useState(0)

    const API = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${page}`


    useEffect(()=>{
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
                setPokemon((prev) => [...prev, ...detailedResponses])

                // setTimeout(() => {
                    setLoading(false)
                // }, 2000)
                
            } catch (error) {
                console.log(error);
                setLoading(false)
                setError(error)
            }
        }
        fetchPokemon()
    },[page])

    const handleInfiniteScroll = async()=>{
        try {

            if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
                setPage((prev) => prev + 30)
            }
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{
        window.addEventListener('scroll', handleInfiniteScroll)
        return ()=> window.removeEventListener('scroll', handleInfiniteScroll)
    },[])


    const searchData = pokemon.filter((currPokemon)=>{
        return currPokemon.name.toLowerCase().includes(search.toLowerCase())
    })

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

                <nav>

                    <div className='pokemon-input-container'>
                        <input className='pokemon-input' type="text" value={search} onChange={(e)=> setSearch(e.target.value)}/>
                    </div>

                    <div className='hamburger-icon'>
                        <img className='hamburger-icon' src="./assets/menu-fill.svg" alt="" />
                    </div>

                </nav>


                <ul className="cards">
                    {
                        searchData.map((currentPokemon)=>{
                            return (
                                <PokemonCards key={currentPokemon.id} pokemonData={currentPokemon} />
                            )
                        })
                    }
                </ul>

            </section>
        </>
    )
}