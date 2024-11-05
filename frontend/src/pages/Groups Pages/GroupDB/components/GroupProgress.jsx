import React from "react";
import { Link } from "react-router-dom";
import { MdOutlinePersonOutline } from "react-icons/md";
// import MyTaskDetails from "../../../../components/Groups Components/MyDailyTask.jsx";
// import { SharedStateContext } from "../../../../Context/SharedStateContext.js";
import { Card, CardContent, Typography, Stack, Button } from "@mui/joy";
import UserInfoAndProgress from "./UserInfoAndProgress.jsx";

function GroupProgress({ name, members, description, punishment }) {
  return (
    <div>
      <Card
        sx={{
          bgcolor: "#12253D",
          color: "#ffffff",
          borderRadius: "15px",
          borderColor: "#022D66",
          borderWidth: 2,
        }}
      >
        <div>
          <Typography style={{ color: "#ffffff", paddingLeft: 10 }} level="h2">
            Group Progress Activity
          </Typography>

          <CardContent style={{ paddingTop: 15, paddingLeft: 15, paddingRight: 25 }}>
            <Stack direction="horizontal" gap={2}>
              Group Progress will be featured on this dashboard. The total
              amount of days completed by a member, total amount of days missed
              by a member and the highest member streak will be recorded.
              <Link
                to={{ pathname: `/groups/${name}/personaldb` }}
                state={{
                  name: name,
                  members: members,
                  description: description,
                  punishment: punishment,
                }}
                style={{ textAlign: "end", textDecoration: "none" }}
              >
                <Button
                  size="lg"
                  variant="outlined"
                  sx={{
                    bgcolor: "#022D66",
                    color: "#ffffff",
                    borderColor: "#AEC5E3",
                    borderWidth: 2,
                    borderRadius: 15
                  }}
                >
                  <Stack gap={3} direction="horizontal">
                    <MdOutlinePersonOutline size={50} />
                    Personal Dashboard
                  </Stack>
                </Button>
              </Link>
            </Stack>
          </CardContent>
        </div>

        <div>
          <div
            style={{
              paddingBottom: 15,
              position: "relative",
              bottom: -40,
              paddingRight: 27,
              paddingLeft:2
            }}
          >
            <Stack direction="horizontal" gap={1}>
              <Card
                sx={{
                  width: "240%",
                  bgcolor: "#12253D",
                  alignItems: "center",
                  borderRadius: "20px",
                  borderColor: "#AEC5E3",
                }}
              >
                <Typography level="title-sm" style={{ color: "#ffffff" }}>
                  Group Members
                </Typography>
              </Card>
              <Card
                sx={{
                  width: "300%",
                  bgcolor: "#12253D",
                  display: "flex",
                  paddingBottom: 3,
                  alignItems: "center",
                  borderRadius: "20px",
                  borderColor: "#AEC5E3",
                }}
              >
                <Stack direction="horizontal" gap={4}>
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
                  width: "140%",
                  bgcolor: "#12253D",
                  display: "flex",
                  paddingBottom: 3,
                  alignItems: "center",
                  borderRadius: "20px",
                  borderColor: "#AEC5E3",
                }}
              >
                <Typography level="title-sm" style={{ color: "#ffffff" }}>
                  Track Progress
                </Typography>
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
                <Typography level="title-sm" style={{ color: "#ffffff" }}>
                  Check Progress
                </Typography>
              </Card>
            </Stack>
          </div>
          <div
            style={{
              maxHeight: "44vh",
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
        </div>
      </Card>
    </div>
  );
}

export default GroupProgress;
