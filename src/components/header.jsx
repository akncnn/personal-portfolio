import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, toggleLanguage, t } = useLanguage();

    const navLinks = [
        { name: t.nav.home, href: '#home' },
        { name: t.nav.about, href: '#about' },
        { name: t.nav.portfolio, href: '#portfolio' },
        { name: t.nav.services, href: '#services' },
        { name: t.nav.experience, href: '#experience' },
    ];

    return (
        <header className="bg-[#11162f] text-white font-bold p-4 pt-8">
            <div className="flex justify-between items-center">
                <nav className="hidden md:flex ml-24 items-center space-x-8">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className={`text-sm tracking-widest hover:text-[#28536c] transition-colors ${index === 0 ? 'text-[#4084ac]' : 'text-white'
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-4 mr-24">
                    <button
                        onClick={toggleLanguage}
                        className="px-3 py-1 text-xs font-semibold rounded-md border border-[#4f9ed7] text-white hover:bg-[#4f9ed7] transition-colors cursor-pointer"
                    >
                        {language === 'en' ? 'TR' : 'EN'}
                    </button>

                    <a
                        href="#contact"
                        className="px-8 py-2 text-sm font-semibold rounded-lg shadow-lg bg-gradient-to-r from-[#4f9ed7] to-[#4023a5] hover:from-[#3c78a3] hover:to-[#331c85] cursor-pointer"
                    >
                        {t.nav.contact}
                    </a>
                </div>

                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                    </svg>
                </button>
            </div>

            <div
                className={`md:hidden transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
            >
                <nav className="flex flex-col space-y-2">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`block p-2 text-sm tracking-widest hover:bg-gray-800 transition-colors ${index === 0 ? 'text-blue-400' : 'text-white'
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}
                    <button
                        onClick={() => {
                            toggleLanguage();
                            setIsOpen(false);
                        }}
                        className="block p-2 text-sm tracking-widest text-white hover:bg-gray-800 transition-colors text-left"
                    >
                        {language === 'en' ? 'TR' : 'EN'}
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;