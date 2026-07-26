import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../hooks/useAuthContext';
import createAxiosInstance from '../../axiosInstance';
import Modal from '../Modal';

const inputClass = `w-full bg-surface-2 border border-border rounded-lg px-3 py-2.5
  text-sm text-text-primary placeholder:text-text-muted
  focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors`;
const labelClass = 'block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5';

function UploadEvidenceModal({ show, handleClose, userId, onUploadSuccess }) {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const { user } = useAuthContext();
  const axiosInstance = useMemo(() => createAxiosInstance(user?.token), [user?.token]);

  const onSubmit = async (data) => {
    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('description', data.description);
    try {
      await axiosInstance.post(`/api/users/${userId}/uploadEvidence`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      reset();
      handleClose();
      onUploadSuccess();
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal
      show={show}
      onClose={handleClose}
      title="Upload Evidence"
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
            form="upload-evidence-form"
            disabled={uploading}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-accent hover:bg-accent-dim text-bg
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
        </>
      }
    >
      <form id="upload-evidence-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>File</label>
          <input
            type="file"
            accept="image/*"
            className={`${inputClass} file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0
              file:text-xs file:font-medium file:bg-surface-hover file:text-text-secondary
              hover:file:bg-surface-2 cursor-pointer`}
            {...register('image', { required: true })}
          />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <input
            type="text"
            placeholder="Optional description"
            className={inputClass}
            {...register('description')}
          />
        </div>
        {error && (
          <p className="text-danger text-sm bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
      </form>
    </Modal>
  );
}

export default UploadEvidenceModal;
