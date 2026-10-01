import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthLayout() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="bg-indigo-600 px-8 py-6 text-center text-white">
          <h1 className="text-2xl font-bold tracking-tight">Delcom Lost & Founds</h1>
          <p className="mt-1 text-sm text-indigo-100">Pusat Layanan Laporan Barang Hilang & Temuan</p>
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}