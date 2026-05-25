export default function BannerSlider({ banners }) {
  return (
    <div className="banner-section">
      <h3>Temukan promo menarik</h3>
      <div className="banner-slider">
        {banners.map((banner) => (
          <div key={banner.banner_name} className="banner-item">
            <img src={banner.banner_image} alt={banner.banner_name} />
          </div>
        ))}
      </div>
    </div>
  );
}
