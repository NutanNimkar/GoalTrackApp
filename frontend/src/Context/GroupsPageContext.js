import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const GroupsPageContext = createContext();

const GroupsPageProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [groupIDS, setGroupIDS] = useState([]);
  const [memberNames, setMemberNames] = useState([]);

  useEffect(() => {
    getGroupIDs();
  }, []);
 
  const getGroupIDs = () => {
    axios.get(`/api/groups`)
      .then(response => {
        const ids = response.data.map(grp => grp._id);
        setGroupIDS(ids);
        // console.log(ids)
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
        const groupsMap = memberRequests.reduce((acc, {groupName, members}) => {
          acc[groupName] = members;
          return acc;
        }, {})
        // setMemberNames([...memberRequests]);
        setGroups(groupsMap);
        // console.log(groups, memberNames)
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
        memberNames, // Provide memberNames in the context
        setGroups,
        setGroupIDS,
      }}
    >
      {children}
    </GroupsPageContext.Provider>
  );
};

export { GroupsPageContext, GroupsPageProvider };