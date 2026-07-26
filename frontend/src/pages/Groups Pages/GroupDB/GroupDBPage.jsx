import React from 'react';
import { useLocation } from 'react-router-dom';
import AppShell from '../../../components/AppShell';
import GroupProgress from './components/GroupProgress';

const GroupDBPage = () => {
  const { name, punishment, description, members } = useLocation().state ?? {};

  return (
    <AppShell title={<span><span className="text-accent">{name}</span> — Group Dashboard</span>}>
      {/* Contract info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Group</p>
          <p className="text-text-primary font-semibold">{name ?? '—'}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Punishment</p>
          <p className="text-danger font-semibold">{punishment ?? '—'}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Goal</p>
          <p className="text-text-primary">{description ?? '—'}</p>
        </div>
      </div>

      {/* Leaderboard placeholder row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Most Days Completed', member: members?.[0] ?? '—', value: 56, color: 'text-accent' },
          { label: 'Most Days Missed',    member: members?.[0] ?? '—', value: 6,  color: 'text-danger' },
          { label: 'Top Streak',          member: members?.[0] ?? '—', value: 56, color: 'text-text-primary' },
        ].map(({ label, member, value, color }) => (
          <div key={label} className="bg-surface border border-border rounded-xl p-4 text-center">
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">{label}</p>
            <p className="text-text-secondary text-xs mb-1">{member}</p>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-text-muted text-xs mt-1">days</p>
          </div>
        ))}
      </div>

      {/* Member progress */}
      <GroupProgress
        name={name}
        members={members ?? []}
        description={description}
        punishment={punishment}
      />
    </AppShell>
  );
};

export default GroupDBPage;
