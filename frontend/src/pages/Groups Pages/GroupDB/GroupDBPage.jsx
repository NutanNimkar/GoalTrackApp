import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import VerticalNavigation from "../../../components/VerticalNavigation.js";
import { useLocation } from "react-router-dom";

import { Card, CardContent, Typography, Stack } from "@mui/joy";

import GeneralDeck from "./components/GeneralCardInfo.jsx";
import { Grid } from "@mui/system";
import GroupProgress from "./components/GroupProgress.jsx";

function GroupDBPage() {
  // const { handleAddTask } = useContext(SharedStateContext);
  const location = useLocation();
  const { name, punishment, description } = location.state;
  return (
    <Grid container spacing={2}>
      <Grid
        size={{ xs: 3, lg: 2 }}
        className="vh-100"
        style={{ position: "sticky", top: 0 }}
      >
        <VerticalNavigation />
      </Grid>
      <Grid size={{ xs: 9, lg: 10 }}>
        <Grid>
          <Row className="p-3" style={{ flexWrap: "nowrap" }}>
            <h1 md="auto" style={{ color: "#80AFE8", width: "auto" }}>
              {name}
            </h1>
            <h1 style={{ color: "#ffffff" }}>DashBoard - Group</h1>
          </Row>
          <Row>
            <GeneralDeck punishment={punishment} description={description} />
          </Row>
          <Row style={{ paddingLeft: "25px", paddingRight: "25px" }}>
            <div>
              <Stack direction="horizontal" gap={5}>
                <Col md={7}>
                  <GroupProgress name={name} description={description} punishment={punishment}/>
                </Col>
                <Col md={4}>
                  <Card
                    sx={{
                      bgcolor: "#022D66",
                    }}
                    style={{ position: "end" }}
                  >
                    <Stack gap={3}>
                      <Card
                        sx={{
                          bgcolor: "#12253D",
                        }}
                      >
                        <Typography sx={{ color: "#ffffff" }}>
                          Most Days Completed
                        </Typography>
                      </Card>
                      <Card
                        sx={{
                          bgcolor: "#12253D",
                        }}
                      >
                        <Typography sx={{ color: "#ffffff" }}>
                          Most Days Missed
                        </Typography>
                      </Card>
                      <Card
                        sx={{
                          bgcolor: "#12253D",
                        }}
                      >
                        <Typography sx={{ color: "#ffffff" }}>
                          Top Member Streak
                        </Typography>
                      </Card>
                    </Stack>
                  </Card>
                </Col>
              </Stack>
            </div>
          </Row>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GroupDBPage;
