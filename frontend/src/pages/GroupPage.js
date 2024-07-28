import React, {useContext} from "react";
import { GroupsPageContext } from "../Context/GroupsPageContext";
import { Container, Row, Col } from "react-bootstrap";
import VerticalNavigation from "../components/VerticalNavigation";

function GroupPage(){
    return (
        <Container fluid className="container-fluid vh-100">
            <Row className="h-100">
                <Col md={2} className="bg-dark p-0">
                    <VerticalNavigation/>
                </Col>
                <Col md={3} className="p-3">
                    <h1 style={{ textAlign: 'center', color: "#ffffff" }}>Group - XX: DashBoard</h1>
                </Col>
            </Row>
        </Container>
    )
}

export default GroupPage;