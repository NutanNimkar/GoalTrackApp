import React from 'react';
import Modal from '../Modal';
import AddMemberToGroup from './AddGroupMemberForm';

const AddGroupMemberModal = ({ selectedGroup, show, handleClose, handleSave, group }) => {
  const onSave = (data) => {
    const members = data.members ? [data.members] : [];
    handleSave(members[0]);
  };

  return (
    <Modal
      show={show}
      onClose={handleClose}
      title={`Add Member${selectedGroup ? ` to ${selectedGroup}` : ''}`}
      footer={
        <>
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary
              border border-border hover:border-border-strong transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="add-member-form"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-accent hover:bg-accent-dim text-bg transition-colors"
          >
            Add
          </button>
        </>
      }
    >
      <AddMemberToGroup group={group} onSave={onSave} />
    </Modal>
  );
};

export default AddGroupMemberModal;
