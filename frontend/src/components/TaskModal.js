import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TaskModal = ({ show, handleClose, handleSave, task, users }) => {
  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    dueDate: '',
    assignedTo: ''
  });

  useEffect(() => {
    if (task) {
      setTaskData(task);
    } else {
      setTaskData({
        name: '',
        description: '',
        dueDate: '',
        assignedTo: ''
      });
    }
  }, [task]);

  const handleSubmit = () => {
    handleSave(taskData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit Task' : 'Add Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTaskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={taskData.name}
              onChange={(e) => setTaskData((prevState) => ({...prevState, name: e.target.value}))}
            />
          </Form.Group>
          <Form.Group controlId="formTaskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={taskData.description}
              onChange={(e) => setTaskData((prevState) => ({...prevState, description: e.target.value}))}
            />
          </Form.Group>
          <Form.Group controlId="formTaskDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="datetime-local"
              name="dueDate"
              value={taskData.dueDate}
              onChange={(e) => setTaskData((prevState) => ({...prevState, dueDate: e.target.value}))}
            />
          </Form.Group>
          <Form.Group controlId="formTaskAssignedTo">
            <Form.Label>Assign To</Form.Label>
            <Form.Control
              as="select"
              name="assignedTo"
              value={taskData.assignedTo}
              onChange={(e) => setTaskData((prevState) => ({...prevState, assignedTo: e.target.value}))}
            >
              <option value="">Select a user</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.username}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
