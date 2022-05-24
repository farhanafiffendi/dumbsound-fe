import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContext } from "../context/userContext";
import { Nav } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from './assets/logo.png'


export default function NavbarUserLog() {
    let navigate = useNavigate()

    const [state, dispatch] = useContext(UserContext);

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
                    <button type="button" class="btn btn-danger btn-radius">{`${state.user.fullname}`.slice(0, 1).toUpperCase()}</button>
                    <button type="button" class="btn btn-danger drop dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu">
                        <Nav.Link as={Link} to="/complain"><a class="dropdown-item">Complain</a></Nav.Link>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" onClick={logout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
