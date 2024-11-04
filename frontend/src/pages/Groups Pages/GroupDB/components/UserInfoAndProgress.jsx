import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { Card, CardContent, Typography, Stack, Button } from "@mui/joy";
import ProgressCharts from "./ProgressCharts.jsx";
import { FaRegEye } from "react-icons/fa6";
import Grid from "@mui/material/Grid2";

function UserInfoAndProgress({ members }) {
  return (
    <div>
      {members.map((member, index) => (
        <Card
          sx={{
            bgcolor: index % 2 === 0 ? "#022D66" : "#0B3A79",
            width: "100%",
          }}
          variant="soft"
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                size="sm"
                sx={{
                  width: "auto",
                  backgroundColor: "rgba(181, 181, 181, 0.45)"
                }}
              >
                <Stack>
                  <CgProfile
                    size={50}
                    style={{ alignSelf: "center", paddingTop: 5, color: "#8CA8CA" }}
                  />
                  <Stack>
                    <Typography
                      sx={{
                        color: "#ffffff",
                      }}
                      style={{ alignSelf: "center" }}
                    >
                      {member}
                    </Typography>
                    <CardContent
                      sx={{ color: "#ffffff", }}
                      style={{ alignSelf: "center" }}
                    >
                      Something about me
                    </CardContent>
                  </Stack>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} sm={5} md={5} lg={8}>
              <ProgressCharts index={index}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                sx={{
                  bgcolor: "#4F729D",
                  borderRadius: 30,
                  alignContent: "center"
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
