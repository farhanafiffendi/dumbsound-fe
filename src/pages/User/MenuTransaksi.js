import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarAdmin from '../../components/NavbarAdmin'

export default function MenuTransaksi() {
    return (
        <>
            <NavbarAdmin />
            <div className='container item-transaksi'>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='flex-direction text-center'>
                        <span className='premium-text'><p>premium</p></span>
                        <span className='premium-music'><p>Bayar sekarang dan nikmati streaming music yang kekinian dari dumbsound</p></span>
                        <p>Lakukan pembayaran sekarang untuk mengaktifkan masa langganan</p>
                        <span className='harga-premium'><p>Rp.20.000/bulan</p></span>
                        <button className='btn btn-danger'>Bayar</button>
                    </div>
                </div>
            </div>
        </>
    )
}
