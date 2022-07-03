import React, { useEffect, useState } from 'react'

const Home = () => {
    const [userName, setUserName] = useState('')
    const [show, setShow] = useState(false)
    const userContact = async () => {
        try {
            const res = await fetch('/getdata', {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            const data = await res.json()
            setUserName(data.name)
            setShow(!show)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        userContact()
    }, [])
    return (
        <>
            <div className='center-home'>
                <h1>WELCOME</h1>
                <h1>{userName}</h1>
                <h1>{show ? 'Happy to see you Back!' : 'I am a MERN Developer'}</h1>
            </div>
        </>
    )
}

export default Home