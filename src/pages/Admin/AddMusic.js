import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { Container, Form } from "react-bootstrap";
import NavbarAdmin from "../../components/NavbarAdmin";
import { message } from 'antd';
import { API } from '../../config/api';

const AddMusic = () => {

    const [artiss, setArtiss] = useState([])

    const loadArtis = async () => {
        try {
            const response = await API.get('artists')
            setArtiss(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadArtis()
    }, [])

    console.log(artiss);

    message.config({
        duration: 4,
    });

    // form pertama kali di load
    const [form, setForm] = useState({
        title: '',
        year: '',
        thumbnail: '',
        attache: '',
        idArtist: ''
    })

    // view image upload
    const [preview, setPreview] = useState('')

    const { title, year, thumbnail, attache, idArtist } = form

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value,
        });

        // Create image url for preview
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleOnSubmit = useMutation(async (e) => {
        console.log('submit')
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }


            const formData = new FormData()
            formData.set("title", form.title)
            formData.set("year", form.year)
            console.log(form.attache[0].name)
            console.log(form.thumbnail[0].name)
            formData.set("attache", form?.attache[0], form?.attache[0]?.name)
            formData.set("thumbnail", form.thumbnail[0], form?.thumbnail[0]?.name)
            formData.set("idArtist", form.idArtist)

            await API.post('/music', formData, config)

            message.success('Add Song Success');

            setForm(
                {
                    title: '',
                    year: '',
                    thumbnail: '',
                    attache: '',
                    idArtist: ''
                }
            )

        } catch (error) {
            console.log(error)
        }
    });

    return (
        <div className="container my-5">
            <NavbarAdmin />
            <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" onChange={onChange} name="title" value={title} />

                    <Form.Label>Year</Form.Label>
                    <Form.Control type="number" placeholder="Year" onChange={onChange} name="year" placeholder="Year" value={year} required autoComplete="off" />

                    <Form.Label>Attache Thumbnail</Form.Label>
                    <Form.Control type="file" onChange={onChange} name="thumbnail" accept="image/*" />

                    <label for="disabledSelect" class="form-label">Singer</label>
                    <select id="disabledSelect" class="form-select" onChange={onChange} value={idArtist} name="idArtist" as="select">
                        <option value="" selected disabled>Artis</option>
                        {artiss?.map((art, index) => (
                            <>
                                <option name="idArtist" value={art.id}>{art.name}</option>
                            </>
                        ))}
                    </select>

                    <Form.Label>Attache Song</Form.Label>
                    <Form.Control type="file" onChange={onChange} name="attache" accept="audio/*" />

                </Form.Group>
                <button className='mt-2 btn btn-danger' type="submit"> Add Music </button>
            </Form>
        </div>
    );
};

export default AddMusic;