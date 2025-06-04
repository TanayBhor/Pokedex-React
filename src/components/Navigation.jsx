import React from 'react'
import '../styles/Navigation.css'
import { NavLink } from 'react-router-dom'

export const Navigation = () => {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <NavLink to='about'><p className="nav-link">About</p></NavLink>
        <NavLink to='stats'><p className="nav-link">Stats</p></NavLink>
        <NavLink to='evolution'><p className="nav-link">Evolution</p></NavLink>
      </div>
    </div>
  )
}
