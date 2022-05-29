import React, { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContext } from '../../context/userContext';
import { useNavigate } from "react-router-dom";
import { Alert } from 'react-bootstrap';

// Import useMutation from react-query here ...
import { useMutation } from 'react-query';

// Get API config here ...
import { API } from '../../config/api';


export default function Register() {

    let navigate = useNavigate();
    console.log(navigate);

    const [state, dispatch] = useContext(UserContext);
    console.log(state);
    console.log(dispatch);

    const [message, setMessage] = useState(null);

    // Create variabel for store data with useState here ...
    const [form, setForm] = useState({
        fullname: '',
        email: '',
        password: '',
        gender: '',
        phone: '',
        address: '',
    });

    //timeout spinner

    const { fullname, email, password, gender, phone, address } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Create function for handle insert data process with useMutation here ...

    const handleSubmit = useMutation(async (e) => {
        try {
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
            const response = await API.post('/register', body, config);

            console.log(response);

            if (response.data.status === "success...") {

                const alert = (
                    <Alert variant="success" className="py-1">
                        Register Success
                    </Alert>
                );
                setMessage(alert)
                setForm({
                    fullname: '',
                    email: '',
                    password: '',
                    gender: '',
                    phone: '',
                    address: '',
                })
            } else {
                const alert = (
                    <Alert variant="danger" className="py-1">
                        Failed
                    </Alert>
                );
                setMessage(alert)
            }
            // Handling response here
        } catch (error) {
            if (error.response.data.message === "Email Already Exist!!!") {
                console.log(error.response.data.message);
                const alertEmail = (
                    <Alert variant="danger" className="py-1">
                        Email sudah terdaftar
                    </Alert>
                );
                setMessage(alertEmail);
            } else if (error.response.data.message === "\"email\" is not allowed to be empty") {
                const email = (
                    <Alert variant="danger" className="py-1">
                        Email tidak boleh kosong
                    </Alert>
                );
                setMessage(email);
            } else if (error.response.data.message === "\"password\" length must be at least 6 characters long") {
                const email = (
                    <Alert variant="danger" className="py-1">
                        Password minimal 6 karakter
                    </Alert>
                );
                setMessage(email);
            } else if (error.response.data.message === "\"fullname\" is not allowed to be empty") {
                const email = (
                    <Alert variant="danger" className="py-1">
                        Nama tidak boleh kosong
                    </Alert>
                );
                setMessage(email);
            } else if (error.response.data.message === "\"password\" is not allowed to be empty") {
                const email = (
                    <Alert variant="danger" className="py-1">
                        Password tidak boleh kosong
                    </Alert>
                );
                setMessage(email);
            } else if (error.response.data.message === "\"fullname\" length must be at least 3 characters long") {
                const email = (
                    <Alert variant="danger" className="py-1">
                        Nama minimal 6 karakter
                    </Alert>
                );
                setMessage(email);
            } else if (error.response.data.message === "\"email\" length must be at least 6 characters long") {
                const email = (
                    <Alert variant="danger" className="py-1">
                        Email minimal 6 karakter
                    </Alert>
                );
                setMessage(email);
            }
        }
    });

    return (
        <div className="container mt-5 text-light">
            <div className="col-lg-12 d-flex justify-content-center">
                <div className="row">
                    <div className="d-flex justify-content-center">
                        <div className="containerRegister form">
                            <form onSubmit={(e) => handleSubmit.mutate(e)}>
                                <div>{message && message}</div>
                                <h2>Register</h2>
                                <label>Name</label>
                                <input type="text" placeholder="Name" value={fullname} name="fullname" onChange={handleChange} />
                                <label>Email</label>
                                <input type="email" placeholder="Email" value={email} name="email" onChange={handleChange} />
                                <label>Password</label>
                                <input type="password" placeholder="Password" value={password} name="password" onChange={handleChange} />
                                <label for="disabledSelect" class="form-label">Gender</label>
                                <select id="disabledSelect" class="form-select" value={gender} name="gender" onChange={handleChange}>
                                    <option value="" selected disabled>Pilih Gender</option>
                                    <option name="gender">Female</option>
                                    <option name="gender">Male</option>
                                </select>
                                <label>Phone</label>
                                <input type="text" placeholder="Name" value={phone} name="phone" onChange={handleChange} />
                                <label>Address</label>
                                <input type="text" placeholder="Address" value={address} name="address" onChange={handleChange} />
                                <button className='mt-2'> Click to register </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
