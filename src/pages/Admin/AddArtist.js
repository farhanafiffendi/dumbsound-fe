import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from 'react-router';
import NavbarAdmin from "../../components/NavbarAdmin";
import { message } from 'antd';
import { API } from '../../config/api';

const AddArtis = () => {

  let navigate = useNavigate();

  message.config({
    duration: 4,
  });

  const [form, setForm] = useState({
    name: '',
    old: '',
    type: '',
    startCareer: ''
  })

  const { name, old, type, startCareer } = form

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      const body = JSON.stringify({ ...form })

      const response = await API.post('/artist', body, config)

      message.success('Add Artis Success');

      setForm(
        {
          name: '',
          old: '',
          type: '',
          startCareer: ''
        }
      )

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="container my-5">
      <NavbarAdmin />
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" onChange={handleOnChange} value={name} name="name" />
          <Form.Label>Old</Form.Label>
          <Form.Control type="number" placeholder="Old" onChange={handleOnChange} value={old} name="old" />
          <label for="disabledSelect" class="form-label">Type</label>
          <select id="disabledSelect" class="form-select" onChange={handleOnChange} value={type} name="type">
            <option value="" selected disabled>Type</option>
            <option name="type">Solo</option>
            <option name="type">Band</option>
          </select>
          <Form.Label>Start a Career</Form.Label>
          <Form.Control type="text" placeholder="Start a Career" onChange={handleOnChange} value={startCareer} name="startCareer" />
        </Form.Group>
        <button className='mt-2 btn btn-danger'> Add Artist </button>
      </Form>
    </div>
  );
};

export default AddArtis;