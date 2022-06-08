import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import NavbarUser from '../../components/NavbarUser'
import HeaderHome from '../../components/HeaderHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import Register from '../../components/auth/Register'
import Login from '../../components/auth/Login'
import { API } from '../../config/api'
import { useQuery } from "react-query";

import { UserContext } from "../../context/userContext";

export default function HomePage() {
    let navigate = useNavigate();

    let { data: musics, refetch } = useQuery("musicsCache", async () => {
        const response = await API.get("/musics-home");
        return response.data.data;
    });

    console.log(musics);

    const [state] = useContext(UserContext);

    const checkAuth = () => {
        if (state.isLogin === true) {
            navigate("/");
        }
    };
    checkAuth();

    return (
        <>
            <NavbarUser />

            <div className='margin-header mb-5'>
                <HeaderHome />
            </div>
            {show ? <Login isOpen={show} /> : onHide}
            {show ? <Register isOpen={show} /> : null}
            <div className="container-fluid content-color py-5">
                <span className='header-card text-center'><p>Daftar dan masuk untuk menikmati lagu hits sekarang</p></span>
                <div>
                    <div className='card-mobile ms-4 mt-5'>
                        {musics?.map((item, index) => {
                            return (
                                <div className='card-item mb-3 me-3'>
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
                    </div>
                </div>
            </div>
        </>
    )
}
