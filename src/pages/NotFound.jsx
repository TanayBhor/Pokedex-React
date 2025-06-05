import React from 'react'
import errorGif from '../assets/error-gif.gif'
import '../styles/NotFound.css'

const NotFound = () => {
  return (
    <div className='wrong-nav'>
        <img src={errorGif} alt="" />
    </div>
  )
}

export default NotFound