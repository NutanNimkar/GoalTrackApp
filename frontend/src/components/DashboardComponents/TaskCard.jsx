import React, { useContext } from 'react';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import { SharedStateContext } from '../../Context/SharedStateContext';

const TaskCard = ({ task }) => {
  const { handleEditTask, confirmDeleteModal } = useContext(SharedStateContext);

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-surface-2 border border-border rounded-xl hover:bg-surface-hover transition-colors">
      <div className={`w-2 h-2 rounded-full shrink-0 ${task.status ? 'bg-accent' : 'bg-text-muted'}`} />
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${task.status ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
          {task.name}
        </p>
        {task.description && (
          <p className="text-xs text-text-secondary truncate mt-0.5">{task.description}</p>
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => handleEditTask(task)}
          className="p-1.5 rounded text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
        >
          <HiPencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => confirmDeleteModal(task)}
          className="p-1.5 rounded text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors"
        >
          <HiTrash className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
