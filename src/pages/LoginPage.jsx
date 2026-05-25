import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginApi } from '../api/authApi';
import { setToken } from '../store/slices/authSlice';
import Toast from '../components/Toast';
import logo from '../assets/logo.svg';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const validate = () => {
    const errs = {};
    if (!email) errs.email = 'Email wajib diisi';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Format email tidak valid';
    if (!password) errs.password = 'Password wajib diisi';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const res = await loginApi({ email, password });
      dispatch(setToken(res.data.data.token));
      navigate('/');
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Login gagal', type: 'error' });
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
        <h2 className="auth-tagline">Masuk atau buat akun untuk memulai</h2>
      </div>
      <div className="auth-right">
        <h2 className="auth-title">Masuk</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <div className={'input-wrapper' + (errors.email ? ' input-error' : '')}>
              <span className="input-icon">✉</span>
              <input
                type="email"
                placeholder="masukan email anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>
          <div className="form-group">
            <div className={'input-wrapper' + (errors.password ? ' input-error' : '')}>
              <span className="input-icon">🔒</span>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="masukan password anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="toggle-pass" onClick={() => setShowPass((p) => !p)}>
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
            {errors.password && <p className="error-msg">{errors.password}</p>}
          </div>
          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </form>
        <p className="auth-footer">
          Belum punya akun? <Link to="/register">Registrasi di sini</Link>
        </p>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
