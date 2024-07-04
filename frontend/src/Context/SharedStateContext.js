import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const SharedStateContext = createContext();

const SharedStateProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState(null);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');

  const userId = '6643963a530dec5de2c0797e'; 
  const groupId = '6656350aa68a902e3fdf9675';

  useEffect(() => {
    fetchGroupAndTasks();
    // getSpecificGroup();
  }, []);

  const fetchGroupAndTasks = () => {
    axios
      .get(`/api/groups/${groupId}/members`)
      .then((response) => setGroup(response.data))
      .catch((error) => console.error("Error fetching group:", error));

    axios
      .get("/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));

    axios
      .get(`/api/users/${userId}/tasks`)
      .then((response) => setDailyTasks(response.data.tasks))
      .catch((error) => console.error("Error fetching daily tasks:", error));
  };

  const handleSaveTask = (task) => {
    console.log("here");
    if (task._id) {
      axios
        .put(`/api/tasks/${task._id}`, task)
        .then((response) => {
          setDailyTasks((prevDailyTasks) =>
            prevDailyTasks.map((t) => (t._id === task._id ? response.data : t))
          );
          setShowModal(false);
          axios
            .get(`/api/users/${userId}/tasks`)
            .then((response) => setDailyTasks(response.data.tasks))
            .catch((error) =>
              console.error("Error fetching updated tasks:", error)
            );
        })
        .catch((error) => console.error("Error updating task:", error));
    } else {
      axios
        .post("/api/tasks", task)
        .then((response) => {
          setDailyTasks((prevDailyTasks) => [...prevDailyTasks, response.data]);
          setShowModal(false);
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleAddTask = () => {
    setCurrentTask(null);
    setShowModal(true);
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`/api/tasks/${taskId}`)
      .then(() => {
        setDailyTasks((prevDailyTasks) =>
          prevDailyTasks.filter((task) => task._id !== taskId)
        );
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const toggleTaskStatus = (task) => {
    const updatedStatus = !task.status;
    axios
      .put(`/api/tasks/${task._id}/status`, { status: updatedStatus })
      .then((response) => {
        setDailyTasks((prevDailyTasks) =>
          prevDailyTasks.map((t) =>
            t._id === task._id ? { ...t, status: updatedStatus } : t
          )
        );
      })
      .catch((error) => console.error("Error toggling task status:", error));
  };

  const addUserToGroup = () => {
    axios
      .put(`/api/groups/${groupId}/add-member`, { userId: selectedUserId })
      .then((response) => {
        setGroup(response.data);
        setSelectedUserId("");
      })
      .catch((error) => console.error("Error adding user to group:", error));
  };

  const calculateTaskProgress = (userId) => {
    const userTasks = dailyTasks.filter((task) => task.assignedTo === userId);
    const completedTasks = userTasks.filter((task) => task.status === true);
    if (
      completedTasks.length === userTasks.length &&
      completedTasks.length > 0
    ) {
      return "Completed";
    }
    if (completedTasks.length === 0) {
      return "Not Started";
    }
    return `${completedTasks.length}/${userTasks.length}`;
  };
  // console.log( users)
  return (
    <SharedStateContext.Provider
      value={{
        userId,
        users,
        group,
        dailyTasks,
        showModal,
        currentTask,
        selectedUserId,
        setSelectedUserId,
        setShowModal,
        setDailyTasks,
        handleSaveTask,
        handleEditTask,
        handleAddTask,
        deleteTask,
        toggleTaskStatus,
        addUserToGroup,
        calculateTaskProgress
      }}
    >
      {children}
    </SharedStateContext.Provider>
  );
};

export { SharedStateContext, SharedStateProvider };
