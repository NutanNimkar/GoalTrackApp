import React, { useContext } from 'react';
import { HiPlus } from 'react-icons/hi2';
import AppShell from '../../components/AppShell';
import GroupDropDown from '../../components/Groups Components/GroupDropDown';
import CreateGroupModal from '../../components/Groups Components/CreateGroupModal';
import { GroupsPageContext } from '../../Context/GroupsPageContext';

const GroupsPage = () => {
  const { groups, handleAddGroup, showModal, setShowModal, handleSaveGroup, currentGroup } =
    useContext(GroupsPageContext);

  const groupCount = Object.keys(groups ?? {}).length;

  const actions = (
    <button
      onClick={handleAddGroup}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
        bg-accent hover:bg-accent-dim text-bg transition-colors"
    >
      <HiPlus className="w-4 h-4" /> New Group
    </button>
  );

  return (
    <AppShell title="Groups" actions={actions}>
      {/* Stats bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-surface border border-border rounded-xl px-4 py-3">
          <p className="text-text-secondary text-xs uppercase tracking-wider">Total Groups</p>
          <p className="text-text-primary text-2xl font-semibold mt-0.5">{groupCount}</p>
        </div>
      </div>

      {/* Groups list */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text-primary">Your Groups</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Expand a group to view members, dashboards, and manage membership.
          </p>
        </div>
        <div className="p-4">
          <GroupDropDown groups={groups} />
        </div>
      </div>

      <CreateGroupModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveGroup}
        group={currentGroup}
      />
    </AppShell>
  );
};

export default GroupsPage;
