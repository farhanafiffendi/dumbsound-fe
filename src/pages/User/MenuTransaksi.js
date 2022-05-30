import React, { useEffect, useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarUserLog from '../../components/NavbarUserLog'
import { API } from '../../config/api'
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { UserContext } from '../../context/userContext';
import logoSuccess from '../../components/assets/paySuccess.png';

export default function MenuTransaksi() {
    // console.clear()

    const [state] = useContext(UserContext);

    let navigate = useNavigate();

    const [userPay, setUserPay] = useState({});
    console.log(userPay);

    const timeInterval = (hari) => {
        const end = new Date(`${userPay?.dueDate}`).getTime();
        const start = new Date().getTime();
        const selisih = end - start;

        hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
        jam = Math.floor(selisih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        menit = Math.floor(selisih % (1000 * 60 * 60) / (1000 * 60));
        detik = Math.floor(selisih % (1000 * 60) / (1000));

    }

    useEffect(() => {
        const loadUserTrans = async () => {
            try {
                const config = {
                    method: "GET",
                    headers: {
                        Authorization: "Basic " + localStorage.token,
                    },
                };
                const response = await API.get('/transactionAdmin', config);
                setUserPay(response.data.data.trans);
            } catch (error) {
                console.log(error);
            }
        }
        loadUserTrans();
    }, []);

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
            const body = {
                startDate: "",
                price: "20000",
            };

            const response = await API.post('/transaction', body, config);

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
            <NavbarUserLog />
            <div className='container d-flex justify-content-center' style={{ height: '80vh', marginTop: '20px' }}>
                <>
                    {userPay === null ? (
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
                    ) : userPay.status === "success" ? (
                        <div className='d-flex align-items-center'>
                            <div className='flex-direction text-center'>
                                <h4>Anda Sudah Membayar Premium</h4>
                                <p>Masa berlangganan anda tinggal hari {timeInterval} </p>
                                <img src={logoSuccess} alt="" style={{ height: '350px', marginTop: '20px' }} />
                            </div>
                        </div>
                    ) : (
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
                    )}

                </>
            </div>
        </>
    )
}
