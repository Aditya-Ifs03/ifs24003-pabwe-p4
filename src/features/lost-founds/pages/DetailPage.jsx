import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetLostFoundById, asyncDeleteLostFound, clearDetail } from '../states/lostFoundSlice';
import ChangeModal from '../modals/ChangeModal';
import ChangeCoverModal from '../modals/ChangeCoverModal';
import { showConfirmDialog, formatDate } from '../../../helpers/toolsHelper';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lostFound } = useSelector((state) => state.lostFounds);
  const { profile } = useSelector((state) => state.users);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCoverOpen, setIsCoverOpen] = useState(false);

  useEffect(() => {
    dispatch(asyncGetLostFoundById(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  if (!lostFound) {
    return <p className="text-center text-sm text-slate-500 py-10">Memuat rincian laporan...</p>;
  }

  const isOwner = profile?.id === lostFound.author_id || profile?.id === lostFound.author?.id;

  const handleDelete = async () => {
    const ok = await showConfirmDialog('Yakin ingin menghapus laporan ini?');
    if (ok) {
      await dispatch(asyncDeleteLostFound(id));
      navigate('/');
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <button onClick={() => navigate(-1)} className="text-xs font-semibold text-indigo-600 hover:underline">
        &larr; Kembali ke Daftar
      </button>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="relative aspect-video w-full bg-slate-100">
          <img
            src={lostFound.cover_url || 'https://placehold.co/800x450/e2e8f0/475569?text=Tidak+Ada+Foto+Cover'}
            alt={lostFound.title}
            className="h-full w-full object-cover"
          />
          {isOwner && (
            <button
              onClick={() => setIsCoverOpen(true)}
              className="absolute bottom-4 right-4 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-black"
            >
              Ganti Cover
            </button>
          )}
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4">
            <div className="flex items-center space-x-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase text-white ${
                  lostFound.status === 'lost' ? 'bg-red-600' : 'bg-emerald-600'
                }`}
              >
                {lostFound.status === 'lost' ? 'Hilang' : 'Ditemukan'}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  lostFound.is_completed ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                }`}
              >
                {lostFound.is_completed ? 'Selesai' : 'Belum Selesai'}
              </span>
            </div>
            <span className="text-xs text-slate-400">Dilaporkan pada {formatDate(lostFound.created_at)}</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">{lostFound.title}</h1>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-700">{lostFound.description}</p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Informasi Pelapor</h4>
            <div className="mt-2 flex items-center space-x-3">
              <img
                src={lostFound.author?.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(lostFound.author?.name || 'User')}`}
                alt={lostFound.author?.name}
                className="h-10 w-10 rounded-full border"
              />
              <div>
                <p className="text-sm font-semibold text-slate-800">{lostFound.author?.name || 'Anonim'}</p>
                <p className="text-xs text-slate-500">@{lostFound.author?.username || '-'}</p>
              </div>
            </div>
          </div>

          {isOwner && (
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => setIsEditOpen(true)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Edit Informasi
              </button>
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
              >
                Hapus Laporan
              </button>
            </div>
          )}
        </div>
      </div>

      <ChangeModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} data={lostFound} />
      <ChangeCoverModal isOpen={isCoverOpen} onClose={() => setIsCoverOpen(false)} id={lostFound.id} />
    </div>
  );
}