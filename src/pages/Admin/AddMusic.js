import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { Container, Form } from "react-bootstrap";

const AddMusic = () => {
    const navigate = useNavigate();

    const title = "Add Music";
    document.title = "Dumbsound | " + title;

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [categoryId, setCategoryId] = useState([]); //Save the selected category id
    const [preview, setPreview] = useState(null); // For image preview
    const [form, setForm] = useState({
        title: "",
        thumbnail: "",
        year: "",
        attache: "",
        idArtist: "",
    });

    // Handle change data on form
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
    };

    return (
        <div className="container my-5">
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" />
                    <Form.Label>Default file input example</Form.Label>
                    <Form.Control type="file" />
                    <label for="disabledSelect" class="form-label">Gender</label>
                    <select id="disabledSelect" class="form-select" name="gender" onChange={handleChange}>
                        <option value="" selected disabled>Type</option>
                        <option name="Solo">Solo</option>
                        <option name="Band">Band</option>
                    </select>
                </Form.Group>
            </Form>
        </div>
    );
};

export default AddMusic;