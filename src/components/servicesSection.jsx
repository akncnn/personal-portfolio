import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FaCode, FaDesktop, FaGamepad, FaBrain } from 'react-icons/fa'; // Uygun ikonları import ettik

const servicesSection = () => {
    const { t } = useLanguage();

    // Servis verilerini LanguageContext'teki anahtarlarla eşleştiriyoruz
    const services = [
        {
            id: 1,
            title: t.services.web.title,
            description: t.services.web.description,
            icon: <FaCode />,
        },
        {
            id: 2,
            title: t.services.desktop.title,
            description: t.services.desktop.description,
            icon: <FaDesktop />,
        },
        {
            id: 3,
            title: t.services.game.title,
            description: t.services.game.description,
            icon: <FaGamepad />,
        },
        {
            id: 4,
            title: t.services.system.title,
            description: t.services.system.description,
            icon: <FaBrain />,
        },
    ];

    return (
        <section id='services' className='bg-[#11162f] text-white py-20 px-5 md:px-20'>
            <div className='text-center font-bold text-2xl py-6'>
                <h1 className='tracking-[0.2em] uppercase'>{t.services.title}</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 md:mx-24 mt-10'>
                {services.map((service) => (
                    <div
                        key={service.id}
                        className='border-2 border-[#4f9ed7]/30 rounded-xl p-8 hover:bg-[#1a2144] hover:border-[#4f9ed7] transition-all duration-300 group'
                    >
                        <div className='flex items-center gap-6 mb-4'>
                            <div className='w-16 h-16 rounded-full border-2 border-[#4f9ed7] flex items-center justify-center text-3xl text-[#4f9ed7] group-hover:bg-[#4f9ed7] group-hover:text-white transition-all'>
                                {service.icon}
                            </div>
                            <h3 className='text-xl md:text-2xl font-bold'>{service.title}</h3>
                        </div>
                        <p className='text-[#7d818d] md:text-lg text-base leading-relaxed'>
                            {service.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default servicesSection;