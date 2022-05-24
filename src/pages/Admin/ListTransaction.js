import React, { useContext, useEffect, useState } from 'react'
import { API } from '../../config/api'
import { Table } from 'react-bootstrap';
import { UserContext } from '../../context/userContext';
import NavbarAdmin from '../../components/NavbarAdmin';

export default function ListTransaction() {

    const [state, dispatch] = useContext(UserContext);

    const [userTrans, setUserTrans] = useState([])
    console.log(userTrans);

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

    return (
        <div className='container'>
            <NavbarAdmin />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>User</th>
                        <th>Due date</th>
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
