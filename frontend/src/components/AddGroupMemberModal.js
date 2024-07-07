import React from "react";
import { Modal, Button } from "react-bootstrap";
import AddMemberToGroup from "./AddGroupMemberForm";

const AddGroupMemberModal = ({show, handleClose, handleSave, group, members}) => {
    const onSave = (data) => {
        const updateGroup = {
            ...group,
            ...data
        };
        handleSave(updateGroup);
    };

    return (
        <Modal show = {show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Member to {group}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddMemberToGroup group = {group} members = {members} onSave={onSave}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddGroupMemberModal;