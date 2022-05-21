import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import ModalLogin from '../components/modal/ModalLogin';

export default function Auth() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="bg-black">
            <Container>
                <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button>
                <Row className="d-flex align-items-center">
                    <Col md="6"><Login /></Col>
                </Row>
            </Container>
            <ModalLogin show={show}
                handleClose={handleClose} />
        </div>
    )
};
