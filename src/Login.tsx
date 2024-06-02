import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Container=styled.div`
 display:flex;
 flex-direction:column;
 align-items:center;
 justify-content:center;
 height:100vh;
 background:#f5f5f5
`
const Heading = styled.h1`
  margin-bottom:20px;
`;

const Form = styled.form`
  display:flex;
  flex-direction:column;
  width:300px
`;

const Input=styled.input`
margin-bottom:10px;
padding:10px;
font-size:16px
`
const Button=styled.button`
padding:10px;
font-size:16px;
background-color:#007bff;
color:white;
border:none;
cursor:pointer;
`
const ErrorMessage=styled.div`
color:red;
margin-bottom:10px;
`

const Login:React.FC =()=>{
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('')

    const handleLogin=async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
          const response=await axios.post('http://localhost:4000/api/login',{
            email,
            password
          });
          const {token}=response.data;
          localStorage.setItem('token',token)
          navigate('/order');
          }
        catch(err){
          setError('Invalid email or password')
        }
    }
        
    return (
        <Container>
        <Heading>Login</Heading>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleLogin}>
        <Input type='text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <Input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        <Button type='submit'>Login</Button>
        </Form>
        </Container>
    );
};

export default Login;