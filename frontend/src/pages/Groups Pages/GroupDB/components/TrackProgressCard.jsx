import React from "react";
// import MyTaskDetails from "../../../../components/Groups Components/MyDailyTask.jsx";
// import { SharedStateContext } from "../../../../Context/SharedStateContext.js";
import { Card, CardContent, Typography, Stack } from "@mui/joy";
import { generateChartData } from "../components/ProgressCharts";
import Grid from "@mui/material/Grid2";

function TrackProgressCard() {
  const data = generateChartData();

  return (
    <div>
      <Card
        sx={{
          borderRadius: 30,
          background:
            "linear-gradient(to right, rgba(11,58,100,1), rgba(18,37,61,0) 50%), linear-gradient(to right, rgba(11,58,121,1), rgba(18,37,61,1) 100%)",
          border: "2px solid",
          borderColor: "#4F729D",
          backdropFilter: "blur(1px)",
          // padding: "7, 5, 7, 5"
        }}
        size="sm"
      >
        <Grid container style={{ justifyContent: "center" }}>
          <Stack
            direction="row"
            gap={2}
            style={{ justifyItems: "space-evenly" }}
          >
            <CardContent>
              <Typography
                level="h2"
                sx={{ color: "#12B806", fontFamily: "Lucida Sans" }}
              >
                {data.datasets[1].data[0]}
              </Typography>
            </CardContent>

            <CardContent>
              <Typography
                level="h2"
                sx={{ color: "#FF0808", fontFamily: "Lucida Sans" }}
              >
                {data.datasets[0].data[0]}
              </Typography>
            </CardContent>
          </Stack>
        </Grid>
      </Card>
    </div>
  );
}

export default TrackProgressCard;
