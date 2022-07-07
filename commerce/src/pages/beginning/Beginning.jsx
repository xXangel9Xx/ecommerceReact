import React, { useEffect,useState } from 'react'
import { Link }from 'react-router-dom'
import './beginning.css'
import axios from 'axios'
const Beginning = () => {
    const [products,setProducts] = useState([])
    useEffect(()=>{
        axios.get('https://codealo-commerce-cms.onrender.com/products',{
            params:{
                _limit:3
            }
        }).then(res=>{
            let {data} = res
           return setProducts(data)
        })
    },[])

    useEffect(()=>{
        console.log(products)
    },[products])
    return (
    <div className="contain-page">
        <div className="form-register">
        <form className='form'>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>

{/* /////////////////////////////////////////////// Carousel //////////////////////////////////////////////// */}
        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>


                {products.length > 0 &&
                    <div className="carousel-inner">

                        <div className="carousel-item active" data-bs-interval="10000">
                                <img  src={'https://codealo-commerce-cms.onrender.com'+ products[0].image.url} className="d-block height  w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{products[0].title}</h5>
                                <Link to={'/productDetail/'+products[0].slug} className={"btn btn-primary"}>
                                    Ver detalles
                                </Link>
                            </div>
                        </div>

                        
                        <div className="carousel-item" data-bs-interval="2000">
                            <img  src={'https://codealo-commerce-cms.onrender.com'+products[1].image.url} className="d-block  height w-100" alt="..." />
                                <div className="carousel-caption d-none d-md-block">
                                <h5>{products[1].title}</h5>
                                <Link to={'/productDetail/'+products[1].slug}  className={"btn btn-primary"}>
                                    Ver detalles
                                </Link>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img  src={'https://codealo-commerce-cms.onrender.com'+products[2].image.url} className="d-block  height w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{products[2].title}</h5>
                                <Link to={'/productDetail/'+products[2].slug}  className={"btn btn-primary"}>
                                    Ver detalles
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    )
}
export default Beginning;