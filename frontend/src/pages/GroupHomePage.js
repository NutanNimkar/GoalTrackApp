import React, { useContext } from 'react';
import VerticalNavigation from '../components/VerticalNavigation';
import { Container, Row, Col, Button } from 'react-bootstrap';
import GroupDropDown from '../components/Groups Components/GroupDropDown';
import { GroupsPageContext } from '../Context/GroupsPageContext';
import Tile from '../components/Tile';
import CreateGroupModal from '../components/Groups Components/CreateGroupModal';
import { useAuthContext } from '../hooks/useAuthContext';
import createAxiosInstance from '../axiosInstance';

const GroupsPage = () => {
  const { groups, handleAddGroup, showModal, setShowModal, handleSaveGroup } = useContext(GroupsPageContext);
  
  return (
    <Container fluid className="container-fluid vh-100">
      <Row className="h-100">
        <Col md={2} className="bg-light p-0">
          <VerticalNavigation />
        </Col>
        <Col md={10} className="p-4">
          <h1 style={{ textAlign: 'center' }}>Groups</h1>
          <div className='GroupsDropDown'>
            {Object.keys(groups).map(groupName => (
              <div key={groupName}>
                <GroupDropDown groupName={groupName} memberNames={groups[groupName]} groups={groups}/>
                <br />
              </div>
            ))}
          </div>
          <Col className='h-100'>
            <Tile title="Create Group" description="Create a new group and invite other users" />
            {/* <Tile title="Join Group" description="Join an existing group with a group code" />  to be discussed on functionality */}
          </Col>
        </Col>
        <Button variant='success' onClick={handleAddGroup}>Create Group</Button>
      </Row>
      <CreateGroupModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveGroup}
      />
    </Container>
  );
}

export default GroupsPage;
