import axios from 'axios'
import React,{ useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom";
import {useParams} from 'react-router-dom'
import exInt from '../../helpersExp/expNumberInt';
import './productDetail.css'
const ProductDetail = () => {
    const [product , setProduct ] = useState([])
    const [myCarts,setMyCarts] = useState([])
    const [shoppingCart,setShoppinCart] = useState(window.localStorage.getItem('shoppingCart'))
    const [form,setForm] = useState({product:{id:''},quantity:1})
    const [loading,setLoading]= useState(true)
    const [status,setStatus] = useState(0)
    const navigate = useNavigate()
    const { id } = useParams();
    useEffect(()=>{
        
        axios.get('https://codealo-commerce-cms.onrender.com/products', {params:{
            slug:id
        }}).then((res)=>{
            const { data } = res 
            setForm({...form, product:{
                id:data[0].id
            }})
            setLoading(false)
            setProduct( data )   
        })

    },[])
    useEffect(()=>{
    },[product])
    useEffect(()=>{
        if(shoppingCart){
            axios.get('https://codealo-commerce-cms.onrender.com/carts/'+shoppingCart).then((res)=>{
                let {data} = res  
                let products_in_cart = []
                for (let i = 0; i < data.products_in_cart.length ;i++) {
                    products_in_cart.push(
                        {
                            product:{id:data.products_in_cart[i].product.id},
                            quantity:data.products_in_cart[i].quantity
                        }

                    )
                }
                setMyCarts(products_in_cart)
            })
        }
    },[])

    function addToCar(){
            myCarts.push(form)
            setMyCarts(myCarts)
            setLoading(true)
             if(shoppingCart){
                 axios.put('https://codealo-commerce-cms.onrender.com/carts/'+shoppingCart,
                {
                    products_in_cart:myCarts
                
                }
                
                ).then((res)=>{
                    console.log(res)
                    setLoading(false)
                 }).catch(err=>{
                    setStatus(400)
                 })
             }else{
                 axios.post('https://codealo-commerce-cms.onrender.com/carts',
                 {
                    products_in_cart:[
                        form
                    ]
                }
                 ).then(res=>{
                    let {data} = res
                    window.localStorage.setItem('shoppingCart',data.id)
                    setLoading(false)
                 }).catch(err=>{
                    setStatus(400)
                 })
             }

    }
    function redirect(url){
        if(url==='/#'){
            setStatus(0)
        }else{
            navigate(url)
        }
    }

    function handleChange(e,name){
        if(name=='quantity'  && e.target.value==''){
           return setForm({...form, [name]:0})
        }else if(name=='quantity' && exInt.test(parseInt(e.target.value))){
            let num = parseInt(e.target.value)
            document.getElementById('quantity').value = num
            form.quantity = num
            setForm({...form, [name]:num})
        }
    }
   useEffect(()=>{
   },[form])
    return (
        
        <div className="contain-page-productDetail">

            

                <div className="modal-class modal fade m-5" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" >
                            <button type="button" onClick={()=>redirect('/#')}  className="close w-25 ms-auto" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {status!=400 &&
                                    <p>Se a agregado de manera exitosa</p>
                                }
                                {status===400 &&
                                    <p>Error</p>
                                }

                            </h5>
                        </div>
                        <div className="modal-body">
                                {status!=400 &&
                                        <p>Se agrego al carrito de compras con exito</p>
                                }
                                {status===400 &&
                                    <p>Lo sentimos ocurrio un error</p>
                                }
                        </div>
                        <div className="modal-footer">
                       
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>redirect('/#')}>Close</button>
                            <button type="button" className="btn btn-primary"  data-dismiss="modal" onClick={()=>redirect('/createOrder')}> 
                                Ver carrito de compras
                            </button>
                       


                            <button type="button" className="btn btn-primary"  data-dismiss="modal" onClick={()=>redirect('/products')}> 
                                Ver mas productos
                            </button>
                        </div>
                        </div>
                    </div>
                </div>

            {loading?
            <>
                <p className="loading delete-margin">cargando...</p>
            </>:
            <>           
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
                                                <div className="d-flex align-items-center" onClick={()=>{redirect('/')}}> 
                                                    <i className="fa fa-long-arrow-left"></i> 
                                                    <span className="ml-1">
                                                        {'<- Back'}    
                                                    </span> 
                                                </div> 
                                                <i className="fa fa-shopping-cart text-muted"></i>
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
                                            <br />
                                            <label for="quantity">Quantity</label>
                                            <br />
                                            <br />
                                            <input  type="number" 
                                                    value={form.quantity}
                                                    onInput={(e)=>handleChange(e,'quantity')} 
                                                    className="form-control" 
                                                    id="quantity"   />

                                            <div className="cart mt-4 align-items-center"> 
                                                <button className="btn btn-danger text-uppercase mr-2 px-4" data-toggle="modal" data-target="#exampleModal" onClick={addToCar}>Add to cart</button> 
                                                <i className="fa fa-heart text-muted"></i> <i className="fa fa-share-alt text-muted"></i> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }           
             </>

            }
        </div>
        

    )
}
export default ProductDetail
