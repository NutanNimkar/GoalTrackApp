import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CreateGroupForm from './CreateGroupForm';

const CreateGroupModal = ({ show, handleClose, handleSave, group }) => {
  const onSave = (data) => {
    const newGroup = {
      ...group,
      ...data,
      members: data.members ? [data.members] : []
    };
    handleSave(newGroup);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateGroupForm group={group} onSave={onSave} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateGroupModal;
