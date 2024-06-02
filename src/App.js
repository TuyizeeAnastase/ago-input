import React from "react";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import SignUp from "./Signup.tsx";
import Login from "./Login.tsx";
import Order from './Order.tsx'
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import OrderForm from "./OrderForm.tsx";
import Home from "./Home.tsx";
import './App.css'

function App() {
  return (
    <Router>
    <div className="app">
    <Header />
    <main>
    <Routes>
    <Route path="/" exact element={<Home />} />
    <Route path='/signup' element={<SignUp/>} />
    <Route path='/login' element={<Login/>}/>
    <Route path='/order' element={<Order/>}/>
    <Route path='/order_request' element={<OrderForm/>}/>
    </Routes>
    </main>
    <Footer />
    </div>
    </Router>
  );
}

export default App;
