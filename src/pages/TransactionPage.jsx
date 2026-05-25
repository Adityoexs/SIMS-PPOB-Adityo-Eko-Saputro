import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import BalanceCard from '../components/BalanceCard';
import { fetchTransactionHistory, resetHistory } from '../store/slices/transactionSlice';
import { fetchBalance } from '../store/slices/balanceSlice';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) +
    ' ' + date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
}

export default function TransactionPage() {
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.balance);
  const { history, offset, limit, hasMore, loading } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(resetHistory());
    dispatch(fetchBalance());
    dispatch(fetchTransactionHistory({ offset: 0, limit: 5 }));
  }, [dispatch]);

  const handleShowMore = () => {
    dispatch(fetchTransactionHistory({ offset, limit }));
  };

  const isCredit = (type) => type === 'TOPUP' || type === 'KREDIT';

  return (
    <div className="page">
      <Navbar />
      <div className="container inner-page">
        <div className="inner-top">
          <div className="inner-greeting">
            <p className="greeting-small">Transaksi</p>
            <h2 className="greeting-name">Riwayat Transaksi</h2>
          </div>
          <div className="home-balance">
            <BalanceCard balance={balance} />
          </div>
        </div>
        <div className="transaction-list">
          {history.length === 0 && !loading && (
            <p className="empty-msg">Belum ada transaksi.</p>
          )}
          {history.map((item, idx) => (
            <div key={item.invoice_number || idx} className="transaction-item">
              <div className="trx-left">
                <span className={'trx-amount ' + (isCredit(item.transaction_type) ? 'credit' : 'debit')}>
                  {isCredit(item.transaction_type) ? '+' : '-'} Rp{new Intl.NumberFormat('id-ID').format(item.total_amount)}
                </span>
                <span className="trx-date">{formatDate(item.created_on)}</span>
              </div>
              <div className="trx-right">
                <span className="trx-desc">{item.description}</span>
              </div>
            </div>
          ))}
          {loading && <p className="loading-msg">Memuat...</p>}
          {hasMore && !loading && history.length > 0 && (
            <button className="show-more-btn" onClick={handleShowMore}>
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
