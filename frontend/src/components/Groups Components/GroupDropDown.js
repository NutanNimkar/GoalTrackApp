import { Accordion, Button } from "react-bootstrap";
import React, { useContext } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GroupsPageContext } from "../../Context/GroupsPageContext";
import AddGroupMemberModal from "./AddGroupMemberModal";
import { Link } from "react-router-dom";
import { MdGroups, MdPerson } from "react-icons/md";

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

  return (
    <Accordion>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Group #1: {groupName}</Accordion.Header>
        <Accordion.Body>
          <div>
            {memberNames.map((member, index) => (
              <div className="d-grid gap-2" key={index}>
                <Button key={member} variant="light" size="lg">
                  {member}
                </Button>
                <br />
              </div>
            ))}

            <Link
              to={{ pathname: `/groups/${groupName}` }}
              state={{
                name: groupName,
                punishment: punishment,
                description: description,
              }}
              style={{ textAlign: "end", textDecoration: "none"}}
              
            >
              <Button
                variant="secondary"
                size="lg"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MdGroups
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                />
                Group Dashboard
              </Button>{" "}
              
            </Link>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleAddMember(groupName)}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AiOutlinePlusCircle
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  marginLeft: 25,
                  marginRight: 25,
                }}
              />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleAddMember(groupName)}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MdPerson
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  marginRight: 10,
                }}
              />
              Personal Dashboard
            </Button>

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
    </Accordion>
  );
}

export default GroupDropDown;
