import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncGetLostFounds, asyncGetStats } from '../states/lostFoundSlice';
import AddModal from '../modals/AddModal';
import { formatDate } from '../../../helpers/toolsHelper';

export default function HomePage() {
  const dispatch = useDispatch();
  const { lostFounds } = useSelector((state) => state.lostFounds);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    dispatch(asyncGetLostFounds({ status: statusFilter || undefined }));
    dispatch(asyncGetStats());
  }, [dispatch, statusFilter]);

  const filteredItems = lostFounds.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase())
  );

  const totalLost = lostFounds.filter((i) => i.status === 'lost').length;
  const totalFound = lostFounds.filter((i) => i.status === 'found').length;
  const totalDone = lostFounds.filter((i) => Boolean(i.is_completed)).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Laporan Lost & Founds</h1>
          <p className="text-sm text-slate-500">Daftar pencarian dan penemuan barang di lingkungan Delcom</p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-indigo-700"
        >
          + Tambah Laporan
        </button>
      </div>

      {/* Ringkasan Metrik */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <p className="text-xs font-semibold text-slate-500">Total Laporan</p>
          <p className="text-2xl font-bold text-slate-800">{lostFounds.length}</p>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
          <p className="text-xs font-semibold text-red-600">Barang Hilang</p>
          <p className="text-2xl font-bold text-red-700">{totalLost}</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
          <p className="text-xs font-semibold text-emerald-600">Ditemukan</p>
          <p className="text-2xl font-bold text-emerald-700">{totalFound}</p>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
          <p className="text-xs font-semibold text-blue-600">Selesai</p>
          <p className="text-2xl font-bold text-blue-700">{totalDone}</p>
        </div>
      </div>

      {/* Kontrol Pencarian & Filter */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Cari nama barang atau lokasi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => setStatusFilter('')}
            className={`rounded-lg px-3 py-2 text-xs font-semibold ${!statusFilter ? 'bg-indigo-600 text-white' : 'border bg-white text-slate-600'}`}
          >
            Semua
          </button>
          <button
            onClick={() => setStatusFilter('lost')}
            className={`rounded-lg px-3 py-2 text-xs font-semibold ${statusFilter === 'lost' ? 'bg-red-600 text-white' : 'border bg-white text-slate-600'}`}
          >
            Hilang
          </button>
          <button
            onClick={() => setStatusFilter('found')}
            className={`rounded-lg px-3 py-2 text-xs font-semibold ${statusFilter === 'found' ? 'bg-emerald-600 text-white' : 'border bg-white text-slate-600'}`}
          >
            Ditemukan
          </button>
        </div>
      </div>

      {/* Grid Laporan Barang */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Link
            key={item.id}
            to={`/lost-founds/${item.id}`}
            className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative h-44 w-full bg-slate-100">
              <img
                src={item.cover_url || 'https://placehold.co/600x400/e2e8f0/475569?text=No+Cover'}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <span
                className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white ${
                  item.status === 'lost' ? 'bg-red-600' : 'bg-emerald-600'
                }`}
              >
                {item.status === 'lost' ? 'Hilang' : 'Ditemukan'}
              </span>
              {Boolean(item.is_completed) && (
                <span className="absolute top-3 right-3 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Selesai
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="line-clamp-1 font-semibold text-slate-800">{item.title}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-slate-500">{item.description}</p>
              <div className="mt-auto pt-4 flex items-center justify-between text-[11px] text-slate-400">
                <span>Oleh: {item.author?.name || 'Anonim'}</span>
                <span>{formatDate(item.created_at)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <AddModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
}