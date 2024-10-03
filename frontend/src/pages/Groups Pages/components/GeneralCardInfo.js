import React from "react";
import { Container, Stack } from "react-bootstrap";
import { Card, CardContent } from "@mui/joy";
import Typography from "@mui/joy/Typography";

function GeneralDeck({ description, punishment }) {
  return (
    <div>
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
            <div style={{alignContent: "space-around"}}>
              <Typography style={{ color: "#ffffff" }}>{description}</Typography>
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
                <CardContent sx={{ color: "#ffffff" }}>{punishment}</CardContent>
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
            </div>
            
          </Stack>
        </Card>
      </div>
    </div>
  );
}

export default GeneralDeck;
