import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiPlus, HiSquares2X2 } from 'react-icons/hi2';
import { SharedStateContext } from '../../Context/SharedStateContext';
import TaskCard from './TaskCard';
import TaskModal from '../TaskModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const TaskActivity = ({ tasks }) => {
  const {
    handleAddTask, showModal, setShowModal,
    currentTask, handleSaveTask,
    showDeleteModal, setShowDeleteModal, selectedTask,
  } = useContext(SharedStateContext);

  const { name, punishment, description, members } = useLocation().state ?? {};

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-text-primary">Task Activity</h2>
        <p className="text-xs text-text-secondary mt-0.5">Your daily tasks for this group session.</p>
      </div>

      {/* Group Dashboard link */}
      <div className="px-4 pt-4">
        <Link
          to={{ pathname: `/groups/${name}/groupdb` }}
          state={{ name, description, punishment, members }}
          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm
            border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors w-full"
        >
          <HiSquares2X2 className="w-4 h-4" />
          Group Dashboard
        </Link>
      </div>

      {/* Task list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2">
        {tasks?.length ? (
          tasks.map((task, i) => <TaskCard key={i} task={task} />)
        ) : (
          <p className="text-text-secondary text-sm text-center py-6">No tasks yet.</p>
        )}
      </div>

      {/* Add task */}
      <div className="px-4 pb-4 border-t border-border pt-3">
        <button
          onClick={handleAddTask}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium
            bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20 transition-colors"
        >
          <HiPlus className="w-4 h-4" /> Add Task
        </button>
      </div>

      <TaskModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        task={currentTask}
        handleSave={handleSaveTask}
      />
      {showDeleteModal && selectedTask && (
        <ConfirmDeleteModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default TaskActivity;
