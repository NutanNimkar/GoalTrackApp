import React, { useContext } from 'react';
import VerticalNavigation from '../components/VerticalNavigation';
import { Container, Row, Col, Button } from 'react-bootstrap';
import GroupDropDown from '../components/GroupDropDown';
import { GroupsPageContext, GroupsPageProvider } from '../Context/GroupsPageContext';
import Tile from '../components/Tile';
import CreateGroupModal from '../components/CreateGroupModal';


const GroupsPage = () => {

    const {groups, handleSaveGroup, currentGroups, memberNames, showModal, setShowModal, handleAddGroup} = useContext(GroupsPageContext)
    console.log(groups)
    return (
        <Container fluid className="container-fluid vh-100">
            <Row className="h-100">
                <Col md={2} className="bg-light p-0">
                    <VerticalNavigation/>
                </Col>
                <Col md={10} className="p-4">
                    <h1 style={{textAlign: 'center'}}>Groups</h1>
                    <div className='GroupsDropDown'>
                        <GroupsPageProvider>
                            {Object.keys(groups).map(groupName => (
                                <div>
                                    <GroupDropDown groupName={groupName} key={groupName} memberNames={groups[groupName]} />
                                    <br/>
                                </div>
                                        
                            )
                            )}

                        </GroupsPageProvider>
                        
                    </div>
                    <Col className='h-100'>
                    
                    <Tile title="Create Group" description="Create a new group and invite other users"/>
                    <Tile title="Join Group" description="Join an existing group with a group code"/>
                    
                    </Col>
                </Col>
                <Button variant='success' onClick={handleAddGroup}>Create Group</Button>
            </Row>
            <CreateGroupModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSave={handleSaveGroup}
                groups={currentGroups}
                members={memberNames}
            />
        </Container>
    )
}

export default GroupsPage