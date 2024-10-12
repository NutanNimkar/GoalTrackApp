import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Grid } from "@mui/system";
import VerticalNavigation from "../../../components/VerticalNavigation";
import { useLocation } from "react-router-dom";
// import MyTaskDetails from "../../../components/Groups Components/MyDailyTask";
import { SharedStateContext } from "../../../Context/SharedStateContext";
import { Card, CardContent, Typography } from "@mui/joy";
// import { Link } from "react-router-dom";
import GeneralDeck from "../GroupDB/components/GeneralCardInfo";

function PersonalDB() {
  const location = useLocation();
  const { name, punishment, description } = location.state;
  const { handleAddTask } = useContext(SharedStateContext);

  return (
    <Grid container spacing={2}>
      <Grid size={2} className="vh-100">
        <VerticalNavigation />
      </Grid>
      <Grid size={10}>
        <Row className="p-3" style={{ flexWrap: "nowrap" }}>
          <h1 style={{ color: "#80AFE8", display: "inline", width: 200 }}>
            {name}
          </h1>
          <h1 className="text-white">Dasboard - Personal</h1>
        </Row>
        <Row style={{ paddingRight: 25, paddingLeft: 25 }}>
          <GeneralDeck description={description} punishment={punishment} />
        </Row>
        <Grid size={5} style={{ paddingRight: 25, paddingLeft: 25 }}>
          <Card
            sx={{
              bgcolor: "#12253D",
            }}
          >
            <Typography
              sx={{
                color: "white",
              }}
            >
              Task Activity
            </Typography>
          </Card>
        </Grid>
        <Grid size={5}>
          <Card
            sx={{
              bgcolor: "#12253D",
            }}
          ></Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PersonalDB;
