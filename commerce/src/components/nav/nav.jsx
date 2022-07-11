import React,{ useEffect,useState } from 'react'
import './nav.css'
import { Link,useNavigate } from "react-router-dom";
const Nav = () =>{ 
    const [seed,setSeed]=useState(window.sessionStorage.getItem('seed'))
    const navigate = useNavigate()
    useEffect(()=>{
        setSeed(JSON.parse(seed))
    },[window.sessionStorage.getItem('seed')])
    
    function activeLink(idLink){
        document.getElementById(idLink).classList.add('active','bg-dark')
        let active = document.getElementsByClassName('active')
        active[0] && active[0].classList.contains('bg-dark')? active[0].classList.remove('bg-dark','active') : console.log('');
    }
    function logout(idLink){
        activeLink(idLink)
        window.sessionStorage.clear()
        navigate('/')
        window.location.reload()
    }
    useEffect(()=>{
    },[seed])
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark position-fixed">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Logo</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav nav-tabs ul-nav" role="tablist">

                            <li className="nav-item" onClick={()=> activeLink("3")}>
                                <Link  to={'/products'} 
                                        className="nav-item nav-link" 
                                        id="3" 
                                        data-toggle="tab"
                                        role="tab" 
                                        aria-controls="contact" 
                                        aria-selected="false"
                                        
                                        >
                                Products
                                </Link>
                            </li>

         
  

                            <li className="nav-item" onClick={()=> activeLink("4")}>
                                <Link  to={'/createOrder'} 
                                        className="nav-link" 
                                        id="4" 
                                        data-toggle="tab" 
                                        role="tab" 
                                        aria-controls="contact" 
                                        aria-selected="false"
                                >
                                    shopping cart
                                </Link>
                            </li>
                            {!seed &&
                                <li className="nav-item" onClick={()=> activeLink("0")}> 
                                    <Link  to={'/SignIn'}  className="nav-item nav-link" onClick={()=> activeLink(0)}
                                        id="0" 
                                        data-toggle="tab"
                                        data-index  
                                        role="tab" 
                                        aria-controls="home" 
                                        aria-selected="true"
                                    > Sign In
                                    </Link>
                                </li>
                            }
                            {!seed &&
                                <li className="nav-item" onClick={()=> activeLink("1")}>
                                    <Link  to={'/'} 
                                            className="nav-item nav-link" 
                                            id="1" 
                                            data-toggle="tab" 
                                            role="tab" 
                                            aria-controls="profile" 
                                            aria-selected="false"
                                            >
                                                Login
                                    </Link>
                                </li>
                            }
                        {seed &&
                            <li className="nav-item" onClick={()=> activeLink("5")}>
                                <Link  to={'/previousPurchases'} 
                                        className="nav-link" 
                                        id="5" 
                                        data-toggle="tab" 
                                        role="tab" 
                                        aria-controls="contact" 
                                        aria-selected="false"
                                >
                                    Previous purchases
                                </Link>
                            </li>
                        }

                        {seed &&
                            <li className="nav-item" onClick={()=>logout("2")}>
                                <a  className="nav-link" 
                                    id="2" 
                                    data-toggle="tab" 
                                    href="#profile" 
                                    role="tab" 
                                    aria-controls="profile" 
                                    aria-selected="false">Sign Off</a>
                            </li>
                        }


                </ul>
                </div>
            </div>
        </nav>
    )
}
export default Nav