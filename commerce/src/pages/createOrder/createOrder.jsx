import React, { useState } from 'react';
import './createOrder.css'
import axios from 'axios'
import { useEffect } from 'react';
const CreateOrder = () => {
    const [seedUser,setSeedUser]=useState(window.sessionStorage.getItem('seed'))
    const [shoppingCart,setShoppinCart] = useState(window.localStorage.getItem('shoppingCart'))
    const [myCarts,setMyCarts] = useState([])
    const [send,setSend] = useState(false)
    const [loading,setLoading] = useState(true)

    useState(()=>{
        setSeedUser(JSON.parse(seedUser))
        if(shoppingCart){
            setLoading(true)
            let carts = []
            axios.get('https://codealo-commerce-cms.onrender.com/carts/'+shoppingCart).then((res)=>{
                for (let i = 0; i < res.data.products_in_cart.length; i++) {
                    carts.push( res.data.products_in_cart[i])
                    carts[i].id = res.data.id
                }
                setMyCarts(carts)
                setLoading(false)
            })
        }else{
            setLoading(false)
        }
    },[])
    function createOrder(){

        if(seedUser && seedUser.jwt && myCarts.length>0){
            axios.post('https://codealo-commerce-cms.onrender.com/orders',
            {
                cart:myCarts[0].id
            }
            ,
                {
                    headers: {
                        'Authorization' :'Bearer '+ seedUser.jwt
                    }
                }
            ).then((res)=>{
                window.localStorage.setItem('shoppingCart','')
            }).catch((err)=>{
                console.log(err)
            })
        } 
    }
    function deleteCart(index){
        if(index==0){
            window.localStorage.setItem('shoppingCart','')
            myCarts.splice(0,1)
        }
        setMyCarts(myCarts.splice(index-1,1))
         axios.put('https://codealo-commerce-cms.onrender.com/carts/'+shoppingCart,
         {
             products_in_cart:myCarts
        }
        
         ).then((res)=>{
         })
    }
    useEffect(()=>{
    },[myCarts])
    return (
        <div className="contain-page-create-product">
            {loading?
                <>
                    <p className='loading'>cargando...</p>
                </>:

                <>
              
                    <div className="modal-class modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <button type="button" className="close w-25 ms-auto" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            <div className="modal-header">
                                {seedUser && seedUser.jwt?
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        <p>Exito</p>
                                    </h5>
                                    :
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        <p>Error</p>
                                    </h5>
                                }


                            </div>

                            <div className="modal-body">
                                {seedUser && seedUser.jwt?
                                        <p>Se solicito de manera exitosa!!</p>
                                    :
                                        <p>Debe estar logeado para ejecutar esta accion</p>
                                }

                            </div>

                            <div className="modal-footer">
                        
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary"  data-dismiss="modal" > 
                                    Ver carrito de compras
                                </button>
                        


                                <button type="button" className="btn btn-primary"  data-dismiss="modal"> 
                                    Ver mas productos
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>


                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                        <th className='width-td' scope="col">Id</th>
                        <th className='width-td' scope="col">Price</th>
                        <th className='width-td' scope="col">Quantity</th>
                        <th className='width-td' scope="col">Image</th>
                        <th className='width-td' scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody className='tbody'>
                        { myCarts.map((cart,i)=>
                        <tr>
                            <td className='width-td'>{cart.product.id}</td>
                            <td className='width-td'>{cart.product.price}</td>
                            <td className='width-td'>{cart.quantity}</td>
                            <td className='width-td'> 
                            <img id="main-image" className="position-relative width-image" 
                            src={'https://codealo-commerce-cms.onrender.com'+cart.product.image.url} />    
                            </td>
                            <th className='width-td' scope="row" key={i}>
                                <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>deleteCart(i)}>
                                    Delete
                                </button>
                            </th>

                        </tr>
                        )
                        }
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-outline-success btn-lg"  data-toggle="modal" data-target="#exampleModal" onClick={createOrder}>Success</button>
                </div>
            </>
            }

        </div>
    )
}
export default CreateOrder
           