import React, { useState, useContext, useEffect } from 'react'
import HeaderHome from '../../components/HeaderHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import song from '../../components/assets/adele.mp3'
import NavbarAdmin from '../../components/NavbarAdmin';
import { Link } from 'react-router-dom';
import { API } from '../../config/api'
import { useQuery } from "react-query";
import { UserContext } from '../../context/userContext';

export default function HomeSuccess() {

    const [state, dispatch] = useContext(UserContext);

    const [userTrans, setUserTrans] = useState({})
    console.log(userTrans);

    const loadUserTrans = async () => {
        try {
            const config = {
                headers: {
                    Authorization: "Basic " + localStorage.token,
                    "Content-type": "application/json",
                },
            };
            const response = await API.get(`userTrans/${state.user.id}`, config)
            setUserTrans(response.data.data.user.transaction)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadUserTrans()
    }, [])

    // Fetching product data from database
    let { data: musics, refetch } = useQuery("musicsCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        };
        const response = await API.get("/musics", config);
        return response.data.data;
    });


    return (
        <>
            {/* =============================Navbar======================================== */}
            <NavbarAdmin />

            {/* =============================Background Image======================================== */}
            <div className='margin-header mb-5'>
                <HeaderHome />
            </div>

            {/* =============================Card======================================== */}
            <div className="container-fluid content-color py-5">
                <span className='header-card text-center'><p>Dengarkan Dan Rasakan</p></span>
                <div>
                    <div className='d-flex flex-wrap justify-content-start ms-4 mt-5'>
                        {/* ================= Ketika User Belum Bayar Atau Status pending ==========*/}
                        {userTrans === null ?
                            <>
                                <Link to='/pay' className='none-item'>
                                    {musics?.map((item, index) => {
                                        return (
                                            <div className='card-item mb-3 me-3'>
                                                <div className='card-item-header'>
                                                    <img src={item.thumbnail} alt="" />
                                                </div>
                                                <div className="text-card">
                                                    <span className='text-title'>
                                                        <p>{item.title}</p>
                                                    </span>
                                                    <p>{item.year}</p>
                                                </div>
                                                <div className='flex-start'>
                                                    <p>{item.art.name}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Link>
                            </>
                            :
                            //=====================ketika status success===================
                            <>
                                {userTrans.status === "success" ?
                                    <>
                                        {musics?.map((item, index) => {
                                            return (
                                                <div className='card-item mb-3 me-3'>
                                                    <div className='card-item-header'>
                                                        <img src={item.thumbnail} alt="" />
                                                    </div>
                                                    <div className="text-card">
                                                        <span className='text-title'>
                                                            <p>{item.title}</p>
                                                        </span>
                                                        <p>{item.year}</p>
                                                    </div>
                                                    <div className='flex-start'>
                                                        <p>{item.art.name}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </>
                                    :
                                    <>
                                    </>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
            <AudioPlayer
                className='media-player'
                autoPlay
                src={song}
                onPlay={e => console.log("onPlay")}
            />
        </>
    )
}
