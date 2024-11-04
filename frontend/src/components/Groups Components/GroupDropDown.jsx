import React, { useContext } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GroupsPageContext } from "../../Context/GroupsPageContext";
import AddGroupMemberModal from "./AddGroupMemberModal";
import { Link } from "react-router-dom";
import { MdGroups, MdPerson } from "react-icons/md";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Stack, Button, Typography } from "@mui/joy";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Fade from "@mui/material/Fade";
import { CgProfile } from "react-icons/cg";

function GroupDropDown({
  // groupName,
  memberNames,
  groups,
  // punishment,
  // description,
}) {
  const [expandedAccordion, setExpandedAccordion] = React.useState(false);

  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : null);
  };

  const {
    addMember,
    handleAddMember,
    setShowMemberModal,
    showMemberModal,
    selectedGroup,
  } = useContext(GroupsPageContext);
  if (!Array.isArray(memberNames)) {
    memberNames = [];
  }

  // reading how many
  const uniqueGroups = {};

  Object.keys(groups).forEach((groupName) => {
    if (!uniqueGroups[groupName]) {
      uniqueGroups[groupName] = groups[groupName];
    }
  });

  const sortedGroupNames = Object.keys(uniqueGroups).sort((a, b) => {
    const aNumber = parseInt(a.replace(/\D/g, ""), 10);
    const bNumber = parseInt(b.replace(/\D/g, ""), 10);
    return bNumber - aNumber;
  });

  const accordionItems = sortedGroupNames.map((groupName, index) => {
    const currentGroup = uniqueGroups[groupName];
    const groupMemberNames = currentGroup?.members || [];
    const groupDescription = currentGroup?.description || [];
    const groupPunishment = currentGroup?.punishment || [];

    return (
      <Accordion
        eventKey={index + 1}
        key={index}
        expanded={expandedAccordion === index}
        onChange={handleExpansion(index)}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 400 }}
        sx={{
          borderRadius: "5px",
          padding: "5px",
          marginBottom: 2,
          backgroundColor: "#1C3B61",
          ...(expandedAccordion === index
            ? {
                "& .MuiAccordion-region": {
                  height: "auto",
                },
                "& .MuiAccordionDetails-root": {
                  display: "block",
                },
              }
            : {
                "& .MuiAccordion-region": {
                  height: 0,
                },
                "& .MuiAccordionDetails-root": {
                  display: "none",
                },
                // backgroundColor: "Background.paper",
              }),
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          sx={{
            backgroundColor: "#83AFE8",
            borderRadius: "5px",
          }}
        >
          Group #{index + 1}: {groupName}
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {groupMemberNames.map((member, ind) => (
              <div className="d-grid gap-2" key={ind}>
                <Button
                  key={member}
                  variant="contained"
                  size="lg"
                  sx={{
                    backgroundColor: "#415F84",
                    margin: 2,
                    padding: 2,
                  }}
                >
                  <Stack direction="horizontal" gap={11}>
                    <CgProfile
                      size={30}
                      style={{ position: "inherit", left: 0 }}
                    />
                    {member}
                  </Stack>
                </Button>
              </div>
            ))}
            <Stack
              direction="horizontal"
              gap="auto"
              style={{ justifyContent: "space-evenly" }}
            >
              <Link
                to={{ pathname: `/groups/${groupName}/groupdb` }}
                state={{
                  members: groupMemberNames,
                  name: groupName,
                  punishment: groupPunishment,
                  description: groupDescription,
                }}
                style={{ textAlign: "end", textDecoration: "none" }}
              >
                <Button
                  variant="outlined"
                  size="sm"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 11,
                    backgroundColor: "#022D66",
                  }}
                >
                  <MdGroups
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginRight: 10,
                      color: "#74AFDC",
                    }}
                    size={48}
                  />
                  <Typography sx={{ color: "#74AFDC" }}>
                    Group Dashboard
                  </Typography>
                </Button>
              </Link>

              <Button
                variant="outlined"
                size="sm"
                onClick={() => handleAddMember(groupName)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 30,
                  backgroundColor: "#022D66",
                }}
              >
                <AiOutlinePlusCircle
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    marginLeft: 25,
                    marginRight: 25,
                    color: "#FAFBFC",
                  }}
                  size={28}
                />
              </Button>

              <Link
                to={{ pathname: `/groups/${groupName}/personaldb` }}
                state={{
                  name: groupName,
                  punishment: groupPunishment,
                  description: groupDescription,
                }}
                style={{ textAlign: "end", textDecoration: "none" }}
              >
                <Button
                  variant="outlined"
                  size="sm"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 11,
                    backgroundColor: "#022D66",
                  }}
                  className="text-w"
                >
                  <MdPerson
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginRight: 10,
                      color: "#74AFDC",
                    }}
                    size={48}
                  />
                  <Typography sx={{ color: "#74AFDC" }}>
                    Personal Dashboard
                  </Typography>
                </Button>
              </Link>
            </Stack>

            <AddGroupMemberModal
              selectedGroup={selectedGroup}
              show={showMemberModal}
              handleClose={() => setShowMemberModal(false)}
              handleSave={(userId) => addMember(selectedGroup, userId)}
              group={groups}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    );
  });
  return (
    <div
      // scrollbar styling
      style={{
        maxHeight: "57vh", 
        overflowY: "auto", 
        scrollbarColor: "#415F84 #0A2344",
        paddingRight: 10
      }}
    >
      {accordionItems}
    </div>
  );
}

export default GroupDropDown;
