import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncSetAuthLogout } from '../../auth/states/authSlice';

export default function NavbarComponent() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.users);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-6">
      <Link to="/" className="flex items-center space-x-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-base font-bold text-white">LF</span>
        <span className="font-bold text-slate-800">Delcom Lost & Founds</span>
      </Link>

      <div className="flex items-center space-x-4">
        <Link to="/profile" className="flex items-center space-x-2 text-sm text-slate-700 hover:text-indigo-600">
          <img
            src={profile?.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || 'User')}`}
            alt="Profil"
            className="h-8 w-8 rounded-full border border-slate-200 object-cover"
          />
          <span className="hidden font-medium sm:inline">{profile?.name}</span>
        </Link>
        <button
          onClick={() => dispatch(asyncSetAuthLogout())}
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
        >
          Keluar
        </button>
      </div>
    </header>
  );
}