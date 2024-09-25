import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import createAxiosInstance from "../../axiosInstance";
import { useAuthContext } from "../../hooks/useAuthContext";

function UploadEvidenceModal({ show, handleClose, userId, onUploadSuccess }) {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");
  const { user } = useAuthContext();
  const axiosInstance = createAxiosInstance(user?.token);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("description", data.description);

    try {
      const response = await axiosInstance.post(
        `/api/users/${userId}/uploadEvidence`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.msg);
      reset();
      handleClose();
      onUploadSuccess();
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
            <Form.Control
              type="file"
              {...register("image", { required: true })}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control type="text" {...register("description")} />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Upload
          </Button>
        </Form>
        {message && <p>{message}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadEvidenceModal;
