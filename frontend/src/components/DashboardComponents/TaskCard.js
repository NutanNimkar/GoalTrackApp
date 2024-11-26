// components/TaskCard.js
import React, { useContext } from "react";
import "./TaskCard.css";
import { IconButton } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { SharedStateContext } from "../../Context/SharedStateContext";

const TaskCard = ({ task, selectedTask }) => {
  const { handleEditTask, confirmDeleteModal } =
    useContext(SharedStateContext);

  return (
    <div className="task-card">
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <div className="task-actions">
        <IconButton
          aria-label="edit"
          color="primary"
          onClick={() => handleEditTask(task)}
        >
          <FaEdit />
        </IconButton>
        <IconButton
          aria-label="delete"
          style={{ color: "red" }}
          onClick={() => confirmDeleteModal(selectedTask)}
        >
          <FaTrash />
        </IconButton>
      </div>
    </div>
  );
};

export default TaskCard;
