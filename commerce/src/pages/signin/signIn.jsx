import React,{ useState,useEffect } from 'react'
import exEmail from '../../helpersExp/expEmail'
import { useNavigate  }from 'react-router-dom'
import axios from 'axios'
import './signIn.css'
const SignIn = () => {
    const [form,setForm]=useState({username:'',email:'',password:'', repeatPassword:''})
    const navigate = useNavigate()
    function handleChange(e,name){
         setForm({...form, [name]:e.target.value})
         if(name==='password' && /^[\s\S]{8,20}$/.test(e.target.value)){
            document.getElementsByClassName('requeriment')[0].classList.add('succes')
        }else{
            document.getElementsByClassName('requeriment')[0].classList.contains('succes')?            
            document.getElementsByClassName('requeriment')[0].classList.remove('succes'):console.log('')
        }

        if(name==='password' && /\d/.test(e.target.value)){
           document.getElementsByClassName('requeriment')[1].classList.add('succes')
       }else{
           document.getElementsByClassName('requeriment')[1].classList.contains('succes')?            
           document.getElementsByClassName('requeriment')[1].classList.remove('succes'):console.log('')
       }


       if(name==='password' && /^(?=.*?[$%&@?*_|<>#])/.test(e.target.value)){
           document.getElementsByClassName('requeriment')[2].classList.add('succes')
       }else{
           document.getElementsByClassName('requeriment')[2].classList.contains('succes')?            
           document.getElementsByClassName('requeriment')[2].classList.remove('succes'):console.log('')
       }

       if(name==='password' && /^(?=.*?[A-Z])/.test(e.target.value)){
           document.getElementsByClassName('requeriment')[3].classList.add('succes')
       }else{
           document.getElementsByClassName('requeriment')[3].classList.contains('succes')?            
           document.getElementsByClassName('requeriment')[3].classList.remove('succes'):console.log('')
       }

       if(name==='password' && /^(?=.*?[a-z])/.test(e.target.value)){
           document.getElementsByClassName('requeriment')[4].classList.add('succes')
       }else{
           document.getElementsByClassName('requeriment')[4].classList.contains('succes')?            
           document.getElementsByClassName('requeriment')[4].classList.remove('succes'):console.log('')
       }
       if(name==='repeatPassword' && form.password==e.target.value){
           document.getElementsByClassName('requeriment')[5].classList.add('succes')
       }else{
           document.getElementsByClassName('requeriment')[5].classList.contains('succes')?            
           document.getElementsByClassName('requeriment')[5].classList.remove('succes'):console.log('')
       }
    
    }

    useEffect(()=>{
    },[form])
    function send(e){
        e.preventDefault()
        let inputEmail = document.getElementById('inputEmail1')
        let passwordInput = document.getElementById('inputPassword1')
        let repeatPasswordInput =  document.getElementById('inputPassword2')
        
        if(exEmail.test(form.email)){
            inputEmail.classList.contains('border')? inputEmail.classList.remove('border','border-danger') :  console.log('') 
        }else{
            return inputEmail.classList.add('border','border-danger')
        }

        if(/^[\s\S]{8,20}$/.test(form.password)
        && /\d/.test(form.password)
        && /^(?=.*?[$%&@?*_|<>#])/.test(form.password)
        && /^(?=.*?[A-Z])/.test(form.password)
        && /^(?=.*?[a-z])/.test(form.password)
        &&  form.password===form.repeatPassword){
            passwordInput.classList.contains('border')? passwordInput.classList.remove('border','border-danger') : console.log('') 
            repeatPasswordInput.classList.contains('border')? repeatPasswordInput.classList.remove('border','border-danger') : console.log('')
            let obj = {username: form.username, email:form.email, password:form.password}
            axios.post('https://codealo-commerce-cms.onrender.com/auth/local/register',obj,
                {
                    headers: {
                        'Content-Type':  'application/json'
                    }
                }
                ).then((res)=>{
                    let {data} = res
                     window.sessionStorage.setItem('seed',JSON.stringify( {
                         jwt: data.jwt, 
                         email: data.user.email,
                         id: btoa(data.user.id),
                     }))
                     navigate('/products')
                     window.location.reload()

            })
            
        }else{
            passwordInput.classList.add('border','border-danger')
           return repeatPasswordInput.classList.add('border','border-danger')
        }
    }
    function  checkeRequirements(id) {
        document.getElementById(id).style.display = 'block'
    }

    function  ocoultRequirements(id) {
        document.getElementById(id).style.display = 'none'
    }

    return (
        <div className="contain-page-sign-in">
            <form className='sign-in-form'>
                <div className="mb-3">
                    <label for="inputPassword1" className="form-label">user name</label>
                    <input type="text" value={form.username} onInput={(e)=> handleChange(e,'username')} className="form-control" id="inputUsername1" />
                </div>

                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email"  
                    value={form.email}
                    className="form-control" 
                    id="inputEmail1" 
                    onInput={(e)=> handleChange(e,'email')}
                    aria-describedby="emailHelp" 
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="inputPassword1" className="form-label">Password</label>
                    <input  type="password" 
                    value={form.password} 
                    onInput={(e)=> handleChange(e,'password')} 
                    className="form-control" id="inputPassword1"
                    onFocus={(e)=> checkeRequirements('card-requirements')}
                    onBlur={(e)=> ocoultRequirements('card-requirements')} 
                    />
                    <div class="card ms-0 me-0 w-100" id='card-requirements'>
                    <div class="card-header">
                        Requerimientos de la contraseña
                    </div>
                    <div class="card-body">
                        <p class="card-text requeriment">Entre 8 y 20 caracteres</p>
                        <p className="card-text requeriment">Al menos un numero</p>
                        <p className="card-text requeriment">Al menos uno de estos caracteres especiales !, % , &, @, #, $, * , ? , _, -</p>
                        <p className="card-text requeriment">Debe tener al  menos una mayúscula</p>
                        <p className="card-text requeriment">Debe tener al  menos una minúscula</p>
                    </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label for="inputPassword2" className="form-label">Repeat Password</label>
                    <input type="password" 
                    value={form.repeatPassword} 
                    onInput={(e)=> handleChange(e,'repeatPassword')} 
                    className="form-control" id="inputPassword2" 
                    onFocus={(e)=> checkeRequirements('card-requirements-1')}
                    onBlur={(e)=> ocoultRequirements('card-requirements-1')}
                    />
                    <div class="card ms-0 me-0 w-100" id='card-requirements-1'>
                    <div class="card-header">
                        Requerimientos de la contraseña
                    </div>
                    <div class="card-body">
                        <p className="card-text requeriment">Las contraseñas deben coincidir</p>
                    </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" onClick={(e)=>send(e)}>Submit</button>
            </form>
           
        </div>
    )
}
export default SignIn