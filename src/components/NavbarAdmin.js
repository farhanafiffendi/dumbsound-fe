import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContext } from "../context/userContext";
import { Nav } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from './assets/shapes.png'


export default function NavbarAdmin() {
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
            <div className="container d-flex justify-content-between mt-3 fixed-top">
                <Link as={Link} to='/'>
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
                        <Nav.Link as={Link} to="/add-music"><a class="dropdown-item">Add Music</a></Nav.Link>
                        <Nav.Link as={Link} to="/add-artist"><a class="dropdown-item">Add Artist</a></Nav.Link>
                        <Nav.Link as={Link} to="/complain-admin"><a class="dropdown-item">List Transaction</a></Nav.Link>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" onClick={logout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
