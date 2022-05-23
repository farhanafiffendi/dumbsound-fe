import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarAdmin from '../../components/NavbarAdmin'
import { API } from '../../config/api'
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

export default function MenuTransaksi() {

    let navigate = useNavigate();

    let { data: transactions } = useQuery('transactionsCache', async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        };
        const response = await API.get('/transactions', config);
        return response.data.transactions;
    });



    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-OdQU2i719zSdW6b3";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    const handleBuy = useMutation(async () => {
        try {
            const config = {
                headers: {
                    Authorization: "Basic " + localStorage.token,
                    "Content-type": "application/json",
                },
            };

            const response = await API.post('/transaction', config);

            // Create variabel for store token payment from response here ...
            const token = response.data.payment.token;
            window.snap.pay(token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/");
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/");
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert("you closed the popup without finishing the payment");
                },
            });
        } catch (error) {
            console.log(error);
        }
    });


    return (
        <>
            <NavbarAdmin />
            <div className='container item-transaksi'>
                <>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className='flex-direction text-center'>
                            <span className='premium-text'><p>premium</p></span>
                            <span className='premium-music'><p>Bayar sekarang dan nikmati streaming music yang kekinian dari dumbsound</p></span>
                            <p>Lakukan pembayaran sekarang untuk mengaktifkan masa langganan</p>
                            <span className='harga-premium'><p>Rp.20.000/bulan</p></span>
                            <button className='btn btn-danger' onClick={() => handleBuy.mutate()}>Bayar</button>
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}
