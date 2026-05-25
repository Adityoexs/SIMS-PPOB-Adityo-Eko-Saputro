import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import BalanceCard from '../components/BalanceCard';
import ServiceGrid from '../components/ServiceGrid';
import BannerSlider from '../components/BannerSlider';
import { fetchProfile } from '../store/slices/userSlice';
import { fetchBalance } from '../store/slices/balanceSlice';
import { fetchServices } from '../store/slices/servicesSlice';
import { fetchBanners } from '../store/slices/bannerSlice';

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?name=User&background=cccccc&color=ffffff&size=128';

export default function HomePage() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const { balance } = useSelector((state) => state.balance);
  const { list: services } = useSelector((state) => state.services);
  const { list: banners } = useSelector((state) => state.banners);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
    dispatch(fetchServices());
    dispatch(fetchBanners());
  }, [dispatch]);

  const avatarSrc = profile?.profile_image && !profile.profile_image.includes('null')
    ? profile.profile_image
    : DEFAULT_AVATAR;

  return (
    <div className="page">
      <Navbar />
      <div className="home-content container">
        <div className="home-top">
          <div className="home-greeting">
            <img src={avatarSrc} alt="avatar" className="home-avatar" />
            <div>
              <p className="greeting-small">Selamat datang,</p>
              <h2 className="greeting-name">
                {profile ? profile.first_name + ' ' + profile.last_name : '...'}
              </h2>
            </div>
          </div>
          <div className="home-balance">
            <BalanceCard balance={balance} />
          </div>
        </div>
        <div className="services-section">
          <ServiceGrid services={services} />
        </div>
        <BannerSlider banners={banners} />
      </div>
    </div>
  );
}
