import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter } from "react-bootstrap";
import VerticalNavigation from "../components/VerticalNavigation";
import { useLocation } from "react-router-dom";

function GroupPage(){

    const location = useLocation();
    const {name, punishment}= location.state;

    // console.log(name, punishment)
    return (
        <Container fluid className="container-fluid vh-100">
            <Row className="h-100">
                <Col md={2} className="bg-dark p-0">
                    <VerticalNavigation/>
                </Col>
                <Col>
                    <Row md={10} className="p-3">
                        <h1 style={{ textAlign: 'center', color: "#ffffff" }}>Group - {name}: DashBoard</h1>
                    </Row>
                    <Row md={10} className="p-3">
                        <Card bg="dark" text="white" border="success">
                            <Card.Header as="h5" style={{textAlign: "center"}}>GROUP CONTRACT</Card.Header>
                            <CardBody>
                                {punishment}
                            </CardBody>
                        </Card>
                    </Row>
                    <Row>
                        <Col>
                            <Card bg="dark" text="white" border="info">
                                <CardHeader>MY DAILY TASKS</CardHeader>
                                <CardBody>
                                    Here are the tasks
                                </CardBody>
                                <CardFooter>
                                    Add and delete tasks selected in card body
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col>
                            <Row>
                                <Card bg="dark" text="white" border="success">
                                    <CardHeader>MY STREAK</CardHeader>
                                    <CardBody>Number of completed days</CardBody>
                                </Card>
                            </Row>

                            <Row>
                                <Card bg="dark" text="white" border="danger">
                                    <CardHeader>MY MISSED</CardHeader>
                                    <CardBody>Number of missed days</CardBody>
                                </Card>
                            </Row>
                        </Col>
                        <Col>
                            <Card bg="dark" text="white" border="info">
                                <CardHeader>GROUP PROGRESS</CardHeader>
                                <CardBody>
                                    bar graphs of users in groups with completed and missed days
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default GroupPage;