import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TaskModal = ({ show, handleClose, handleSave, task, users }) => {
  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    dueDate: '',
    assignedTo: '',
    status: false,
  });

  useEffect(() => {
    if (task) {
      setTaskData(task);
    } else {
      setTaskData({
        name: '',
        description: '',
        dueDate: '',
        assignedTo: '',
        status: false,
      });
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setTaskData({ ...taskData, [name]: checked });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSave(taskData);
    setTaskData({
      name: '',
      description: '',
      dueDate: '',
      assignedTo: '',
      status: false,
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit Task' : 'Add Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="taskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={taskData.name}
              onChange={handleInputChange}
              placeholder="Enter task name"
            />
          </Form.Group>
          <Form.Group controlId="taskDescription">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
            />
          </Form.Group>
          <Form.Group controlId="taskDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="taskAssignedTo">
            <Form.Label>Assign To</Form.Label>
            <Form.Control
              as="select"
              name="assignedTo"
              value={taskData.assignedTo}
              onChange={handleInputChange}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="taskStatus">
            <Form.Label>Status</Form.Label>
            <Form.Check
              type="checkbox"
              name="status"
              label="Completed"
              checked={taskData.status}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {task ? 'Save Changes' : 'Add Task'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskModal;
