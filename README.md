# SIMS PPOB-Adityo

Aplikasi web **SIMS PPOB-Adityo** dibangun menggunakan React.js + Redux Toolkit, terintegrasi dengan API NUTECH.

## Tech Stack

- **React.js** (Vite)
- **Redux Toolkit** (`@reduxjs/toolkit`, `react-redux`)
- **React Router DOM v6**
- **Axios**

## Fitur

1. Registrasi akun
2. Login dengan JWT token
3. Dashboard (Saldo, Services, Banner)
4. Top Up saldo (Rp10.000 – Rp500.000)
5. Pembayaran layanan
6. Riwayat Transaksi (dengan show more pagination)
7. Lihat & Edit Profil
8. Update foto profil (maks 100KB)
9. Logout

## Setup & Menjalankan Aplikasi

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Buka browser di `http://localhost:5173`

## Build

```bash
npm run build
```

## API

Base URL: `https://take-home-test-api.nutech-integrasi.com`

Docs: https://api-doc-tht.nutech-integrasi.com

## Struktur Proyek

```
src/
  api/
    axios.js           # Axios instance dengan interceptor ******
    authApi.js         # Login & Register API
    profileApi.js      # Profile, Balance, Services, Banner API
    transactionApi.js  # TopUp, Payment, Transaction History API
  store/
    index.js           # Redux store
    slices/
      authSlice.js
      userSlice.js
      balanceSlice.js
      servicesSlice.js
      bannerSlice.js
      transactionSlice.js
      topupSlice.js
  pages/
    LoginPage.jsx
    RegisterPage.jsx
    HomePage.jsx
    TopUpPage.jsx
    PaymentPage.jsx
    TransactionPage.jsx
    ProfilePage.jsx
  components/
    Navbar.jsx
    BalanceCard.jsx
    ServiceGrid.jsx
    BannerSlider.jsx
    ProtectedRoute.jsx
    Toast.jsx
  App.jsx
  main.jsx
  index.css
```
