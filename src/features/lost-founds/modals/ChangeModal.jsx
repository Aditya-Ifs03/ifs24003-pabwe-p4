import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncUpdateLostFound } from '../states/lostFoundSlice';

export default function ChangeModal({ isOpen, onClose, data }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(data?.title || '');
  const [description, setDescription] = useState(data?.description || '');
  const [status, setStatus] = useState(data?.status || 'lost');
  const [isCompleted, setIsCompleted] = useState(Boolean(data?.is_completed));

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      asyncUpdateLostFound({
        id: data.id,
        payload: { title, description, status, is_completed: isCompleted ? 1 : 0 },
      })
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-slate-800">Ubah Data Laporan</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600">Judul Barang</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 w-full rounded border p-2 text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Tipe Laporan</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 w-full rounded border p-2 text-sm">
              <option value="lost">Kehilangan (Lost)</option>
              <option value="found">Ditemukan (Found)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Deskripsi</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} required className="mt-1 w-full rounded border p-2 text-sm" />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_completed"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              className="h-4 w-4 rounded text-indigo-600"
            />
            <label htmlFor="is_completed" className="text-xs font-semibold text-slate-700">
              Tandai sebagai selesai / telah ditemukan
            </label>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button type="button" onClick={onClose} className="rounded border px-4 py-2 text-xs font-semibold">
              Batal
            </button>
            <button type="submit" className="rounded bg-indigo-600 px-4 py-2 text-xs font-semibold text-white">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}