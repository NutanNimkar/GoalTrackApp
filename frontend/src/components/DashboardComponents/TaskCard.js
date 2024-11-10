// components/TaskCard.js
import React, { useContext } from 'react';
import './TaskCard.css';
import { IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { SharedStateContext } from '../../Context/SharedStateContext';

const TaskCard = ({ task }) => {
  const {
    handleEditTask,
    deleteTask,
  } = useContext(SharedStateContext);

  return (
    <div className="task-card">
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <div className="task-actions">
        <IconButton aria-label="edit" color="primary" onClick={() => handleEditTask(task)}>
          <FaEdit />
        </IconButton>
        <IconButton aria-label="delete" color="secondary" onClick={() => deleteTask(task._id)}>
          <FaTrash />
        </IconButton>
      </div>
    </div>
  );
};

export default TaskCard;
