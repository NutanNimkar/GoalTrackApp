import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SharedStateContext } from '../../Context/SharedStateContext';

const inputClass = `w-full bg-surface-2 border border-border rounded-lg px-3 py-2.5
  text-sm text-text-primary placeholder:text-text-muted
  focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors`;
const labelClass = 'block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5';

const CreateGroupForm = ({ group, onSave }) => {
  const { users } = useContext(SharedStateContext);
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: { name: '', description: '', punishment: '', members: '' },
  });

  useEffect(() => {
    if (group) {
      setValue('name', group.name);
      setValue('description', group.description);
      setValue('members', group.members);
      setValue('punishment', group.punishment);
    } else {
      reset({ name: '', description: '', members: '', punishment: '' });
    }
  }, [group, setValue, reset]);

  return (
    <form id="create-group-form" onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4">
      <div>
        <label className={labelClass}>Group Name</label>
        <input type="text" placeholder="Enter a name" className={inputClass} {...register('name', { required: true })} />
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <input type="text" placeholder="What's this group about?" className={inputClass} {...register('description', { required: true })} />
      </div>
      <div>
        <label className={labelClass}>Punishment</label>
        <input type="text" placeholder="Penalty for missed tasks" className={inputClass} {...register('punishment', { required: true })} />
      </div>
      <div>
        <label className={labelClass}>First Member</label>
        <select className={inputClass} {...register('members', { required: true })}>
          <option value="">Select a member</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>{u.username}</option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default CreateGroupForm;
