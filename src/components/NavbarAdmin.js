import React from 'react'
import Logo from './assets/shapes.png'
import { Container, Navbar as NavbarComp, Nav, NavDropdown } from 'react-bootstrap'
import { Avatar } from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function NavbarAdmin() {
    return (
        <>
            <NavbarComp expand="lg">
                <Container>
                    <NavbarComp.Brand className='d-flex text-nav'>
                        <img src={Logo} className="img-fluid" />
                        <p className='text-dumb'>Dumb<span className='text-sound'>sound</span></p>
                    </NavbarComp.Brand>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <Avatar>H</Avatar>
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Container>
            </NavbarComp>
        </>
    )
}
