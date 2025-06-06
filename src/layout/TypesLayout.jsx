import React from 'react'
import PokemonByType from '../pages/PokemonByType'
import { Outlet } from 'react-router-dom'
import Types from '../pages/Types'

const TypesLayout = () => {
  return (
    <>
    {/* <Types /> */}
    <div>
        <Outlet />
    </div>
    </>
  )
}

export default TypesLayout