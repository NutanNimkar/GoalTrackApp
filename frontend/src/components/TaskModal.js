import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import TaskForm from './TaskForm'; // Make sure this path is correct


const TaskModal = ({ show, handleClose, handleSave, task, users }) => {
  const onSave = (data) => {
    
    const newTask = {
      ...task,
      ...data,
    };
    handleSave(newTask);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit Task' : 'Add Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TaskForm task={task} users={users} onSave={onSave} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
