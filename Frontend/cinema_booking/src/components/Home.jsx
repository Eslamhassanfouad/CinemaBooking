import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar,Nav,Container } from 'react-bootstrap'
import { MovieCart}  from './MovieCart'
import { Mynav } from './Mynav'
import '../CSS/mynav.css'


export  function Home() {
  return (
    <div   >
      <div>
    <Mynav/>
      </div>
    
    <div style={{backgroundColor:'#212529'}}>
    <MovieCart/>
    </div>

    </div>
  )
}
