import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import CreateGroupForm from '../components/createGroupForm';

const CreateGroupModal = ({show, handleClose, handleSave, group, members}) => {
    const onSave = (data) => {
        const newGroup = {
            ...group,
            ...data
        };

        handleSave(newGroup);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreateGroupForm group={group} members={members} onSave={onSave}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateGroupModal;