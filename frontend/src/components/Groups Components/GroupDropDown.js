import { Accordion, Stack } from "react-bootstrap";
import React, { useContext } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GroupsPageContext } from "../../Context/GroupsPageContext";
import AddGroupMemberModal from "./AddGroupMemberModal";
import { Link } from "react-router-dom";
import { MdGroups, MdPerson } from "react-icons/md";
import { Button } from "@mui/joy";

function GroupDropDown({
  groupName,
  memberNames,
  groups,
  punishment,
  description,
}) {
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
      <Accordion.Item eventKey={index + 1} key={index}>
        <Accordion.Header
          style={{ position: "sticky", top: 0, backgroundColor: "#83AFE8" }}
        >
          Group #{index + 1}: {groupName}
        </Accordion.Header>
        <Accordion.Body>
          <div>
            {groupMemberNames.map((member, index) => (
              <div className="d-grid gap-2" key={index}>
                <Button key={member} variant="contained" size="lg">
                  {member}
                </Button>
                <br />
              </div>
            ))}
            <Stack direction="horizontal" gap={5} style={{justifyContent: "space-evenly"}}>
              <Link
                to={{ pathname: `/groups/${groupName}/groupdb` }}
                state={{
                  name: groupName,
                  punishment: groupPunishment,
                  description: groupDescription,
                }}
                style={{ textAlign: "end", textDecoration: "none" }}
              >
                <Button
                  variant="outlined"
                  size="lg"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 11,
                  }}
                >
                  <MdGroups
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                    size={48}
                  />
                  Group Dashboard
                </Button>{" "}
              </Link>

              <Button
                variant="outlined"
                size="lg"
                onClick={() => handleAddMember(groupName)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 21,
                }}
              >
                <AiOutlinePlusCircle
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    marginLeft: 25,
                    marginRight: 25,
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
                  size="lg"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 11,
                  }}
                >
                  <MdPerson
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                    size={48}
                  />
                  Personal Dashboard
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
        </Accordion.Body>
      </Accordion.Item>
    );
  });
  return <Accordion>{accordionItems}</Accordion>;
}

export default GroupDropDown;
