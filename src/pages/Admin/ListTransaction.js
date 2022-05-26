import React, { useContext, useEffect, useState } from 'react'
import { API } from '../../config/api'
import { Table } from 'react-bootstrap';
import NavbarAdmin from '../../components/NavbarAdmin';

export default function ListTransaction() {

    const [userTrans, setUserTrans] = useState([])
    const [transAdmin, setTransAdmin] = useState({})
    console.log(transAdmin);

    const loadUserTrans = async () => {
        try {
            const config = {
                headers: {
                    Authorization: "Basic " + localStorage.token,
                    "Content-type": "application/json",
                },
            };
            const response = await API.get('/transactions')
            setUserTrans(response.data.transactions)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadUserTrans()
    }, [])

    console.log("halo:", userTrans.status)

    return (
        <div className='container'>
            <NavbarAdmin />
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
    )
}
