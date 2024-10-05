import React, { useContext } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import {Grid} from "@mui/system";
import VerticalNavigation from "../../../components/VerticalNavigation";
import { useLocation } from "react-router-dom";
import MyTaskDetails from "../../../components/Groups Components/MyDailyTask";
import { SharedStateContext } from "../../../Context/SharedStateContext";
import { Card, CardContent, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import GeneralDeck from "../GroupDB/components/GeneralCardInfo";

function PersonalDB() {
  const location = useLocation();
  const { name, punishment, description } = location.state;
  const { handleAddTask } = useContext(SharedStateContext);

  return (
    // <Container fluid>
    //   <Col className="h-100">
    //     <Col md="auto" className="bg-#201E1E p-0" style={{marginLeft: 0}}>
    //       <VerticalNavigation />
    //     </Col>
    //     <Col md={7} className="p-4">
    //         <Row className="p-3" style={{flexWrap:"nowrap"}}>
    //             <h1 style={{color: "#80AFE8", display:"inline", width:200}}>{name}</h1>
    //             <h1 className="text-white">
    //                 Dasboard - Personal
    //             </h1>
    //         </Row>
    //         <Row>
    //           <GeneralDeck description={description} punishment={punishment}/>
    //         </Row>
    //     </Col>
    //   </Col>
    // </Container>
    <Grid container spacing={2}>
      <Grid size={3} className="vh-100">
        <VerticalNavigation />
      </Grid>
      <Grid size={9}>
        <Row className="p-3" style={{ flexWrap: "nowrap" }}>
          <h1 style={{ color: "#80AFE8", display: "inline", width: 200 }}>
            {name}
          </h1>
          <h1 className="text-white">Dasboard - Personal</h1>
        </Row>
        <Row>
          <GeneralDeck description={description} punishment={punishment} />
        </Row>
      </Grid>
    </Grid>
  );
}

export default PersonalDB;
