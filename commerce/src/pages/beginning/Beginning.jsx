import React, { useEffect,useState } from 'react'
import { Link,useNavigate  }from 'react-router-dom'
import './beginning.css'
import axios from 'axios'
import exEmail from '../../helpersExp/expEmail'
const Beginning = () => {
    const [products,setProducts] = useState([])
    const [form,setForm]=useState({identifier:'',password:''})
    const navigate = useNavigate()
    useEffect(()=>{
       let user = JSON.parse(window.localStorage.getItem('user'))
       if(user && user.checked){
           user.password = atob(user.password)
           document.getElementById('check1').checked = user.checked
            setForm(user)
       }
    },[])
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
    },[products])

    function handleChange(e,name){
        setForm({...form, [name]:e.target.value})
    }
    useEffect(()=>{
    },[form])

    function send(e){
        e.preventDefault()
        let inputidentifier = document.getElementById('inputidentifier1')
        if(exEmail.test(form.identifier)){
            inputidentifier.classList.contains('border')? inputidentifier.classList.remove('border','border-danger') :  console.log('') 
            axios.post(
                'https://codealo-commerce-cms.onrender.com/auth/local',form,
                {
                    headers: {
                        'Content-Type':  'application/json'
                    }
                }
            ).then(res=>{
                if(document.getElementById('check1').checked){
                    form['checked'] = true
                    form.password = btoa(form.password)
                    window.localStorage.setItem('user',JSON.stringify(form))
                }else{
                    window.localStorage.clear()
                }
                let {data} = res
                window.sessionStorage.setItem('seed',JSON.stringify( {
                    jwt: data.jwt, 
                    email: data.user.email,
                    id: btoa(data.user.id),
                    role:data.user.role,
                    username:data.user.username
                }))
                navigate('/products')
                window.location.reload()
            })
        }else{
            return inputidentifier.classList.add('border','border-danger')
        }
    }

    return (
        <>
       
            <div className="contain-page">
                <div className="form-register">
                <form className='form'>
                    <div className="mb-3">
                        <label for="exampleInputidentifier1" className="form-label">Email</label>
                        <input type="identifier" 
                        className="form-control" id="inputidentifier1" 
                        value={form.identifier}
                        onInput={(e)=> handleChange(e,'identifier')}
                        aria-describedby="identifierHelp" />
                        <div id="identifierHelp" className="form-text">We'll never share your identifier with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="inputPassword1" className="form-label">Password</label>
                        <input type="password"
                        value={form.password} 
                        onInput={(e)=> handleChange(e,'password')}
                        className="form-control"
                        id="inputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="check1" />
                        <label className="form-check-label" for="check1">Remember me!</label>
                    </div>
                    <button type="submit" onClick={(e)=>send(e)} className="btn btn-primary">Submit</button>
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
                                        <a href={'/productDetail/'+products[0].slug} className={"btn btn-primary"}>
                                            Ver detalles
                                        </a>
                                    </div>
                                </div>

                                
                                <div className="carousel-item" data-bs-interval="2000">
                                    <img  src={'https://codealo-commerce-cms.onrender.com'+products[1].image.url} className="d-block  height w-100" alt="..." />
                                        <div className="carousel-caption d-none d-md-block">
                                        <h5>{products[1].title}</h5>
                                        <a href={'/productDetail/'+products[1].slug}  className={"btn btn-primary"}>
                                            Ver detalles
                                        </a>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img  src={'https://codealo-commerce-cms.onrender.com'+products[2].image.url} className="d-block  height w-100" alt="..." />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>{products[2].title}</h5>
                                        <a href={'/productDetail/'+products[2].slug}  className={"btn btn-primary"}>
                                            Ver detalles
                                        </a>
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
            <footer>
                <div class="text-center p-3">          
                    <p className='author'> Create by Angel Gonzalez </p>
                </div>
            </footer>
    </>
    )
}
export default Beginning;
