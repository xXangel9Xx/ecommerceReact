import React from 'react'
import './nav.css'
import { Link } from "react-router-dom";
const Nav = () =>{ 

    function activeLink(idLink){
        let list = document.getElementsByClassName('nav-link')[idLink].classList.add('active','bg-dark')
        let active = document.getElementsByClassName('active')
        active[0] && active[0].classList.contains('bg-dark')? active[0].classList.remove('bg-dark','active') : console.log('');
    }
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark position-fixed">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Logo</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav nav-tabs ul-nav" role="tablist">
                        <li className="nav-item" onClick={()=> activeLink(0)}> 
                            <Link  to={'/SignIn'} >
                                <a  className="nav-link" 
                                    id="home-tab" 
                                    data-toggle="tab"  
                                    role="tab" 
                                    aria-controls="home" 
                                    aria-selected="true">Sign In</a>
                            </Link>

                        </li>
                        <li className="nav-item" onClick={()=> activeLink(1)}>
                            <Link  to={'/'} >
                                <a  className="nav-link" 
                                    id="profile-tab" 
                                    data-toggle="tab" 
                                    href="#profile" 
                                    role="tab" 
                                    aria-controls="profile" 
                                    aria-selected="false">Login</a>
                            </Link>
                        </li>
                        <li className="nav-item" onClick={()=> activeLink(2)}>
                                <a  className="nav-link" 
                                    id="profile-tab" 
                                    data-toggle="tab" 
                                    href="#profile" 
                                    role="tab" 
                                    aria-controls="profile" 
                                    aria-selected="false">Sign Off</a>
                        </li>
                        <li className="nav-item" onClick={()=> activeLink(3)}>
                            <Link  to={'/products'} >
                                <a  className="nav-link" 
                                    id="contact-tab" 
                                    data-toggle="tab"
                                    href="#contact" 
                                    role="tab" 
                                    aria-controls="contact" 
                                    aria-selected="false">Products
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item" onClick={()=> activeLink(4)}>
                            <Link  to={'/createProduct'} >
                                <a  className="nav-link" 
                                    id="contact-tab" 
                                    data-toggle="tab" 
                                    href="#contact" 
                                    role="tab" 
                                    aria-controls="contact" 
                                    aria-selected="false">Create products</a>
                            </Link>
                        </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}
export default Nav