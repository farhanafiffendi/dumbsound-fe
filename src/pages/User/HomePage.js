import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import NavbarUser from '../../components/NavbarUser'
import HeaderHome from '../../components/HeaderHome'
import CardHome from '../../components/card/CardHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import Masonry from 'react-masonry-css'
import Register from '../../components/auth/Register'
import Login from '../../components/auth/Login'

import { UserContext } from "../../context/userContext";

export default function HomePage() {
    let navigate = useNavigate();

    const [state] = useContext(UserContext);

    const checkAuth = () => {
        if (state.isLogin === true) {
            navigate("/");
        }
    };
    checkAuth();

    const [clickLogin, setClickLogin] = useState(false);
    const [clickRegister, setClickRegister] = useState(false);

    const handleClickLogin = () => setClickLogin(!clickLogin)
    const handleClickRegister = () => setClickRegister(!clickRegister)

    return (
        <>
            <NavbarUser handleClickLogin={handleClickLogin} handleClickRegister={handleClickRegister} />
            <div className='margin-header mb-5'>
                <HeaderHome />
            </div>
            {clickLogin ? <Login isOpen={clickLogin} /> : null}
            {clickRegister ? <Register isOpen={clickRegister} /> : null}
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
            </div>
        </>
    )
}
