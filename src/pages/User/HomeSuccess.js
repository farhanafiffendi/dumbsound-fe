import React, { useState, useContext, useEffect } from 'react'
import HeaderHome from '../../components/HeaderHome'
import CardHome from '../../components/card/CardHome'
import { Dropdown, DropdownButton, Navbar, Container, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import context from 'react-bootstrap/esm/AccordionContext'
import { useNavigate } from "react-router-dom";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import song from '../../components/assets/adele.mp3'

export default function HomeSuccess() {
    let navigate = useNavigate()

    const [musicId, setMusicId] = useState("")

    const [state, dispatch] = useContext(UserContext);

    const [user, setUser] = useState({})

    const logout = () => {
        dispatch({
            type: "LOGOUT"
        })
        navigate("/homepage")
    }

    const handleHome = () => {
        navigate("/home")
    }

    return (
        <>
            {/* =============================Navbar======================================== */}
            <div className="container d-flex justify-content-end mt-3 fixed-top">
                <div class="btn-group">
                    <button type="button" class="btn btn-danger btn-radius">{`${state.user.fullname}`.slice(0, 1).toUpperCase()}</button>
                    <button type="button" class="btn btn-danger drop dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu">
                        <Nav.Link as={Link} to="/home"><a class="dropdown-item" href="#">Home</a></Nav.Link>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" onClick={logout}>Logout</a></li>
                    </ul>
                </div>
            </div>
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

