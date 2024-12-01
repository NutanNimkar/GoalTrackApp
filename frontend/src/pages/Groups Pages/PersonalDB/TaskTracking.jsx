import React from "react";
import { Grid, Card, Typography } from "@mui/joy";
import ProgressCharts from "../GroupDB/components/ProgressCharts";
import TrackProgressCard from "../GroupDB/components/TrackProgressCard";

function TaskTracking({tasks}) {
    console.log(tasks)
  return (
    <div>
      {tasks?.map((dailyTask, index) => (
        <Card
          sx={{
            backgroundColor: index % 2 === 0 ? "#022D66" : "#0B3A79",
            width: "100%",
            borderRadius: "20px",
            // padding:"10px"
          }}
          variant="soft"
        >
          <Grid
            container
            direction="row"
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-around",
            }}
            spacing={4}
          >
            <Grid item style={{ width: "23%", paddingRight: 5 }}>
              <Card
                size="lg"
                sx={{
                  width: "auto",
                  backgroundColor: "rgba(181, 181, 181, 0.45)",
                  borderRadius: "20px",
                  bgcolor: "#022D66",
                  borderColor: "#395CCF",
                }}
                variant="outlined"
              >
                <Typography
                  variant="body1"
                  textAlign="center"
                  style={{ color: "white", fontFamily: "Lucida Sans" }}
                >
                  {dailyTask.name}
                </Typography>
              </Card>
            </Grid>
            <Grid item style={{ width: "55%" }}>
              <ProgressCharts index={index} />
            </Grid>
            <Grid item style={{ width: "22%" }}>
              <TrackProgressCard />
            </Grid>
          </Grid>
        </Card>
      ))}
    </div>
  );
}

export default TaskTracking;
