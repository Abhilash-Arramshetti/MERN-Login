import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Logout = () => {
    const history = useHistory()
    useEffect(() => {
        fetch('/logout', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then((res) => {
            history.push('/login')
            if (res.status != 200) {
                const err = new Error(res.error)
                throw err
            }
        }).catch((e) => {
            console.log(e)
        })
    })
    return (

        <><div className='center-home'><h1>Logged out of Page
        </h1></div></>
    )
}

export default Logout