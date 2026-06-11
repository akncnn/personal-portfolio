# 💼 Akıncan Altıntaş — Kişisel Portföy

🌐 **Canlı Demo:** [akincan-altintas.netlify.app](https://akincan-altintas.netlify.app/)

Kütahya Dumlupınar Üniversitesi Bilgisayar Mühendisliği mezunu, Full Stack Developer Akıncan Altıntaş'ın kişisel portföy sitesi.

## ✨ Özellikler

- 🌍 **Çift Dil Desteği** — TR / EN dil geçişi (React Context ile)
- 📱 **Responsive Tasarım** — Mobil uyumlu, hamburger menü
- 🗂️ **Portföy Sekmeleri** — Desktop, Website, Games ve tüm projeler filtreleme
- 🪟 **Proje Detay Modalı** — Her proje için detaylı açılır pencere
- 📋 **Bölümler** — Intro, Hakkımda, Portföy, Hizmetler, Deneyim, İletişim
- 📩 **İletişim Formu** — Mesaj gönderme bölümü
- ⚡ **Smooth Scroll** — Bölümler arası yumuşak geçiş

## 🛠️ Teknolojiler

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)

## 🚀 Kurulum

```bash
npm install
npm run dev
```

```bash
# Production build
npm run build
```

## 📂 Proje Yapısı

```
src/
├── components/
│   ├── header.jsx              # Navbar + dil değiştirici
│   ├── introSection.jsx        # Hero bölümü
│   ├── aboutSection.jsx        # Hakkımda
│   ├── portSection.jsx         # Portföy + sekme filtresi
│   ├── ProjectDetailModal.jsx  # Proje detay modalı
│   ├── servicesSection.jsx     # Hizmetler
│   ├── experienceSection.jsx   # Deneyim
│   └── contactSection.jsx      # İletişim formu
├── contexts/
│   └── LanguageContext.jsx     # TR/EN dil yönetimi
└── App.jsx
```

## 🌐 Dağıtım

```bash
npm run build
# dist/ klasörünü Netlify'a sürükle-bırak ile yükle
```
