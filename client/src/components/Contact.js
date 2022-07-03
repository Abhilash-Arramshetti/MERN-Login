import React, { useEffect, useState } from 'react'

const Contact = () => {
    const [userData, setUserData] = useState({ name: '', email: '', phone: '', message: '' })

    const userContact = async () => {
        try {
            const res = await fetch('/about', {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            const data = await res.json()
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone })
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        userContact()
    }, [])
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUserData({ ...userData, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, message } = userData
        const res = await fetch('/contact', {
            method: 'POST',
            headers: {
                "Appliaction-Type": "application/json"
            },
            body: JSON.stringify(name, email, phone, message)
        })
        const data = await res.json()
        if (!data) {
            console.log('No Message sent')
        } else {
            console.log('Message Sent')
        }
        setUserData({ ...userData, message: '' })
    }
    return (
        <>
            <h1 style={{ textAlign: 'center ', marginTop: '100px' }}>Contact US</h1>
            <div>
                <form id='contact-form' method='POST'>
                    <div className='contact-form'>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="name" style={{ width: '300px' }} required='true' onChange={handleChange} value={userData.name}
                                name='name' className="form-control" id="name" placeholder="Enter Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Email</label>
                            <input type="email" style={{ width: '300px' }} required='true' onChange={handleChange} value={userData.email}
                                name='email' className="form-control" id="email" placeholder="Enter Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Phone</label>
                            <input type="number" style={{ width: '300px' }} required='true' name='phone' onChange={handleChange}
                                value={userData.phone} className="form-control" id="name" placeholder="Enter Phone" />
                        </div>
                    </div>
                    <div className='center'>
                        <textarea placeholder='Enter the Message' cols='60' rows='10' name='message' onChange={handleChange}
                            value={userData.message}></textarea>
                        &nbsp; <button type="submit" style={{ marginLeft: "20px" }}
                            className="btn btn-primary btn-lg btn-block" onClick={handleSubmit}>Send Message</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Contact