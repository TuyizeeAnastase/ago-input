import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container=styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
text-align: center;
padding: 20px;
`;

const Heading=styled.h1`
font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Paragraph=styled.p`
font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin-bottom: 40px;
  font-family: 'Arial', sans-serif;
`;

const ButtonContainer=styled.div`
display:flex;
gap:20px;
`

const Button=styled(Link)`
padding: 15px 30px;
  font-size: 1.2rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
    transform: translateY(-3px);
  }

  &:active {
    background-color: #004494;
    transform: translateY(0);
  }
`;

const Home:React.FC=()=>{
    return (
        <Container>
            <Heading>Welcome to Agro-Input Store</Heading>
            <Paragraph>
            Our store provides high-quality seeds and fertilizers to help you achieve a bountiful harvest. 
        To order seeds and fertilizers, simply create an account or log in if you already have one. 
        After logging in, browse our catalog, select the products you need, and place your order. 
        We ensure fast and reliable delivery to your doorstep.
            </Paragraph>
            <ButtonContainer>
                <Button to="/login">Login</Button>
                <Button to="/signup">Signup</Button>
            </ButtonContainer>
        </Container>
    )
}

export default Home;