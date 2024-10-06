import React, { useState } from "react";
import axios from "axios";
import "./FriendPage.css";
import AddIcon from "../../Images/Friends_Page_Images/add-friend-svgrepo-com.svg";
import DeleteIcon from "../../Images/Friends_Page_Images/trash-2-svgrepo-com.svg";

function FriendsList({ setResults }) {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Fetch data using axios
  const fetchData = async (value) => {
    try {
      const response = await axios.get('/api/users/');
      const json = response.data;
      console.log(json); //map array
      const results = json.filter((user) =>
        user && user.username && user.username.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
      setResults(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (event) => {
    const value = event.target.value;
    setNewFriend(value);
    fetchData(value); // Optionally update search results based on input
  };

  // Add the user typed into the input box
  const addFriend = async () => {
    if (newFriend.trim() !== "") {
      try {
        // Send the new friend's name to the backend
        await axios.post('/api/users/add-friends', { friend: newFriend });
        console.log('Friend added successfully');
        setFriends((prevFriends) => [...prevFriends, newFriend]);
        setNewFriend(""); // Clear the input field after adding
        setSearchResults([]); // Optionally clear search results if they are displayed
      } catch (err) {
        console.error('Error adding friend:', err);
      }
    }
  };

  // Delete a friend
  const deleteFriend = async (index, event) => {
    event.preventDefault();

    try {
      await axios.delete('/api/users/removeFriend', { data: { friend: friends[index] } });
      console.log('Friend removed successfully');
      setFriends((prevFriends) => prevFriends.filter((_, i) => i !== index));
    } catch (err) {
      console.error('Error removing friend:', err);
    }
  };

  return (
    <div className="FriendList">
      <div className="search-box">
        <div className="User-Search">
          <div className='Text'>ADD USER</div>
          <div className='Underline'></div>
          <div className="input-search">
            <input
              type='text'
              placeholder="Enter a Username"
              value={newFriend}
              onClick={handleSubmit}
            />
            <button
              className="search-button"
              onClick={addFriend}
            >
              <img src={AddIcon} className='search-pic' alt="Add" />
            </button>
          </div>
        </div>
      </div>
      <div className="FriendsListWrapper">
        <div className="Text">FRIEND LIST</div>
        <div className="Underline"></div>
        <ol className="Friends-List">
          {friends.map((friend, index) => (
            <li key={index}>
              <span className="text">{friend}</span>
              <img
                src={DeleteIcon}
                className="delete-pic"
                alt="Delete"
                onClick={(event) => deleteFriend(index, event)}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default FriendsList;