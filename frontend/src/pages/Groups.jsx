import React, { useContext, useState } from 'react';
import AppShell from '../components/AppShell';
import { SharedStateContext } from '../Context/SharedStateContext';

const Groups = () => {
  const { group, users, selectedUserId, setSelectedUserId, addUserToGroup, calculateTaskProgress } =
    useContext(SharedStateContext);

  return (
    <AppShell title="Group Members">
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {!group ? (
          <div className="px-5 py-8 text-center text-text-secondary text-sm">Loading group…</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider w-8">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Group</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {group.members?.map((u, idx) => (
                <tr key={u._id} className="hover:bg-surface-hover transition-colors">
                  <td className="px-4 py-3 text-text-muted">{idx + 1}</td>
                  <td className="px-4 py-3 text-text-primary font-medium">{u.username}</td>
                  <td className="px-4 py-3 text-text-secondary">{u.email}</td>
                  <td className="px-4 py-3 text-text-secondary">{group?.name ?? '—'}</td>
                  <td className="px-4 py-3 text-text-secondary">{calculateTaskProgress(u._id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add member */}
      <div className="mt-6 bg-surface border border-border rounded-xl p-5">
        <h2 className="text-sm font-semibold text-text-primary mb-4">Add User to Group</h2>
        <div className="flex items-center gap-3">
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="flex-1 bg-surface-2 border border-border rounded-lg px-3 py-2.5 text-sm
              text-text-primary focus:outline-none focus:border-accent/50 focus:ring-1
              focus:ring-accent/30 transition-colors"
          >
            <option value="">Select a user</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>{u.username}</option>
            ))}
          </select>
          <button
            onClick={addUserToGroup}
            className="px-4 py-2.5 rounded-lg text-sm font-medium bg-accent hover:bg-accent-dim text-bg transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </AppShell>
  );
};

export default Groups;
