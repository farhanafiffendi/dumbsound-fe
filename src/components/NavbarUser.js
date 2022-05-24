import React from 'react'
import Logo from './assets/logo.png'
import { Container, Navbar as NavbarComp, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function NavbarUser({ handleClickRegister, handleClickLogin }) {
    return (
        <>
            <NavbarComp expand="lg">
                <Container>
                    <NavbarComp.Brand className='d-flex text-nav'>
                        <img src={Logo} />
                    </NavbarComp.Brand>
                    <div>
                        <Button className='button-first-nav' onClick={handleClickLogin}>Login</Button>
                        <Button className='ms-3 button-nav' onClick={handleClickRegister}>Register</Button>
                    </div>
                </Container>
            </NavbarComp>
        </>
    )
}
