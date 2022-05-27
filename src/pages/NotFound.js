import React from 'react'
import Img from '../components/assets/NotFound.jpg'

export default function NotFound() {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <img src={Img} style={{ width: "300px" }} alt="" />
            <p>Page Not Found</p>
        </div>
    )
}
