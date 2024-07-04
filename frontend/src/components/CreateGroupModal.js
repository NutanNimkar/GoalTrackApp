import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form';


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
                <TaskForm />
            </Modal.Body>
        </Modal>
    )
}