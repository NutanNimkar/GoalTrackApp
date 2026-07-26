import React, { useState, useMemo } from 'react';
import { HiTrash, HiXMark } from 'react-icons/hi2';
import { useAuthContext } from '../../hooks/useAuthContext';
import createAxiosInstance from '../../axiosInstance';
import Modal from '../Modal';

const UserImages = ({ imageList, fetchUserImages, userId }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [enlargeUrl, setEnlargeUrl] = useState(null);
  const { user } = useAuthContext();
  const axiosInstance = useMemo(() => createAxiosInstance(user?.token), [user?.token]);

  const toggle = (id) =>
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const handleDelete = async () => {
    try {
      await Promise.all(selectedIds.map((id) => axiosInstance.delete(`/api/users/${userId}/image/${id}`)));
      setSelectedIds([]);
      setShowConfirm(false);
      fetchUserImages();
    } catch {
      alert('Failed to delete. Please try again.');
    }
  };

  if (!imageList?.length) {
    return (
      <div className="bg-surface border border-border rounded-xl px-5 py-8 text-center">
        <p className="text-text-secondary text-sm">No evidence images yet. Upload some above.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-text-primary">Evidence Images</h2>
        {selectedIds.length > 0 && (
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
              text-danger bg-danger/10 hover:bg-danger/20 border border-danger/20 transition-colors"
          >
            <HiTrash className="w-3.5 h-3.5" />
            Delete {selectedIds.length} selected
          </button>
        )}
      </div>

      <div className="p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {imageList.map((image, idx) => {
          const selected = selectedIds.includes(image.fileId);
          return (
            <div
              key={image.fileId}
              onClick={() => toggle(image.fileId)}
              onDoubleClick={() => setEnlargeUrl(image.url)}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer
                border-2 transition-colors
                ${selected ? 'border-accent' : 'border-transparent hover:border-border-strong'}
              `}
            >
              <img
                src={image.url}
                alt={`Evidence ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {selected && (
                <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                    <svg className="w-3 h-3 text-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="px-4 pb-3 text-xs text-text-muted">Click to select · Double-click to enlarge</p>

      {/* Confirm delete */}
      <Modal
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Delete Images"
        size="sm"
        footer={
          <>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 rounded-lg text-sm text-text-secondary border border-border hover:border-border-strong transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-danger hover:bg-red-500 text-white transition-colors"
            >
              Delete {selectedIds.length}
            </button>
          </>
        }
      >
        <p className="text-text-secondary text-sm">
          Are you sure you want to delete {selectedIds.length} image{selectedIds.length !== 1 ? 's' : ''}? This cannot be undone.
        </p>
      </Modal>

      {/* Enlarge */}
      <Modal
        show={!!enlargeUrl}
        onClose={() => setEnlargeUrl(null)}
        title="Image"
        size="lg"
      >
        {enlargeUrl && (
          <img src={enlargeUrl} alt="Enlarged evidence" className="w-full rounded-lg" />
        )}
      </Modal>
    </div>
  );
};

export default UserImages;
