import React from 'react';
import Modal from '../Modal';
import CreateGroupForm from './CreateGroupForm';

const CreateGroupModal = ({ show, handleClose, handleSave, group }) => {
  const onSave = (data) => {
    handleSave({ ...group, ...data, members: data.members ? [data.members] : [] });
  };

  return (
    <Modal
      show={show}
      onClose={handleClose}
      title="Create Group"
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
            form="create-group-form"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-accent hover:bg-accent-dim text-bg transition-colors"
          >
            Create
          </button>
        </>
      }
    >
      <CreateGroupForm group={group} onSave={onSave} />
    </Modal>
  );
};

export default CreateGroupModal;
