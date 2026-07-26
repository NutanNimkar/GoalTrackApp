import React from 'react';
import Modal from './Modal';
import TaskForm from './TaskForm';

const TaskModal = ({ show, handleClose, handleSave, task, users }) => {
  const onSave = (data) => handleSave({ ...task, ...data });

  return (
    <Modal
      show={show}
      onClose={handleClose}
      title={task ? 'Edit Task' : 'Add Task'}
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
            form="task-form"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-accent hover:bg-accent-dim text-bg transition-colors"
          >
            Save
          </button>
        </>
      }
    >
      <TaskForm task={task} users={users} onSave={onSave} />
    </Modal>
  );
};

export default TaskModal;
