import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import BalanceCard from '../components/BalanceCard';
import Toast from '../components/Toast';
import { doTopUp, resetTopup } from '../store/slices/topupSlice';
import { fetchBalance } from '../store/slices/balanceSlice';

const QUICK_AMOUNTS = [10000, 20000, 50000, 100000, 250000, 500000];

export default function TopUpPage() {
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.balance);
  const { loading } = useSelector((state) => state.topup);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const handleQuick = (val) => setAmount(String(val));

  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setAmount(val);
    setError('');
  };

  const validate = () => {
    const num = Number(amount);
    if (!amount || num <= 0) return 'Nominal wajib diisi';
    if (num < 10000) return 'Minimal top up Rp10.000';
    if (num > 1000000) return 'Maksimal top up Rp1.000.000';
    return '';
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    const result = await dispatch(doTopUp(Number(amount)));
    if (doTopUp.fulfilled.match(result)) {
      dispatch(fetchBalance());
      setToast({ message: 'Top Up berhasil!', type: 'success' });
      setAmount('');
    } else {
      setToast({ message: result.payload || 'Top Up gagal', type: 'error' });
    }
    dispatch(resetTopup());
  };

  return (
    <div className="page">
      <Navbar />
      <div className="container inner-page">
        <div className="inner-top">
          <div className="inner-greeting">
            <p className="greeting-small">Selamat datang,</p>
            <h2 className="greeting-name">Top Up</h2>
          </div>
          <div className="home-balance">
            <BalanceCard balance={balance} />
          </div>
        </div>
        <div className="topup-section">
          <h3>Silahkan masukan</h3>
          <h3>nominal Top Up</h3>
          <div className="topup-form">
            <div className={'input-wrapper' + (error ? ' input-error' : '')}>
              <span className="input-icon">Rp</span>
              <input
                type="text"
                placeholder="masukan nominal Top Up"
                value={amount ? new Intl.NumberFormat('id-ID').format(amount) : ''}
                onChange={handleChange}
              />
            </div>
            {error && <p className="error-msg">{error}</p>}
            <div className="quick-amounts">
              {QUICK_AMOUNTS.map((val) => (
                <button
                  key={val}
                  className={'quick-btn' + (amount === String(val) ? ' active' : '')}
                  onClick={() => handleQuick(val)}
                >
                  Rp{new Intl.NumberFormat('id-ID').format(val)}
                </button>
              ))}
            </div>
            <button
              className="btn-primary btn-full"
              onClick={handleSubmit}
              disabled={!amount || loading}
            >
              {loading ? 'Memproses...' : 'Top Up'}
            </button>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
