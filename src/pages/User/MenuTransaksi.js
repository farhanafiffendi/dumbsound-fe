import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function MenuTransaksi() {
    return (
        <>
            <div className='container'>
                <div className='d-flex justify-content-center align-items-center'>
                    <p>premium</p><br />
                    <p>Bayar sekarang dan nikmati streaming music yang kekinian dari dumbsound</p><br />
                    <p>Lakukan pembayaran sekarang untuk mengaktifkan masa langganan</p>
                    <button className='btn btn-danger'>Bayar</button>
                </div>
            </div>
        </>
    )
}
