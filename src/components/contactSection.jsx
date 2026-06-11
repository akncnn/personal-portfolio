import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaLinkedinIn, FaBehance, FaGithub } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

// Web3Forms access key — buraya kendi key'ini yapıştır
// https://web3forms.com adresinden e-posta ile ücretsiz alabilirsin
const WEB3FORMS_ACCESS_KEY = 'bd9a2501-3a37-4860-b011-5c6489da9ee9';

const contactInfo = [
  {
    id: 1,
    icon: <FaPhone />,
    text: '+90 543 720 10 46',
  },
  {
    id: 2,
    icon: <FaEnvelope />,
    text: 'canaltintas239@gmail.com',
  },
  {
    id: 3,
    icon: <FaMapMarkerAlt />,
    text: 'Kütahya/Merkez, Türkiye',
  },
];

const socialIcons = [
  // { id: 1, icon: <FaFacebookF />, href: 'https://www.facebook.com' },
  { id: 2, icon: <FaInstagram />, href: 'https://www.instagram.com/akn.cnn/' },
  { id: 3, icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/akıncan-altıntaş-930229237/' },
  { id: 4, icon: <FaGithub />, href: 'https://github.com/akncnn' }
];

const ContactSection = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Gönderim durumu: 'idle' | 'sending' | 'success' | 'error'
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          // İsteğe bağlı ekstra alanlar
          subject: `Portfolio Contact from ${formData.name}`,
          from_name: 'Portfolio Website',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // 5 saniye sonra mesajı kaldır
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        console.error('Web3Forms error:', result);
      }
    } catch (error) {
      setStatus('error');
      console.error('Submission error:', error);
    }
  };

  // Buton metnini duruma göre belirle
  const getButtonText = () => {
    if (status === 'sending') return language === 'tr' ? 'Gönderiliyor...' : 'Sending...';
    return t.contact.send;
  };

  return (
    <section id="contact" className="min-h-screen bg-[#11162f] flex items-end justify-center ">
      {/* Görseldeki Gradyanlı Ana Kutu (Container) */}
      <div className="relative w-full rounded-t-[12rem] bg-linear-to-br from-[#4f9ed7]/80 to-[#4023a5]/80 md:p-20 ">
        {/* Dekoratif Blur Daireler (Sol üst ve sağ alt) */}
        <div className="absolute md:-top-40 md:-left-45 md:h-90 md:w-90 -top-0 h-40 w-40 -left-25 rounded-full bg-gradient-to-r from-[#4f9ed7]/80 to-[#4023a5]/80"></div>
        <div className="absolute md:-top-40 md:-right-45 md:h-90 md:w-90 h-40 w-40 -top-0 -right-25 rounded-full bg-gradient-to-r from-[#4f9ed7]/80 to-[#4023a5]/80"></div>
        <div className="relative z-10">
          {/* Başlık */}
          <div className="md:mb-16 text-center font-bold text-3xl tracking-[0.3em] text-white">
            <div className='p-16'>
            <h1 className="uppercase">{t.contact.title}</h1>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Sol Taraf: Metin ve İkonlar */}
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center md:text-left">
                  {t.contact.heading}
                </h2>
                <p className="text-blue-100/80 text-lg leading-relaxed md:px-0 px-4 max-w-md">
                  {t.contact.description}
                </p>
              </div>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.id} className="flex items-center gap-5 group md:pl-0 pl-4">
                    <div className="w-12 h-12 min-w-[3rem] rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/10 transition-all group-hover:bg-white/25">
                      {info.icon}
                    </div>
                    <p className="text-white text-base md:text-lg font-medium opacity-90">{info.text}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Sağ Taraf: Cam Efektli Form */}
            <div className="rounded-3xl bg-white/10 p-1 mx-2 md:mx-0 backdrop-blur-xl border border-white/10">
              <div className="rounded-[calc(1.5rem-1px)] bg-linear-to-b from-white/5 to-transparent p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.contact.namePlaceholder}
                    required
                    disabled={status === 'sending'}
                    className="w-full bg-[#0d122b] text-white px-6 py-4 rounded-xl border border-white/5 focus:outline-hidden focus:ring-2 focus:ring-blue-400/30 transition-all placeholder:text-gray-500 disabled:opacity-60"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.contact.emailPlaceholder}
                    required
                    disabled={status === 'sending'}
                    className="w-full bg-[#0d122b] text-white px-6 py-4 rounded-xl border border-white/5 focus:outline-hidden focus:ring-2 focus:ring-blue-400/30 transition-all placeholder:text-gray-500 disabled:opacity-60"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.contact.messagePlaceholder}
                    rows="4"
                    required
                    disabled={status === 'sending'}
                    className="w-full bg-[#0d122b] text-white px-6 py-4 rounded-xl border border-white/5 focus:outline-hidden focus:ring-2 focus:ring-blue-400/30 transition-all placeholder:text-gray-500 resize-none disabled:opacity-60"
                  />

                  {/* Durum mesajı */}
                  {status === 'success' && (
                    <div className="px-4 py-3 rounded-lg bg-green-500/20 border border-green-500/40 text-green-100 text-sm">
                      {language === 'tr'
                        ? '✓ Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağım.'
                        : '✓ Your message has been sent! I will get back to you soon.'}
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="px-4 py-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-100 text-sm">
                      {language === 'tr'
                        ? '✕ Bir hata oluştu. Lütfen daha sonra tekrar deneyin veya doğrudan e-posta ile ulaşın.'
                        : '✕ Something went wrong. Please try again later or reach out via email directly.'}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-40 py-4 bg-[#0d122b] text-white text-lg font-bold rounded-xl shadow-xl hover:bg-[#151d42] active:scale-95 transition-all cursor-pointer border border-white/5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {getButtonText()}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-linear-to-r from-transparent via-white/20 to-transparent my-10"></div>
          {/* Footer Alanı */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/img/AA_LOGO.png"
                alt="AA Logo"
                className="h-14 md:h-16 w-auto object-contain"
              />
            </div>
            {/* Copyright */}
            <div className="text-white/60 text-sm md:text-base font-medium">
              {t.contact.copyright}
            </div>
            {/* Sosyal Medya İkonları */}
            <div className="flex gap-4 md:pb-0 pb-4">
              {socialIcons.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;