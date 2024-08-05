import React, { useContext, useEffect, useState } from "react";
import { SharedStateContext } from "../../Context/SharedStateContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import createAxiosInstance from "../../axiosInstance";
import TaskModal from "../TaskModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../pages/TaskDetails.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import TableComponent from "../TableComponent";
import TaskCardComponent from "../TaskCardComponent";

const MyTaskDetails = () => {
  const {
    users,
    dailyTasks,
    setDailyTasks,
    handleEditTask,
    deleteTask,
    showModal,
    currentTask,
    toggleTaskStatus,
    handleSaveTask,
    setShowModal,
    handleAddTask,
    userId,
  } = useContext(SharedStateContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastReset, setLastReset] = useState(null);
  const { user } = useAuthContext();
  const axiosInstance = createAxiosInstance(user?.token);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/api/users/${userId}/tasks`);
      setDailyTasks(response.data.tasks);
      setLastReset(response.data.lastReset);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("There are no tasks for this user, please add some.");
    } finally {
      setLoading(false);
    }
  };

  const resetTaskStatus = async () => {
    try {
      const response = await axiosInstance.put(
        `/api/tasks/reset-status/${userId}`
      );
      if (response.data.tasks.length > 0 && response.status === 200) {
        setDailyTasks(response.data.tasks);
        setLastReset(response.data.lastReset);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error resetting task statuses:", error);
      setError("Error resetting task statuses. Please try again later.");
    }
  };

  useEffect(() => {
    const initializeTasks = async () => {
      if (!user) {
        setError("You must be logged in");
        return;
      }
      try {
        await fetchTasks();
        await resetTaskStatus();
      } catch (e) {
        console.log(e);
      }
    };

    initializeTasks();
  }, [userId]);

  console.log(dailyTasks);
  return (
    <Container fluid className="vh-20">
      <div className="content-area">
        {loading && <p style={{ color: "#ffffff" }}>Loading tasks...</p>}
        {error && <p className="text-danger">{error} </p>}
        {!loading && !error && (
          <>
            {dailyTasks?.length > 0 ? (
              dailyTasks.map((dailyTask, index) => (
                <TaskCardComponent
                  key={index}
                  title={dailyTask.name}
                  data={dailyTask.description}
                  onToggleStatus={toggleTaskStatus}
                  onDelete={deleteTask}
                  onEdit={handleEditTask}
                  lastReset={lastReset}
                  task={dailyTask}
                />
              ))
            ) : (
              <p>No tasks found.</p>
            )}
          </>
        )}
      </div>
      <TaskModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveTask}
        task={currentTask}
        users={users}
      />
    </Container>
  );
};

export default MyTaskDetails;
