import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
    return (
        <>
            <div className='error-center'>
                <h1>404</h1>
                <h3> Page Not Found</h3>
            </div>
            <div className='error-center'>
                <p>The page you are looking is no longer exists</p>
            </div>
            <div className='error-center'>
                <button><NavLink to='/'>Back to Homepage</NavLink></button>
            </div>
        </>

    )
}

export default Error