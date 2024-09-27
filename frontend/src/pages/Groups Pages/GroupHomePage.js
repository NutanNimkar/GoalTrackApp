import React, { useContext } from "react";
import VerticalNavigation from "../../components/VerticalNavigation";
import { Container, Row, Col, Stack } from "react-bootstrap";
import GroupDropDown from "../../components/Groups Components/GroupDropDown";
import { GroupsPageContext } from "../../Context/GroupsPageContext";
import Tile from "../../components/Tile";
import CreateGroupModal from "../../components/Groups Components/CreateGroupModal";
import { Card, CardContent, Typography } from "@mui/joy";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaRegHandshake } from "react-icons/fa";

const GroupsPage = () => {
  const { groups, handleAddGroup, showModal, setShowModal, handleSaveGroup } =
    useContext(GroupsPageContext);

  const numberOfGroups = Object.keys(groups).length;
  console.log(numberOfGroups);
  return (
    <Container fluid className="container-fluid vh-100">
      <Row className="h-100">
        <Col xs={12} md="auto" className="bg-light p-0">
          <VerticalNavigation />
        </Col>
        <Col md={7} className="p-4">
          <Row>
            <h1 style={{ color: "#ffffff" }}>Groups</h1>
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
              <Stack gap = {5}>
                <Card
                  variant="outlined"
                  sx={{
                    bgcolor: "#12253D",
                    display: "flex",
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
                  </CardContent>
                </Card>
                <Card
                  variant="outlined"
                  sx={{
                    bgcolor: "#12253D",
                    display: "flex",
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
                      Join an existing group with a group code
                    </Card>
                  </CardContent>
                </Card>
              </Stack>
            </Stack>
          </Row>
        </Col>
      </Row>
      <CreateGroupModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveGroup}
      />
    </Container>
  );
};

export default GroupsPage;
