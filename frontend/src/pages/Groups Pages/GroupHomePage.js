import React, { useContext } from "react";
import VerticalNavigation from "../../components/VerticalNavigation";
import { Row, Col, Stack } from "react-bootstrap";
import { Container, Grid, positions } from "@mui/system";
import GroupDropDown from "../../components/Groups Components/GroupDropDown";
import { GroupsPageContext } from "../../Context/GroupsPageContext";
import Tile from "../../components/Tile";
import CreateGroupModal from "../../components/Groups Components/CreateGroupModal";
import { Card, CardContent, Typography } from "@mui/joy";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaRegHandshake } from "react-icons/fa";
import Button from "@mui/material/Button";

const GroupsPage = () => {
  const { groups, handleAddGroup, showModal, setShowModal, handleSaveGroup } =
    useContext(GroupsPageContext);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid
          size={2}
          className="vh-100"
          style={{ position: "sticky", top: 0 }}
        >
          <VerticalNavigation />
        </Grid>
        <Grid size={9} spacing={2}>
          <Grid size={9}>
            <Row>
              <h1 style={{ color: "#83AFE8" }}>Groups</h1>
            </Row>
            <Row>
              <Stack direction="horizontal" gap={5}>
                <Card
                  variant="outlined"
                  sx={{
                    bgcolor: "#12253D",
                    display: "flex",
                    width: 2 / 3,
                    borderRadius: 30,
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      paddingBottom: 3,
                      color: "#ffffff",
                    }}
                    variant="h1"
                  >
                    Group List
                  </Typography>
                  <CardContent>
                    <Card
                      sx={{
                        bgcolor: "#0E1D30",
                      }}
                    >
                      <div className="GroupsDropDown">
                        <GroupDropDown groups={groups} />
                        <br />
                      </div>
                    </Card>
                  </CardContent>
                </Card>
                <Stack gap={5}>
                  <Card
                    variant="outlined"
                    sx={{
                      bgcolor: "#12253D",
                      display: "flex",
                      position: "fixed",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#ffffff",
                        textAlign: "center",
                      }}
                    >
                      Create Group
                    </Typography>
                    <CardContent>
                      <Button variant="text" onClick={handleAddGroup}>
                        <Card
                          sx={{
                            alignContent: "center",
                            bgcolor: "#415F84",
                            color: "#ffffff",
                          }}
                        >
                          <AiOutlineUsergroupAdd
                            size={"75"}
                            style={{ alignSelf: "center" }}
                          />
                          Create a new group and invite other users
                        </Card>
                      </Button>
                    </CardContent>
                  </Card>
                  <Card
                    variant="outlined"
                    sx={{
                      bgcolor: "#12253D",
                      display: "flex",
                      position: "fixed",
                      bottom: 1 / 2,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#ffffff",
                        textAlign: "center",
                      }}
                    >
                      Join Group
                    </Typography>
                    <CardContent>
                      <Button variant="text">
                        <Card
                          sx={{
                            alignContent: "center",
                            bgcolor: "#415F84",
                            color: "#ffffff",
                          }}
                        >
                          <FaRegHandshake
                            size={"75"}
                            style={{ alignSelf: "center" }}
                          />
                          <Typography
                            sx={{
                              color: "#ffffff",
                              textAlign: "center",
                              padding: "10px",
                            }}
                          ></Typography>
                          Join an existing group with a group code
                        </Card>
                      </Button>
                    </CardContent>
                  </Card>
                </Stack>
              </Stack>
            </Row>
          </Grid>
          {/* </Col> */}
        </Grid>
        <CreateGroupModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={handleSaveGroup}
        />
      </Grid>
    </div>
  );
};

export default GroupsPage;
