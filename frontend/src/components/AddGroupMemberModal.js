import React from "react";
import { Modal, Button } from "react-bootstrap";
import AddMemberToGroup from "./AddGroupMemberForm";

const AddGroupMemberModal = ({selectedGroup, show, handleClose, handleSave, group, members}) => {
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
                <Modal.Title>Add Member to {selectedGroup}</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{overflowY: 'auto', maxHeight: '75vh'}}
            >
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