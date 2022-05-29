import React, { useContext, useEffect, useState } from 'react'
import { API } from '../../config/api'
import { Table } from 'react-bootstrap';
import NavbarAdmin from '../../components/NavbarAdmin';
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ListTransaction() {
    console.clear();

    const [userTrans, setUserTrans] = useState([])

    const loadUserTrans = async () => {
        try {
            const config = {
                method: "GET",
                headers: {
                    Authorization: "Basic " + localStorage.token,
                },
            };
            const response = await API.get('/transactions', config)
            setUserTrans(response.data.transactions)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadUserTrans()
    }, [])

    return (
        <>
            <NavbarAdmin />
            <div className='container mt-4'>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>User</th>
                            <th>End Date</th>
                            <th>Status Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userTrans?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.user.fullname}</td>
                                <td>{item.dueDate}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}
