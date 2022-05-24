import React, { useState, useContext, useEffect } from 'react'
import HeaderHome from '../../components/HeaderHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import NavbarUserLog from '../../components/NavbarUserLog'
import { Link } from 'react-router-dom';
import { API } from '../../config/api'
import { useQuery } from "react-query";
import { UserContext } from '../../context/userContext';

export default function HomeSuccess() {

    const [state, dispatch] = useContext(UserContext);

    const [userTrans, setUserTrans] = useState({})
    const [musicId, setMusicId] = useState("")
    const [musics, setMusics] = useState([])
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


    const loadMusic = async () => {
        try {
            const config = {
                headers: {
                    Authorization: "Basic " + localStorage.token,
                    "Content-type": "application/json",
                },
            };
            const response = await API.get(`musics`, config)
            setMusics(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadMusic()
    }, [])


    return (
        <>
            {/* =============================Navbar======================================== */}
            <NavbarUserLog />

            {/* =============================Background Image======================================== */}
            <div className='margin-header mb-5'>
                <HeaderHome />
            </div>

            {/* =============================Card======================================== */}
            <div className="container-fluid content-color py-5">
                <span className='header-card text-center'><p>Dengarkan Dan Rasakan</p></span>
                <div>
                    <div className='d-flex flex-wrap justify-content-start ms-4 mt-5'>
                        {/* ================= Ketika belum ada transaksi==========*/}
                        {userTrans === null ?
                            <>

                                {musics?.map((item, index) => {
                                    return (
                                        <Link to='/pay' className='none-item'>
                                            <div className='card-item mb-3 me-3' >
                                                <div className='card-item-header'>
                                                    <img src={item.thumbnail} alt="" />
                                                </div>
                                                <div className="text-card">
                                                    <span className='text-title'>
                                                        <p>{`${item.title}`.slice(0, 10) + '...'}</p>
                                                    </span>
                                                    <p>{item.year}</p>
                                                </div>
                                                <div className='flex-start'>
                                                    <p>{item.art.name}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}

                            </>
                            :
                            //=====================ketika status success===================
                            <>
                                {userTrans.status === "success" ?
                                    <>
                                        {musics?.map((item, index) => {
                                            return (
                                                <div className='card-item mb-3 me-3' onClick={() => setMusicId(item)}>
                                                    <div className='card-item-header'>
                                                        <img src={item.thumbnail} alt="" />
                                                    </div>
                                                    <div className="text-card">
                                                        <span className='text-title'>
                                                            <p>{`${item.title}`.slice(0, 10) + '...'}</p>
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
                                        {musics?.map((item, index) => {
                                            return (
                                                <Link to='/pay' className='none-item'>
                                                    <div className='card-item mb-3 me-3' >
                                                        <div className='card-item-header'>
                                                            <img src={item.thumbnail} alt="" />
                                                        </div>
                                                        <div className="text-card">
                                                            <span className='text-title'>
                                                                <p>{`${item.title}`.slice(0, 10) + '...'}</p>
                                                            </span>
                                                            <p>{item.year}</p>
                                                        </div>
                                                        <div className='flex-start'>
                                                            <p>{item.art.name}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
            {musicId === "" ?
                <div></div> :
                <div className='text-center' style={{ background: 'rgb(56, 8, 8)' }}>
                    <p>{musicId.title}</p>
                    <AudioPlayer
                        className='media-player'
                        autoPlay
                        src={musicId.attache}
                        onPlay={e => console.log("onPlay")}
                    />
                </div>

            }
        </>
    )
}
