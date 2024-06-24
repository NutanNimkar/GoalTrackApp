import React, { useContext } from 'react';
import { Form, Button, FormText } from 'react-bootstrap';
import TableComponent from '../components/TableComponent';
import VerticalNavigation from '../components/VerticalNavigation';
import { SharedStateContext } from '../Context/SharedStateContext';
import { Container, Row, Col } from 'react-bootstrap';
import './Groups.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Groups = () => {
  const { group, users, selectedUserId, setSelectedUserId, addUserToGroup, calculateTaskProgress, handleGroupName, addNewGroup, groupName } = useContext(SharedStateContext);

  const groupColumns = [
    { label: '#', renderCell: (user, index) => index + 1 },
    { label: 'User', renderCell: (user) => user.username },
    { label: 'Email', renderCell: (user) => user.email },
    { label: 'Group', renderCell: () => group.name },
    { label: 'Task Progress', renderCell: (user) => calculateTaskProgress(user._id) }
  ];

  return (
    <Container fluid className="container-fluid vh-100">
      <Row className="h-100">
        <Col md={2} className="bg-light p-0">
          <VerticalNavigation />
        </Col>
        <Col md={10} className="p-4">
          {/* <h1 style={{ color: '#ffffff' }}>User Task Tracker</h1> */}
          <Row>
            <Col md={10} className='p-4'>
              <div className="group-container">
                <div className="group-table">
                  <h2>Group Members</h2>
                  {group ? (
                    <TableComponent columns={groupColumns} data={group.members} />
                  ) : (
                    <p>Loading group members...</p>
                  )}
                  <Form>
                    <Form.Group controlId="formUserSelect" className="mt-3">
                      <Form.Label style={{ color: '#ffffff' }}>Add User to Group</Form.Label>
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
                    <Button variant="primary" className="mt-3" onClick={addUserToGroup}>Add User</Button>
                  </Form>
                  <Form onSubmit = {handleGroupName}>
                    <Form.Group controlId="formUserSelect" className="mt-3">
                      <Form.Label style={{ color: '#ffffff' }}>Create Group</Form.Label>
                      <br/>
                        <label style={{color: '#ffffff'}}> Enter the Group Name
                          <input type="text" name="groupName"/>
                        </label>
                        <Button variant="primary" className="mt-3" type="submit">Create Group</Button>
                    </Form.Group>
                    
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Groups;
