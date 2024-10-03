import React, {useContext} from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import VerticalNavigation from "../../components/VerticalNavigation";
import { useLocation } from "react-router-dom";
import MyTaskDetails from "../../components/Groups Components/MyDailyTask";
import { SharedStateContext } from "../../Context/SharedStateContext";
import { Card, CardContent, Typography } from "@mui/joy";
import { Link } from "react-router-dom";

function PersonalDB() {
  const location = useLocation();
  const { name, punishment, description } = location.state;
  const { handleAddTask } = useContext(SharedStateContext);

  return (
    <Container fluid className="container-fluid vh-100">
      <Row className="h-100">
        <Col md="auto" clasName="bg-light p-0">
          <VerticalNavigation />
        </Col>
        <Col md={7} className="p-4">
            <Row className="p-3">
                <h1 style={{color: "#80AFE8", display:"inline"}}>{name}</h1>
                <h1 style={{color: "#ffffff", display:"inline"}}>
                    Dasboard - Personal
                </h1>
            </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default PersonalDB;
