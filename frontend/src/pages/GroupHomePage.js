import React, { useContext } from 'react';
import VerticalNavigation from '../components/VerticalNavigation';
import { Container, Row, Col } from 'react-bootstrap';
import GroupDropDown from '../components/GroupDropDown';
import { GroupsPageContext, GroupsPageProvider } from '../Context/GroupsPageContext';
import Tile from '../components/Tile';


const GroupsPage = () => {

    const {groups} = useContext(GroupsPageContext)
    const {memberNames} = useContext(GroupsPageContext)
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
                            {groups.map((group, groupIndex) => (
                                    <GroupDropDown groupName={group} key={groupIndex} memberNames={memberNames.map(name => name.map(name => name))} memberIndex={memberNames.map(index => index.map(index => index))}/>                                )
                            )}

                        </GroupsPageProvider>
                        
                    </div>
                </Col>
                <Col className='h-100'>
                    <Tile title="Create Group" description="Create a new group and invite other users"/>
                    <Tile title="Join Group" description="Join an existing group with a group code"/>
                    
                </Col>
            </Row>
            
        </Container>
    )
}

export default GroupsPage