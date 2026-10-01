import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncUpdateLostFoundCover } from '../states/lostFoundSlice';

export default function ChangeCoverModal({ isOpen, onClose, id }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      dispatch(asyncUpdateLostFoundCover({ id, file }));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-slate-800">Unggah Bukti / Cover</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {preview && <img src={preview} alt="Pratinjau" className="h-40 w-full rounded object-cover" />}
          <input type="file" accept="image/*" onChange={handleFileChange} required className="text-xs" />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="rounded border px-4 py-2 text-xs font-semibold">
              Batal
            </button>
            <button type="submit" disabled={!file} className="rounded bg-indigo-600 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50">
              Unggah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}