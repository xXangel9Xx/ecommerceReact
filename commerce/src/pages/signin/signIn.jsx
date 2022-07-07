import React,{ useState,useEffect } from 'react'
import exEmail from '../../helpersExp/expEmail'
import axios from 'axios'
import './signIn.css'
const SignIn = () => {
    const [form,setForm]=useState({username:'',email:'',password:'', repeatPassword:''})
    
    function handleChange(e,name){
         setForm({...form, [name]:e.target.value})
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

        if(form.password===form.repeatPassword){
            passwordInput.classList.contains('border')? passwordInput.classList.remove('border','border-danger') : console.log('') 
            repeatPasswordInput.classList.contains('border')? repeatPasswordInput.classList.remove('border','border-danger') : console.log('')
            let obj = {username: form.username, email:form.email, password:form.password}
            console.log(obj)
            axios.post('https://codealo-commerce-cms.onrender.com/auth/local/register',obj,
                {
                    headers: {
                        'Content-Type':  'application/json'
                    }
                }
                ).then((res)=>{
                console.log(res)
            })
            
        }else{
            passwordInput.classList.add('border','border-danger')
           return repeatPasswordInput.classList.add('border','border-danger')
        }
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
                    <input  type="password" value={form.password} onInput={(e)=> handleChange(e,'password')} className="form-control" id="inputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="inputPassword2" className="form-label">Repeat Password</label>
                    <input type="password" value={form.repeatPassword} onInput={(e)=> handleChange(e,'repeatPassword')} className="form-control" id="inputPassword2" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e)=>send(e)}>Submit</button>
            </form>
        </div>
    )
}
export default SignIn