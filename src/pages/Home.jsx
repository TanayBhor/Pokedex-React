import { useEffect, useState } from 'react'
import '../styles/Home.css'
import { PokemonCards } from '../components/PokemonCards'
import Navbar from '../components/Navbar'
import { CgPokemon } from "react-icons/cg";
import Loading from '../pages/Loading';

export const Home = () => {

    const [pokemon, setPokemon] = useState([]) // manages pokemon state
    const [loading, setLoading] = useState(true) // manages loading state
    const [error, setError] = useState(null) // manages error state
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(0)

    const API = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${page}`


    useEffect(() => {
        async function fetchPokemon() {
            try {
                const res = await fetch(API)
                const data = await res.json()

                const detailedPokemonData = data.results.map(async (curPokemon) => {
                    const res = await fetch(curPokemon.url)
                    const data = await res.json()

                    return data;
                })

                const detailedResponses = await Promise.all(detailedPokemonData);
                setPokemon((prev) => [...prev, ...detailedResponses])

                setTimeout(() => {
                setLoading(false)
                }, 500)

            } catch (error) {
                console.log(error);
                setLoading(false)
                setError(error)
            }
        }
        fetchPokemon()
    }, [page])

    const handleInfiniteScroll = async () => {
        try {

            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setPage((prev) => prev + 30)
            }

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll)
        return () => window.removeEventListener('scroll', handleInfiniteScroll)
    }, [])


    const searchData = pokemon.filter((currPokemon) => {
        return currPokemon.name.toLowerCase().includes(search.toLowerCase())
    })

    if (loading) return <Loading />;
    if (error) return <h1>{error.message}</h1>;

    return (
        <>
            <section className='main-container'>

                <ul className="cards">
                    {
                        searchData.map((currentPokemon) => {
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