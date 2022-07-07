import axios from 'axios'
import React,{ useEffect,useState } from 'react'
import {useParams} from 'react-router-dom'
import './productDetail.css'
const ProductDetail = () => {
    const [product , setProduct ] = useState([])
    const { id } = useParams();
    useEffect(()=>{
         axios.get('https://codealo-commerce-cms.onrender.com/products', {params:{
            slug:id
         }}).then((res)=>{
            const { data } = res 
            setProduct( data )   
        })
    },[])

    useEffect(()=>{
        console.log(product[0])
    },[product])
    return (
        
        <div className="contain-page-productDetail">
        {product[0] &&
            <div className="container mt-5 mb-5 detail" >
                <div className="row d-flex justify-content-center">
                        <div className="col-md-10">
                            <div className="card detail">
                                <div className="row position-relative" >
                                    <div className="col-md-6 position-relative" >
                                        <div className="images p-3 position-relative">
                                            <div className="text-center p-4 position-relative " > 
                                                <img id="main-image" className="position-relative w-100" src={'https://codealo-commerce-cms.onrender.com'+product[0].image.url} /> 
                                            </div>
                                            {/* <div className="thumbnail text-center"> 
                                                <img onclick="change_image(this)" src="https://i.imgur.com/Rx7uKd0.jpg" width="70" /> 
                                                <img onclick="change_image(this)" src="https://i.imgur.com/Dhebu4F.jpg" width="70" /> 
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="col-md-6 data">
                                        <div className="product p-4">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center"> <i className="fa fa-long-arrow-left"></i> <span className="ml-1">
                                                    {'<- Back'}    
                                                </span> </div> <i className="fa fa-shopping-cart text-muted"></i>
                                            </div>
                                            <div className="mt-4 mb-3"> 
                                                <h5 className="text-uppercase">{product[0].title}</h5>
                                                <div className="price d-flex flex-row align-items-center"> 
                                                {/* <span className="act-price">$20</span> */}
                                                    <div className="ml-2"> 
                                                        {/* <small className="dis-price">$59</small>  */}
                                                        <span>{product[0].price} $</span> 
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="about">
                                                {product[0].description}
                                            </p>
                                            <div className="sizes mt-5">
                                                <h6 className="text-uppercase">Category</h6>
                                                
                                                 <label className="radio"> 
                                                <input type="radio" name="size" value={product[0].categories[0].name} disabled /> 
                                                <span>{product[0].categories[0].name}</span> 
                                                </label> <label className="radio"> 
                                                <input type="radio" name="size" value={product[0].categories[0].slug} disabled />
                                                <span>{product[0].categories[0].slug}</span> </label> 
                                                
                                                {/* <label className="radio"> 
                                                <input type="radio" name="size" value="L" /> <span>L</span>  */}
                                               
                                                {/* </label> <label className="radio"> 
                                                <input type="radio" name="size" value="XL" /> <span>XL</span>
                                                 </label> <label className="radio">
                                                <input type="radio" name="size" value="XXL" /> <span>XXL</span> </label> */} 
                                            </div>
                                            <div className="cart mt-4 align-items-center"> <button className="btn btn-danger text-uppercase mr-2 px-4">Add to cart</button> <i className="fa fa-heart text-muted"></i> <i className="fa fa-share-alt text-muted"></i> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
        

    )
}
export default ProductDetail