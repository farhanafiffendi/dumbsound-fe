import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Button } from 'react-bootstrap'
import { bgcolor } from '@mui/system'
import ImgCard from '../assets/Rectangle 4.png'

export default function CardHome({ item }) {
    return (
        <>
            <div className='card-item mb-3 me-3'>
                <div className='card-item-header'>
                    <img src="https://th.bing.com/th/id/R.968aab7f4580c3c4d3fc96748a546765?rik=JTYtMw706VCnNA&riu=http%3a%2f%2fimages.rapgenius.com%2f467c2779b78b07674035a8aedd73db9b.992x1000x1.jpg&ehk=JcxtO0vNnk%2fIbRFH4n0K4mszzEniiQ05fpmKpfbE1QE%3d&risl=&pid=ImgRaw&r=0" alt="" />
                </div>
                <div className="text-card">
                    <span className='text-title'>
                        <p>Kings Never Die</p>
                    </span>
                    <p>2019</p>
                </div>
                <div className='flex-start'>
                    <p>Eminem</p>
                </div>
            </div>
        </>
    )
}
