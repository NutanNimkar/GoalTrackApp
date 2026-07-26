// components/TaskActivity.js
import React, { useContext } from "react";
import "./TaskActivity.css";
import TaskCard from "./TaskCard";
import { IconButton } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { SharedStateContext } from "../../Context/SharedStateContext";
import TaskModal from "../TaskModal";
import { Link, useLocation } from "react-router-dom";
import { Stack, Button, Typography, Card } from "@mui/joy";
import { MdOutlinePersonOutline } from "react-icons/md";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const TaskActivity = ({ tasks }) => {
  const {
    handleAddTask,
    showModal,
    setShowModal,
    currentTask,
    handleSaveTask,
    showDeleteModal,
    setShowDeleteModal,
    selectedTask,
  } = useContext(SharedStateContext);

  const location = useLocation();

  const { name, punishment, description, members } = location.state;
  return (
    <Card
      sx={{
        bgcolor: "#12253D",
        borderRadius: "12px",
        borderColor: "#062B5C",
        borderWidth: 3
      }}
      variant="outlined"
      color="neutral"
      className="task-activity-container"
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Typography style={{ color: "white", fontFamily: "Lucida Sans" }} level="h2">
            Task Activity
          </Typography>
          <Typography variant="caption" sx={{textAlign: "justify", paddingTop: 2, paddingBottom: 2, fontFamily: "Lucida Sans"}}>
            Daily tasks which need to be completed will be displayed here. Add
            more tasks using the feature below.
          </Typography>
          <Link
            to={{ pathname: `/groups/${name}/groupdb` }}
            state={{
              name: name,
              description: description,
              punishment: punishment,
              members: members,
            }}
            style={{ textAlign: "end", textDecoration: "none" }}
          >
            <Button
              size="lg"
              variant="outlined"
              sx={{
                bgcolor: "#022D66",
                color: "#ffffff",
                borderColor: "#AEC5E3",
                borderWidth: 2,
                borderRadius: 15,
                display: "flex",
                justifySelf: "center",
                width:"100%"
              }}
            >
              <Stack gap={3} direction="horizontal">
                <MdOutlinePersonOutline size={45} />
                <Typography level="h5" sx={{ alignContent: "center", fontFamily: "Lucida Sans" }}>
                  Group Dashboard
                </Typography>
              </Stack>
            </Button>
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
      <div
        className="task-list"
        style={{
          maxHeight: "50vh",
          overflowY: "auto",
          scrollbarColor: "#415F84 #0A2344",
          scrollbarGutter: "unset",

          marginRight: 10,
        }}
      >
        {tasks?.map((task, index) => (
          <TaskCard key={index} task={task} selectedTask={task} />
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

      {showDeleteModal && (
        <ConfirmDeleteModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          task={selectedTask}
        />
      )}
    </Card>
  );
};

export default TaskActivity;
