import React from 'react'
import load from '../assets/load.gif'
import '../styles/Loading.css'

const Loading = () => {
  return (
    <div className='loading-screen'>
        <img src={load} alt="" />
    </div>
  )
}

export default Loading