import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { Container, Form } from "react-bootstrap";

const AddArtis = () => {
  const navigate = useNavigate();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); // For image preview
  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    year: "",
    attache: "",
    idArtis: "",
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
          <Form.Label>Name</Form.Label>
          <Form.Control type="email" placeholder="Name" />
          <Form.Label>Old</Form.Label>
          <Form.Control type="email" placeholder="Old" />
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

export default AddArtis;