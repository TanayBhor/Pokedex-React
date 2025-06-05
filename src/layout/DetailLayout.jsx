import React from 'react'
import PokemonDetail from '../pages/detail/PokemonDetail'
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