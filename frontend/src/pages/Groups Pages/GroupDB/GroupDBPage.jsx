import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import VerticalNavigation from "../../../components/VerticalNavigation.js";
import { useLocation } from "react-router-dom";
import { Card, Typography, Stack, CardContent } from "@mui/joy";
import { Grid } from "@mui/system";
import GroupProgress from "./components/GroupProgress.jsx";

function GroupDBPage() {
  // const { handleAddTask } = useContext(SharedStateContext);
  const location = useLocation();
  const { name, punishment, description, members } = location.state;
  return (
    <Grid container spacing={1}>
      <Grid
        size={{ xs: 4, xl: 2, lg: 3 }}
        className="vh-100"
        style={{ position: "sticky", top: 0 }}
      >
        <VerticalNavigation />
      </Grid>
      <Grid size={{ xs: 8, lg: 9 }}>
        <Grid>
          <Row className="p-3" style={{ flexWrap: "nowrap" }}>
            <h1 md="auto" style={{ color: "#80AFE8", width: "auto" }}>
              {name}
            </h1>
            <h1 className="text-white">DashBoard - Group</h1>
          </Row>
          <Grid size={{ xs: 8, lg: 9 }}>
            <div style={{ paddingLeft: 50 }}>
              <Card
                sx={{
                  width: 150,
                  bgcolor: "#12253D",
                  display: "flex",
                  paddingBottom: 4,
                  alignItems: "center",
                  borderRadius: "18px",
                }}
                variant="outlined"
                color="neutral"
              >
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                  }}
                >
                  <Typography level="title-sm" style={{ color: "#ffffff" }}>
                    Group Contract
                  </Typography>
                </div>
              </Card>
            </div>
            <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
              <Card
                sx={{
                  bgcolor: "#022D66",
                  display: "flex",
                  top: -13,
                  borderRadius: "20px",
                }}
                variant="outlined"
                color="neutral"
              >
                <Grid>
                  <Stack
                    direction="horizontal"
                    gap={5}
                    style={{ justifyContent: "space-between" }}
                  >
                    <Typography
                      style={{
                        color: "#ffffff",
                        width: "50%",
                        paddingLeft: "10px",
                      }}
                    >
                      The Group Contract is unanimous task to be performed at
                      the end of the global settings session.
                    </Typography>
                    <Card
                      variant="outlined"
                      sx={{
                        bgcolor: "#12253D",
                        alignItems: "center",
                        display: "flex",
                        width: 1 / 3,
                        borderRadius: "20px",
                      }}
                    >
                      <Typography
                        level="title-lg"
                        style={{
                          display: "flex",
                          color: "#ffffff",
                        }}
                      >
                        Contract
                      </Typography>
                      <CardContent>
                        <Typography sx={{ color: "#ffffff" }} level="h3">
                          {punishment}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card
                      variant="outlined"
                      sx={{
                        bgcolor: "#12253D",
                        alignItems: "center",
                        display: "flex",
                        width: 1 / 3,
                        borderRadius: "20px",
                      }}
                    >
                      <Typography
                        level="title-lg"
                        style={{
                          display: "flex",
                          color: "#ffffff",
                          alignItems: "center",
                        }}
                      >
                        Deadline
                      </Typography>
                      <CardContent>
                        <Typography
                          level="h3"
                          style={{
                            display: "flex",
                            color: "#B6CCE7",
                            alignItems: "center",
                          }}
                        >
                          May 12, 2024
                        </Typography>
                      </CardContent>
                    </Card>
                  </Stack>
                </Grid>
              </Card>
            </div>
          </Grid>
          <Row style={{ paddingLeft: "25px", paddingRight: "25px" }}>
            <div>
              <Stack direction="horizontal" gap={2}>
                <Col md={7} lg={9}>
                  <GroupProgress
                    name={name}
                    members={members}
                    description={description}
                    punishment={punishment}
                  />
                </Col>
                <Col md={5} lg={3}>
                  <Card
                    sx={{
                      bgcolor: "#022D66",
                    }}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                      borderRadius: "20px",
                    }}
                  >
                    <Stack gap={2}>
                      <Card
                        sx={{
                          bgcolor: "#12253D",
                          borderWidth: 2,
                          borderRadius: "20px",
                        }}
                      >
                        <Typography
                          sx={{ color: "#ffffff" }}
                          style={{ alignSelf: "center" }}
                        >
                          Most Days Completed
                        </Typography>
                        <Typography
                          sx={{ color: "#CC8C46" }}
                          style={{ alignSelf: "center" }}
                          level="title-lg"
                        >
                          Group Member 1
                        </Typography>
                        <Typography
                          level="h1"
                          sx={{ color: "#12B806" }}
                          style={{ alignSelf: "center" }}
                        >
                          56
                        </Typography>
                        <Typography
                          sx={{ color: "#A2C8E9" }}
                          style={{ alignSelf: "center" }}
                          level="title-lg"
                        >
                          Days
                        </Typography>
                      </Card>
                      <Card
                        sx={{
                          bgcolor: "#12253D",
                          borderWidth: 2,
                          borderRadius: "20px",
                        }}
                      >
                        <Typography
                          sx={{ color: "#ffffff" }}
                          style={{ alignSelf: "center" }}
                        >
                          Most Days Missed
                        </Typography>
                        <Typography
                          sx={{ color: "#CC8C46" }}
                          style={{ alignSelf: "center" }}
                          level="title-lg"
                        >
                          Group Member 1
                        </Typography>
                        <Typography
                          level="h1"
                          sx={{ color: "#FF0808" }}
                          style={{ alignSelf: "center" }}
                        >
                          6
                        </Typography>
                        <Typography
                          sx={{ color: "#A2C8E9" }}
                          style={{ alignSelf: "center" }}
                          level="title-lg"
                        >
                          Days
                        </Typography>
                      </Card>
                      <Card
                        sx={{
                          bgcolor: "#12253D",
                          borderWidth: 2,
                          borderRadius: "20px",
                        }}
                      >
                        <Typography
                          sx={{ color: "#ffffff" }}
                          style={{ alignSelf: "center" }}
                        >
                          Top Member Streak
                        </Typography>
                        <Typography
                          sx={{ color: "#CC8C46" }}
                          style={{ alignSelf: "center" }}
                          level="title-lg"
                        >
                          Group Member 1
                        </Typography>
                        <Typography
                          level="h1"
                          sx={{ color: "#A2C8E9" }}
                          style={{ alignSelf: "center" }}
                        >
                          56
                        </Typography>
                        <Typography
                          sx={{ color: "#A2C8E9" }}
                          style={{ alignSelf: "center" }}
                          level="title-lg"
                        >
                          Days
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
