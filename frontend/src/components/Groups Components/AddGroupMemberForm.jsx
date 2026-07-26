import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SharedStateContext } from '../../Context/SharedStateContext';

const inputClass = `w-full bg-surface-2 border border-border rounded-lg px-3 py-2.5
  text-sm text-text-primary
  focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors`;
const labelClass = 'block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5';

const AddMemberToGroup = ({ group, onSave }) => {
  const { users } = useContext(SharedStateContext);
  const { register, handleSubmit, setValue, reset } = useForm({ defaultValues: { members: '' } });

  useEffect(() => {
    if (group) {
      setValue('members', group.members);
    } else {
      reset({ members: '' });
    }
  }, [group, setValue, reset]);

  return (
    <form id="add-member-form" onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4">
      <div>
        <label className={labelClass}>Select Member</label>
        <select className={inputClass} {...register('members', { required: true })}>
          <option value="">Choose a user</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>{u.username}</option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default AddMemberToGroup;
