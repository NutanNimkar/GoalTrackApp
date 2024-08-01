import React, { useContext } from 'react';
import VerticalNavigation from '../components/VerticalNavigation';
import { Container, Row, Col, Button } from 'react-bootstrap';
import GroupDropDown from '../components/Groups Components/GroupDropDown';
import { GroupsPageContext } from '../Context/GroupsPageContext';
import Tile from '../components/Tile';
import CreateGroupModal from '../components/Groups Components/CreateGroupModal';


const GroupsPage = () => {
  const { groups, handleAddGroup, showModal, setShowModal, handleSaveGroup } = useContext(GroupsPageContext);
  
  return (
    <Container fluid className="container-fluid vh-100">
      <Row className="h-100">
        <Col md={2} className="bg-light p-0">
          <VerticalNavigation />
        </Col>
        <Col md={5} className="p-4">
          <Row>
            <h1 style={{ textAlign: 'center', color: "#ffffff" }}>Groups</h1>
          </Row>
          <Row>
            <div className='GroupsDropDown'>
              {Object.keys(groups).map((groupName) => (
                <div key={groupName}>
                  <GroupDropDown 
                    groupName={groupName} 
                    memberNames={groups[groupName].members} 
                    groups={groups} 
                    punishment={groups[groupName].punishment}
                    description={groups[groupName].description}/>
                  <br />
                </div>
              ))}
            </div>
          </Row>
        </Col>
        <Col className='h-5'>
              <Tile title="Create Group" description="Create a new group and invite other users" onClick = {handleAddGroup}/>            
        </Col>
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
