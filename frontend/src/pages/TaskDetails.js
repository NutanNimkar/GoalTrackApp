import React, { useContext, useEffect } from 'react';
import VerticalNavigation from '../components/VerticalNavigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TableComponent from '../components/TableComponent';
import TaskModal from '../components/TaskModal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './TaskDetails.css';
import axios from 'axios';
import { SharedStateContext } from '../Context/SharedStateContext';

const TaskDetails = () => {
  const { users, dailyTasks, setDailyTasks,handleEditTask, deleteTask, showModal, currentTask, toggleTaskStatus, handleSaveTask, setShowModal, handleAddTask } = useContext(SharedStateContext);
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/users/6643963a530dec5de2c0797e/tasks'); // Use your userId here
        setDailyTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [setDailyTasks]);

  useEffect(() => {
    const refreshDueDate = async () => {
      const newDueDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      try {
        const response = await axios.put(`/api/tasks/due`, { dueDate: newDueDate });
        setDailyTasks(prevTasks => prevTasks.map(task => ({
          ...task,
          dueDate: newDueDate,
        })));
        console.log('Due date updated successfully', response.data);
      } catch (error) {
        console.error('Error updating due date:', error);
      }
    };
 
    // Set interval to refresh due date every 24 hours
    const interval = setInterval(refreshDueDate, 24 * 60 * 60 * 1000);

    // Initial call to set due date on load
    refreshDueDate();

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [setDailyTasks]);


  const taskColumns = [
    { label: '#', renderCell: (_, index) => index + 1 },
    { label: 'Task', renderCell: (task) => task.name },
    { label: 'Description', renderCell: (task) => task.description },
    { label: 'Due Date', renderCell: (task) => new Date(task.dueDate).toLocaleString() },
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
          <TableComponent
            columns={taskColumns}
            data={dailyTasks}
            onEdit={handleEditTask}
            onDelete={deleteTask}
            onToggleStatus={toggleTaskStatus}
          />
          <Button variant="success" onClick={handleAddTask}>Add Task</Button>
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
