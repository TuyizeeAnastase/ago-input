import React from 'react';
import styled from 'styled-components';
import OrdersTable from './OrdersTable.tsx';

const Container=styled.div`
display:flex;
flex-direction:column;
height:100vh;
background:#f5f5f5;
`

const Order:React.FC=()=>{
    return(
        <Container>
        <OrdersTable/>
        </Container>
    )
}

export default Order;