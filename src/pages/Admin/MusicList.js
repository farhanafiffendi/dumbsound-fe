import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarAdmin from '../../components/NavbarAdmin'
import { API } from '../../config/api'
import DeleteData from '../../components/modal/DeleteData'
import { useQuery, useMutation } from 'react-query'


export default function MusicList() {

    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    // Modal Confirm delete data
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let { data: musics, refetch } = useQuery('musicsCache', async () => {
        const response = await API.get('/musics');
        return response.data.data;
    });

    // For get id product & show modal confirm delete data
    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };

    // If confirm is true, execute delete data
    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/music/${id}`);
            refetch();
        } catch (error) {
            console.log(error);
        }
    });

    // Call function for handle close modal and execute delete data with useEffect here ...
    useEffect(() => {
        if (confirmDelete) {
            // Close modal confirm delete data
            handleClose();
            // execute delete data by id function
            deleteById.mutate(idDelete);
            setConfirmDelete(null);
        }
    }, [confirmDelete]);

    return (
        <>
            <NavbarAdmin />
            <div className='container mt-4'>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>name</th>
                            <th>title</th>
                            <th>thumbnail</th>
                            <th>attache</th>
                            <th>Year</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {musics?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.art.name}</td>
                                <td>{item.title}</td>
                                <td><img
                                    src={item.thumbnail}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                    }}
                                    alt={item.name}
                                /></td>
                                <td>{`${item.attache}`.slice(44)}</td>
                                <td>{item.year}</td>
                                <td>
                                    <button className='btn btn-success' >Edit</button>
                                    <button className='btn btn-danger ms-2' onClick={() => {
                                        handleDelete(item.id);
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <DeleteData
                    setConfirmDelete={setConfirmDelete}
                    show={show}
                    handleClose={handleClose}
                />
            </div>
        </>

    )
}
