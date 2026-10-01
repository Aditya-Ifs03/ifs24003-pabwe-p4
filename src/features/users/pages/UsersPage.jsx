import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetUsers } from '../states/userSlice';

export default function UsersPage() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(asyncGetUsers());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Daftar Pengguna</h1>
        <p className="text-sm text-slate-500">Semua anggota terdaftar di ekosistem Delcom</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {users.map((u) => (
          <div key={u.id} className="flex items-center space-x-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <img
              src={u.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || 'User')}`}
              alt={u.name}
              className="h-12 w-12 rounded-full object-cover border border-slate-100"
            />
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-slate-800">{u.name}</h3>
              <p className="truncate text-xs text-slate-500">@{u.username}</p>
              <p className="truncate text-xs text-indigo-600">{u.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}