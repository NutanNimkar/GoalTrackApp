import React, { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import createAxiosInstance from "../axiosInstance";
const SharedStateContext = createContext();

const SharedStateProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState(null);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const { user } = useAuthContext();
  const userId = user?.id;
  const groupId = "6656350aa68a902e3fdf9675";

  const axiosInstance = createAxiosInstance(user?.token);
  useEffect(() => {
    if (user) {
      fetchGroupAndTasks();
    }
  }, [user]);

  const fetchGroupAndTasks = () => {
    if (!user) return;
    axiosInstance
      .get(`/api/groups/${groupId}/members`)
      .then((response) => setGroup(response.data))
      .catch((error) => console.error("Error fetching group:", error));

    axiosInstance
      .get("/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));

    axiosInstance
      .get(`/api/users/${userId}/tasks`)
      .then((response) => setDailyTasks(response.data.tasks))
      .catch((error) => console.error("Error fetching daily tasks:", error));
  };

  const handleSaveTask = (task) => {
    if (!user) return;
    if (task._id) {
      axiosInstance
        .put(`/api/tasks/${task._id}`, task)
        .then((response) => {
          setDailyTasks((prevDailyTasks) =>
            prevDailyTasks.map((t) => (t._id === task._id ? response.data : t))
          );
          setShowModal(false);
          axiosInstance
            .get(`/api/users/${userId}/tasks`)
            .then((response) => setDailyTasks(response.data.tasks))
            .catch((error) =>
              console.error("Error fetching updated tasks:", error)
            );
        })
        .catch((error) => console.error("Error updating task:", error));
    } else {
      axiosInstance
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
    if (!user) return;
    axiosInstance
      .delete(`/api/tasks/${taskId}`)
      .then(() => {
        setDailyTasks((prevDailyTasks) =>
          prevDailyTasks.filter((task) => task._id !== taskId)
        );
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const toggleTaskStatus = (task) => {
    if (!user) return;
    const updatedStatus = !task.status;
    axiosInstance
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
    if (!user) return;
    axiosInstance
      .put(`/api/groups/${groupId}/add-member`, { userId: selectedUserId })
      .then((response) => {
        setGroup(response.data);
        setSelectedUserId("");
      })
      .catch((error) => console.error("Error adding user to group:", error));
  };

  const calculateTaskProgress = (userId) => {
    if (!user) return;
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
        calculateTaskProgress,
      }}
    >
      {children}
    </SharedStateContext.Provider>
  );
};

export { SharedStateContext, SharedStateProvider };
