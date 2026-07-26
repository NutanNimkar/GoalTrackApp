import React, { useState, useEffect, useMemo } from 'react';
import { HiUserCircle, HiCheck, HiXMark, HiTrash } from 'react-icons/hi2';
import { useAuthContext } from '../../hooks/useAuthContext';
import createAxiosInstance from '../../axiosInstance';
import { useFriendRequests } from './FriendRequestContext';

const FriendRequestList = () => {
  const [received, setReceived] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('received');
  const { friends, setFriends, sentFriendRequests, setSentFriendRequests } = useFriendRequests();
  const { user } = useAuthContext();
  const axiosInstance = useMemo(() => createAxiosInstance(user?.token), [user?.token]);
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    Promise.all([
      axiosInstance.get(`/api/friends/friend-requests/${userId}`),
      axiosInstance.get(`/api/friends/sentfriend-requests/${userId}`),
    ])
      .then(([recv, sent]) => {
        setReceived(recv.data);
        setSentFriendRequests(sent.data);
      })
      .catch(() => setError('Could not load requests.'))
      .finally(() => setLoading(false));
  }, [userId]);

  const accept = async (name) => {
    try {
      await axiosInstance.post(`/api/friends/accept-req/${userId}`, { friendIdentifier: name });
      setReceived(received.filter((r) => r !== name));
      setFriends([...friends, name]);
    } catch { setError('Could not accept request.'); }
  };

  const decline = async (name) => {
    try {
      await axiosInstance.delete(`/api/friends/decline-req/${userId}/${name}`);
      setReceived(received.filter((r) => r !== name));
    } catch { setError('Could not decline request.'); }
  };

  const removeSent = async (name) => {
    try {
      await axiosInstance.delete(`/api/friends/request/remove/${userId}/${name}`);
      setSentFriendRequests(sentFriendRequests.filter((r) => r !== name));
    } catch { setError('Could not remove request.'); }
  };

  const TabBtn = ({ id, label, count }) => (
    <button
      onClick={() => setTab(id)}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        tab === id
          ? 'bg-accent/10 text-accent border border-accent/20'
          : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-transparent'
      }`}
    >
      {label}
      {count > 0 && (
        <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${tab === id ? 'bg-accent text-bg' : 'bg-surface-hover text-text-secondary'}`}>
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <TabBtn id="received" label="Received" count={received.length} />
        <TabBtn id="sent" label="Sent" count={sentFriendRequests?.length ?? 0} />
      </div>

      {loading && <p className="px-5 py-6 text-sm text-text-secondary text-center">Loading…</p>}
      {error && <p className="px-5 py-2 text-xs text-danger">{error}</p>}

      {!loading && tab === 'received' && (
        <>
          {received.length === 0 ? (
            <p className="px-5 py-8 text-sm text-text-secondary text-center">No pending requests.</p>
          ) : (
            <ul className="divide-y divide-border">
              {received.map((name) => (
                <li key={name} className="flex items-center gap-3 px-5 py-3 hover:bg-surface-hover transition-colors">
                  <HiUserCircle className="w-8 h-8 text-text-secondary shrink-0" />
                  <span className="text-sm text-text-primary flex-1">{name}</span>
                  <button
                    onClick={() => accept(name)}
                    className="p-1.5 rounded text-text-secondary hover:text-accent hover:bg-accent/10 transition-colors"
                    title="Accept"
                  >
                    <HiCheck className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => decline(name)}
                    className="p-1.5 rounded text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors"
                    title="Decline"
                  >
                    <HiXMark className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {!loading && tab === 'sent' && (
        <>
          {!sentFriendRequests?.length ? (
            <p className="px-5 py-8 text-sm text-text-secondary text-center">No sent requests.</p>
          ) : (
            <ul className="divide-y divide-border">
              {sentFriendRequests.map((name) => (
                <li key={name} className="flex items-center gap-3 px-5 py-3 hover:bg-surface-hover transition-colors">
                  <HiUserCircle className="w-8 h-8 text-text-secondary shrink-0" />
                  <span className="text-sm text-text-primary flex-1">{name}</span>
                  <span className="text-xs text-text-muted mr-2">Pending</span>
                  <button
                    onClick={() => removeSent(name)}
                    className="p-1.5 rounded text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors"
                    title="Cancel request"
                  >
                    <HiTrash className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default FriendRequestList;
