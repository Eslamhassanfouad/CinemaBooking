import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import logo from '../media/logo.png'

const schema=Yup.object().shape({
Email:Yup.string().required('Please enter your email'),
Password:Yup.string().required('Please enter your password ')

})
export  function Login() {
  const [error,setErrors]=useState("");
  let navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit=(data)=>{
    axios
    .post('http://localhost:8000/customer/login/',{
      username:data.Email,
      password:data.Password

    })
    .then((res)=>{
      localStorage.setItem('token',res.data.access)
      navigate('/home')
    })
    .catch((err)=>{
      setErrors(err.response.data.detail)
    })

  }

  return (
    <div >
      <img className='d-flex' src={logo} style={{width:'150px',height:'92px',marginLef:'10px'}}/>
           <Form onSubmit={handleSubmit(submit)} className='d-flex justify-content-center align-items-center  '
           style={{flexDirection:'column',textAlign:'center'}}>
            <h2>Sign In</h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='mt-3'>Email</Form.Label>
        <Form.Control style={{textAlign:'center'}} type="email" placeholder="Enter email"
        {...register('Email')}
        isInvalid={!!errors.Email}
        />
         <Form.Control.Feedback type="invalid">
                {errors.Email?.message}
              </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control style={{textAlign:'center'}} type="password" placeholder="Password"
        {...register('Password')}
        isInvalid={!!errors.Password}
        />
        <Form.Control.Feedback type="invalid">
                {errors.Password?.message}
              </Form.Control.Feedback>
      </Form.Group>
   
      <Button className='mb-3' variant="primary" type="submit">
        Submit
      </Button>
      {error && <p className="text-danger">{error}</p>}
      <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
      
    </Form>
    </div>
  )
}
