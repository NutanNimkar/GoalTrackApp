import { createContext, useState, useContext } from "react";

const FriendRequestsContext = createContext();

export const FriendRequestsProvider = ({ children }) => {
  const [sentFriendRequests, setSentFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  return (
    <FriendRequestsContext.Provider value={{ sentFriendRequests, setSentFriendRequests, friends, setFriends }}>
      {children}
    </FriendRequestsContext.Provider>
  );
};

export const useFriendRequests = () => useContext(FriendRequestsContext);
