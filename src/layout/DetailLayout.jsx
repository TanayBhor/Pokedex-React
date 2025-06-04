import React from 'react'
import PokemonDetail from '../PokemonDetail'
import { NavLink, Outlet } from 'react-router-dom'

const DetailLayout = () => {
  return (
    <>
    <PokemonDetail />
    <div>
        <Outlet />
    </div>
    </>
  )
}

export default DetailLayout