import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { asyncSetAuthLogin } from '../states/authSlice';

export default function LoginPage() {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncSetAuthLogin({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-semibold uppercase text-slate-600">Email / Akun</label>
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
          placeholder="••••••••"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
      >
        {isLoading ? 'Memproses...' : 'Masuk ke Akun'}
      </button>

      <p className="text-center text-xs text-slate-500">
        Belum memiliki akun?{' '}
        <Link to="/auth/register" className="font-semibold text-indigo-600 hover:underline">
          Daftar Sekarang
        </Link>
      </p>
    </form>
  );
}