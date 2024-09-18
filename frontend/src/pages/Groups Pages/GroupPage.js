import React, { useContext } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import VerticalNavigation from "../../components/VerticalNavigation";
import { useLocation } from "react-router-dom";
import MyTaskDetails from "../../components/Groups Components/MyDailyTask";
import { SharedStateContext } from "../../Context/SharedStateContext";
import { Card, CardContent, Grid } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";
import { MdOutlinePersonOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import ReactApexChart from "react-apexcharts";

function GroupPage() {
  const location = useLocation();
  const { name, punishment, description } = location.state;
  const { handleAddTask } = useContext(SharedStateContext);

  const chartOptions = {
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
          "Germany",
        ],
      },
    },
  };


  return (
    <Container fluid className="container-fluid vh-100">
      <Row className="h-100">
        <Col md={2} className="bg-dark p-0">
          <VerticalNavigation />
        </Col>
        <Col>
          <Row className="p-3">
            <h1 style={{ color: "#80AFE8", display: "inline" }}>{name}</h1>{" "}
            <h1 style={{ color: "#ffffff", display: "inline" }}>
              DashBoard - Group
            </h1>
          </Row>
          <Row>
            <div style={{ paddingLeft: 50 }}>
              <Card
                sx={{
                  width: 150,
                  bgcolor: "#12253D",
                  display: "flex",
                  paddingBottom: 3,
                  alignItems: "center",
                  borderRadius: "15px",
                }}
                variant="outlined"
                color="neutral"
              >
                <div
                  style={{
                    position: "absolute",
                    paddingBottom: 15,
                    top: 10,
                  }}
                >
                  <Typography level="title-sm" style={{ color: "#ffffff" }}>
                    Group Contract
                  </Typography>
                </div>
              </Card>
            </div>
            <div style={{ paddingRight: 25, paddingLeft: 25 }}>
              <Card
                sx={{
                  bgcolor: "#022D66",
                  display: "flex",
                  top: -13,

                  borderRadius: "15px",
                }}
                variant="outlined"
                color="neutral"
              >
                <Stack direction="horizontal" gap={5}>
                  <Typography style={{ color: "#ffffff" }}>
                    The group contract is a unanimous task to be performed at
                    the end of the goal setting session.
                  </Typography>
                  <Card
                    variant="outlined"
                    sx={{
                      bgcolor: "#12253D",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Typography
                      level="title-sm"
                      style={{
                        display: "flex",
                        color: "#ffffff",
                      }}
                    >
                      Contract
                    </Typography>
                    <CardContent sx={{ color: "#ffffff" }}>
                      {punishment}
                    </CardContent>
                  </Card>
                  <Card
                    variant="outlined"
                    sx={{
                      bgcolor: "#12253D",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Typography
                      level="title-sm"
                      style={{
                        display: "flex",
                        color: "#ffffff",
                        alignItems: "center",
                      }}
                    >
                      Deadline
                    </Typography>
                    <CardContent
                      level="title-lg"
                      style={{
                        display: "flex",
                        color: "#B6CCE7",
                        alignItems: "center",
                      }}
                    >
                      May 12, 2024
                    </CardContent>
                  </Card>
                </Stack>
              </Card>
            </div>
          </Row>
          <Row>
            <div style={{ paddingRight: 25, paddingLeft: 25 }}>
              <Stack direction="horizontal" gap={5}>
                <Col md={7}>
                  <Card
                    sx={{
                      bgcolor: "#12253D",
                      color: "#ffffff",
                      borderRadius: "15px",
                    }}
                  >
                    <Typography style={{ color: "#ffffff" }}>
                      Group Progress Activity
                    </Typography>
                    <Stack gap={5} direction="horizontal">
                      <CardContent>
                        Group Progress will be featured on this dashboard. The
                        total amount of days completed by a member, total amount
                        of days missed by a member and the highest member streak
                        will be recorded.
                      </CardContent>
                      <Link
                        // to={{ pathname: `/groups/${}`}}
                        state={{
                          name: name,
                        }}
                        style={{ textAlign: "end", textDecoration: "none" }}
                      >
                        <Card sx={{ bgcolor: "#12253D", color: "#ffffff" }}>
                          <Stack gap={3} direction="horizontal">
                            <MdOutlinePersonOutline />
                            Personal Dashboard
                          </Stack>
                        </Card>
                      </Link>
                    </Stack>
                    <Stack direction="horizontal" gap={4}>
                      <Card
                        sx={{
                          width: 250,
                          bgcolor: "#12253D",
                          display: "flex",
                          paddingBottom: 3,
                          alignItems: "center",
                          borderRadius: "15px",
                        }}
                      >
                        <Typography
                          level="title-sm"
                          style={{ color: "#ffffff" }}
                        >
                          Group Members
                        </Typography>
                      </Card>
                      <Card
                        sx={{
                          width: 280,
                          bgcolor: "#12253D",
                          display: "flex",
                          paddingBottom: 3,
                          alignItems: "center",
                          borderRadius: "15px",
                        }}
                      >
                        <Stack direction="horizontal" gap={5}>
                          <Typography
                            level="title-sm"
                            style={{ color: "#ffffff" }}
                          >
                            Previous 7 Days
                          </Typography>
                          <Typography
                            level="title-sm"
                            style={{ color: "#ffffff" }}
                          >
                            Total Days
                          </Typography>
                        </Stack>
                      </Card>
                      <Card
                        sx={{
                          width: 130,
                          bgcolor: "#12253D",
                          display: "flex",
                          paddingBottom: 3,
                          alignItems: "center",
                          borderRadius: "15px",
                        }}
                      >
                        <Typography
                          level="title-sm"
                          style={{ color: "#ffffff" }}
                        >
                          Track Progress
                        </Typography>
                      </Card>

                      <Card
                        sx={{
                          width: 131,
                          bgcolor: "#12253D",
                          display: "flex",
                          paddingBottom: 3,
                          alignItems: "center",
                          borderRadius: "15px",
                        }}
                      >
                        <Typography
                          level="title-sm"
                          style={{ color: "#ffffff" }}
                        >
                          Check Progress
                        </Typography>
                      </Card>
                    </Stack>
                    <Card
                      sx={{
                        bgcolor: "#0B3A79",
                        borderRadius: "15px",
                        display: "flex",
                        top: -35,
                      }}
                    >
                      <Stack direction="horizontal">
                        <Card
                          sx={{
                            bgcolor: "#022D66",
                            width: 900,
                          }}
                          variant="plain"
                        >
                          <Card
                            variant="solid"
                            size="sm"
                            sx={{
                              width: 180,
                            }}
                          >
                            <Stack direction="horizontal" gap={3}>
                              <CgProfile />
                              <Stack>
                                <Typography
                                  sx={{
                                    color: "#ffffff",
                                  }}
                                >
                                  Group-Member 1
                                </Typography>
                                <CardContent sx={{ color: "#ffffff" }}>
                                  Something about me
                                </CardContent>
                              </Stack>
                            </Stack>
                          </Card>
                        </Card>
                        {/* <Card>{renderedChart}</Card> */}
                      </Stack>
                    </Card>
                    <Card
                      sx={{
                        bgcolor: "#0B3A79",
                        borderRadius: "15px",
                        display: "flex",
                        top: -35,
                      }}
                    >
                      <Stack direction="horizontal">
                        <Card
                          sx={{
                            bgcolor: "#022D66",
                            width: 900,
                          }}
                          variant="plain"
                        >
                          <Card
                            variant="solid"
                            size="sm"
                            sx={{
                              width: 180,
                            }}
                          >
                            <Stack direction="horizontal" gap={3}>
                              <CgProfile />
                              <Stack>
                                <Typography
                                  sx={{
                                    color: "#ffffff",
                                  }}
                                >
                                  Group-Member 1
                                </Typography>
                                <CardContent sx={{ color: "#ffffff" }}>
                                  Something about me
                                </CardContent>
                              </Stack>
                            </Stack>
                          </Card>
                        </Card>
                        <Card>
                          <ReactApexChart
                            options={chartOptions.options}
                            series={chartOptions.series}
                            type="bar"
                            height={350}
                          />
                        </Card>
                      </Stack>
                    </Card>
                    <Card
                      sx={{
                        bgcolor: "#0B3A79",
                        borderRadius: "15px",
                        display: "flex",
                        top: -35,
                      }}
                    >
                      <Stack direction="horizontal">
                        <Card
                          sx={{
                            bgcolor: "#022D66",
                            width: 900,
                          }}
                          variant="plain"
                        >
                          <Card
                            variant="solid"
                            size="sm"
                            sx={{
                              width: 180,
                            }}
                          >
                            <Stack direction="horizontal" gap={3}>
                              <CgProfile />
                              <Stack>
                                <Typography
                                  sx={{
                                    color: "#ffffff",
                                  }}
                                >
                                  Group-Member 1
                                </Typography>
                                <CardContent sx={{ color: "#ffffff" }}>
                                  Something about me
                                </CardContent>
                              </Stack>
                            </Stack>
                          </Card>
                        </Card>
                        {/* <Card>{renderedChart}</Card> */}
                      </Stack>
                    </Card>
                    <Card
                      sx={{
                        bgcolor: "#0B3A79",
                        borderRadius: "15px",
                        display: "flex",
                        top: -35,
                      }}
                    >
                      <Stack direction="horizontal">
                        <Card
                          sx={{
                            bgcolor: "#022D66",
                            width: 900,
                          }}
                          variant="plain"
                        >
                          <Card
                            variant="solid"
                            size="sm"
                            sx={{
                              width: 180,
                            }}
                          >
                            <Stack direction="horizontal" gap={3}>
                              <CgProfile />
                              <Stack>
                                <Typography
                                  sx={{
                                    color: "#ffffff",
                                  }}
                                >
                                  Group-Member 1
                                </Typography>
                                <CardContent sx={{ color: "#ffffff" }}>
                                  Something about me
                                </CardContent>
                              </Stack>
                            </Stack>
                          </Card>
                        </Card>
                        {/* <Card>{renderedChart}</Card> */}
                      </Stack>
                    </Card>
                  </Card>
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
              <Grid></Grid>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default GroupPage;
