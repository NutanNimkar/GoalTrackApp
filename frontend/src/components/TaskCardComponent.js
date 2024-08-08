import React, { useContext, useState } from "react";
import {
  Container,
  Card,
  CardFooter,
  Button,
  Accordion,
} from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { SharedStateContext } from "../Context/SharedStateContext";
// import "../components/TaskCardComponent.css"

const TaskCardComponent = ({
  title,
  data,
  onToggleStatus,
  onDelete,
  onEdit,
  lastReset,
  task,
}) => {
  const { handleEditTask, deleteTask, toggleTaskStatus } =
    useContext(SharedStateContext);

  return (
    <Container>
      <Accordion>
        <Card>
          <Accordion.Item eventKey="1" className="accordionStyling">
            <Accordion.Header as="h2" className="accordionStyling">
              {title}
            </Accordion.Header>
            <Accordion.Body>
              {data}
              <br />
            </Accordion.Body>
            <CardFooter className="d-flex justify-content-between">
              <Button variant="link" onClick={() => handleEditTask(task)}>
                <FaEdit />
              </Button>
              <Button variant="link" onClick={() => deleteTask(task._id)}>
                <FaTrash color="red" />
              </Button>
              <Button
                variant={task.status ? "success" : "secondary"}
                onClick={() => toggleTaskStatus(task)}
                style={{ alignContent: "end" }}
              >
                {task.status ? "Completed" : "Pending"}
              </Button>
            </CardFooter>
          </Accordion.Item>
        </Card>
      </Accordion>
      <br />
    </Container>
  );
};

export default TaskCardComponent;
