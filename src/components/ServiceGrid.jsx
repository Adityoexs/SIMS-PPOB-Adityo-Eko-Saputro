import { useNavigate } from 'react-router-dom';

export default function ServiceGrid({ services }) {
  const navigate = useNavigate();

  return (
    <div className="services-grid">
      {services.map((service) => (
        <div
          key={service.service_code}
          className="service-item"
          onClick={() => navigate('/payment/' + service.service_code)}
        >
          <img src={service.service_icon} alt={service.service_name} />
          <span>{service.service_name}</span>
        </div>
      ))}
    </div>
  );
}
