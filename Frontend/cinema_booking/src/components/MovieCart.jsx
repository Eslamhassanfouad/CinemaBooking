import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import home1 from '../img/home/home1.jpg'


export function MovieCart() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };


  let [movies, setMovies] = useState([]);
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    axios
      .get('http://localhost:8000/movie/movies/')
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='container' style={{justifyContent:'center',alignItems:'center '}}>
      <Carousel  responsive={responsive} ssr={true} infinite={true} autoPlay={true} autoPlaySpeed={3000} keyBoardControl={true} customTransition="transform 500ms ease-in-out">
        {movies.map((movie) => {
          return (
            <Card
              key={movie.id}
              style={{ width: '14rem', margin: '10px', border: '0px', backgroundColor: '#212529' }}>
              <Card.Img variant='top' src={movie.poster_path} />
              <Card.Body
                className='d-flex '
                style={{
                  padding: '0px',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  backgroundColor: '#212529',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
                }}>
                <Card.Title className='mt-3 text-light'>{movie.title}</Card.Title>
                <div className='d-flex ' style={{ justifyContent: 'space-evenly', color: '#ffa500' }}>
                  {movie.category.map((cat) => {
                    return <p key={cat.id}>{`${cat.name},`}</p>;
                  })}
                </div>
                <Button style={{ backgroundColor: '#212529', border: '2px solid #ffa500' }}>Movie Details</Button>
              </Card.Body>
            </Card>
          );
        })}
      </Carousel>
    </div>
  );
}