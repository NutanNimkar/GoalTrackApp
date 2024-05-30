import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VerticalNavigation from '../components/VerticalNavigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import TaskModal from '../components/TaskModal';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskDetails = () => {
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState(null);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const userId = '6643963a530dec5de2c0797e'; 
  const groupId = '6656350aa68a902e3fdf9675';

  useEffect(() => {
    fetchGroupAndTasks();
  }, []);

  const fetchGroupAndTasks = () => {
    // Fetch single group with its members
    axios.get(`/api/groups/${groupId}/members`)
      .then(response => setGroup(response.data))
      .catch(error => console.error('Error fetching group:', error));
    
    //fetch all users
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));


    // Fetch current user's daily tasks
    axios.get(`/api/users/${userId}/tasks`)
      .then(response => setDailyTasks(response.data.tasks))
      .catch(error => console.error('Error fetching daily tasks:', error));
  };

  const handleSaveTask = (task) => {
    if (task._id) {
      axios.put(`/api/tasks/${task._id}`, task)
        .then(response => {
          setDailyTasks(prevDailyTasks => 
            prevDailyTasks.map(t => t._id === task._id ? response.data : t)
          );
          setShowModal(false);
  
          // Fetch updated tasks
          axios.get(`/api/users/${userId}/tasks`)
            .then(response => setDailyTasks(response.data.tasks))
            .catch(error => console.error('Error fetching updated tasks:', error));
        })
        .catch(error => console.error('Error updating task:', error));
    } else {
      axios.post('/api/tasks', task)
        .then(response => {
          setDailyTasks(prevDailyTasks => [...prevDailyTasks, response.data]);
          setShowModal(false);
  
          // Fetch updated tasks
          axios.get(`/api/users/${userId}/tasks`)
            .then(response => setDailyTasks(response.data.tasks))
            .catch(error => console.error('Error fetching updated tasks:', error));
        })
        .catch(error => console.error('Error adding task:', error));
    }
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleAddTask = () => {
    setCurrentTask(null);
    setShowModal(true);
  };

  const deleteTask = (taskId) => {
    axios.delete(`/api/tasks/${taskId}`)
      .then(() => {
        setDailyTasks(dailyTasks.filter(task => task._id !== taskId));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const toggleTaskStatus = async (task) => {
    const updatedStatus = !task.status;
    axios.put(`/api/tasks/${task._id}/status`, { status: updatedStatus })
      .then(response => {
        setDailyTasks(dailyTasks.map(t => t._id === task._id ? { ...t, status: updatedStatus } : t));
      })
      .catch(error => console.error('Error toggling task status:', error));
  };
  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col md={2} className="bg-light p-0">
          <VerticalNavigation />
        </Col>
        <Col md={10} className="p-4">
          <h1>User Task Tracker</h1>
          <Row>
            <Col md={6}>
              <h2>Group Members</h2>
              {group ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User</th>
                      <th>Email</th>
                      <th>Group</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.members.map((user, index) => (
                      <tr key={user}>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{group.name}</td>
                        <td>{user.status ? 'Active' : 'Inactive'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>Loading group members...</p>
              )}
            </Col>
            <Col md={6}>
              <h2>My Daily Tasks</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyTasks.map((task, index) => (
                    <tr key={task._id}>
                      <td>{index + 1}</td>
                      <td>{task.name}</td>
                      <td>{task.description}</td>
                      <td>{new Date(task.dueDate).toLocaleString()}</td>
                      <td>
                        <Button
                          variant={task.status ? "success" : "secondary"}
                          onClick={() => toggleTaskStatus(task)}
                        >
                          {task.status ? "Completed" : "Pending"}
                        </Button>
                      </td>
                      <td>
                        <Button variant="link" onClick={() => handleEditTask(task)}>
                          <FaEdit />
                        </Button>
                        <Button variant="link" onClick={() => deleteTask(task._id)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="success" onClick={handleAddTask}>Add Task</Button>
            </Col>
          </Row>
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