import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { asyncUpdateMyProfile, asyncUpdateMyPhoto, asyncUpdateMyPassword } from '../states/userSlice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.users);

  const [name, onNameChange] = useInput(profile?.name || '');
  const [username, onUsernameChange] = useInput(profile?.username || '');
  const [oldPassword, onOldPasswordChange] = useInput('');
  const [newPassword, onNewPasswordChange] = useInput('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncUpdateMyProfile({ name, username }));
  };

  const handlePhotoUpload = (e) => {
    e.preventDefault();
    if (selectedPhoto) {
      dispatch(asyncUpdateMyPhoto(selectedPhoto));
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncUpdateMyPassword({ old_password: oldPassword, new_password: newPassword }));
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Profil</h1>
        <p className="text-sm text-slate-500">Perbarui data profil, foto identitas, dan keamanan akun Anda</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Form Biodata & Foto */}
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Foto Profil</h2>
            <div className="flex items-center space-x-4">
              <img
                src={profile?.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || 'User')}`}
                alt="Avatar"
                className="h-16 w-16 rounded-full object-cover border"
              />
              <div className="space-y-2">
                <input type="file" accept="image/*" onChange={(e) => setSelectedPhoto(e.target.files[0])} className="text-xs" />
                <button
                  onClick={handlePhotoUpload}
                  disabled={!selectedPhoto}
                  className="block rounded bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  Unggah Foto
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Informasi Akun</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600">Nama</label>
                <input type="text" value={name} onChange={onNameChange} required className="mt-1 w-full rounded border p-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Username</label>
                <input type="text" value={username} onChange={onUsernameChange} required className="mt-1 w-full rounded border p-2 text-sm" />
              </div>
              <button type="submit" className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                Simpan Perubahan
              </button>
            </form>
          </div>
        </div>

        {/* Form Kata Sandi */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Ganti Kata Sandi</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600">Kata Sandi Lama</label>
              <input type="password" value={oldPassword} onChange={onOldPasswordChange} required className="mt-1 w-full rounded border p-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Kata Sandi Baru</label>
              <input type="password" value={newPassword} onChange={onNewPasswordChange} required className="mt-1 w-full rounded border p-2 text-sm" />
            </div>
            <button type="submit" className="rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900">
              Ubah Sandi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}