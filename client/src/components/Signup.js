import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

const Signup = () => {
    const history = useHistory()
    const [user, setUser] = useState({
        name: '', email: '', phone: '', work: '', password: '', cpassword: ''
    })
    let name, value
    const handleInput = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }
    const postData = async (e) => {
        e.preventDefault()
        const { name, email, phone, work, password, cpassword } = user

        const res = await fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                name: name, email, phone, work, password, cpassword
            })
        })
        const data = await res.json()
        if (data.status === 422 || !data) {
            window.alert('Invalid Registration')
            console.log('Invalid Registration')
        }
        else {
            window.alert('Registration Sucessful!')
            console.log('Registration Sucessful!')
        }
        history.push('./login')
    }
    return (
        <>
            <section>
                <div>
                    <div className='container mt-5'>
                        <div className='signup-content'>
                            <div className='signup-form'>
                                <h2>Sign Up</h2>
                                <form method='POST' className='register-form' id='register-form'>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="name" style={{ width: '300px' }} name='name' className="form-control" value={user.name} onChange={handleInput} id="name" placeholder="Enter Name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name='email' className="form-control" value={user.email} onChange={handleInput} id="email" placeholder="Enter Email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input type="number" name='phone' className="form-control" value={user.phone} onChange={handleInput} id="phone" placeholder="Enter Phone" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Your Profession</label>
                                        <input type="text" name='work' className="form-control" value={user.work} onChange={handleInput} id="work" placeholder="Enter Profession" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Password</label>
                                        <input type="password" name='password' className="form-control" value={user.password} onChange={handleInput} id="password" placeholder="Enter Password" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Confirm Password</label>
                                        <input type="password" name='cpassword' className="form-control" value={user.cpassword} onChange={handleInput} id="cpassword" placeholder="Confirm Password" />
                                    </div>&nbsp;
                                    <div className='form-group form-button'>
                                        <input type='submit' name='signup' id='signup' className='form-submit' value='Register' onClick={postData} />
                                    </div>
                                </form>
                            </div>
                            <div className='signup-image'>
                                <figure>
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        className="img-fluid" alt="Sample " />
                                </figure>
                                <NavLink to='/login'>Already Registered</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup