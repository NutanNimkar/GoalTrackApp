import React from "react";
// import MyTaskDetails from "../../../../components/Groups Components/MyDailyTask.jsx";
// import { SharedStateContext } from "../../../../Context/SharedStateContext.js";
import { Card, CardContent, Typography, Stack } from "@mui/joy";
import Grid from "@mui/material/Grid2";

function TrackProgressCard() {
  return (
    <div
        style={{paddingLeft: "1.5vw"}}
    >
      <Card
        sx={{
          borderRadius: 30,
          background:
            "linear-gradient(to right, rgba(11,58,100,1), rgba(18,37,61,0) 200px), linear-gradient(to right, rgba(11,58,121,1), rgba(18,37,61,1) 300px)",
          border: "2px solid",
          borderColor: "#4F729D",
          backdropFilter: "blur(1px)",
        }}
        size="md"
      >
        <Stack direction="row" gap={4}>
          <CardContent>
            <Typography level="h2" sx={{ color: "green" }}>
              7
            </Typography>
          </CardContent>

          <CardContent>
            <Typography level="h2" sx={{ color: "red" }}>
              9
            </Typography>
          </CardContent>
        </Stack>
      </Card>
    </div>
  );
}

export default TrackProgressCard;
