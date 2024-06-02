import React,{useState,useEffect} from "react";
import axios from 'axios'
// import './App.css'
// import './css/OrderForm.css'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

interface Seed{
    id:number;
    name:string;
}

interface Fertilizer{
    id:number;
    name:string;
}

const Container = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 50px auto;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-3px);
  }

  &:active {
    background-color: #004494;
    transform: translateY(0);
  }
`;

const OrderForm:React.FC=()=>{
    const [landSize,setLandSize]=useState<number>(0);
    const [seeds,setSeeds]=useState<Seed[]>([]);
    const [fertilizers,setFertilizers]=useState<Fertilizer[]>([]);
    const [selectedSeedId,setSelectedSeedId]=useState<number | null>(null);
    const [selectedFertilizerId,setSelectedFertilizerId]=useState<number | null>(null);
    const [quantitySeed,setQuantitySeed]=useState<number>(0);
    const [quantityFertilizer,setQuantityFertilizer]=useState<number>(0);
    const navigate=useNavigate();


    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const seedsRes=await axios.get('http://localhost:4000/api/seeds');
                const fertilizersRes=await axios.get('http://localhost:4000/api/fertilizers');
                setSeeds(seedsRes.data);
                setFertilizers(fertilizersRes.data);
        }catch(error){
            console.log(error)
        }
    };
    fetchData();
},
[]);

useEffect(()=>{
    if(landSize<1){
        setQuantitySeed(1);
    }
    else{
        setQuantitySeed(landSize*3);
    }
    setQuantityFertilizer(landSize*1);
},[landSize]);

const handleSubmit=async(event:React.FormEvent)=>{
    event.preventDefault();
    if(selectedSeedId === null || selectedFertilizerId === null){
        alert('Please select both seed and fertilizer');
        return;
    }
    const orderData={
        seedId:selectedSeedId,
        fertilizerId:selectedFertilizerId,
        quantity_seed:quantitySeed,
        quantity_fertilizer:quantityFertilizer
    };

    try{
        const token=localStorage.getItem('token');
        if(!token){
            throw new Error('No token found')
        }
        const response=await axios.post('http://localhost:4000/api/order',orderData,
            {
                headers:{
                    authorization:token,
                }
            }
        );
        console.log('Order submited',response.data);
        navigate('/order');
    }catch(error){
        console.error(error)
    }
};
return (
    <Container className="order-form-container">
        <Title>Order Seeds and Fertilizers</Title>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>
                Land Size(in acres):
                <Input type="number" value={landSize} onChange={(e)=>setLandSize(Number(e.target.value))} required />
            </Label>
          </div>
          <div>
            <Label>Select Seed:
                <Select value={selectedSeedId ?? ''} onChange={(e)=>setSelectedSeedId(Number(e.target.value))} required >
                    <option value="" disabled>Select a seed</option>
                    {seeds.map(seed => (
                        <option key={seed.id} value={seed.id}>{seed.name}</option>
                    ))}
                </Select>    
            </Label>
          </div>
          <div>
            <Label>Select Fertilizer:
                <Select value={selectedFertilizerId ?? ''} onChange={(e)=>setSelectedFertilizerId(Number(e.target.value))} required>
                    <option value="" disabled>Select fertilizer</option>
                    {fertilizers.map(fertilizer=>(
                        <option key={fertilizer.id} value={fertilizer.id}>{fertilizer.name}</option>
                    ))}
                </Select>
            </Label>
          </div>
          <div>
            <Label>Seed Quantity:{quantitySeed}</Label>
          </div>
          <div>
            <Label>
                Fertilizere Quantity:{quantityFertilizer}
            </Label>
          </div>
          <Button type="submit">Submit order</Button>
        </Form>
    </Container>
);
};

export default OrderForm;
