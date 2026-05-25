import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi } from '../api/authApi';
import Toast from '../components/Toast';
import logo from '../assets/logo.svg';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', first_name: '', last_name: '', password: '', confirm_password: '' });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email wajib diisi';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Format email tidak valid';
    if (!form.first_name) errs.first_name = 'Nama depan wajib diisi';
    if (!form.last_name) errs.last_name = 'Nama belakang wajib diisi';
    if (!form.password) errs.password = 'Password wajib diisi';
    else if (form.password.length < 8) errs.password = 'Password minimal 8 karakter';
    if (!form.confirm_password) errs.confirm_password = 'Konfirmasi password wajib diisi';
    else if (form.password !== form.confirm_password) errs.confirm_password = 'Password tidak cocok';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await registerApi({ email: form.email, first_name: form.first_name, last_name: form.last_name, password: form.password });
      setToast({ message: 'Registrasi berhasil! Silakan login.', type: 'success' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Registrasi gagal', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <img src={logo} alt="SIMS PPOB" className="auth-logo" />
          <span>SIMS PPOB</span>
        </div>
        <h2 className="auth-tagline">Lengkapi data diri untuk membuat akun</h2>
      </div>
      <div className="auth-right">
        <h2 className="auth-title">Lengkapi Data Diri</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <div className={'input-wrapper' + (errors.email ? ' input-error' : '')}>
              <span className="input-icon">✉</span>
              <input name="email" type="email" placeholder="masukan email anda" value={form.email} onChange={handleChange} />
            </div>
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>
          <div className="form-group">
            <div className={'input-wrapper' + (errors.first_name ? ' input-error' : '')}>
              <span className="input-icon">👤</span>
              <input name="first_name" type="text" placeholder="nama depan" value={form.first_name} onChange={handleChange} />
            </div>
            {errors.first_name && <p className="error-msg">{errors.first_name}</p>}
          </div>
          <div className="form-group">
            <div className={'input-wrapper' + (errors.last_name ? ' input-error' : '')}>
              <span className="input-icon">👤</span>
              <input name="last_name" type="text" placeholder="nama belakang" value={form.last_name} onChange={handleChange} />
            </div>
            {errors.last_name && <p className="error-msg">{errors.last_name}</p>}
          </div>
          <div className="form-group">
            <div className={'input-wrapper' + (errors.password ? ' input-error' : '')}>
              <span className="input-icon">🔒</span>
              <input
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder="buat password"
                value={form.password}
                onChange={handleChange}
              />
              <button type="button" className="toggle-pass" onClick={() => setShowPass((p) => !p)}>
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
            {errors.password && <p className="error-msg">{errors.password}</p>}
          </div>
          <div className="form-group">
            <div className={'input-wrapper' + (errors.confirm_password ? ' input-error' : '')}>
              <span className="input-icon">🔒</span>
              <input
                name="confirm_password"
                type={showConfirm ? 'text' : 'password'}
                placeholder="konfirmasi password"
                value={form.confirm_password}
                onChange={handleChange}
              />
              <button type="button" className="toggle-pass" onClick={() => setShowConfirm((p) => !p)}>
                {showConfirm ? '🙈' : '👁'}
              </button>
            </div>
            {errors.confirm_password && <p className="error-msg">{errors.confirm_password}</p>}
          </div>
          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? 'Mendaftar...' : 'Daftar'}
          </button>
        </form>
        <p className="auth-footer">
          Sudah punya akun? <Link to="/login">Login di sini</Link>
        </p>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
