import React, { useContext } from 'react';
import VerticalNavigation from '../components/VerticalNavigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TableComponent from '../components/TableComponent';
import TaskModal from '../components/TaskModal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './TaskDetails.css';
import { SharedStateContext } from '../Context/SharedStateContext';

const TaskDetails = () => {
  const { users, dailyTasks, handleEditTask, deleteTask, showModal, currentTask, toggleTaskStatus, handleSaveTask, setShowModal, handleAddTask } = useContext(SharedStateContext);
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
