import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function UploadEvidenceModal({ show, handleClose, userId }) {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("description", data.description);

    try {
      const response = await axios.post(`/api/users/${userId}/uploadEvidence`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data);
      reset();
      handleClose(); // Close the modal
    } catch (error) {
      setMessage("Error uploading evidence. Please try again.");
      console.error("Error uploading evidence:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Evidence</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formFile">
            <Form.Label>File:</Form.Label>
            <Form.Control type="file" {...register('image', { required: true })} />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control type="text" {...register('description')} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Upload
          </Button>
        </Form>
        {message && <p>{message}</p>}
      </Modal.Body>
    </Modal>
  );
}

export default UploadEvidenceModal;
