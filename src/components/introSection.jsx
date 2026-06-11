import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const introsection = () => {
    const { t } = useLanguage();

    return (
        <section id='home' className='bg-[#11162f] md:size-full text-white'>
            <div className='md:mx-24 mx-2 md:p-24 pl-8'>
                <h5 className='font-extrabold text-2xl text-[#747887]'>{t.intro.greeting}</h5>
                <h1 className='text-4xl sm:text-7xl font-serif font-extrabold'>
                    Modern <br></br> FULL STACK<br></br> DEVELOPER
                    <span className='md:inline-block text-[#4f9ed7] bg-[#4f9ed7] size-0 lg:size-5 rounded-sm ml-2 mt-8 md:align-middle'></span>
                </h1>

                <div className='mt-5'>
                    <a
                        href="#portfolio"
                        className="py-3 px-10 md:py-5 md:px-10 mb-10 text-md font-semibold rounded-lg shadow-lg bg-gradient-to-r from-[#4f9ed7] to-[#4023a5] hover:from-[#3c78a3] hover:to-[#331c85] cursor-pointer"
                    >
                        {t.intro.previousProject}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default introsection;