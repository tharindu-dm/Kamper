import { Link } from 'react-router-dom'
import React from 'react'

const NavBar = () => {
    return (
        <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        </nav>
    )
}
    