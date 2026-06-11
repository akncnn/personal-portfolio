import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const aboutSection = () => {
    const { t, language } = useLanguage();

    return (
        <section id='about' className='bg-[#11162f] flex justify-center py-20 px-10'>
            <div className='md:flex gap-8 md:gap-16 items-center md:ml-7'>
                <div className='relative md:w-1/3 md:pr-0 pr-4'>
                    <img src='/img/akincan.png' className='relative z-2 w-full rounded-3xl' />
                    <div className='absolute z-0 top-8 left-4 md:left-8 w-full h-full border-12 border-[#51b8dc] rounded-3xl'>
                    </div>
                </div>
                <div className='md:w-1/2 space-y-8'>
                    <div className='text-white'>
                        <h3 className='mt-20 md:mt-0 md:text-4xl text-2xl font-bold'>{t.about.title}</h3>
                    </div>
                    <div className='text-[#7d818d] md:text-xl text-lg'>
                        {t.about.description}
                    </div>
                    <div className='flex gap-4 pt-4'>
                        <a
                            href="#contact"
                            className="md:py-3 md:px-10 w-30 h-12 md:min-w-48 md:h-16 text-white text-sm md:text-xl font-semibold rounded-lg shadow-lg bg-gradient-to-r from-[#4f9ed7] to-[#4023a5] hover:from-[#3c78a3] hover:to-[#331c85] cursor-pointer transition duration-300 flex items-center justify-center"
                        >
                            {t.about.hireMe}
                        </a>
                        <a
                            href={language === 'tr' ? '/Akincan_Altintas_CV_TR.pdf' : '/Akincan_Altintas_CV_EN.pdf'}
                            download
                            title={language === 'tr' ? 'CV İndir (PDF)' : 'Download CV (PDF)'}
                            className="md:py-3 md:px-10 min-w-34 h-12 md:min-w-48 md:h-16 text-white text-sm md:text-xl font-semibold rounded-lg shadow-lg cursor-pointer border-2 border-[#4f9ed7] hover:border-[#331c85] hover:bg-[#331c85] transition duration-300 flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            {t.about.resume}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default aboutSection;