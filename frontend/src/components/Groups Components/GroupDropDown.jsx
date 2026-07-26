import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GroupsPageContext } from '../../Context/GroupsPageContext';
import AddGroupMemberModal from './AddGroupMemberModal';
import {
  HiChevronDown,
  HiUserCircle,
  HiUserPlus,
  HiSquares2X2,
  HiUser,
} from 'react-icons/hi2';

const GroupDropDown = ({ groups }) => {
  const [expanded, setExpanded] = useState(null);
  const { addMember, handleAddMember, setShowMemberModal, showMemberModal, selectedGroup } =
    useContext(GroupsPageContext);

  if (!groups || Object.keys(groups).length === 0) {
    return (
      <p className="text-text-secondary text-sm px-2 py-4 text-center">
        No groups yet. Create one to get started.
      </p>
    );
  }

  const groupNames = Object.keys(groups).sort((a, b) => {
    const n = (s) => parseInt(s.replace(/\D/g, ''), 10) || 0;
    return n(b) - n(a);
  });

  return (
    <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-1">
      {groupNames.map((name, idx) => {
        const g = groups[name];
        const members = g?.members ?? [];
        const isOpen = expanded === idx;

        return (
          <div key={name} className="bg-surface-2 border border-border rounded-xl overflow-hidden">
            {/* Header */}
            <button
              onClick={() => setExpanded(isOpen ? null : idx)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-hover transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-text-muted">#{idx + 1}</span>
                <span className="text-sm font-medium text-text-primary">{name}</span>
                <span className="text-xs text-text-secondary bg-surface-hover px-2 py-0.5 rounded-full">
                  {members.length} member{members.length !== 1 ? 's' : ''}
                </span>
              </div>
              <HiChevronDown
                className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Body */}
            {isOpen && (
              <div className="border-t border-border px-4 py-3">
                {/* Members */}
                {members.length > 0 && (
                  <div className="flex flex-col gap-1.5 mb-4">
                    {members.map((member) => (
                      <div key={member} className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg">
                        <HiUserCircle className="w-4 h-4 text-text-secondary shrink-0" />
                        <span className="text-sm text-text-primary">{member}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Meta */}
                {(g?.description || g?.punishment) && (
                  <div className="mb-4 flex flex-col gap-1 text-xs text-text-secondary">
                    {g.description && <span><strong className="text-text-primary">Goal:</strong> {g.description}</span>}
                    {g.punishment && <span><strong className="text-text-primary">Penalty:</strong> {g.punishment}</span>}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    to={{ pathname: `/groups/${name}/groupdb` }}
                    state={{ members, name, punishment: g?.punishment, description: g?.description }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                      border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
                  >
                    <HiSquares2X2 className="w-3.5 h-3.5" /> Group Dashboard
                  </Link>
                  <Link
                    to={{ pathname: `/groups/${name}/personaldb` }}
                    state={{ members, name, punishment: g?.punishment, description: g?.description }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                      border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
                  >
                    <HiUser className="w-3.5 h-3.5" /> Personal Dashboard
                  </Link>
                  <button
                    onClick={() => handleAddMember(name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                      bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20 transition-colors"
                  >
                    <HiUserPlus className="w-3.5 h-3.5" /> Add Member
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <AddGroupMemberModal
        selectedGroup={selectedGroup}
        show={showMemberModal}
        handleClose={() => setShowMemberModal(false)}
        handleSave={(userId) => addMember(selectedGroup, userId)}
        group={groups}
      />
    </div>
  );
};

export default GroupDropDown;
