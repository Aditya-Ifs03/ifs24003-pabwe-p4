import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { asyncSetAuthRegister } from '../states/authSlice';

export default function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [username, onUsernameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(asyncSetAuthRegister({ name, username, email, password }));
    if (!result.error) {
      navigate('/auth/login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase text-slate-600">Nama Lengkap</label>
        <input
          type="text"
          value={name}
          onChange={onNameChange}
          required
          placeholder="Nama Anda"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase text-slate-600">Username</label>
        <input
          type="text"
          value={username}
          onChange={onUsernameChange}
          required
          placeholder="username"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase text-slate-600">Email</label>
        <input
          type="email"
          value={email}
          onChange={onEmailChange}
          required
          placeholder="nama@delcom.org"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase text-slate-600">Kata Sandi</label>
        <input
          type="password"
          value={password}
          onChange={onPasswordChange}
          required
          placeholder="Minimal 6 karakter"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
      >
        {isLoading ? 'Mendaftarkan...' : 'Daftar Akun'}
      </button>

      <p className="text-center text-xs text-slate-500">
        Sudah memiliki akun?{' '}
        <Link to="/auth/login" className="font-semibold text-indigo-600 hover:underline">
          Masuk di Sini
        </Link>
      </p>
    </form>
  );
}