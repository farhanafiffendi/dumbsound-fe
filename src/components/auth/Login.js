import React, { useState, useContext, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContext } from '../../context/userContext';
import { Button, Modal, Alert, Spinner, Form } from 'react-bootstrap'

import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";

// Get API config here ...
import { API } from '../../config/api';

export default function Login() {

    let navigate = useNavigate();

    const [state, dispatch] = useContext(UserContext);

    console.log(state);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [message, setMessage] = useState(null);

    const [loading, setLoading] = useState(false); //set spinner

    // Create variabel for store data with useState here ...
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    //timeout spinner
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Create function for handle insert data process with useMutation here ...
    const handleSubmit = useMutation(async (e) => {
        try {
            setLoading(true)//kondisi spinner
            e.preventDefault();

            // Configuration Content-type
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };

            // Data body
            const body = JSON.stringify(form);

            // Insert data user to database
            const response = await API.post('/login', body, config);
            console.log(response);

            if (response.status === 200) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data.data
                })
            }
            if (response.data.data.status === 'admin') {
                navigate('/list-transaction')
            } else {
                navigate('/')
            }

            setMessage('login success')

            // Handling response here
        } catch (error) {
            setLoading(false)
            if (error.response.data.message === "Email and password incorrect") {
                // console.log(error.response.data.message);
                const alertEmail = (
                    <Alert variant="danger" className="py-1">
                        Email belum terdaftar
                    </Alert>
                );
                setMessage(alertEmail);
            } else if (error.response.data.message === "Email or Password incorrect") {
                // console.log(error.response.data.message);
                const alertEmail = (
                    <Alert variant="danger" className="py-1">
                        Email atau password salah
                    </Alert>
                );
                setMessage(alertEmail);
            } else if (error.response.data.message === "Server Error") {
                const failed = (
                    <Alert variant="danger" className="py-1">
                        Network failed
                    </Alert>
                );
                setMessage(failed);
            } else if (error.response.data.error.message === "\"email\" is not allowed to be empty") {
                const email = (
                    <Alert variant="danger" className="py-1">
                        Email tidak boleh kosong
                    </Alert>
                );
                setMessage(email);
            } else if (error.response.data.error.message === "\"password\" is not allowed to be empty") {
                const failed = (
                    <Alert variant="danger" className="py-1">
                        Password tidak boleh kosong
                    </Alert>
                );
                setMessage(failed);
            }
        }
    });

    return (
        <>
            {/* <div className="container mt-5 text-light">
                <div className="col-lg-12 d-flex justify-content-center">
                    <div className="row">
                        <div className="d-flex justify-content-center">
                            <div className="containerLogin form">
                                <form onSubmit={(e) => handleSubmit.mutate(e)}>
                                    <div>{message && message}</div>
                                    <h2>Login</h2>
                                    <label>Email</label>
                                    <input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} />
                                    <label>Password</label>
                                    <input type="password" placeholder="Password" value={password} name="password" onChange={handleChange} />
                                    {loading ? <>
                                        <Spinner animation="border" variant="danger" />
                                    </> : <button> Click to login </button>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <Button variant="primary" onClick={handleShow}>
                Login
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Form.Group>
                            <div>{message && message}</div>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                autoFocus
                            />
                        </Form.Group>
                        {loading ? <>
                            <Spinner animation="border" variant="danger" />
                        </> : <button> Click to login </button>}
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
