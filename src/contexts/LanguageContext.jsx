import React, { createContext, useContext, useState } from 'react';

const translations = {
    en: {
        nav: {
            home: 'HOME',
            about: 'ABOUT ME',
            portfolio: 'PORTFOLIO',
            services: 'SERVICES',
            experience: 'EXPERIENCE',
            contact: 'CONTACT',
        },
        intro: {
            greeting: "I'm a",
            previousProject: 'View My Projects',
        },
        about: {
            title: 'About Me',
            hireMe: 'Hire Me',
            resume: 'CV Download',
            description: "I am a Computer Engineer who recently graduated from Kütahya Dumlupınar University. My technical expertise spans from Full-Stack development (.NET & React) to Game Development with Unity. Having been a two-time finalist at Teknofest with the DUSCART team, I thrive in collaborative environments and high-pressure challenges. Beyond coding, I am an automotive enthusiast and a fitness practitioner, which reflects my disciplined approach to both life and engineering. I am passionate about building efficient, scalable software solutions that solve real-world problems."
        },
        portfolio: {
            title: 'PORTFOLIO',
            tabs: {
                desktop: 'Desktop',
                website: 'Website',
                games: 'Games',
                allProjects: 'All Projects',
            },
            project: 'Project',
            readMore: 'Read More',
            visitSite: 'Visit Site',
            viewAll: 'View All',
        },
        services: {
            title: 'SERVICES',
            web: {
                title: 'WEB & MOBILE DEVELOPMENT',
                description: 'Building modern, fast, and user-centric full-stack solutions using React, .NET, and Laravel.'
            },
            desktop: {
                title: 'DESKTOP APPLICATIONS',
                description: 'Designing reliable and high-performance C# and .NET-based desktop applications tailored for business needs.'
            },
            game: {
                title: 'GAME DEVELOPMENT',
                description: 'Developing interactive and basic games for mobile or desktop platforms using the Unity engine and C#.'
            },
            system: {
                title: 'SYSTEM & AI INTEGRATION',
                description: 'Integrating artificial intelligence models and image processing algorithms into real-world software projects.'
            }
        },
        experience: {
            title: 'EXPERIENCE',
        },
        contact: {
            title: 'CONTACT',
            heading: 'Drop Me a Message',
            description: "I'm always open to discussing new projects and creative ideas. For a faster response and a more direct conversation, I'd prefer a phone call. If I'm unavailable, feel free to leave a message and I'll get back to you as soon as possible!",
            namePlaceholder: 'Name',
            emailPlaceholder: 'Email',
            messagePlaceholder: 'Message',
            send: 'Send',
            copyright: '2026 - Developed by Akıncan Altıntaş',
        },
    },
    tr: {
        nav: {
            home: 'ANASAYFA',
            about: 'HAKKIMDA',
            portfolio: 'PORTFÖY',
            services: 'HİZMETLER',
            experience: 'DENEYİM',
            contact: 'İLETİŞİM',
        },
        intro: {
            greeting: 'Ben bir',
            previousProject: 'Projelerimi Gör',
        },
        about: {
            title: 'Hakkımda',
            hireMe: 'Beni İşe Al',
            resume: 'Özgeçmiş İndir',
            description: "Kütahya Dumlupınar Üniversitesi'nden mezun bir Bilgisayar Mühendisiyim. Teknik uzmanlığım, Full-Stack geliştirme (.NET & React) süreçlerinden Unity ile Oyun Geliştirmeye kadar geniş bir yelpazeyi kapsıyor. DUSCART ekibiyle Teknofest'te iki kez finalist olma deneyimim, bana ekip çalışması ve yüksek tempolu projelerde çözüm üretme yetisi kazandırdı. Yazılım dünyasının dışında; disiplinli yaşam tarzımı yansıtan fitness ve otomotiv mekaniğine olan tutkumla kendimi geliştiriyorum. Gerçek dünya sorunlarına verimli ve ölçeklenebilir yazılım çözümleri üretmeye odaklanıyorum."
        },
        portfolio: {
            title: 'PORTFÖY',
            tabs: {
                website: 'Web Sitesi',
                desktop: 'Masaüstü',
                games: 'Oyunlar',
                allProjects: 'Tüm Projeler',
            },
            project: 'Proje',
            readMore: 'Devamını Oku',
            visitSite: 'Siteyi Ziyaret Et',
            viewAll: 'Tümünü Gör',
        },
        services: {
            title: 'HİZMETLER',
            web: {
                title: 'WEB & MOBİL GELİŞTİRME',
                description: 'React, .NET ve Laravel kullanarak modern, hızlı ve kullanıcı odaklı full-stack çözümler üretiyorum.'
            },
            desktop: {
                title: 'MASAÜSTÜ YAZILIMLARI',
                description: 'İşletmeler için C# ve .NET tabanlı, güvenilir ve yüksek performanslı masaüstü uygulamaları tasarlıyorum.'
            },
            game: {
                title: 'OYUN GELİŞTİRME',
                description: 'Unity motoru ve C# ile mobil veya masaüstü platformlar için etkileşimli ve basit oyunlar geliştiriyorum.'
            },
            system: {
                title: 'SİSTEM & AI ENTEGRASYONU',
                description: 'Yapay zeka modellerini ve görüntü işleme algoritmalarını gerçek dünya projelerine entegre ediyorum.'
            }
        },
        experience: {
            title: 'DENEYİM',
        },
        contact: {
            title: 'İLETİŞİM',
            heading: 'Bana Mesaj Gönder',
            description: "Yeni projeler ve yaratıcı fikirler üzerine konuşmaya her zaman açığım. Projelerinizi daha hızlı değerlendirebilmemiz ve doğrudan iletişim kurabilmemiz adına benimle telefon üzerinden iletişime geçmenizi tercih ederim. Eğer o an ulaşamazsanız, e-posta bırakabilirsiniz; en kısa sürede size geri döneceğim.",
            namePlaceholder: 'İsim',
            emailPlaceholder: 'E-posta',
            messagePlaceholder: 'Mesaj',
            send: 'Gönder',
            copyright: '2026 - Akıncan Altıntaş tarafından geliştirilmiştir',
        },
    },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'tr' : 'en'));
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};
