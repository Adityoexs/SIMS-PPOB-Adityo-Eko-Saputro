import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import { fetchProfile, updateProfile, updateProfileImage } from '../store/slices/userSlice';
import { logout } from '../store/slices/authSlice';
import { clearUser } from '../store/slices/userSlice';

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?name=User&background=cccccc&color=ffffff&size=128';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, loading } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ first_name: '', last_name: '' });
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setForm({ first_name: profile.first_name || '', last_name: profile.last_name || '' });
    }
  }, [profile]);

  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 100 * 1024) {
      setToast({ message: 'Ukuran gambar maksimal 100KB', type: 'error' });
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    const result = await dispatch(updateProfileImage(formData));
    if (updateProfileImage.fulfilled.match(result)) {
      setToast({ message: 'Foto profil berhasil diperbarui', type: 'success' });
    } else {
      setToast({ message: result.payload || 'Gagal memperbarui foto', type: 'error' });
    }
  };

  const handleSave = async () => {
    if (!form.first_name.trim() || !form.last_name.trim()) {
      setToast({ message: 'Nama depan dan belakang wajib diisi', type: 'error' });
      return;
    }
    const result = await dispatch(updateProfile(form));
    if (updateProfile.fulfilled.match(result)) {
      setToast({ message: 'Profil berhasil diperbarui', type: 'success' });
      setEditMode(false);
    } else {
      setToast({ message: result.payload || 'Gagal memperbarui profil', type: 'error' });
    }
  };

  const handleCancel = () => {
    if (profile) setForm({ first_name: profile.first_name || '', last_name: profile.last_name || '' });
    setEditMode(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUser());
    navigate('/login');
  };

  const avatarSrc = profile?.profile_image && !profile.profile_image.includes('null')
    ? profile.profile_image
    : DEFAULT_AVATAR;

  return (
    <div className="page">
      <Navbar />
      <div className="container inner-page profile-page">
        <div className="profile-avatar-section">
          <div className="avatar-wrapper">
            <img src={avatarSrc} alt="avatar" className="profile-avatar" />
            <button className="avatar-edit-btn" onClick={handleImageClick} title="Ubah foto">
              ✏️
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
          <h2 className="profile-name">
            {profile ? profile.first_name + ' ' + profile.last_name : '...'}
          </h2>
        </div>

        <div className="profile-form">
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <span className="input-icon">✉</span>
              <input type="email" value={profile?.email || ''} readOnly />
            </div>
          </div>
          <div className="form-group">
            <label>Nama Depan</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                value={form.first_name}
                onChange={(e) => setForm((f) => ({ ...f, first_name: e.target.value }))}
                readOnly={!editMode}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Nama Belakang</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                value={form.last_name}
                onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value }))}
                readOnly={!editMode}
              />
            </div>
          </div>

          {!editMode ? (
            <>
              <button className="btn-outline-primary btn-full" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
              <button className="btn-primary btn-full" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="btn-primary btn-full" onClick={handleSave} disabled={loading}>
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button className="btn-outline-primary btn-full" onClick={handleCancel}>
                Batalkan
              </button>
            </>
          )}
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
