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

  useEffect(() => {
    getGroupIDs();
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try{
      const response = await axios.get('/api/groups');
      const groupsData = response.data.reduce((acc, group) => {
        acc[group.name] = group.members.map(member => member.username)
        return acc;
      }, {});
      setGroups(groupsData);
    }
    catch (error) {
      console.error('Error fetching groups', error);
    }
  };

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

  const addMember = (groupName, userId) => {
    axios.get(`/api/groups`)
      .then(response => {
        const group = response.data.find(grp => grp.name === groupName);
        if (group) {
          const groupId = group._id;
          axios.put(`/api/groups/${groupId}/add-member`, { userId })
            .then((response) => {
              setGroupIDS(prevIDs => [...prevIDs, response.data._id])
              fetchGroups();
              setShowMemberModal(false);
            })
            .catch(error => console.error('Error adding member to group', error));
        } else {
          console.error('No such group');
        }
      })
      .catch(error => console.error('Error fetching groups', error));    
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

    fetchMemberRequests()
    // if (groupIDS.length > 0) {
    //   fetchMemberRequests();
    // }
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
