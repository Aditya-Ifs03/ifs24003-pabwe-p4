import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { asyncAddLostFound } from '../states/lostFoundSlice';

export default function AddModal({ isOpen, onClose }) {
  const [title, onTitleChange, setTitle] = useInput('');
  const [description, onDescChange, setDesc] = useInput('');
  const [status, setStatus] = useState('lost');
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncAddLostFound({ title, description, status }));
    setTitle('');
    setDesc('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-slate-800">Tambah Laporan Baru</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600">Judul Barang</label>
            <input type="text" value={title} onChange={onTitleChange} required className="mt-1 w-full rounded border p-2 text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Tipe Laporan</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 w-full rounded border p-2 text-sm">
              <option value="lost">Kehilangan (Lost)</option>
              <option value="found">Ditemukan (Found)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Deskripsi / Lokasi Kejadian</label>
            <textarea value={description} onChange={onDescChange} rows={3} required className="mt-1 w-full rounded border p-2 text-sm" />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button type="button" onClick={onClose} className="rounded border px-4 py-2 text-xs font-semibold">
              Batal
            </button>
            <button type="submit" className="rounded bg-indigo-600 px-4 py-2 text-xs font-semibold text-white">
              Simpan Laporan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}