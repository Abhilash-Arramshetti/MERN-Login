import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

const Login = () => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })
        const data = await res.json();
        if (data.status === 400 || !data) {
            window.alert("Invalid User")
        } else {
            window.alert('Login Successful!')
            history.push('/')
        }
    }
    return (
        <>
            <section>
                <div>
                    <div className='container mt-5'>
                        <div className='signin-form'>
                            <div className='sigin-left'>
                                <div className='signup-image'>
                                    <figure>
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                            class="img-fluid" alt="Phone" />
                                    </figure>
                                    <NavLink to='/signup'>Not a User? Create an Account</NavLink>
                                </div>
                            </div>
                            <form method='POST' className='register-form' id='register-form'>
                                <h2>Login IN</h2>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" style={{ width: '300px' }} name='email' className="form-control"
                                        id="email" placeholder="Enter Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Password</label>
                                    <input type="password" name='password' className="form-control" id="password"
                                        placeholder="Enter Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                </div>
                                &nbsp;
                                <div className='form-group form-button'>
                                    <input type='submit' name='signin' id='signin' className='form-submit' value='Log IN'
                                        onClick={handleSubmit} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login