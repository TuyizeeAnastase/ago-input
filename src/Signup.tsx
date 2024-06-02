import React,{useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container=styled.div`
 display:flex;
 flex-direction:column;
 align-items:center;
 justify-content:center;
 height:100vh;
 background:#f5f5f5;
`
const Heading = styled.h1`
  margin-bottom:20px;
`;

const Form = styled.form`
  display:flex;
  flex-direction:column;
  width:300px;
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

const SignUp:React.FC=()=>{
  const navigate=useNavigate();
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [role,setRole]=useState('')
  const [error,setError]=useState('')

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    try{
      await axios.post('http://localhost:4000/api/signup',{
        email,
        password,
        role
      });
      navigate('/login')
    }catch(err){
      setError('Invalid input')
    }
  }

    return (
        <Container>
          <Heading>Sign Up</Heading>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Form onSubmit={handleSubmit}>
          <Input value={email} onChange={(e)=>setEmail(e.target.value)} type='text' placeholder='Email'/>
          <Input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password'/>
          <Input value={role} onChange={(e)=>setRole(e.target.value)} type='text' placeholder='role'/>
          <Button type='submit'>Sign Up</Button>
          </Form>
        </Container>
    );
};

export default SignUp;