import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import BalanceCard from '../components/BalanceCard';
import Toast from '../components/Toast';
import { doTransaction, resetPayment } from '../store/slices/transactionSlice';
import { fetchBalance } from '../store/slices/balanceSlice';
import { fetchServices } from '../store/slices/servicesSlice';

export default function PaymentPage() {
  const { service_code } = useParams();
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.balance);
  const { list: services } = useSelector((state) => state.services);
  const { payLoading } = useSelector((state) => state.transaction);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!services.length) dispatch(fetchServices());
    dispatch(fetchBalance());
  }, [dispatch, services.length]);

  const service = services.find((s) => s.service_code === service_code);

  const handlePay = async () => {
    const result = await dispatch(doTransaction(service_code));
    if (doTransaction.fulfilled.match(result)) {
      dispatch(fetchBalance());
      setToast({ message: 'Pembayaran berhasil!', type: 'success' });
    } else {
      setToast({ message: result.payload || 'Pembayaran gagal', type: 'error' });
    }
    dispatch(resetPayment());
  };

  if (!service) return (
    <div className="page">
      <Navbar />
      <div className="container inner-page">
        <p>Layanan tidak ditemukan.</p>
      </div>
    </div>
  );

  return (
    <div className="page">
      <Navbar />
      <div className="container inner-page">
        <div className="inner-top">
          <div className="inner-greeting">
            <p className="greeting-small">Pembayaran</p>
            <h2 className="greeting-name">{service.service_name}</h2>
          </div>
          <div className="home-balance">
            <BalanceCard balance={balance} />
          </div>
        </div>
        <div className="payment-section">
          <div className="payment-service-header">
            <img src={service.service_icon} alt={service.service_name} className="payment-icon" />
            <h3>{service.service_name}</h3>
          </div>
          <div className="form-group">
            <label>Pembayaran</label>
            <div className="input-wrapper">
              <span className="input-icon">Rp</span>
              <input
                type="text"
                value={new Intl.NumberFormat('id-ID').format(service.service_tariff)}
                readOnly
              />
            </div>
          </div>
          <button
            className="btn-primary btn-full"
            onClick={handlePay}
            disabled={payLoading}
          >
            {payLoading ? 'Memproses...' : 'Bayar'}
          </button>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
