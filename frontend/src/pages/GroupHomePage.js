import React from 'react';
import VerticalNavigation from '../components/VerticalNavigation';
import { Container, Row, Col } from 'react-bootstrap';
import GroupDropDown from '../components/GroupDropDown';
import { SharedStateProvider } from '../Context/SharedStateContext';
import Tile from '../components/Tile';


const GroupsPage = () => {
    return (
        <Container fluid className="container-fluid vh-100">
            <Row className="h-100">
                <Col md={2} className="bg-light p-0">
                    <VerticalNavigation/>
                </Col>
                <Col md={10} className="p-4">
                    <h1 style={{textAlign: 'center'}}>Groups</h1>
                    <div className='GroupsDropDown'>
                        <SharedStateProvider>
                            <GroupDropDown/>
                        </SharedStateProvider>
                        
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