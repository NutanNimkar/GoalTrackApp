import React, { useState, useMemo } from 'react';
import { HiMagnifyingGlass, HiPaperAirplane } from 'react-icons/hi2';
import { useAuthContext } from '../../hooks/useAuthContext';
import createAxiosInstance from '../../axiosInstance';
import { useFriendRequests } from './FriendRequestContext';

const FriendSearch = () => {
  const [receiver, setReceiver] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuthContext();
  const axiosInstance = useMemo(() => createAxiosInstance(user?.token), [user?.token]);
  const { sentFriendRequests, setSentFriendRequests } = useFriendRequests();

  const handleSend = async () => {
    if (!receiver.trim()) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axiosInstance.post(`/api/friends/send-req/${user?.id}`, { friendIdentifier: receiver });
      setSentFriendRequests([...sentFriendRequests, receiver]);
      setSuccess(`Request sent to ${receiver}`);
      setReceiver('');
    } catch {
      setError('Could not send request. Check the username and try again.');
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => { if (e.key === 'Enter') handleSend(); };

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-1">
        <HiMagnifyingGlass className="w-4 h-4 text-text-secondary" />
        <h2 className="text-sm font-semibold text-text-primary">Add Friend</h2>
      </div>
      <p className="text-xs text-text-secondary mb-4">Enter a username to send a friend request.</p>

      <div className="flex gap-2">
        <input
          type="text"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          onKeyDown={onKey}
          placeholder="Username"
          className="flex-1 bg-surface-2 border border-border rounded-lg px-3 py-2.5 text-sm
            text-text-primary placeholder:text-text-muted
            focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={loading || !receiver.trim()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium
            bg-accent hover:bg-accent-dim text-bg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <HiPaperAirplane className="w-4 h-4" />
          {loading ? 'Sending…' : 'Send'}
        </button>
      </div>

      {success && <p className="mt-2 text-xs text-accent">{success}</p>}
      {error && <p className="mt-2 text-xs text-danger">{error}</p>}
    </div>
  );
};

export default FriendSearch;
