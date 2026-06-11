import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ProjectDetailModal from './ProjectDetailModal';

// Sekme sıralaması: website, desktop, games, allProjects
// allProjects özel: kendi verisi yok, diğer 3 kategoriyi birleştirir
const CATEGORY_KEYS = ['website', 'desktop', 'games', 'allProjects'];

const projectsData = {
    website: [
        {
            id: 1,
            title: { en: 'Veterinary Stock Tracking System', tr: 'Veteriner Stok Takip Sistemi' },
            description: {
                en: 'A web-based inventory management system developed with Laravel and MySQL. It enables veterinary clinics to monitor medical supplies and stock levels through a browser-based interface, focusing on secure data management and basic CRUD operations.',
                tr: 'Laravel ve MySQL kullanılarak geliştirilmiş, web tabanlı bir envanter yönetim sistemidir. Veteriner kliniklerinin tıbbi malzeme ve stok seviyelerini tarayıcı üzerinden takip etmelerine olanak tanır; güvenli veri yönetimi ve temel CRUD işlemlerine odaklanır.',
            },
            image: '/img/veterinerStok (6).png',
            link: '#',
            details: {
                subtitle: {
                    en: 'Laravel (PHP) / MySQL / Tailwind CSS / Blade Templating Engine',
                    tr: 'Laravel (PHP) / MySQL / Tailwind CSS / Blade Templating Engine',
                },
                gallery: [
                    '/img/veterinerStok (1).png',
                    '/img/veterinerStok (2).png',
                    '/img/veterinerStok (3).png',
                    '/img/veterinerStok (4).png',
                    '/img/veterinerStok (5).png',
                    '/img/veterinerStok (6).png',
                ],
                longDescription: {
                    en: 'A web-based automation system developed with Laravel and MySQL architecture for veterinary clinics to manage their medicine, medical supplies, and service items digitally. The project is specifically designed to track complex inventory movements and invoice services provided to pet owners. The system aims to manage a clinic`s daily commercial cycle end-to-end, from critical stock level alerts to the digital invoicing process.',
                    tr: 'Veteriner kliniklerinin ilaç, tıbbi malzeme ve hizmet kalemlerini dijital ortamda yönetebilmeleri için Laravel ve MySQL mimarisi ile geliştirilmiş web tabanlı bir otomasyon sistemidir. Proje, özellikle karmaşık stok hareketlerini izlemek ve hasta sahiplerine sunulan hizmetleri faturalandırmak amacıyla tasarlanmıştır. Sistem, kritik stok seviyesi uyarılarından dijital fatura oluşturma sürecine kadar bir kliniğin günlük ticari döngüsünü uçtan uca yönetmeyi hedefler.',
                },
                features: [
                    {
                        en: 'Inventory management for medicines and consumables with expiration date and lot tracking support.',
                        tr: 'İlaç ve sarf malzemeleri için son kullanma tarihi ve lot takibi destekli stok yönetimi.',
                    },
                    {
                        en: 'Automatic invoice generation for completed transactions and a direct printing interface via browser.',
                        tr: 'Tamamlanan işlemler için otomatik fatura oluşturma ve tarayıcı üzerinden doğrudan yazdırma arayüzü.',
                    },
                    {
                        en: 'Automatic dashboard alerts for products falling below pre-defined limits.',
                        tr: 'Belirlenen limitlerin altına düşen ürünler için otomatik dashboard uyarıları.',
                    },
                    {
                        en: 'Integrated structure linking customer and patient records with inventory movements.',
                        tr: 'Müşteri ve hasta kayıtlarını stok hareketleriyle entegre eden yapı.',
                    },
                    {
                        en: 'Secure transaction management built with Laravel`s robust authorization and data protection layers.',
                        tr: 'Laravel`in güçlü yetkilendirme ve veri koruma katmanlarıyla inşa edilmiş güvenli işlem yönetimi.',
                    }
                ],
                process: {
                    en: 'This project evolved from a technical study into a real commercial product. By selling the system to a professional veterinary clinic, I experienced the entire software lifecycle from the development phase to real-world production usage. I learned to optimize the system based on user feedback, work with zero errors in critical operations like invoicing, and manage post-sales support processes. This project, which is currently being used actively without any issues, provided me with engineering disciplines such as durability, data security, and customer satisfaction directly in the field, beyond theoretical knowledge.',
                    tr: 'Bu proje, teknik bir çalışmadan öte gerçek bir ticari ürüne dönüştü. Geliştirdiğim sistemi profesyonel bir veteriner kliniğine satışını gerçekleştirerek, bir yazılımın geliştirme aşamasından gerçek dünya kullanımına (production) kadar olan tüm yaşam döngüsünü deneyimledim. Kullanıcıdan gelen geri bildirimlerle sistemi optimize etmeyi, fatura yazdırma gibi kritik operasyonlarda sıfır hata ile çalışmayı ve satış sonrası destek süreçlerini yönetmeyi öğrendim. Şu an aktif olarak sorunsuz bir şekilde kullanılan bu proje, bana teorik bilginin ötesinde; dayanıklılık, veri güvenliği ve müşteri memnuniyeti gibi mühendislik disiplinlerini bizzat sahada kazandırdı.',
                },
            },
        },
        {
            id: 2,
            title: { en: 'RushWordReader - PDF Speed Reading Tool', tr: 'RushWordReader - PDF Hızlı Okuma Aracı' },
            description: {
                en: 'A web-based productivity application designed to enhance reading speed by processing PDF files and displaying text in a rapid, focused format. Built with React and hosted on Netlify, it focuses on efficient library integration and seamless file handling.',
                tr: 'PDF dosyalarını işleyerek metinleri hızlı ve odaklı bir formatta sunan, okuma hızını artırmak için tasarlanmış web tabanlı bir verimlilik uygulamasıdır. React ile geliştirilmiş ve Netlify üzerinde yayına alınmış olup, kütüphane entegrasyonu ve sorunsuz dosya yönetimine odaklanmaktadır.',
            },
            image: '/img/rushWordReaderSite.png',
            link: 'https://rushwordreader.netlify.app/',
        },
        {
            id: 3,
            title: { en: 'Luxury Watch Website', tr: 'Lüks Kol Saati Web Sitesi' },
            description: {
                en: 'A luxury watch e-commerce landing page featuring a sophisticated design, responsive layouts with Tailwind CSS, and a premium user experience.',
                tr: 'Tailwind CSS ile geliştirilmiş, sofistike bir tasarıma ve duyarlı (responsive) arayüze sahip lüks saat e-ticaret tanıtım sayfası.',
            },
            image: '/img/watchwebport.png',
            link: 'https://luxurywatchwebsite.netlify.app/',
        },
    ],
    desktop: [
        {
            id: 1,
            title: { en: 'Cafe Point of Sale (POS) System', tr: 'Kafe POS Sistemi' },
            description: {
                en: 'A desktop application developed during my 40-day mandatory internship, aimed at digitizing order processes for cafes and restaurants. Built on the .NET ecosystem, the project focuses on increasing operational efficiency.',
                tr: '40 günlük zorunlu yazılım stajım süresince geliştirdiğim, kafe ve restoranların sipariş süreçlerini dijitalleştirmeyi amaçlayan bir masaüstü uygulamasıdır. .NET ekosistemi üzerinde inşa edilen proje, operasyonel verimliliği artırmaya odaklanır.',
            },
            image: '/img/CafeAdisyonPro (16).png',
            link: '#',
            details: {
                subtitle: {
                    en: '.NET 8 / C# / WPF / SQLite',
                    tr: '.NET 8 / C# / WPF / SQLite',
                },
                gallery: [
                    '/img/CafeAdisyonPro (1).png',
                    '/img/CafeAdisyonPro (2).png',
                    '/img/CafeAdisyonPro (3).png',
                    '/img/CafeAdisyonPro (4).png',
                    '/img/CafeAdisyonPro (5).png',
                    '/img/CafeAdisyonPro (6).png',
                    '/img/CafeAdisyonPro (7).png',
                    '/img/CafeAdisyonPro (8).png',
                    '/img/CafeAdisyonPro (9).png',
                    '/img/CafeAdisyonPro (10).png',
                    '/img/CafeAdisyonPro (11).png',
                    '/img/CafeAdisyonPro (12).png',
                    '/img/CafeAdisyonPro (13).png',
                    '/img/CafeAdisyonPro (14).png',
                    '/img/CafeAdisyonPro (15).png',
                ],
                longDescription: {
                    en: 'Cafe Adisyon Pro is a hybrid POS solution developed to keep up with the intense pace of business operations. The strongest aspect of the project is that the operation does not stop even if the internet connection is lost. Thanks to the local database architecture, all order and payment transactions can be performed offline and are automatically synchronized with the cloud server when the connection is restored. Within the scope of this project; comprehensive work has been carried out on asynchronous data management, data consistency, and user-friendly interface design.',
                    tr: 'Cafe Adisyon Pro, işletmelerin yoğun çalışma temposuna uyum sağlamak için geliştirilmiş hibrit bir POS çözümüdür. Projenin en güçlü yanı, internet bağlantısı kesilse dahi operasyonun durmamasıdır. Yerel veri tabanı mimarisi sayesinde tüm sipariş ve ödeme işlemleri çevrimdışı olarak gerçekleştirilebilir ve bağlantı sağlandığında otomatik olarak bulut sunucu ile senkronize edilir. Bu proje kapsamında; asenkron veri yönetimi, veri tutarlılığı (consistency) ve kullanıcı dostu arayüz tasarımı konularında kapsamlı bir çalışma yürütülmüştür.',
                },
                features: [
                    {
                        en: 'Table-based fast order entry and real-time status tracking.',
                        tr: 'Masa bazlı hızlı sipariş girişi ve anlık durum takibi.',
                    },
                    {
                        en: 'Category-based product management and basic stock alert system.',
                        tr: 'Kategori bazlı ürün yönetimi ve temel stok uyarı sistemi.',
                    },
                    {
                        en: 'Quick check-out with cash and card payment options.',
                        tr: 'Nakit ve kart seçenekleriyle hızlı adisyon kapatma.',
                    },
                    {
                        en: 'Reporting of daily sales data with simple charts.',
                        tr: 'Günlük satış verilerinin basit grafiklerle raporlanması.',
                    },
                    {
                        en: 'Ability to take orders and close checks even without an internet connection. Automatic cloud synchronization when the connection is restored.',
                        tr: 'İnternet bağlantısı olmasa dahi sipariş alma ve adisyon kapatma yeteneği. Bağlantı geldiğinde otomatik bulut senkronizasyonu.',
                    }
                ],
                process: {
                    en: 'This project was a turning point for me in understanding enterprise software architectures. I gained practical experience in desktop application development in the .NET environment, database schema design, and UI optimization. By focusing on asynchronous operations and data consistency, I experienced how to maintain system stability during busy operational hours.',
                    tr: 'Bu proje benim için kurumsal yazılım mimarilerini anlama sürecinde bir dönüm noktası oldu. .NET ortamında masaüstü uygulama geliştirme, veri tabanı şeması tasarlama ve kullanıcı arayüzü (UI) deneyimini optimize etme konularında pratik tecrübe kazandım. Özellikle asenkron işlemler ve veri tutarlılığı üzerine odaklanarak, yoğun çalışma saatlerinde sistemin nasıl stabil kalabileceğini deneyimledim.',
                },
            },
        },
        {
            id: 2,
            title: { en: 'AI Context Generator', tr: 'AI Context Generator' },
            description: {
                en: 'A desktop utility developed to extract software project structures into a single text format. It helps AI models understand the project context more efficiently by organizing file contents.',
                tr: 'Yazılım projelerinin yapısını tek bir metin formatına dönüştüren bir masaüstü aracıdır. Dosya içeriklerini düzenleyerek yapay zeka modellerinin proje bağlamını daha verimli anlamasına yardımcı olur.',
            },
            image: '/img/AiContext.png',
            link: '#',
        },
        
    ],
    games: [
        {
            id: 1,
            title: { en: 'Firefighting Simulation - Unity & C#', tr: 'İtfaiyeci Simülasyonu - Unity & C#' },
            description: {
                en: 'A basic 3D simulation developed to understand game mechanics and physics in Unity. It includes simple fire-extinguishing logic and character movement, created as a learning project to improve my C# scripting skills.',
                tr: "Unity'de oyun mekaniklerini ve temel fiziği anlamak için geliştirdiğim bir 3D simülasyon. C# script yazma becerilerimi geliştirmek adına temel yangın söndürme mantığı ve karakter hareketleri üzerine odaklandığım bir öğrenme projesidir.",
            },
            images: [
                '/img/fireFighterMocap (1).jpg',
                '/img/fireFighterMocap (2).jpg',
                '/img/fireFighterMocap (3).jpg',
                '/img/fireFighterMocap (4).jpg',
                '/img/fireFighterMocap (5).jpg',
            ],
            link: '#',
        },
       
    ],
};

const ImageSlider = ({ images, alt }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = Array.isArray(images) ? images : [images];

    useEffect(() => {
        if (slides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className='relative w-full'>
            {slides.map((src, idx) => (
                <img
                    key={idx}
                    src={src}
                    alt={alt}
                    className={`${idx === 0 ? 'relative' : 'absolute inset-0'} w-full rounded-3xl transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                />
            ))}
        </div>
    );
};

const portSection = () => {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState('website');
    const [selectedProject, setSelectedProject] = useState(null);

    const Card = ({ project, index }) => {
        const isImageLeft = index % 2 === 0;
        const hasLiveLink = project.link && project.link !== '#';
        const projectImages = project.images || project.image;

        return (
            <div className='flex justify-center py-12 md:py-20 px-8'>
                <div className='grid gap-8 grid-cols-1 lg:grid-cols-3 md:gap-16 items-center md:ml-7 w-full max-w-6xl'>
                    <div
                        id={`project-${project.id}`}
                        className={`relative w-full ${isImageLeft ? 'order-1' : 'order-1 lg:order-3'}`}
                    >
                        <div className='relative z-2'>
                            <ImageSlider images={projectImages} alt={project.title[language]} />
                        </div>
                        <div className={`absolute z-0 top-6 lg:top-8 ${isImageLeft ? 'left-6 lg:left-8' : 'right-6 lg:right-8'} w-full h-full border-8 lg:border-12 border-[#51b8dc] rounded-3xl`}>
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 space-y-6 md:space-y-8 col-span-2 order-2 mt-4 lg:mt-0'>
                        <div className='text-white'>
                            <h2 className='text-[#51b8dc] text-lg md:text-xl mb-2'>{t.portfolio.project} {index + 1}</h2>
                            <h3 className='mt-4 md:mt-0 md:text-4xl text-2xl font-bold'>{project.title[language]}</h3>
                        </div>
                        <div className='text-[#7d818d] md:text-xl text-lg'>
                            <p>{project.description[language]}</p>
                        </div>
                        <div className='flex flex-wrap gap-6 items-center'>
                            {hasLiveLink ? (
                                <a
                                    href={project.link}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='flex items-center gap-2 cursor-pointer hover:text-[#51b8dc] transition-colors text-white'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M24 12.16L18.24 6.4v4.24H0v3.04h18.24v4.24z" /></svg>
                                    <span>{t.portfolio.visitSite}</span>
                                </a>
                            ) : (
                                <span className='flex items-center gap-2 text-[#7d818d] opacity-50 cursor-not-allowed'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M24 12.16L18.24 6.4v4.24H0v3.04h18.24v4.24z" /></svg>
                                    <span>{t.portfolio.visitSite}</span>
                                </span>
                            )}

                            <button
                                onClick={() => setSelectedProject(project)}
                                className='flex items-center gap-2 cursor-pointer hover:text-[#51b8dc] transition-colors text-white'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M24 12.16L18.24 6.4v4.24H0v3.04h18.24v4.24z" /></svg>
                                <span>{t.portfolio.readMore}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const currentProjects = activeTab === 'allProjects'
        ? [...projectsData.website, ...projectsData.desktop, ...projectsData.games]
        : projectsData[activeTab] || [];

    return (
        <section id='portfolio'>
            <div className='bg-[#11162f] text-white'>
                <div>
                    <div className='text-center font-bold text-2xl py-6'>
                        <h1>{t.portfolio.title}</h1>
                    </div>
                    <div className='flex justify-center w-full px-4'>
                        <ul className='flex flex-wrap justify-center md:gap-12 gap-6'>
                            {CATEGORY_KEYS.map((key) => (
                                <li key={key}>
                                    <button
                                        onClick={() => setActiveTab(key)}
                                        className={`cursor-pointer transition-colors ${activeTab === key
                                            ? 'text-[#51b8dc] font-semibold'
                                            : 'text-white hover:text-[#51b8dc]'
                                            }`}
                                    >
                                        {t.portfolio.tabs[key]}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    {currentProjects.map((project, index) => (
                        <Card key={`${activeTab}-${project.id}-${index}`} project={project} index={index} />
                    ))}
                </div>
                {activeTab !== 'allProjects' && (
                    <div className='text-center py-10'>
                        <button
                            onClick={() => setActiveTab('allProjects')}
                            className="md:py-3 md:px-10 min-w-30 h-12 md:w-48 md:h-16 text-white text-sm md:text-xl font-semibold rounded-lg shadow-lg bg-gradient-to-r from-[#4f9ed7] to-[#4023a5] hover:from-[#3c78a3] hover:to-[#331c85] cursor-pointer transition duration-300"
                        >
                            {t.portfolio.viewAll}
                        </button>
                    </div>
                )}
            </div>

            {selectedProject && (
                <ProjectDetailModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
};

export default portSection;