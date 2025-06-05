import React from 'react'
import '../styles/Navigation.css'
import { NavLink } from 'react-router-dom'

export const Navigation = () => {
  return (
    <div className="navigation-container">
      <div className="navigation">
        <NavLink to='about'><p className="navigation-link">About</p></NavLink>
        <NavLink to='stats'><p className="navigation-link">Stats</p></NavLink>
        <NavLink to='evolution'><p className="navigation-link">Evolution</p></NavLink>
      </div>
    </div>
  )
}
