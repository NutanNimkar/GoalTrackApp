import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VerticalNavigation from '../components/VerticalNavigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import TableComponent from '../components/TableComponent';
import TaskModal from '../components/TaskModal';
import { FaEdit, FaTrash } from 'react-icons/fa';

const JustInCase = () => {
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState(null);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const userId = '6643963a530dec5de2c0797e'; 
  const groupId = '6656350aa68a902e3fdf9675';



  // user = [group]
  useEffect(() => {
    fetchGroupAndTasks();
    // const refreshInterval = setInterval(() => {
    //   refreshDueDate();
    //   fetchGroupAndTasks();
    // }, 24 * 60 * 60 * 1000);

    // return () => clearInterval(refreshInterval);
  }, []);

  const fetchGroupAndTasks = () => {
    // Fetch single group with its members
    axios.get(`/api/groups/${groupId}/members`)
      .then(response => setGroup(response.data))
      .catch(error => console.error('Error fetching group:', error));
    
    // Fetch all users
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
        setDailyTasks(prevDailyTasks => prevDailyTasks.filter(task => task._id !== taskId));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const toggleTaskStatus = (task) => {
    const updatedStatus = !task.status;
    axios.put(`/api/tasks/${task._id}/status`, { status: updatedStatus })
      .then(response => {
        setDailyTasks(prevDailyTasks => 
          prevDailyTasks.map(t => t._id === task._id ? { ...t, status: updatedStatus } : t)
        );
      })
      .catch(error => console.error('Error toggling task status:', error));
  };

  const addUserToGroup = () => {
    axios.put(`/api/groups/${groupId}/add-member`, { userId: selectedUserId })
      .then(response => {
        setGroup(response.data);
        setSelectedUserId('');
      })
      .catch(error => console.error('Error adding user to group:', error));
  };

  const calculateTaskProgress = (userId) => {
    const userTasks = dailyTasks.filter(task => task.assignedTo === userId);
    const completedTasks = userTasks.filter(task => task.status === true);
    if( completedTasks.length === userTasks.length && completedTasks.length > 0) {
      return 'Completed';
    }
    if(completedTasks.length === 0) {
      return 'Not Started';
    }
    return `${completedTasks.length}/${userTasks.length}`;
  };

  // const refreshDueDate = () => {
  //   // Calculate new due date
  //   const currentDate = new Date();
  //   const nextDay = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

  //   // Update due date for each task
  //   dailyTasks.forEach(task => {
  //     axios.put(`/api/tasks/${task._id}/due`, { ...task, dueDate: nextDay })
  //       .then(response => console.log('Due date updated for task:', response.data))
  //       .catch(error => console.error('Error updating due date for task:', error));
  //   });
  // };

  const groupColumns = [
    { label: '#', renderCell: (user, index) => index + 1 },
    { label: 'User', renderCell: (user) => user.username },
    { label: 'Email', renderCell: (user) => user.email },
    { label: 'Group', renderCell: () => group.name },
    { label: 'Task Progress', renderCell: (user) => calculateTaskProgress(user._id) }
  ];

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
          <h1>User Task Tracker</h1>
          <Row>
            <Col md={6}>
              <h2>Group Members</h2>
              {group ? (
                <TableComponent columns={groupColumns} data={group.members} />
              ) : (
                <p>Loading group members...</p>
              )}
              <Form>
                <Form.Group controlId="formUserSelect">
                  <Form.Label>Add User to Group</Form.Label>
                  <Form.Control 
                    as="select" 
                    value={selectedUserId} 
                    onChange={(e) => setSelectedUserId(e.target.value)}
                  >
                    <option value="">Select a user</option>
                    {users.map(user => (
                      <option key={user._id} value={user._id}>{user.username}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={addUserToGroup}>Add User</Button>
              </Form>
            </Col>
            <Col md={6}>
              <h2>My Daily Tasks</h2>
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

export default JustInCase;
