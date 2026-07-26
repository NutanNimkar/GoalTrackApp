import React, { useContext, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Grid } from "@mui/system";
import VerticalNavigation from "../../../components/VerticalNavigation";
import { useLocation } from "react-router-dom";
import { SharedStateContext } from "../../../Context/SharedStateContext";
import { Stack, Card } from "@mui/joy";
import TaskActivity from "../../../components/DashboardComponents/TaskActivity";
import { CircularProgress, Typography } from "@mui/material";
import createAxiosInstance from "../../../axiosInstance";
import { useAuthContext } from "../../../hooks/useAuthContext";
import TaskTracking from "./TaskTracking";

function PersonalDB() {
  const location = useLocation();
  const { name, punishment, description, members } = location.state;

  const { dailyTasks, setDailyTasks, userId } = useContext(SharedStateContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastReset, setLastReset] = useState(null);
  const { user } = useAuthContext();
  const axiosInstance = createAxiosInstance(user?.token);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/api/users/${userId}/tasks`);
      setDailyTasks(response.data.tasks);
      setLastReset(response.data.lastReset);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("There are no tasks for this user, please add some.");
    } finally {
      setLoading(false);
    }
  };

  const resetTaskStatus = async () => {
    try {
      const response = await axiosInstance.put(
        `/api/tasks/reset-status/${userId}`
      );
      if (response.data.tasks.length > 0 && response.status === 200) {
        setDailyTasks(response.data.tasks);
        setLastReset(response.data.lastReset);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error resetting task statuses:", error);
      setError("Error resetting task statuses. Please try again later.");
    }
  };

  useEffect(() => {
    const initializeTasks = async () => {
      if (!user) {
        setError("You must be logged in");
        return;
      }
      try {
        await fetchTasks();
        await resetTaskStatus();
      } catch (e) {
        console.log(e);
      }
    };

    initializeTasks();
  }, [userId]);

  return (
    <Grid container spacing={1}>
      <Grid
        xs={"100%"}
        md={"100%"}
        lg={"100%"}
        xl={"100%"}
        className="vh-100"
        style={{ position: "sticky", top: 0 }}
      >
        <VerticalNavigation />
      </Grid>
      <Grid size={{ xs: "grow", lg: "grow" }} style={{ overflowX: "hidden" }}>
        <Row className="p-3" style={{ flexWrap: "nowrap" }}>
          <h1
            md="auto"
            style={{
              color: "#80AFE8",
              width: "auto",
              fontFamily: "Lucida Sans",
            }}
          >
            {name}
          </h1>
          <h1 className="text-white" style={{ fontFamily: "Lucida Sans" }}>
            Dasboard - Personal
          </h1>
        </Row>
        <Row>
          <Col md={4} style={{ paddingLeft: 25 }}>
            <TaskActivity
              tasks={dailyTasks}
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
                  <div style={{ paddingLeft: 37 }}>
                    <Card
                      sx={{
                        width: 1 / 3.5,
                        bgcolor: "#12253D",
                        display: "flex",
                        paddingBottom: 5,
                        alignItems: "center",
                        borderRadius: "18px",
                        borderWidth: 1.5,
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
                          style={{
                            color: "#ffffff",
                            fontFamily: "Lucida Sans",
                          }}
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
                        top: -20,
                        borderRadius: "20px",
                        borderWidth: 1.5,
                      }}
                      variant="outlined"
                      color="neutral"
                    >
                      <Grid width="100%">
                        <Stack
                          direction="row"
                          sx={{ justifyContent: "space-evenly" }}
                        >
                          <Grid item width={1 / 3} style={{ padding: 7 }}>
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
                                    fontFamily: "Lucida Sans",
                                  }}
                                >
                                  My Streak
                                </Typography>
                              </Card>
                              <Typography
                                variant="caption"
                                style={{
                                  color: "#ffffff",
                                  padding: 7,
                                  textAlign: "justify",
                                  fontFamily: "Lucida Sans",
                                }}
                                sx={{
                                  display: {
                                    xs: "none",
                                    xl: "block",
                                  },
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
                                }}
                              >
                                <Typography
                                  variant="h2"
                                  sx={{
                                    color: "#6AE5E8",
                                    display: "flex",
                                    justifyContent: "center",
                                    fontFamily: "Lucida Sans",
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
                                    fontFamily: "Lucida Sans",
                                  }}
                                >
                                  Days
                                </Typography>
                              </Card>
                            </Stack>
                          </Grid>
                          <Grid item width={1 / 3} style={{ padding: 7 }}>
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
                                    fontFamily: "Lucida Sans",
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
                                    <Typography
                                      sx={{
                                        color: "#ffffff",
                                        fontFamily: "Lucida Sans",
                                      }}
                                    >
                                      12
                                    </Typography>
                                    <Typography
                                      sx={{
                                        color: "#ffffff",
                                        fontFamily: "Lucida Sans",
                                      }}
                                    >
                                      Days
                                    </Typography>
                                  </Stack>
                                </Card>
                                <Stack direction="column">
                                  <Typography
                                    variant="subtitle"
                                    style={{
                                      color: "#ffffff",
                                      padding: 7,
                                      fontFamily: "Lucida Sans",
                                    }}
                                    sx={{
                                      display: {
                                        xs: "none",
                                        xl: "block",
                                      },
                                    }}
                                  >
                                    Total Completed
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    style={{
                                      color: "#ffffff",
                                      padding: 10,
                                      textAlign: "justify",
                                      fontFamily: "Lucida Sans",
                                    }}
                                    sx={{
                                      display: {
                                        xs: "none",
                                        xl: "block",
                                      },
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
                                    <Typography
                                      sx={{
                                        color: "#ffffff",
                                        fontFamily: "Lucida Sans",
                                      }}
                                    >
                                      12
                                    </Typography>
                                    <Typography
                                      sx={{
                                        color: "#ffffff",
                                        fontFamily: "Lucida Sans",
                                      }}
                                    >
                                      Days
                                    </Typography>
                                  </Stack>
                                </Card>
                                <Stack direction="column">
                                  <Typography
                                    variant="subtitle"
                                    style={{
                                      color: "#ffffff",
                                      padding: 7,
                                      fontFamily: "Lucida Sans",
                                    }}
                                    sx={{
                                      display: {
                                        xs: "none",
                                        xl: "block",
                                      },
                                    }}
                                  >
                                    Daily Missed
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    style={{
                                      color: "#ffffff",
                                      padding: 7,
                                      textAlign: "justify",
                                      fontFamily: "Lucida Sans",
                                    }}
                                    sx={{
                                      display: {
                                        xs: "none",
                                        xl: "block",
                                      },
                                    }}
                                  >
                                    Total amount of days that user has missed
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Stack>
                          </Grid>
                          <Grid item width={1 / 3} style={{ padding: 7 }}>
                            <Stack
                              gap={1}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Card
                                sx={{
                                  bgcolor: "#12253D",
                                  borderRadius: 25,
                                  width: "100%",
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
                                    fontFamily: "Lucida Sans",
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
                                  fontFamily: "Lucida Sans",
                                }}
                                sx={{
                                  display: {
                                    xs: "none",
                                    xl: "block",
                                  },
                                }}
                              >
                                Total number of days remaining until deadline
                              </Typography>
                              <CircularProgress
                                variant="determinate"
                                value={56}
                                size={140}
                                thickness={7}
                                style={{ zIndex: 1 }}
                              />
                              <Card
                                variant="plain"
                                sx={{
                                  bgcolor: "#022D66",
                                  position: "absolute",
                                  bottom: 70,
                                }}
                              >
                                <Stack>
                                  <Typography
                                    variant="h4"
                                    style={{
                                      color: "#ffffff",
                                      display: "flex",
                                      justifyContent: "center",
                                      fontFamily: "Lucida Sans",
                                    }}
                                  >
                                    56
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    style={{
                                      color: "#ffffff",
                                      padding: 10,
                                      textAlign: "justify",
                                      fontFamily: "Lucida Sans",
                                    }}
                                  >
                                    Days
                                  </Typography>
                                </Stack>
                              </Card>
                            </Stack>
                          </Grid>
                        </Stack>
                      </Grid>
                    </Card>
                  </div>
                </Col>
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
                        borderWidth: 1.5,
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
                          fontFamily: "Lucida Sans",
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
                        borderWidth: 1.5,
                      }}
                      variant="outlined"
                      color="neutral"
                    >
                      <Typography
                        sx={{
                          color: "white",
                          padding: "10px",
                          textAlign: "justify",
                          fontFamily: "Lucida Sans",
                        }}
                        variant="caption"
                      >
                        Task tracking records the completion of individual daily
                        tasks the user has assigned themselves under the Task
                        Activity feature. The chart below shows the total
                        completion and incompletion of individual tasks on a
                        daily basis.
                      </Typography>
                      <div style={{ marginTrim: 40 }}>
                        <div
                          style={{
                            paddingBottom: 15,
                            position: "relative",
                            paddingLeft: 2,
                            paddingRight: 13,
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
                                  style={{
                                    color: "#ffffff",
                                    fontFamily: "Lucida Sans",
                                  }}
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
                                      fontFamily: "Lucida Sans",
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
                                      fontFamily: "Lucida Sans",
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
                                  style={{
                                    color: "#ffffff",
                                    fontFamily: "Lucida Sans",
                                  }}
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
                            position: "relative",
                            top: -40,
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
                            <TaskTracking tasks={dailyTasks} />
                          </Card>
                        </div>
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
