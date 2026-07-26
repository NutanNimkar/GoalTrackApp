import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { SharedStateContext } from '../Context/SharedStateContext';
import { useAuthContext } from '../hooks/useAuthContext';
import {
  HiCheckCircle,
  HiClock,
  HiUserGroup,
  HiChevronRight,
} from 'react-icons/hi2';

const StatCard = ({ label, value, icon: Icon, accent }) => (
  <div className="bg-surface border border-border rounded-xl p-5 flex items-center gap-4">
    <div className={`p-2.5 rounded-lg ${accent}`}>
      <Icon className="w-5 h-5 text-bg" />
    </div>
    <div>
      <p className="text-text-secondary text-xs uppercase tracking-wider">{label}</p>
      <p className="text-text-primary text-2xl font-semibold mt-0.5">{value}</p>
    </div>
  </div>
);

const Home = () => {
  const { dailyTasks } = useContext(SharedStateContext);
  const { user } = useAuthContext();

  const total = dailyTasks?.length ?? 0;
  const completed = dailyTasks?.filter((t) => t.status).length ?? 0;
  const pending = total - completed;

  const recentTasks = dailyTasks?.slice(0, 5) ?? [];

  return (
    <AppShell title={`Good to see you${user?.email ? `, ${user.email.split('@')[0]}` : ''}`}>
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Tasks" value={total} icon={HiCheckCircle} accent="bg-accent" />
        <StatCard label="Completed" value={completed} icon={HiCheckCircle} accent="bg-accent-dim" />
        <StatCard label="Pending" value={pending} icon={HiClock} accent="bg-surface-hover" />
      </div>

      {/* Recent tasks */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden mb-6">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text-primary">Today's Tasks</h2>
          <Link
            to="/task"
            className="text-xs text-accent hover:text-accent-dim flex items-center gap-1 transition-colors"
          >
            View all <HiChevronRight className="w-3 h-3" />
          </Link>
        </div>
        {recentTasks.length === 0 ? (
          <div className="px-5 py-8 text-center text-text-secondary text-sm">
            No tasks yet.{' '}
            <Link to="/task" className="text-accent hover:text-accent-dim transition-colors">
              Add your first task →
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {recentTasks.map((task) => (
              <li key={task._id} className="flex items-center gap-3 px-5 py-3">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${task.status ? 'bg-accent' : 'bg-text-muted'}`}
                />
                <span className={`text-sm flex-1 ${task.status ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                  {task.name}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    task.status
                      ? 'bg-accent/10 text-accent'
                      : 'bg-surface-hover text-text-secondary'
                  }`}
                >
                  {task.status ? 'Done' : 'Pending'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/groups"
          className="bg-surface border border-border rounded-xl p-5 flex items-center gap-4
            hover:border-accent/30 hover:bg-surface-2 transition-colors group"
        >
          <div className="p-2.5 rounded-lg bg-surface-hover group-hover:bg-accent/10 transition-colors">
            <HiUserGroup className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" />
          </div>
          <div>
            <p className="text-text-primary text-sm font-medium">Groups</p>
            <p className="text-text-secondary text-xs mt-0.5">Manage your accountability groups</p>
          </div>
          <HiChevronRight className="w-4 h-4 text-text-muted ml-auto group-hover:text-accent transition-colors" />
        </Link>
        <Link
          to="/task"
          className="bg-surface border border-border rounded-xl p-5 flex items-center gap-4
            hover:border-accent/30 hover:bg-surface-2 transition-colors group"
        >
          <div className="p-2.5 rounded-lg bg-surface-hover group-hover:bg-accent/10 transition-colors">
            <HiCheckCircle className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" />
          </div>
          <div>
            <p className="text-text-primary text-sm font-medium">Tasks</p>
            <p className="text-text-secondary text-xs mt-0.5">Track your daily progress</p>
          </div>
          <HiChevronRight className="w-4 h-4 text-text-muted ml-auto group-hover:text-accent transition-colors" />
        </Link>
      </div>
    </AppShell>
  );
};

export default Home;
