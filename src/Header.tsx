import React from 'react';
import './css/Header.css';

const Header:React.FC=()=>{
    return (
        <header className="header">
            <nav className="navbar">
                <div className="logo">MyApp</div>
                <ul className="nav-links">
                <li><a href='/'>Home</a></li>
                <li><a href='/login'>Login</a></li>
                <li><a href='signup'>Signup</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;