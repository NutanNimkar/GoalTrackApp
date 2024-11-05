import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { Card, CardContent, Typography, Stack, Button } from "@mui/joy";
import ProgressCharts from "./ProgressCharts.jsx";
import { FaRegEye } from "react-icons/fa6";
import Grid from "@mui/material/Grid2";
import TrackProgressCard from "./TrackProgressCard.jsx";

function UserInfoAndProgress({ members }) {
  return (
    <div>
      {members.map((member, index) => (
        <Card
          sx={{
            bgcolor: index % 2 === 0 ? "#022D66" : "#0B3A79",
            width: "100%",
            borderRadius: "20px"
          }}
          variant="soft"
        >
          <Grid container spacing={3} style={{ alignItems: "center" }}>
            <Grid item style={{ width: "25%" }}>
              <Card
                size="sm"
                sx={{
                  width: "auto",
                  backgroundColor: "rgba(181, 181, 181, 0.45)",
                  borderRadius: "20px"
                }}
                variant="soft"
              >
                <Stack direction="horizontal" gap={3}>
                  <CgProfile
                    size={63}
                    style={{
                      alignSelf: "center",
                      paddingTop: 5,
                      paddingBottom: 5,
                      color: "#8CA8CA",
                    }}
                  />
                  <Stack>
                    <Typography
                      level="title-lg"
                      sx={{
                        color: "#ffffff",
                      }}
                      // style={{ alignSelf: "center" }}
                    >
                      {member}
                    </Typography>
                    <CardContent>
                      <Typography
                        level="body-sm"
                        sx={{ color: "#ffffff" }}
                        style={{ alignSelf: "center" }}
                      >
                        Something about me
                      </Typography>
                    </CardContent>
                  </Stack>
                </Stack>
              </Card>
            </Grid>

            <Grid item style={{ width: "16vw" }}>
              <ProgressCharts index={index} />
            </Grid>
            <Grid container style={{ width: "7vw" }}>
              <TrackProgressCard />
            </Grid>
            <Grid
              item
              style={{
                width: "15%",
                alignContent: "center",
                paddingLeft: "3.75%"
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  bgcolor: "#4F729D",
                  borderRadius: 30,
                  alignContent: "center",
                  width: "100%",
                  borderWidth: 3
                }}
              >
                <FaRegEye size={25} color="#8CA8CA" />
              </Button>
            </Grid>
          </Grid>
        </Card>
      ))}
    </div>
  );
}

export default UserInfoAndProgress;
