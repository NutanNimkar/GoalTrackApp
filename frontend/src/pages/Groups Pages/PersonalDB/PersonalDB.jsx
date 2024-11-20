import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { Grid } from "@mui/system";
import VerticalNavigation from "../../../components/VerticalNavigation";
import { useLocation } from "react-router-dom";
import { SharedStateContext } from "../../../Context/SharedStateContext";
import { Stack, Card } from "@mui/joy";
import TaskActivity from "../../../components/DashboardComponents/TaskActivity";
import { Typography } from "@mui/material";
import UserInfoAndProgress from "../GroupDB/components/UserInfoAndProgress";

function PersonalDB() {
  const location = useLocation();
  const { name, punishment, description, members } = location.state;
  // console.log(location.state);
  const { dailyTasks } = useContext(SharedStateContext);
  // console.log(dailyTasks);
  const task = [
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
    },
    {
      title: "My Task",
      description: "Task description",
    },
  ];

  return (
    <Grid container spacing={1}>
      <Grid
        size={{ xs: 4, lg: 3, xl: 2 }}
        className="vh-100"
        style={{ position: "sticky", top: 0 }}
      >
        <VerticalNavigation />
      </Grid>
      <Grid size={{ xs: 8, lg: 9, xl: 10 }}>
        <Row className="p-3" style={{ flexWrap: "nowrap" }}>
          <h1 md="auto" style={{ color: "#80AFE8", width: "auto" }}>
            {name}
          </h1>
          <h1 className="text-white">Dasboard - Personal</h1>
        </Row>
        <Row>
          <Col md={4} style={{ paddingLeft: 25 }}>
            <TaskActivity
              tasks={task}
              punishment={punishment}
              description={description}
              members={members}
              name={name}
            />
          </Col>

          <Col md={8}>
            <div>
              <Stack gap={2}>
                <Col>
                  <div style={{ paddingLeft: 50 }}>
                    <Card
                      sx={{
                        width: 1 / 3.5,
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
                        <Typography
                          level="title-sm"
                          style={{ color: "#ffffff" }}
                        >
                          My Progress
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
                      <Grid width="100%">
                        <Stack
                          direction="row"
                          sx={{ justifyContent: "space-evenly" }}
                        >
                          <Grid item width={1 / 3}>
                            <Stack gap={1}>
                              <Card
                                sx={{
                                  bgcolor: "#12253D",
                                  borderRadius: 25,
                                  width: "auto",
                                }}
                                size="sm"
                                variant="plain"
                              >
                                <Typography
                                  variant="body2"
                                  style={{
                                    color: "#ffffff",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  My Streak
                                </Typography>
                              </Card>
                              <Typography
                                variant="caption"
                                style={{
                                  color: "#ffffff",
                                  padding: 10,
                                  textAlign: "justify",
                                }}
                              >
                                Total consecutive days that user has completed
                              </Typography>
                              <Card
                                sx={{
                                  bgcolor: "#12253D",
                                  borderColor: "#AEC5E3",
                                  borderWidth: 3,
                                  borderRadius: 20,
                                  width: "90%",
                                }}
                              >
                                <Typography
                                  variant="h2"
                                  sx={{
                                    color: "#6AE5E8",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  7
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    color: "#ABC7DA",
                                    display: "flex",
                                    justifyContent: "center",
                                    position: "relative",
                                    top: -14,
                                    marginBottom: -2,
                                  }}
                                >
                                  Days
                                </Typography>
                              </Card>
                            </Stack>
                          </Grid>
                          <Grid item width={1 / 3}>
                            <Stack gap={1}>
                              <Card
                                sx={{
                                  bgcolor: "#12253D",
                                  borderRadius: 25,
                                  width: "auto",
                                }}
                                size="sm"
                                variant="plain"
                              >
                                <Typography
                                  variant="body2"
                                  style={{
                                    color: "#ffffff",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  Daily Completion
                                </Typography>
                              </Card>
                              <Stack direction="row">
                                <Card
                                  sx={{
                                    bgcolor: "#12253D",
                                    borderColor: "#AEC5E3",
                                    borderWidth: 3,
                                    borderRadius: 20,
                                  }}
                                >
                                  <Stack direction="column">
                                    <Typography sx={{ color: "#ffffff" }}>
                                      12
                                    </Typography>
                                    <Typography sx={{ color: "#ffffff" }}>
                                      Days
                                    </Typography>
                                  </Stack>
                                </Card>
                                <Stack direction="column">
                                  <Typography
                                    variant="subtitle"
                                    style={{ color: "#ffffff", padding: 10 }}
                                  >
                                    Total Completed
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    style={{
                                      color: "#ffffff",
                                      padding: 10,
                                      textAlign: "justify",
                                    }}
                                  >
                                    Total amount of days that user has completed
                                  </Typography>
                                </Stack>
                              </Stack>
                              <Stack direction="row">
                                <Card
                                  sx={{
                                    bgcolor: "#12253D",
                                    borderColor: "#AEC5E3",
                                    borderWidth: 3,
                                    borderRadius: 20,
                                  }}
                                >
                                  <Stack direction="column">
                                    <Typography sx={{ color: "#ffffff" }}>
                                      12
                                    </Typography>
                                    <Typography sx={{ color: "#ffffff" }}>
                                      Days
                                    </Typography>
                                  </Stack>
                                </Card>
                                <Stack direction="column">
                                  <Typography
                                    variant="subtitle"
                                    style={{ color: "#ffffff", padding: 10 }}
                                  >
                                    Daily Missed
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    style={{
                                      color: "#ffffff",
                                      padding: 10,
                                      textAlign: "justify",
                                    }}
                                  >
                                    Total amount of days that user has missed
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Stack>
                          </Grid>
                          <Grid item width={1 / 3}>
                            <Stack gap={1}>
                              <Card
                                sx={{
                                  bgcolor: "#12253D",
                                  borderRadius: 25,
                                  width: "auto",
                                }}
                                size="sm"
                                variant="plain"
                              >
                                <Typography
                                  variant="body2"
                                  style={{
                                    color: "#ffffff",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  Days Remaining
                                </Typography>
                              </Card>
                              <Typography
                                variant="caption"
                                style={{
                                  color: "#ffffff",
                                  padding: 10,
                                  textAlign: "justify",
                                }}
                              >
                                Total consecutive days that user has completed
                              </Typography>
                              <Card
                                sx={{
                                  bgcolor: "#12253D",
                                  borderColor: "#AEC5E3",
                                  borderWidth: 3,
                                  borderRadius: 20,
                                  width: "90%",
                                }}
                              >
                                <Typography
                                  variant="h2"
                                  sx={{
                                    color: "#6AE5E8",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  7
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    color: "#ABC7DA",
                                    display: "flex",
                                    justifyContent: "center",
                                    position: "relative",
                                    top: -14,
                                    marginBottom: -2,
                                  }}
                                >
                                  Days
                                </Typography>
                              </Card>
                            </Stack>
                          </Grid>
                        </Stack>
                      </Grid>
                    </Card>
                  </div>
                </Col>
                <Col md={5} lg={3}></Col>
                {
                  // insert Task Tracking Card Here
                }
              </Stack>
            </div>

            {
              //Task Tracking Card
            }
            <div>
              <Stack gap={2}>
                <Col>
                  <div style={{ paddingLeft: 37 }}>
                    <Card
                      sx={{
                        width: 1 / 3.5,
                        bgcolor: "#12253D",
                        display: "flex",
                        paddingBottom: 5,
                        alignItems: "center",
                        borderRadius: "18px",
                      }}
                      variant="outlined"
                      color="neutral"
                    >
                      <Typography
                        level="title-sm"
                        style={{
                          color: "#ffffff",
                          position: "absolute",
                          top: 10,
                        }}
                      >
                        Task Tracking
                      </Typography>
                    </Card>
                  </div>
                  <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
                    <Card
                      sx={{
                        bgcolor: "#022D66",
                        display: "flex",
                        top: -20,
                        borderRadius: "30px",
                      }}
                      variant="outlined"
                      color="neutral"
                    >
                      <Typography
                        sx={{
                          color: "white",
                          padding: "10px",
                          textAlign: "justify",
                        }}
                        variant="caption"
                      >
                        Task tracking records the completion of individual daily
                        tasks the user has assigned themselves under the Task
                        Activity feature. The chart below shows the total
                        completion and incompletion of individual tasks on a
                        daily basis.
                      </Typography>
                      <div
                        style={{
                          paddingBottom: 15,
                          position: "relative",
                          paddingLeft: 2,
                        }}
                      >
                        <Stack
                          direction="horizontal"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Card
                            sx={{
                              width: "140%",
                              bgcolor: "#12253D",
                              alignItems: "center",
                              borderRadius: "20px",
                              borderColor: "#AEC5E3",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: 10,
                              }}
                            >
                              <Typography
                                level="title-sm"
                                style={{ color: "#ffffff" }}
                              >
                                Task Name
                              </Typography>
                            </div>
                          </Card>
                          <Card
                            sx={{
                              width: "300%",
                              bgcolor: "#12253D",
                              display: "flex",
                              paddingBottom: 3,
                              borderRadius: "20px",
                              borderColor: "#AEC5E3",
                            }}
                          >
                            <Grid
                              container
                              direction="row"
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                              }}
                            >
                              <Grid item>
                                <Typography
                                  level="title-sm"
                                  style={{
                                    color: "#ffffff",
                                    position: "relative",
                                    top: -6,
                                  }}
                                >
                                  Previous 7 Days
                                </Typography>
                              </Grid>

                              <Grid item>
                                <Typography
                                  level="title-sm"
                                  style={{
                                    color: "#ffffff",
                                    position: "relative",
                                    top: -6,
                                  }}
                                >
                                  Total Days
                                </Typography>
                              </Grid>
                            </Grid>
                          </Card>
                          <Card
                            sx={{
                              width: "140%",
                              bgcolor: "#12253D",
                              display: "flex",
                              paddingBottom: 3,
                              alignItems: "center",
                              borderRadius: "20px",
                              borderColor: "#AEC5E3",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: 10,
                              }}
                            >
                              <Typography
                                level="title-sm"
                                style={{ color: "#ffffff" }}
                              >
                                Track Progress
                              </Typography>
                            </div>
                          </Card>
                        </Stack>
                      </div>
                      <div
                        style={{
                          maxHeight: "42.5vh",
                          overflowY: "auto",
                          scrollbarColor: "#415F84 #0A2344",
                          marginRight: 10,
                        }}
                      >
                        <Card
                          sx={{
                            bgcolor: "#0B3A79",
                            borderRadius: "20px",
                            display: "flex",
                            justifyContent: "space-around",
                            top: 0,
                            borderColor: "#022D66",
                            borderWidth: 2,
                            padding: 1,
                          }}
                          variant="outlined"
                        >
                          <UserInfoAndProgress members={members} />
                        </Card>
                      </div>
                    </Card>
                  </div>
                </Col>
              </Stack>
            </div>
          </Col>
        </Row>
      </Grid>
    </Grid>
  );
}

export default PersonalDB;
