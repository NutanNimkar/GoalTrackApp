import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const GroupsPageContext = createContext();

const GroupsPageProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [groupIDS2, setGroupIDS2] = useState([]);
  // debugging
  const [specificGroup, setSpecificGroup] = useState([]);
  const [groupIDS, setGroupIDS] = useState([]);
  const [specGroup, setSpecGroup] = useState([]);
  const [memberNames, setMemberNames] = useState([]);

  useEffect(() => {
    getGroups();
    getGroupIDs();
  }, []);

  const getGroups = () => {
    axios.get(`/api/groups/`)
      .then(response => {
        setGroups(response.data);
        // console.log(response.data)
      })
      .catch(error => console.error('Error fetching groups:', error));
  };

  // debugging 
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
          return response.data.members.map(member => member.username);
        }));
        setMemberNames([...memberRequests]);
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
        specificGroup,
        groupIDS,
        specGroup,
        groupIDS2,
        memberNames, // Provide memberNames in the context
        setGroups,
        setSpecificGroup,
        setGroupIDS,
        setSpecGroup
      }}
    >
      {children}
    </GroupsPageContext.Provider>
  );
};

export { GroupsPageContext, GroupsPageProvider };


// import React, { createContext, useState, useEffect} from "react";
// import axios from "axios";

// const GroupsPageContext = createContext();

// const GroupsPageProvider = ({children}) => {
//     const [groups, setGroups] = useState([]);
//     const [groupIDS2, setGroupIDS2] = useState([]);
//     //debugging
//     const [specificGroup, setSpecificGroup] = useState([]);
//     const [groupIDS, setGroupIDS] = useState([]);
//     const [specGroup, setSpecGroup] = useState([]);

//     useEffect(() => {
//         getGroups();
//         getGroupIDs();
//     }, []);

//     const getGroups = () => {
//         axios.get(`/api/groups/`)
//         .then(response => {
//             setGroups(response.data)
//             // console.log(response.data)
//         })
//         .catch(error => console.error('Error fetching groups:', error))
//       }
//     // debugging 
//     const getGroupIDs = () => {
//         axios.get(`/api/groups`)
//         .then(response => {
//             const ids = response.data.map(grp => grp._id)
//             setGroupIDS(ids)
//         // console.log(ids)
//         })
//     .catch(error => console.error('Error fetching Group IDS', error))
//     }
//     // console.log(groupIDS)
//     const groupMemberRequests = groupIDS.map(id => 
//         axios.get(`/api/groups/${id}/members`)
//         .then(response => {
//             // console.log(`Members of group ${id}: `, response.data.members);
//             const name = response.data.members.map(name => name.username)
//             // console.log(name)
//         })
//         .catch(error => {
//             console.error(`Error fetching members of group ${id}: `, error);
//             throw error;
//         })
//     );

//     Promise.all(groupMemberRequests)
//     .then(results => {
//         console.log('All requests completed successfully', results);
//     })
//     .catch(error => {
//         console.error('Error in one or more requests', error);
//     });
//     return (
//         <GroupsPageContext.Provider
//             value = {{
//                 groups,
//                 specificGroup,
//                 groupIDS,
//                 specGroup,
//                 groupIDS2,
//                 setGroups,
//                 setSpecificGroup,
//                 setGroupIDS,
//                 setSpecGroup
//             }}
//         >
//             {children}
//         </GroupsPageContext.Provider>
//     );
// }

// export {GroupsPageContext, GroupsPageProvider};