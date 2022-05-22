import React, { useState, useContext, useEffect } from 'react'
import HeaderHome from '../../components/HeaderHome'
import CardHome from '../../components/card/CardHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import song from '../../components/assets/adele.mp3'
import NavbarAdmin from '../../components/NavbarAdmin';

export default function HomeSuccess() {

    const [musicId, setMusicId] = useState("")

    const [user, setUser] = useState({})

    return (
        <>
            {/* =============================Navbar======================================== */}
            <NavbarAdmin />
            {/* =============================Akhir Navbar======================================== */}

            {/* =============================Background Image======================================== */}
            <div className='margin-header mb-5'>
                <HeaderHome />
            </div>

            {/* =============================Card======================================== */}
            <div className="container-fluid content-color py-5">
                <span className='header-card text-center'><p>Dengarkan Dan Rasakan</p></span>
                <div>
                    <div className='d-flex flex-wrap justify-content-start ms-4 mt-5'>
                        <CardHome />
                        <CardHome />
                        <CardHome />
                        <CardHome />
                        <CardHome />
                        <CardHome />
                        <CardHome />
                        <CardHome />
                    </div>
                </div>
                <AudioPlayer
                    className='media-player'
                    autoPlay
                    src={song}
                    onPlay={e => console.log("onPlay")}
                />
            </div>
        </>
    )
}

