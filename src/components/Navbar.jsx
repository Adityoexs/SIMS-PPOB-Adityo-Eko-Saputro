import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="SIMS PPOB" className="navbar-logo" />
          <span>SIMS PPOB</span>
        </Link>
        <div className="navbar-links">
          <Link to="/topup">Top Up</Link>
          <Link to="/transaction">Transaction</Link>
          <Link to="/profile">Akun</Link>
        </div>
      </div>
    </nav>
  );
}
