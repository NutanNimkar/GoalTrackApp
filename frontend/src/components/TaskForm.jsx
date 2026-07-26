import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../hooks/useAuthContext';

const inputClass = `w-full bg-surface-2 border border-border rounded-lg px-3 py-2.5
  text-sm text-text-primary placeholder:text-text-muted
  focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors`;

const labelClass = 'block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5';

const TaskForm = ({ task, users, onSave }) => {
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: { name: '', description: '', dueDate: '', assignedTo: '' },
  });
  const { user } = useAuthContext();
  const userId = user?.id;

  useEffect(() => {
    if (task) {
      setValue('name', task.name);
      setValue('description', task.description);
      setValue('dueDate', task.dueDate);
      setValue('assignedTo', task.assignedTo);
    } else {
      reset({ name: '', description: '', dueDate: '', assignedTo: userId });
    }
  }, [task, setValue, reset, userId]);

  const onSubmit = (data) => {
    data.assignedTo = userId;
    onSave(data);
  };

  return (
    <form id="task-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label className={labelClass}>Task Name</label>
        <input
          type="text"
          placeholder="Enter task name"
          className={inputClass}
          {...register('name', { required: true })}
        />
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <input
          type="text"
          placeholder="Enter description"
          className={inputClass}
          {...register('description')}
        />
      </div>
      <div>
        <label className={labelClass}>Due Date</label>
        <input
          type="datetime-local"
          className={inputClass}
          {...register('dueDate')}
        />
      </div>
    </form>
  );
};

export default TaskForm;
