import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar,Nav,Container } from 'react-bootstrap'
import { MovieCart } from './MovieCart'


export  function Home() {
  return (
    <div   >
    <div className='d-flex  align-items-center' style={{backgroundColor:'#212529',height:'80px',justifyContent:'flex-start'}}>

      <h3  style={{color:'white',fontFamily:'sans-serif',fontWeight:'bolder',margin:'0',marginLeft:'20px'}}><span style={{color:'#ffa500'}}>HOT</span>FLIX</h3>

     </div >
    <div style={{backgroundColor:'#212529'}}>
    <MovieCart/>
    </div>

    </div>
  )
}
