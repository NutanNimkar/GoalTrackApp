import React from "react";
import { Container, Stack } from "react-bootstrap";
import { Card, CardContent } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { Grid } from "@mui/system";

function GeneralDeck({ description, punishment }) {
  return (
    <div>
      <div style={{ paddingLeft: 50 }}>
        <Card
          sx={{
            width: 150,
            bgcolor: "#12253D",
            display: "flex",
            paddingBottom: 4,
            alignItems: "center",
            borderRadius: "18px",
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
            <Typography level="title-sm" style={{ color: "#ffffff" }}>
              Group Contract
            </Typography>
          </div>
        </Card>
      </div>
      <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
        <Card
          sx={{
            bgcolor: "#022D66",
            display: "flex",
            top: -13,
            borderRadius: "20px",
          }}
          variant="outlined"
          color="neutral"
        >
          <Grid>
            <Stack
              direction="horizontal"
              gap={5}
              style={{ justifyContent: "space-between" }}
            >
              <Typography
                style={{
                  color: "#ffffff",
                  width: "50%",
                  paddingLeft: "10px",
                }}
              >
                The Group Contract is unanimous task to be performed at the end
                of the global settings session.
              </Typography>
              <Card
                variant="outlined"
                sx={{
                  bgcolor: "#12253D",
                  alignItems: "center",
                  display: "flex",
                  width: 1 / 3,
                  borderRadius: "20px"
                }}
              >
                <Typography
                  level="title-lg"
                  style={{
                    display: "flex",
                    color: "#ffffff",
                  }}
                >
                  Contract
                </Typography>
                <CardContent>
                  <Typography sx={{ color: "#ffffff" }} level="h3">
                    {punishment}
                  </Typography>
                </CardContent>
              </Card>
              <Card
                variant="outlined"
                sx={{
                  bgcolor: "#12253D",
                  alignItems: "center",
                  display: "flex",
                  width: 1 / 3,
                  borderRadius: "20px"
                }}
              >
                <Typography
                  level="title-lg"
                  style={{
                    display: "flex",
                    color: "#ffffff",
                    alignItems: "center",
                  }}
                >
                  Deadline
                </Typography>
                <CardContent>
                  <Typography
                    level="h3"
                    style={{
                      display: "flex",
                      color: "#B6CCE7",
                      alignItems: "center",
                    }}
                  >
                    May 12, 2024
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Card>
      </div>
    </div>
  );
}

export default GeneralDeck;
