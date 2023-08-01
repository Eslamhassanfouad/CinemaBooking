import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export  function MovieCart() {
let [movies,setMovies]=useState([])
let navigate=useNavigate()
let location=useLocation()

 useEffect(()=>{
  axios
  .get("http://localhost:8000/movie/movies/")

  .then((res)=>{

    // console.log(res.data);
    
    setMovies(res.data)
  })
  .catch((err)=>{
    console.log(err);
  })
},[])
console.log(movies);



  return (
    <div className='w-100 d-flex flex-wrap justify-content-center '>
      {movies.map((movie)=>{
        return(
          <Card   style={{ width: '14rem',margin:'10px',border:'0px' }}>
      <Card.Img  variant="top" src={movie.poster_path} />
      <Card.Body className='d-flex' style={{padding:'0px',flexDirection:'column',alignItems:'flex-start',justifyContent:'space-between',backgroundColor:'#212529'}}>
        <Card.Title className='mt-3 text-light'>{movie.title}</Card.Title>
        {/* <Card.Text style={{overflow:'scroll',height:'80px'}}>
          {movie.description}
        </Card.Text> */}
        <Button style={{backgroundColor:'#212529',border:'2px solid #ffa500'}} >Movie Details</Button>
      </Card.Body>
    </Card>


        )
      })}
    </div>
  )
}

