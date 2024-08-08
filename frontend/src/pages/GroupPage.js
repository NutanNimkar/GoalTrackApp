import React, { useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "react-bootstrap";
import VerticalNavigation from "../components/VerticalNavigation";
import { useLocation } from "react-router-dom";
import MyTaskDetails from "../components/Groups Components/MyDailyTask";
import { SharedStateContext } from "../Context/SharedStateContext";

function GroupPage() {
  const location = useLocation();
  const { name, punishment, description } = location.state;
  const { handleAddTask } = useContext(SharedStateContext);

  return (
    <Container fluid className="container-fluid vh-100">
      <Row className="h-100">
        <Col md={2} className="bg-dark p-0">
          <VerticalNavigation />
        </Col>
        <Col>
          <Row md={10} className="p-3">
            <h1 style={{ textAlign: "center", color: "#ffffff" }}>
              Group - {name}: DashBoard
            </h1>
          </Row>
          <Row md={10} className="p-3">
            <Col>
              <Card bg="dark" text="white" border="light">
                <CardHeader as="h5" style={{ textAlign: "center" }}>
                  GROUP DESCRIPTION
                </CardHeader>
                <CardBody>{description}</CardBody>
              </Card>
            </Col>
            <Col>
              <Card bg="dark" text="white" border="success">
                <Card.Header as="h5" style={{ textAlign: "center" }}>
                  GROUP CONTRACT
                </Card.Header>
                <CardBody>{punishment}</CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card bg="dark" text="white" border="info">
                <CardHeader as="h5" style={{ textAlign: "center" }}>
                  MY DAILY TASKS
                </CardHeader>
                <CardBody>
                  <MyTaskDetails />
                </CardBody>
                <CardFooter>
                  <Button
                    variant="success"
                    className="add-task-button"
                    onClick={handleAddTask}
                  >
                    Add Task
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col>
              <Row>
                <Card bg="dark" text="white" border="success">
                  <CardHeader as="h5" style={{ textAlign: "center" }}>
                    MY STREAK
                  </CardHeader>
                  <CardBody>Number of completed days</CardBody>
                </Card>
              </Row>

              <Row>
                <Card bg="dark" text="white" border="danger">
                  <CardHeader as="h5" style={{ textAlign: "center" }}>
                    MY MISSED
                  </CardHeader>
                  <CardBody>Number of missed days</CardBody>
                </Card>
              </Row>
            </Col>
            <Col>
              <Card bg="dark" text="white" border="info">
                <CardHeader as="h5" style={{ textAlign: "center" }}>
                  GROUP PROGRESS
                </CardHeader>
                <CardBody>
                  bar graphs of users in groups with completed and missed days
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default GroupPage;
