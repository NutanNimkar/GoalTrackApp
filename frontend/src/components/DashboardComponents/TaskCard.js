// components/TaskCard.js
import React, { useContext } from "react";
import "./TaskCard.css";
import { IconButton } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { SharedStateContext } from "../../Context/SharedStateContext";
import { Card, Typography } from "@mui/joy";

const TaskCard = ({ task, selectedTask }) => {
  const { handleEditTask, confirmDeleteModal } = useContext(SharedStateContext);

  return (
    <Card
      variant="soft"
      sx={{ bgcolor: "#BBD1ED", color: "black" }}
      className="task-card"
    >
      <Typography level="h3" style={{ fontFamily: "Lucida Sans" }}>
        {task.name}
      </Typography>
      <Typography
        level="body1"
        sx={{ color: "black", fontFamily: "Lucida Sans" }}
      >
        {task.description}
      </Typography>
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
    </Card>
  );
};

export default TaskCard;
