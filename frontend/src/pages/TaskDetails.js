import React, { useContext, useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { SharedStateContext } from "../Context/SharedStateContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import createAxiosInstance from "../axiosInstance";
import TableComponent from "../components/TableComponent";
import TaskModal from "../components/TaskModal";
import VerticalNavigation from "../components/VerticalNavigation";
import UploadEvidenceModal from "../components/EvidenceComponents/UploadEvidenceModal";
import UserImages from "../components/EvidenceComponents/UserImages";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TaskDetails.css";

const TaskDetails = () => {
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
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const { user } = useAuthContext();
  const axiosInstance = createAxiosInstance(user?.token);
  const [images, setImages] = useState([]);

  // console.log(dailyTasks);
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

  const taskColumns = [
    { label: "#", renderCell: (_, index) => index + 1 },
    { label: "Task", renderCell: (task) => task.name },
    { label: "Description", renderCell: (task) => task.description },
    {
      label: "Last Reset Date",
      renderCell: () =>
        lastReset ? new Date(lastReset).toLocaleString() : "N/A",
    },
    {
      label: "Status",
      renderCell: (task) => (
        <Button
          variant={task.status ? "success" : "secondary"}
          onClick={() => toggleTaskStatus(task)}
        >
          {task.status ? "Completed" : "Pending"}
        </Button>
      ),
    },
    {
      label: "Actions",
      renderCell: (task) => (
        <>
          <Button variant="link" onClick={() => handleEditTask(task)}>
            <FaEdit />
          </Button>
          <Button variant="link" onClick={() => deleteTask(task._id)}>
            <FaTrash />
          </Button>
        </>
      ),
    },
  ];

  const fetchUserImages = async () => {
    try {
      const response = await axiosInstance.get(`/api/users/${userId}/evidence`);

      // Extract filenames from the URLs
      const filenames = response.data.map((img) => img.url.split("/").pop());

      // Construct the URLs for serving the images
      const imagePromises = filenames.map((filename) =>
        axiosInstance.get(`/api/users/evidence/${filename}`, {
          responseType: "blob", // To handle the response as a blob
        })
      );
      const imageResponses = await Promise.all(imagePromises);

      const imageUrls = imageResponses.map((res) =>
        URL.createObjectURL(res.data)
      );
      setImages(imageUrls);
    } catch (err) {
      console.error("Error fetching user images:", err);
      setImages([]);
      setError("Could not fetch user images. Please try again later.");
    }
  };

  const handleUploadSuccess = useCallback(() => {
    fetchUserImages();
  }, [axiosInstance, userId]);
  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col md={2} className="bg-light p-0">
          <VerticalNavigation />
        </Col>
        <Col md={10} className="p-4">
          <div className="content-area">
            <h1 style={{ color: "#ffffff" }}>My Daily Tasks</h1>
            {loading && <p style={{ color: "#ffffff" }}>Loading tasks...</p>}
            {error && <p className="text-danger">{error} </p>}
            {!loading && !error && (
              <>
                {dailyTasks?.length > 0 ? (
                  <TableComponent
                    columns={taskColumns}
                    data={dailyTasks}
                    onEdit={handleEditTask}
                    onDelete={deleteTask}
                    onToggleStatus={toggleTaskStatus}
                  />
                ) : (
                  <p>No tasks found.</p>
                )}
              </>
            )}
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Button
              variant="success"
              className="add-task-button"
              onClick={handleAddTask}
            >
              Add Task
            </Button>
            <Button
              variant="success"
              onClick={() => setShowEvidenceModal(true)}
            >
              Upload Evidence
            </Button>
          </div>
          <UserImages userId={userId} images={images} setImages={setImages} />
        </Col>
      </Row>
      <TaskModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveTask}
        task={currentTask}
        users={users}
      />
      <UploadEvidenceModal
        show={showEvidenceModal}
        handleClose={() => setShowEvidenceModal(false)}
        userId={userId}
        onUploadSuccess={handleUploadSuccess}
      />
    </Container>
  );
};

export default TaskDetails;
