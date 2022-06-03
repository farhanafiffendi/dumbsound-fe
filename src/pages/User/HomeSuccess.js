import React, { useState, useContext, useEffect } from 'react'
import HeaderHome from '../../components/HeaderHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import NavbarUserLog from '../../components/NavbarUserLog'
import { Link } from 'react-router-dom';
import { API } from '../../config/api'
import { UserContext } from '../../context/userContext';

export default function HomeSuccess() {
    console.clear()

    const [state] = useContext(UserContext);
    console.log(state);

    const [userTrans, setUserTrans] = useState({});
    const [musicId, setMusicId] = useState("");
    const [musics, setMusics] = useState([]);
    console.log(userTrans);

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
                setUserTrans(response.data.data.trans);
            } catch (error) {
                console.log(error);
            }
        }
        loadUserTrans();
    }, []);

    useEffect(() => {
        const loadMusic = async () => {
            try {
                const config = {
                    method: "GET",
                    headers: {
                        Authorization: "Basic " + localStorage.token,
                    },
                };
                const response = await API.get('/musics', config);
                setMusics(response.data.data);
            } catch (error) {
                setTimeout(() => {
                }, 500)
                console.log(error);
            }
        }
        loadMusic();
    }, []);


    return (
        <>
            {/* navbar */}
            <NavbarUserLog />

            {/* banner */}
            <div className='margin-header mb-5'>
                <HeaderHome />
            </div>

            {/* card */}
            <div className="container-fluid content-color py-5">
                <span className='header-card text-center'><p>Dengarkan Dan Rasakan</p></span>
                <div>
                    <div className='d-flex flex-wrap card-mobile justify-content-start ms-4 mt-5'>
                        {/* ketika status transaksi null atau tidak ada transaksi */}
                        {userTrans === null ? (
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
                                                        <p>{(item.title.length > 8) ? item.title.slice(0, 8) + '...' : item.title}</p>
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
                        ) : userTrans.status === "success" ? (
                            <>
                                {musics?.map((item, index) => {
                                    return (
                                        <div className='card-item mb-3 me-3' onClick={() => setMusicId(item)}>
                                            <div className='card-item-header'>
                                                <img src={item.thumbnail} alt="" />
                                            </div>
                                            <div className="text-card">
                                                <span className='text-title'>
                                                    <p>{(item.title.length > 8) ? item.title.slice(0, 8) + '...' : item.title}</p>
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
                        ) : (
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
                                                        <p>{(item.title.length > 8) ? item.title.slice(0, 8) + '...' : item.title}</p>
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
                        )}
                    </div>
                </div>
            </div>
            {musicId === "" ? (
                <div></div>
            ) : (
                <div className='text-center' style={{ background: 'rgb(56, 8, 8)' }}>
                    <p>{musicId.title}</p>
                    <AudioPlayer
                        className='media-player'
                        autoPlay
                        src={musicId.attache}
                        onPlay={e => console.log("onPlay")}
                    />
                </div>
            )}
        </>
    )
}
