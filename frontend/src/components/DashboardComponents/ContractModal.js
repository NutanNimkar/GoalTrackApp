import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { GroupsPageContext } from "../../Context/GroupsPageContext";
import { Textarea } from "@mui/joy";

function ContractModal({ show, handleClose, groupID, punishment }) {
  const { updatePunishment } = useContext(GroupsPageContext);
  console.log(groupID)

  const onSave = (data) => {
    
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update the Group Contract</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <Textarea
            sx={{
              "--Textarea-focusedInset": "inset",
              "--Textarea-focusedThickness": "0.125rem",
              "--Textarea-focusedHighlight": "rgba(13,110,253,.25)",
              "&::before": {
                transition: "box-shadow .15s ease-in-out",
              },
              "&:focus-within": {
                borderColor: "#86b7fe",
              },
            }}
            minRows={2}
            name="Outlined"
            placeholder={punishment}
            size="lg"
            required
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" style={{ bgcolor: "green" }} onClick={() => updatePunishment(groupID)}>
          Yes
        </Button>
        <Button style={{ bgcolor: "red" }} onClick={handleClose}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ContractModal;
