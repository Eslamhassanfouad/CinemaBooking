import { Button, Form } from 'react-bootstrap';
import React, { useState } from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../media/logo.png"


const schema=Yup.object().shape({
    
    Email:Yup.string()
    .required('Email required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Please enter a right format'),

    Phone:Yup.string()
    .required('Phone number is required')
    .matches(/01[0-2]\d{8}$/,'Not a valid number'),

    Password:Yup.string()
    .required('Password required')
    .min(6,'Enter at least 6 characters'),

    ConfirmPassword:Yup.string()
    .required('This field is required')
    .oneOf([Yup.ref("Password"),null],"Passwords must match")

})



export  function Register() {
    const navigate=useNavigate()

    const [error,setError]=useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ resolver: yupResolver(schema) });

      const Submit=(data)=>{
        axios
        .post('http://localhost:8000/customer/register/',{
            username:data.Email,
            phone:data.Phone,
            password:data.Password
            
            
        })
        
        .then((res)=>{
            localStorage.setItem('token',res.data.access);
            navigate('/login')
            console.log(res);

        })
        .catch((err)=>{
            setError(err.response.data.detail)
        })
        
      }

      console.log(errors);
  return (
    <div  >
          <img className='d-flex' src={logo} style={{width:'150px',height:'92px',marginLeft:'10px'}}/>
          <Form onSubmit={handleSubmit(Submit)} style={{flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center'}} className='d-flex'>
      <h2>Sign Up</h2>
      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control style={{textAlign:'center'}} type="email" placeholder="Enter email"
        {...register('Email')}
        isInvalid={!!errors.Email}
        />
          <Form.Control.Feedback type="invalid">
          {errors.Email?.message}
        </Form.Control.Feedback>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control style={{textAlign:'center'}} type="text" placeholder="Enter Phone Number"
          {...register('Phone')}
          isInvalid={!!errors.Phone}
        
        />
       <Form.Control.Feedback type="invalid">
          {errors.Phone?.message}
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



      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control style={{textAlign:'center'}} type="password" placeholder="Confirm Password"
        {...register('ConfirmPassword')}
        isInvalid={!!errors.ConfirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {errors.ConfirmPassword?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Button className='mb-3' variant="primary" type="submit">
        Submit
      </Button>
      <p>Already have an account? <Link to={'/login'}>Login</Link></p>
    </Form>
    </div>
  )
}
