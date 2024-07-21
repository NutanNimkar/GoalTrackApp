import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { SharedStateContext } from '../Context/SharedStateContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { FaEdit, FaTrash } from 'react-icons/fa';
import createAxiosInstance from '../axiosInstance';
import TableComponent from '../components/TableComponent';
import TaskModal from '../components/TaskModal';
import VerticalNavigation from '../components/VerticalNavigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TaskDetails.css';

const TaskDetails = () => {
  const { users, dailyTasks, setDailyTasks, handleEditTask, deleteTask, showModal, currentTask, toggleTaskStatus, handleSaveTask, setShowModal, handleAddTask, userId } = useContext(SharedStateContext);
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
      console.error('Error fetching tasks:', error);
      setError('Error fetching tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const resetTaskStatus = async () => {
    try {
      const response = await axiosInstance.put(`/api/tasks/reset-status/${userId}`);
      if (response.data.tasks.length > 0) {
        setDailyTasks(response.data.tasks);
        setLastReset(response.data.lastReset); // Update the last reset date
        console.log('Task statuses reset successfully for user');
      }
    } catch (error) {
      console.error('Error resetting task statuses:', error);
      setError('Error resetting task statuses. Please try again later.');
    }
  };

  useEffect(() => {
    const initializeTasks = async () => {
      await fetchTasks();
      await resetTaskStatus();
    };

    initializeTasks();
  }, [userId]);

  const taskColumns = [
    { label: '#', renderCell: (_, index) => index + 1 },
    { label: 'Task', renderCell: (task) => task.name },
    { label: 'Description', renderCell: (task) => task.description },
    // { label: 'Due Date', renderCell: (task) => new Date(task.dueDate).toLocaleString() },
    { label: 'Last Reset Date', renderCell: () => lastReset ? new Date(lastReset).toLocaleString() : 'N/A' },
    {
      label: 'Status',
      renderCell: (task) => (
        <Button
          variant={task.status ? "success" : "secondary"}
          onClick={() => toggleTaskStatus(task)}
        >
          {task.status ? "Completed" : "Pending"}
        </Button>
      )
    },
    {
      label: 'Actions',
      renderCell: (task) => (
        <>
          <Button variant="link" onClick={() => handleEditTask(task)}>
            <FaEdit />
          </Button>
          <Button variant="link" onClick={() => deleteTask(task._id)}>
            <FaTrash />
          </Button>
        </>
      )
    }
  ];

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col md={2} className="bg-light p-0">
          <VerticalNavigation />
        </Col>
        <Col md={10} className="p-4">
          <h1>My Daily Tasks</h1>
          {loading && <p>Loading tasks...</p>}
          {error && <p className="text-danger">{error}</p>}
          {!loading && !error && (
            <>
              <TableComponent
                columns={taskColumns}
                data={dailyTasks}
                onEdit={handleEditTask}
                onDelete={deleteTask}
                onToggleStatus={toggleTaskStatus}
              />
              <Button variant="success" onClick={handleAddTask}>Add Task</Button>
            </>
          )}
        </Col>
      </Row>
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

export default TaskDetails;
