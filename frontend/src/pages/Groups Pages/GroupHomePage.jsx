import React, { useContext } from "react";
import VerticalNavigation from "../../components/VerticalNavigation";
import { Row } from "react-bootstrap";
import { Grid } from "@mui/system";
import GroupDropDown from "../../components/Groups Components/GroupDropDown";
import { GroupsPageContext } from "../../Context/GroupsPageContext";
import CreateGroupModal from "../../components/Groups Components/CreateGroupModal";
import { Card, CardContent, Typography, Stack } from "@mui/joy";
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
          size={{ xs: 4, lg: 3, xl:2 }}
          className="vh-100"
          style={{ position: "sticky", top: 0 }}
        >
          <VerticalNavigation />
        </Grid>
        <Grid size={{ xs: 8, lg: 9, xl:10 }}>
          <Grid>
            <Row
              style={{
                paddingBottom: "2%",
                paddingTop: "1.3%",
                paddingLeft: "1%",
              }}
            >
              <Typography sx={{ color: "#83AFE8", fontFamily: "Lucida Sans" }} level="h1">Groups</Typography>
            </Row>
            <Grid> 
              <Stack
                direction="horizontal"
                gap={5}
                style={{ paddingRight: 25, paddingLeft: 25 }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    bgcolor: "#12253D",
                    display: "flex",
                    width: "65%",
                    borderRadius: 30,
                    borderColor: "#12253D"
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      paddingBottom: 3,
                      color: "#ffffff",
                      fontFamily: "Lucida Sans"
                    }}
                    level="h1"
                  >
                    Group List
                  </Typography>
                  <CardContent>
                    <Card
                      sx={{
                        bgcolor: "#0E1D30",
                        borderRadius: 30
                      }}
                      variant="solid"
                    >
                      <div className="GroupsDropDown">
                        <GroupDropDown groups={groups} />
                      </div>
                    </Card>
                  </CardContent>
                </Card>
                <Stack gap={5}>
                  <Card
                    variant="outlined"
                    sx={{
                      bgcolor: "#022D66",
                      display: "flex",
                      position: "fixed",
                      borderRadius: 30,
                      borderColor: "#022D66"
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#ffffff",
                        textAlign: "center",
                        fontFamily: "Lucida Sans"
                      }}
                      level="h3"
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
                            borderRadius: 30
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
                      bgcolor: "#022D66",
                      display: "flex",
                      position: "fixed",
                      bottom: "10%",
                      borderRadius: 30,
                      borderColor: "#022D66"
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#ffffff",
                        textAlign: "center",
                        fontFamily: "Lucida Sans"
                      }}
                      level="h3"
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
                            borderRadius: 30
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
                            }}
                          ></Typography>
                          Join an existing group with a group code
                        </Card>
                      </Button>
                    </CardContent>
                  </Card>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
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
