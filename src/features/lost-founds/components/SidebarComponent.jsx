import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SidebarComponent() {
  const linkClass = ({ isActive }) =>
    `flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-4">
      <nav className="space-y-1">
        <NavLink to="/" end className={linkClass}>
          <span>Dashboard & Laporan</span>
        </NavLink>
        <NavLink to="/users" className={linkClass}>
          <span>Daftar Pengguna</span>
        </NavLink>
        <NavLink to="/profile" className={linkClass}>
          <span>Profil Saya</span>
        </NavLink>
      </nav>
    </aside>
  );
}