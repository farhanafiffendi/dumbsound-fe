import React from 'react'
import Logo from './assets/logo.png'
import { Container, Navbar as NavbarComp, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './auth/Login'
import Register from './auth/Register'

export default function NavbarUser({ handleShow }) {
    return (
        <>
            <NavbarComp expand="lg">
                <Container>
                    <NavbarComp.Brand className='d-flex text-nav'>
                        <img src={Logo} />
                    </NavbarComp.Brand>
                    <div>
                        <Login className='me-3' />
                        <Register />
                    </div>
                </Container>
            </NavbarComp>
        </>
    )
}
