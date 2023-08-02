import React from 'react'
import { Link } from 'react-router-dom'
import '../CSS/mynav.css'


export  function Mynav() {
  return (
    <div>
        <div className='main d-flex' style={{backgroundColor:'#212529',height:'80px',justifyContent:'flex-start',alignItems:'center'}}>

        <h3  style={{color:'white',fontFamily:'sans-serif',fontWeight:'bolder',margin:'0',marginLeft:'20px'}}><span style={{color:'#ffa500'}}>HOT</span>FLIX</h3>
           
              <Link className='link text-light' style={{marginLeft:'50px',textDecoration:'None'}} to='/home'>Home</Link> 
            
                <Link className='link text-light' style={{marginLeft:'10px',textDecoration:'None'}} to='/reservations'>Reservations</Link>

</div >
    </div>
  )
}
