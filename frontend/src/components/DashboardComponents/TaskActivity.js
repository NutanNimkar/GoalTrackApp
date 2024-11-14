// components/TaskActivity.js
import React, { useContext } from 'react';
import './TaskActivity.css';
import TaskCard from './TaskCard';
import { IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { SharedStateContext } from '../../Context/SharedStateContext';
import TaskModal from '../TaskModal';
import { Link, useLocation} from 'react-router-dom';
import { Stack, Card } from '@mui/joy';
import { MdOutlinePersonOutline } from "react-icons/md";

const TaskActivity = ({ tasks }) => {
  const { handleAddTask, showModal, setShowModal, currentTask, dailyTasks, handleSaveTask } = useContext(SharedStateContext);
  const location = useLocation();
  console.log("activity", dailyTasks);
  const { name, punishment, description, members } = location.state;
  console.log(members)
  return (
    <div className="task-activity-container">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5>Task Activity</h5>
          <p>Daily tasks which need to be completed will be displayed here. Add more tasks using the feature below.</p>
          <Link
            to={{ pathname: `/groups/${name}/groupdb` }}
            state={{
              name: name,
              description: description,
              punishment: punishment,
              members: members
            }}
            style={{ textAlign: "end", textDecoration: "none" }}
          >
            <Card sx={{ bgcolor: "#12253D", color: "#ffffff" }}>
              <Stack gap={3} direction="horizontal">
                <MdOutlinePersonOutline />
                Group Dashboard
              </Stack>
            </Card>
          </Link>
        </div>
      </div>

      {/* Add Daily Task Button */}
      <div className="add-task-section">
        <IconButton color="primary" onClick={handleAddTask}>
          <AddCircle fontSize="large" />
        </IconButton>
        <span className="add-task-text">Add Daily Task</span>
        <IconButton color="primary" onClick={handleAddTask}>
          <AddCircle fontSize="large" />
        </IconButton>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </div>

      {/* Task Modal */}
      {showModal && (
        <TaskModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          task={currentTask}
          handleSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default TaskActivity;
