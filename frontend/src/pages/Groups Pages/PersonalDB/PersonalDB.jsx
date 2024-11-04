import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import Grid from "@mui/material/Grid2";
import VerticalNavigation from "../../../components/VerticalNavigation";
import { useLocation } from "react-router-dom";
// import MyTaskDetails from "../../../components/Groups Components/MyDailyTask";
import { SharedStateContext } from "../../../Context/SharedStateContext";
import { Card, CardContent, Typography, Stack } from "@mui/joy";
import { Link } from "react-router-dom";
import GeneralDeck from "../GroupDB/components/GeneralCardInfo";
import { MdOutlinePersonOutline } from "react-icons/md";
import { Button } from "@mui/material";

function PersonalDB() {
  const location = useLocation();
  const { name, punishment, description, members } = location.state;
  const { handleAddTask } = useContext(SharedStateContext);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 4, lg: 3 }} className="vh-100">
        <VerticalNavigation />
      </Grid>
      <Grid size={{ xs: 8, lg: 9 }}>
        <Row className="p-3" style={{ flexWrap: "nowrap" }}>
          <h1 md="auto" style={{ color: "#80AFE8", width: "auto" }}>
            {name}
          </h1>
          <h1 className="text-white">Dasboard - Personal</h1>
        </Row>
        <Grid container size={5}>
          <Grid size={5} style={{ paddingRight: 25, paddingLeft: 25 }}>
            <Card
              sx={{
                bgcolor: "#12253D",
              }}
            >
              <Grid item>
                <Typography
                  sx={{
                    color: "white",
                  }}
                >
                  Task Activity
                </Typography>
              </Grid>
              <Stack direction="horizontal" gap={3}>
                <Grid item>
                  <CardContent sx={{ color: "white" }}>
                    Daily tasks which need to be completed will be displayed
                    here. Add more tasks using the feature below.
                  </CardContent>
                </Grid>
                <Grid item>
                    <Link
                      to={{ pathname: `/groups/${name}/groupdb` }}
                      state={{
                        name: name,
                        members: members,
                        description: description,
                        punishment: punishment,
                      }}
                      style={{ textAlign: "end", textDecoration: "none" }}
                    >
                      <Button variant="outlined" sx={{ bgcolor: "#12253D", color: "#ffffff", borderColor: "white" }}>
                        <Stack gap={3} direction="horizontal">
                          <MdOutlinePersonOutline size={40}/>
                          Group Dashboard
                        </Stack>
                      </Button>
                    </Link>
                </Grid>
              </Stack>
              <Button
                sx={{
                  borderRadius:15,
                  borderColor: "white"
                }}
                variant="outlined"
              >
                Add Daily Task
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PersonalDB;
