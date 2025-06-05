import { useEffect, useRef, useState } from 'react'
import '../styles/Navbar.css'
import { IoIosSearch } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { SiPokemon } from "react-icons/si";
import { FaFire } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const Navbar = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [search, setSearch] = useState('')
    const [allPokemon, setAllPokemon] = useState([])
    const [suggestions, setSuggestions] = useState([])

    const handleToggle = () => {
        setIsExpanded(prev => !prev);
    };

    { console.log("Suggestions:", allPokemon) }
    { console.log("Suggestions:", search) }
    { console.log("Suggestions:", suggestions) }

    const handleSuggestionClick = (name) => {
        setSearch(name)
        setSuggestions([])
    }


    useEffect(() => {
        async function fetchPokemonList() {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
            const data = await res.json()
            const names = data.results.map(p => p.name)
            setAllPokemon(names)
        }
        fetchPokemonList()
    }, [])

    useEffect(() => {

        if (search.trim() === '') {
            setSuggestions([])
            return
        }

        const filtered = allPokemon.filter(name =>
            name.toLowerCase().startsWith(search.toLowerCase())
        ).slice(0, 5)

        setSuggestions(filtered)

    }, [search, allPokemon])


    return (
        <>
            {/* <div className='app-logo-container'>
            <SiPokemon className='app-logo'/>
        </div> */}

            <header className='navbar-holder'>

                <div className="navbar-container">

                    <NavLink to={'/'}><GoHome className='home-logo' /></NavLink>

                    <div
                        className={`search-bar-container ${isExpanded ? 'expanded' : ''}`}
                        onClick={handleToggle}>

                        <div className="search-icon-wrapper">
                            <IoIosSearch className="svg" />
                        </div>

                        <div className="search-input-wrapper">
                            <input
                                type="text"
                                placeholder="Search"
                                onClick={e => e.stopPropagation()}
                                style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />

                        </div>
                        {isExpanded && suggestions.length > 0 && (
                            <ul className="suggestions-dropdown">
                                {suggestions.map((name, index) => (
                                    <li key={index} onClick={() => handleSuggestionClick(name)}>
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        )}

                    </div>

                    <NavLink to={'type'}><FaFire className='fire-logo' /></NavLink>
                    <NavLink to={'favourite'}><FaRegHeart className='fav-logo'/></NavLink>

                </div>



            </header>
        </>
    )
}

export default Navbar