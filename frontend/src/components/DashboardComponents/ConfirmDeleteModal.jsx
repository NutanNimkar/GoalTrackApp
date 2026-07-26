import React, { useContext } from 'react';
import Modal from '../Modal';
import { SharedStateContext } from '../../Context/SharedStateContext';

const ConfirmDeleteModal = ({ show, handleClose, task }) => {
  const { deleteTask } = useContext(SharedStateContext);

  return (
    <Modal
      show={show}
      onClose={handleClose}
      title="Delete Task"
      size="sm"
      footer={
        <>
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg text-sm text-text-secondary border border-border hover:border-border-strong transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { deleteTask(task._id); handleClose(); }}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-danger hover:bg-red-500 text-white transition-colors"
          >
            Delete
          </button>
        </>
      }
    >
      <p className="text-text-secondary text-sm">
        Are you sure you want to delete <strong className="text-text-primary">{task?.name}</strong>? This cannot be undone.
      </p>
    </Modal>
  );
};

export default ConfirmDeleteModal;
