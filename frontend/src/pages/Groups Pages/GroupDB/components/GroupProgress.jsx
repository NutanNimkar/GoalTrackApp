import React from "react";
import { Link } from "react-router-dom";
import { MdOutlinePersonOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BarChart } from "@mui/x-charts/BarChart";
import { dataset, valueFormatter } from "../weather";
import MyTaskDetails from "../../../../components/Groups Components/MyDailyTask.jsx";
import { SharedStateContext } from "../../../../Context/SharedStateContext.js";
import { Card, CardContent, Typography, Stack } from "@mui/joy";
import { useLocation } from "react-router-dom";

function GroupProgress({name, description, punishment}) {
  const chartSetting = {
    xAxis: [
      {
        label: "rainfall (mm)",
      },
    ],
    width: 500,
    height: 400,
  };
  return (
    <div
      style={{
        maxHeight: "65vh",
        overflowY: "auto",
        scrollbarColor: "#415F84 #0A2344",
        paddingRight: 10,
      }}
    >
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
        <Stack direction="horizontal" gap={2}>
          <CardContent>
            Group Progress will be featured on this dashboard. The total amount
            of days completed by a member, total amount of days missed by a
            member and the highest member streak will be recorded.
          </CardContent>
          <Link
            to={{ pathname: `/groups/${name}/personaldb` }}
            state={{
              name: name,
              description: description,
              punishment: punishment,
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
            <Typography level="title-sm" style={{ color: "#ffffff" }}>
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
              <Typography level="title-sm" style={{ color: "#ffffff" }}>
                Previous 7 Days
              </Typography>
              <Typography level="title-sm" style={{ color: "#ffffff" }}>
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
            <Typography level="title-sm" style={{ color: "#ffffff" }}>
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
            <Typography level="title-sm" style={{ color: "#ffffff" }}>
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
              <BarChart
                dataset={dataset}
                yAxis={[{ scaleType: "band", dataKey: "month" }]}
                series={[
                  {
                    dataKey: "seoul",
                    label: "Seoul rainfall",
                    valueFormatter,
                  },
                ]}
                layout="horizontal"
                {...chartSetting}
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
    </div>
  );
}

export default GroupProgress;
