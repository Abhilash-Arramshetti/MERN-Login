import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const About = () => {
    const history = useHistory()
    const [userData, setUserData] = useState('')
    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: 'GET',
                headers: {
                    //sharing cookie
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                //to send the cookies to backend
                credentials: 'include'
            })
            const data = await res.json()
            setUserData(data)
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        } catch (e) {
            console.log(e)
            history.push('/login')
        }
    }
    useEffect(() => {
        callAboutPage()
    }, [])
    return (
        <>
            <div className='center '>
                <form method='GET'>
                    <div className=' col-md-8 mt-4 col-lg-8'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>User ID</label>
                            </div>
                            <div className='col-md-6'>
                                <p>{userData._id}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Name</label>
                            </div>
                            <div className='col-md-6'>
                                <p>{userData.name}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Email</label>
                            </div>
                            <div className='col-md-6'>
                                <p>{userData.email}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Phone</label>
                            </div>
                            <div className='col-md-6'>
                                <p>{userData.phone}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Profession</label>
                            </div>
                            <div className='col-md-6'>
                                <p>{userData.work}</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default About