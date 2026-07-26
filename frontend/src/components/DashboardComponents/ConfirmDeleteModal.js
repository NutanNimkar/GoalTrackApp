import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { GroupsPageContext } from "../../Context/GroupsPageContext";
import { SharedStateContext } from "../../Context/SharedStateContext";

function ConfirmDeleteModal({ show, handleClose, task }) {
    const {deleteTask} = useContext(SharedStateContext);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to DELETE {task.name}?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button style={{bgcolor: "green"}} onClick={() => deleteTask(task._id)}>
          Yes
        </Button>
        <Button style={{bgcolor: "red"}} onClick={handleClose}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDeleteModal;
