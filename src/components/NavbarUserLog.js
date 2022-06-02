import React, { useContext, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContext } from "../context/userContext";
import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from './assets/logo.png'
import { API } from '../config/api';

export default function NavbarUserLog() {
    console.clear();

    let navigate = useNavigate()

    const [state, dispatch] = useContext(UserContext);

    const [profiles, setProfile] = useState({});

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const config = {
                    method: "GET",
                    headers: {
                        Authorization: "Basic " + localStorage.token,
                    },
                };
                const response = await API.get('/userTrans', config);
                setProfile(response.data.data.user);
            } catch (error) {
                console.log(error);
            }
        }
        loadProfile();
    }, []);

    const logout = () => {
        dispatch({
            type: "LOGOUT"
        })
        navigate("/homepage")
    }

    return (
        <>
            <div className="container d-flex justify-content-between my-3">
                <Link style={{ marginTop: "20px" }} to='/'>
                    <div className='flex-start'>
                        <div>
                            <img src={Logo} alt="" />
                        </div>
                    </div>
                </Link>
                <div class="btn-group">
                    <button type="button" class="btn btn-danger btn-radius">{(profiles.fullname).toUpperCase().slice(0, 1)}</button>
                    <button type="button" class="btn btn-danger drop dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu">
                        <Nav.Link as={Link} to="/complain"><a class="dropdown-item">Complain</a></Nav.Link>
                        <Nav.Link as={Link} to="/pay"><a class="dropdown-item">Pay</a></Nav.Link>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" onClick={logout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
