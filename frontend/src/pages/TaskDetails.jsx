import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { SharedStateContext } from '../Context/SharedStateContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { HiPencil, HiTrash, HiPlus, HiPhoto, HiCheckCircle, HiClock } from 'react-icons/hi2';
import createAxiosInstance from '../axiosInstance';
import AppShell from '../components/AppShell';
import TaskModal from '../components/TaskModal';
import UploadEvidenceModal from '../components/EvidenceComponents/UploadEvidenceModal';
import UserImages from '../components/EvidenceComponents/UserImages';

const TaskDetails = () => {
  const {
    users,
    dailyTasks,
    setDailyTasks,
    handleEditTask,
    deleteTask,
    showModal,
    currentTask,
    toggleTaskStatus,
    handleSaveTask,
    setShowModal,
    handleAddTask,
    userId,
  } = useContext(SharedStateContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastReset, setLastReset] = useState(null);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [imageList, setImageList] = useState([]);
  const { user } = useAuthContext();

  const axiosInstance = useMemo(() => createAxiosInstance(user?.token), [user?.token]);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/api/users/${userId}/tasks`);
      setDailyTasks(response.data);
      setLastReset(response.data.lastReset ?? null);
    } catch {
      setError('Could not load tasks.');
    } finally {
      setLoading(false);
    }
  }, [axiosInstance, userId, setDailyTasks]);

  const resetTaskStatus = useCallback(async () => {
    try {
      const response = await axiosInstance.put(`/api/tasks/reset-status/${userId}`);
      if (response.data.tasks?.length > 0 && response.status === 200) {
        setDailyTasks(response.data.tasks);
        setLastReset(response.data.lastReset);
      }
    } catch {
      // non-fatal
    }
  }, [axiosInstance, userId, setDailyTasks]);

  const fetchUserImages = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/api/users/${userId}/evidence`);
      if (!response.data.length) { setImageList([]); return; }
      const details = response.data.map((img) => ({ fileId: img._id, url: img.url }));
      const blobs = await Promise.all(
        details.map(({ url }) =>
          axiosInstance.get(`/api/users/evidence/${url.split('/').pop()}`, { responseType: 'blob' })
            .then((r) => URL.createObjectURL(r.data))
        )
      );
      setImageList(details.map((img, i) => ({ ...img, url: blobs[i] })));
    } catch {
      // non-fatal
    }
  }, [axiosInstance, userId]);

  const handleUploadSuccess = useCallback(() => fetchUserImages(), [fetchUserImages]);

  useEffect(() => {
    if (!user) { setError('You must be logged in'); return; }
    const init = async () => {
      await fetchTasks();
      await resetTaskStatus();
      await fetchUserImages();
    };
    init();
  }, [userId, fetchTasks, resetTaskStatus, fetchUserImages, user]);

  const completed = dailyTasks?.filter((t) => t.status).length ?? 0;
  const total = dailyTasks?.length ?? 0;

  const actions = (
    <>
      <button
        onClick={() => setShowEvidenceModal(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-text-secondary
          border border-border hover:border-border-strong hover:text-text-primary transition-colors"
      >
        <HiPhoto className="w-4 h-4" /> Upload Evidence
      </button>
      <button
        onClick={handleAddTask}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
          bg-accent hover:bg-accent-dim text-bg transition-colors"
      >
        <HiPlus className="w-4 h-4" /> Add Task
      </button>
    </>
  );

  return (
    <AppShell title="My Tasks" actions={actions}>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-xl px-4 py-3">
          <p className="text-text-secondary text-xs uppercase tracking-wider">Total</p>
          <p className="text-text-primary text-2xl font-semibold mt-0.5">{total}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl px-4 py-3">
          <p className="text-text-secondary text-xs uppercase tracking-wider">Completed</p>
          <p className="text-accent text-2xl font-semibold mt-0.5">{completed}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl px-4 py-3">
          <p className="text-text-secondary text-xs uppercase tracking-wider">Pending</p>
          <p className="text-text-primary text-2xl font-semibold mt-0.5">{total - completed}</p>
        </div>
      </div>

      {/* Task table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden mb-6">
        {loading && (
          <div className="px-5 py-8 text-center text-text-secondary text-sm">Loading…</div>
        )}
        {error && !loading && (
          <div className="px-5 py-8 text-center text-danger text-sm">{error}</div>
        )}
        {!loading && !error && (
          <>
            {total === 0 ? (
              <div className="px-5 py-12 text-center">
                <p className="text-text-secondary text-sm">No tasks yet. Hit <strong className="text-accent">Add Task</strong> to get started.</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider w-8">#</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Task</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider hidden md:table-cell">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider hidden lg:table-cell">Last Reset</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {dailyTasks.map((task, idx) => (
                    <tr key={task._id} className="hover:bg-surface-hover transition-colors">
                      <td className="px-4 py-3 text-text-muted">{idx + 1}</td>
                      <td className="px-4 py-3 text-text-primary font-medium">{task.name}</td>
                      <td className="px-4 py-3 text-text-secondary hidden md:table-cell">{task.description}</td>
                      <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">
                        {lastReset ? new Date(lastReset).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleTaskStatus(task)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                            task.status
                              ? 'bg-accent/10 text-accent hover:bg-accent/20'
                              : 'bg-surface-hover text-text-secondary hover:bg-surface-2'
                          }`}
                        >
                          {task.status ? <HiCheckCircle className="w-3.5 h-3.5" /> : <HiClock className="w-3.5 h-3.5" />}
                          {task.status ? 'Done' : 'Pending'}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleEditTask(task)}
                            className="p-1.5 rounded text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
                          >
                            <HiPencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteTask(task._id)}
                            className="p-1.5 rounded text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors"
                          >
                            <HiTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>

      {/* Evidence images */}
      <UserImages userId={userId} imageList={imageList} fetchUserImages={fetchUserImages} />

      {/* Modals */}
      <TaskModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveTask}
        task={currentTask}
        users={users}
      />
      <UploadEvidenceModal
        show={showEvidenceModal}
        handleClose={() => setShowEvidenceModal(false)}
        userId={userId}
        onUploadSuccess={handleUploadSuccess}
      />
    </AppShell>
  );
};

export default TaskDetails;
