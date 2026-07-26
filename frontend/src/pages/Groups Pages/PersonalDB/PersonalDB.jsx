import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import AppShell from '../../../components/AppShell';
import { SharedStateContext } from '../../../Context/SharedStateContext';
import { useAuthContext } from '../../../hooks/useAuthContext';
import createAxiosInstance from '../../../axiosInstance';
import TaskActivity from '../../../components/DashboardComponents/TaskActivity';
import TaskTracking from './TaskTracking';

const PersonalDB = () => {
  const { name, punishment, description, members } = useLocation().state ?? {};
  const { dailyTasks, setDailyTasks, userId } = useContext(SharedStateContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const axiosInstance = useMemo(() => createAxiosInstance(user?.token), [user?.token]);

  useEffect(() => {
    if (!user || !userId) return;
    const init = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/api/users/${userId}/tasks`);
        setDailyTasks(res.data);
      } catch {
        setError('Could not load tasks.');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [userId]);

  const completed = dailyTasks?.filter((t) => t.status).length ?? 0;
  const total = dailyTasks?.length ?? 0;

  return (
    <AppShell title={<span><span className="text-accent">{name}</span> — Personal Dashboard</span>}>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-xl px-4 py-3">
          <p className="text-xs text-text-secondary uppercase tracking-wider">Total Tasks</p>
          <p className="text-text-primary text-2xl font-semibold mt-0.5">{total}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl px-4 py-3">
          <p className="text-xs text-text-secondary uppercase tracking-wider">Completed</p>
          <p className="text-accent text-2xl font-semibold mt-0.5">{completed}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl px-4 py-3">
          <p className="text-xs text-text-secondary uppercase tracking-wider">Punishment</p>
          <p className="text-danger text-sm font-medium mt-0.5 truncate">{punishment ?? '—'}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl px-4 py-3">
          <p className="text-xs text-text-secondary uppercase tracking-wider">Goal</p>
          <p className="text-text-primary text-sm mt-0.5 truncate">{description ?? '—'}</p>
        </div>
      </div>

      {loading && <p className="text-text-secondary text-sm text-center py-6">Loading…</p>}
      {error && <p className="text-danger text-sm text-center py-4">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task Activity sidebar */}
          <div className="lg:col-span-1">
            <TaskActivity tasks={dailyTasks} />
          </div>

          {/* Task tracking main area */}
          <div className="lg:col-span-2">
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h2 className="text-sm font-semibold text-text-primary">Task Tracking</h2>
                <p className="text-xs text-text-secondary mt-0.5">Progress chart per task</p>
              </div>
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                <TaskTracking tasks={dailyTasks} />
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
};

export default PersonalDB;
