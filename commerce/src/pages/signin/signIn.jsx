import React from 'react'
import './signIn.css'
const SignIn = () => {
    return (
        <div className="contain-page-sign-in">
            <form className='sign-in-form'>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="inputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="inputPassword2" className="form-label">Repeat Password</label>
                    <input type="password" className="form-control" id="inputPassword2" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default SignIn