import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const GroupsPageContext = createContext();

const GroupsPageProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [groupIDS, setGroupIDS] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [relevantID, setRelevantID] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    getGroupIDs();
  }, []);

  const handleSaveGroup = (group) => {
    axios.post(`/api/groups`, group)
      .then(response => {
        const newGroup = response.data;
        setGroups(prevGroups => ({
          ...prevGroups,
          [newGroup.name]: newGroup.members || []
        }));
        setGroupIDS(prevIDs => [...prevIDs, newGroup._id]);
        setShowModal(false);
      })
      .catch((error) => console.error("Error creating a new group", error));
  }

  const addMember = (groupName) => {
    axios.get(`/api/groups`)
      .then(response => {
        const ids = response.data.map(grp => grp._id);
        const foundID = ids.find(id => groupName);
        axios.put(`api/groups/${foundID}`)
        .then(response => {
          setGroups(prevGroups => ({
            ...prevGroups,
            [response.data.members] : response.data || []
          }))
          console.log(groups)
          // setGroupMembers(prevGroupMembers => ({
          //   ...prevGroupMembers,
          //   ...response.data
          // }))
          setShowMemberModal(false);
        })
        .catch(error => console.log("Error fetching relevant ID ", error))
        console.log(foundID);
      })
      .catch(error => console.error('Error adding new member to specified group', error));
    
  }
  const handleAddGroup = () => {
    setCurrentGroup(null);
    setShowModal(true);
  }

  const handleAddMember = (group) => {
    setSelectedGroup(group);
    setShowMemberModal(true);
  }

  const getGroupIDs = () => {
    axios.get(`/api/groups`)
      .then(response => {
        const ids = response.data.map(grp => grp._id);
        setGroupIDS(ids);
      })
      .catch(error => console.error('Error fetching Group IDS', error));
  };

  useEffect(() => {
    const fetchMemberRequests = async () => {
      try {
        const memberRequests = await Promise.all(groupIDS.map(async (id) => {
          const response = await axios.get(`/api/groups/${id}/members`);
          return {
            groupName: response.data.name,
            members: response.data.members.map(member => member.username)
          };
        }));
        const groupsMap = memberRequests.reduce((acc, { groupName, members }) => {
          acc[groupName] = members;
          return acc;
        }, {});
        setGroups(groupsMap);
      } catch (error) {
        console.error('Error in one or more requests', error);
      }
    };

    if (groupIDS.length > 0) {
      fetchMemberRequests();
    }
  }, [groupIDS]);
  

  return (
    <GroupsPageContext.Provider
      value={{
        groups,
        groupIDS,
        showModal,
        currentGroup,
        showMemberModal,
        selectedGroup,
        setGroups,
        setGroupIDS,
        setShowModal,
        handleAddGroup,
        handleSaveGroup,
        setShowMemberModal,
        handleAddMember,
        setSelectedGroup,
        addMember
      }}
    >
      {children}
    </GroupsPageContext.Provider>
  );
};

export { GroupsPageContext, GroupsPageProvider };
