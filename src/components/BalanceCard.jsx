import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBalance } from '../store/slices/balanceSlice';

export default function BalanceCard({ balance }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = () => {
    if (!show) {
      dispatch(fetchBalance());
    }
    setShow((prev) => !prev);
  };

  const formatted =
    balance !== null
      ? new Intl.NumberFormat('id-ID').format(balance)
      : '0';

  return (
    <div className="balance-card">
      <div className="balance-card-inner">
        <p className="balance-label">Saldo anda</p>
        <h2 className="balance-amount">
          {show ? `Rp ${formatted}` : 'Rp ••••••••'}
        </h2>
        <button className="balance-toggle" onClick={handleToggle}>
          {show ? 'Sembunyikan Saldo' : 'Lihat Saldo'}
          <span className="eye-icon">{show ? '👁' : '👁‍🗨'}</span>
        </button>
      </div>
    </div>
  );
}
