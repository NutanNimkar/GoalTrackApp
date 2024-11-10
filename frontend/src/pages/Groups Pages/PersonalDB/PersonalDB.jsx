import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Grid } from "@mui/system";
import VerticalNavigation from "../../../components/VerticalNavigation";
import { useLocation } from "react-router-dom";
import { SharedStateContext } from "../../../Context/SharedStateContext";
import { Card } from "@mui/joy";
import GeneralDeck from "../GroupDB/components/GeneralCardInfo";
import TaskActivity from "../../../components/DashboardComponents/TaskActivity";

function PersonalDB() {
  const location = useLocation();
  const { name, punishment, description } = location.state;
  console.log(location.state);
  const { dailyTasks } = useContext(SharedStateContext);
  console.log(dailyTasks);
  const task = [{
    title: "My Task",
    description: "Task description",
  },
  {
    title: "My Task",
    description: "Task description",
  },
  {
    title: "My Task",
    description: "Task description",
  },
  {
    title: "My Task",
    description: "Task description",
  },
  {
    title: "My Task",
    description: "Task description",
  },
  {
    title: "My Task",
    description: "Task description",
  }];

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
          <TaskActivity tasks={task}/>
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
