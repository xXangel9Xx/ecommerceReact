import React,{useState,useEffect  } from 'react'
import './previousPurchases.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const PreviousPurchases = () => {
    const [orders,setOrders] = useState([])
    const [product,setProducts] = useState([])
    const [seedUser,setSeedUser]=useState(window.sessionStorage.getItem('seed'))
    const navigate = useNavigate()
    useEffect(()=>{
        setSeedUser(JSON.parse(seedUser))
    },[])
    useEffect(()=>{
            let seedJWT = JSON.parse(seedUser)
            if(seedJWT && seedJWT.jwt){
                axios.get('https://codealo-commerce-cms.onrender.com/orders',
                {
                    headers: {
                        'Authorization' :'Bearer '+ seedJWT.jwt
                    }
                }
            ).then((res)=>{
                let {data} = res
                let order = []
                for (let i = 0; i < data.length; i++) {

                    for (let f = 0; f < data[i].products.length; f++) {
                        data[i].products[f].id = data[i].id
                        data[i].products[f].total = data[i].total
                        order.push(data[i].products[f])
                    }
                }
                setOrders(order)
                
            }).catch((err)=>{
                
            })
            }else{
                navigate('/')
            }
    },[])
    return (
        <div className="contain-page-previous-purchases">
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">identification</th>
                    <th scope="col">Products</th>
                    <th scope="col">total</th>
                    </tr>
                </thead>
                    <tbody className='tbody'>
                        
                        {orders.length>0 && orders.map((order,i)=>
                            <tr>
                                <th scope="row">{i}</th>
                                <td className='width-td'>{order.id}</td>
                                <td className='width-td'>{order.product.slug} {order.product.price}</td>
                                <td className='width-td'>{order.total}</td>
                            </tr>
                        )}


                    </tbody>
               


               
            </table>
        </div>
    )
}
export default PreviousPurchases