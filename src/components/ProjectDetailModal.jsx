import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Tam ekran görsel görüntüleyici (lightbox)
// Sol/sağ oklarla görseller arası geçiş, ESC ile kapanma, döngülü
const Lightbox = ({ images, startIndex, alt, onClose }) => {
    const [index, setIndex] = useState(startIndex);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') setIndex((prev) => (prev + 1) % images.length);
            if (e.key === 'ArrowLeft') setIndex((prev) => (prev - 1 + images.length) % images.length);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [images.length, onClose]);

    const goPrev = (e) => {
        e.stopPropagation();
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goNext = (e) => {
        e.stopPropagation();
        setIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div
            className='fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md'
            onClick={onClose}
        >
            {/* Kapat butonu */}
            <button
                onClick={onClose}
                aria-label='Close'
                className='absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-[#11162f]/80 border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer'
            >
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <line x1='18' y1='6' x2='6' y2='18' />
                    <line x1='6' y1='6' x2='18' y2='18' />
                </svg>
            </button>

            {/* Görsel */}
            <img
                src={images[index]}
                alt={`${alt} ${index + 1}`}
                className='max-w-full max-h-[90vh] object-contain rounded-lg'
                onClick={(e) => e.stopPropagation()}
            />

            {/* Çoklu görsel varsa oklar */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={goPrev}
                        aria-label='Previous'
                        className='absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#11162f]/80 border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer'
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                            <polyline points='15 18 9 12 15 6' />
                        </svg>
                    </button>
                    <button
                        onClick={goNext}
                        aria-label='Next'
                        className='absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#11162f]/80 border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer'
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                            <polyline points='9 18 15 12 9 6' />
                        </svg>
                    </button>

                    {/* Sayaç */}
                    <div className='absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-[#11162f]/60 px-4 py-1.5 rounded-full'>
                        {index + 1} / {images.length}
                    </div>
                </>
            )}
        </div>
    );
};

// Modal içindeki 2'li görsel slider
// - Her zaman 2 görsel yan yana, sabit yükseklik, oran korunur (object-contain)
// - Sol/sağ oklarla 1'er kayar
// - Döngülü
// - 2 veya daha az görsel varsa oklar görünmez
// - Görsele tıklayınca lightbox açılır
const GallerySlider = ({ images, alt, onImageClick }) => {
    const [startIndex, setStartIndex] = useState(0);

    // Tüm görseller tutarlı görünsün diye sabit yükseklikli kutu + object-contain
    // h-64 mobilde, md:h-80 desktop'ta
    const ImageBox = ({ src, idx }) => (
        <div className='w-full h-64 md:h-80 bg-[#0a0e22] rounded-xl border border-[#4f9ed7]/20 overflow-hidden flex items-center justify-center'>
            <img
                src={src}
                alt={`${alt} ${idx + 1}`}
                onClick={() => onImageClick(idx)}
                className='max-w-full max-h-full object-contain cursor-zoom-in hover:opacity-90 transition-opacity'
            />
        </div>
    );

    // 2 veya daha az görsel: statik göster, ok yok
    if (images.length <= 2) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {images.map((src, idx) => (
                    <ImageBox key={idx} src={src} idx={idx} />
                ))}
            </div>
        );
    }

    // 3+ görsel: slider mantığı
    const visibleIndexes = [
        startIndex % images.length,
        (startIndex + 1) % images.length,
    ];

    const goPrev = () => {
        setStartIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goNext = () => {
        setStartIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className='relative'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {visibleIndexes.map((imgIdx, slotIdx) => (
                    <ImageBox
                        key={`${startIndex}-${slotIdx}`}
                        src={images[imgIdx]}
                        idx={imgIdx}
                    />
                ))}
            </div>

            {/* Sol ok */}
            <button
                onClick={goPrev}
                aria-label='Previous'
                className='absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#11162f]/90 border border-[#4f9ed7]/40 flex items-center justify-center text-white hover:bg-[#4f9ed7]/30 hover:border-[#4f9ed7] transition-colors cursor-pointer shadow-lg'
            >
                <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                    <polyline points='15 18 9 12 15 6' />
                </svg>
            </button>

            {/* Sağ ok */}
            <button
                onClick={goNext}
                aria-label='Next'
                className='absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#11162f]/90 border border-[#4f9ed7]/40 flex items-center justify-center text-white hover:bg-[#4f9ed7]/30 hover:border-[#4f9ed7] transition-colors cursor-pointer shadow-lg'
            >
                <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                    <polyline points='9 18 15 12 9 6' />
                </svg>
            </button>

            {/* Sayaç */}
            <div className='text-center mt-3 text-[#7d818d] text-sm'>
                {(startIndex + 1)}–{((startIndex + 1) % images.length) + 1} / {images.length}
            </div>
        </div>
    );
};

const ProjectDetailModal = ({ project, onClose }) => {
    const { t, language } = useLanguage();
    const [lightboxIndex, setLightboxIndex] = useState(null);

    // ESC tuşuyla kapatma (sadece lightbox kapalıyken modal kapansın)
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && lightboxIndex === null) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose, lightboxIndex]);

    // Modal açıkken arka plan kaydırılmasın
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    if (!project) return null;

    const details = project.details;

    // Detay yoksa "coming soon" mesajı
    if (!details) {
        return (
            <div
                className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm'
                onClick={onClose}
            >
                <div
                    className='bg-[#11162f] border border-[#4f9ed7]/30 rounded-2xl p-10 max-w-md w-full text-center'
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className='text-2xl font-bold text-white mb-4'>{project.title[language]}</h3>
                    <p className='text-[#7d818d] text-lg mb-6'>
                        {language === 'tr' ? 'Detay sayfası yakında eklenecek.' : 'Detail page coming soon.'}
                    </p>
                    <button
                        onClick={onClose}
                        className='px-8 py-2 text-white text-base font-semibold rounded-lg bg-gradient-to-r from-[#4f9ed7] to-[#4023a5] hover:from-[#3c78a3] hover:to-[#331c85] cursor-pointer transition-colors'
                    >
                        {language === 'tr' ? 'Kapat' : 'Close'}
                    </button>
                </div>
            </div>
        );
    }

    // Detay var → tam modal
    const galleryImages = details.gallery || (project.images ? project.images : [project.image]);

    return (
        <>
            <div
                className='fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm'
                onClick={onClose}
            >
                <div
                    className='bg-[#11162f] border border-[#4f9ed7]/30 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative'
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Kapat butonu */}
                    <button
                        onClick={onClose}
                        className='absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#11162f]/80 border border-[#4f9ed7]/30 flex items-center justify-center text-white hover:bg-[#4f9ed7]/20 transition-colors cursor-pointer'
                        aria-label='Close'
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                            <line x1='18' y1='6' x2='6' y2='18' />
                            <line x1='6' y1='6' x2='18' y2='18' />
                        </svg>
                    </button>

                    <div className='p-8 md:p-12 space-y-10'>
                        {/* Başlık + alt başlık */}
                        <div>
                            <h2 className='text-3xl md:text-4xl font-bold text-white mb-3'>
                                {project.title[language]}
                            </h2>
                            {details.subtitle && (
                                <p className='text-[#51b8dc] text-lg md:text-xl'>
                                    {details.subtitle[language]}
                                </p>
                            )}
                        </div>

                        {/* Görsel galerisi - 2'li slider */}
                        {galleryImages.length > 0 && (
                            <GallerySlider
                                images={galleryImages}
                                alt={project.title[language]}
                                onImageClick={(idx) => setLightboxIndex(idx)}
                            />
                        )}

                        {/* Uzun açıklama */}
                        {details.longDescription && (
                            <div>
                                <h3 className='text-2xl font-bold text-white mb-4'>
                                    {language === 'tr' ? 'Hakkında' : 'About'}
                                </h3>
                                <p className='text-[#a8acb8] text-base md:text-lg leading-relaxed whitespace-pre-line'>
                                    {details.longDescription[language]}
                                </p>
                            </div>
                        )}

                        {/* Özellikler listesi */}
                        {details.features && details.features.length > 0 && (
                            <div>
                                <h3 className='text-2xl font-bold text-white mb-4'>
                                    {language === 'tr' ? 'Özellikler' : 'Features'}
                                </h3>
                                <ul className='space-y-2'>
                                    {details.features.map((feature, idx) => (
                                        <li key={idx} className='flex items-start gap-3 text-[#a8acb8] text-base md:text-lg'>
                                            <span className='text-[#51b8dc] mt-1 flex-shrink-0'>
                                                <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'>
                                                    <polyline points='20 6 9 17 4 12' />
                                                </svg>
                                            </span>
                                            <span>{feature[language]}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Yapım süreci / öğrenilenler */}
                        {details.process && (
                            <div>
                                <h3 className='text-2xl font-bold text-white mb-4'>
                                    {language === 'tr' ? 'Süreç ve Öğrenilenler' : 'Process & Learnings'}
                                </h3>
                                <p className='text-[#a8acb8] text-base md:text-lg leading-relaxed whitespace-pre-line'>
                                    {details.process[language]}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox - tam ekran görsel görüntüleyici */}
            {lightboxIndex !== null && (
                <Lightbox
                    images={galleryImages}
                    startIndex={lightboxIndex}
                    alt={project.title[language]}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </>
    );
};

export default ProjectDetailModal;