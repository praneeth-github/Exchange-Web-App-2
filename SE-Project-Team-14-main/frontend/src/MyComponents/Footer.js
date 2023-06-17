import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div>
            <footer className="py-3 mt-4 bg-dark">
                <ul className="nav justify-content-center mb-3">
                <li className="nav-item"><Link to="/" className="nav-link px-5 text-white">Home</Link></li>
                <li className="nav-item"><Link to="/register" className="nav-link px-5 text-white">Register</Link></li>
                <li className="nav-item"><Link to="/login" className="nav-link px-5 text-white">Login</Link></li>
                <li className="nav-item"><Link to="/sell" className="nav-link px-5 text-white">Sell</Link></li>
                <li className="nav-item"><Link to="/discuss" className="nav-link px-5 text-white">Discussion Panel</Link></li>
                <li className="nav-item"><Link to="/faqs" className="nav-link px-5 text-white">FAQs</Link></li>
                </ul>
                <p className="text-center text-muted">© 2021 Company, Inc</p>
            </footer>
        </div>
    )
}
