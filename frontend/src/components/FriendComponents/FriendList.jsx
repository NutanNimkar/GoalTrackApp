import React, { useEffect, useMemo } from 'react';
import { HiUserCircle, HiTrash } from 'react-icons/hi2';
import { useAuthContext } from '../../hooks/useAuthContext';
import createAxiosInstance from '../../axiosInstance';
import { useFriendRequests } from './FriendRequestContext';

const FriendsList = () => {
  const { friends, setFriends } = useFriendRequests();
  const { user } = useAuthContext();
  const axiosInstance = useMemo(() => createAxiosInstance(user?.token), [user?.token]);
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;
    axiosInstance.get(`/api/friends/${userId}`)
      .then((r) => setFriends(r.data))
      .catch(() => {});
  }, [userId]);

  const removeFriend = async (name) => {
    if (!window.confirm(`Remove ${name} from friends?`)) return;
    try {
      await axiosInstance.delete(`/api/friends/remove/${userId}/${name}`);
      setFriends(friends.filter((f) => f !== name));
    } catch {
      alert('Could not remove friend.');
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-text-primary">Friends</h2>
        <p className="text-xs text-text-secondary mt-0.5">{friends?.length ?? 0} connection{friends?.length !== 1 ? 's' : ''}</p>
      </div>

      {!friends?.length ? (
        <p className="px-5 py-8 text-sm text-text-secondary text-center">No friends yet — send a request above.</p>
      ) : (
        <ul className="divide-y divide-border">
          {friends.map((name) => (
            <li key={name} className="flex items-center gap-3 px-5 py-3 hover:bg-surface-hover transition-colors">
              <HiUserCircle className="w-8 h-8 text-text-secondary shrink-0" />
              <span className="text-sm text-text-primary flex-1">{name}</span>
              <button
                onClick={() => removeFriend(name)}
                className="p-1.5 rounded text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors"
              >
                <HiTrash className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsList;
