import React from 'react';
import { FaAws, FaCss3Alt, FaReact, FaHtml5, FaJava, FaJs, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiDotnet, SiTailwindcss, SiMongodb, SiMysql, SiOpenai } from 'react-icons/si';
import { FaLaravel, FaUnity, FaPhp, FaGitAlt } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const technologies = [
    { id: 1, name: '.NET 8 / C#', icon: <SiDotnet />, color: '#512BD0' },
    { id: 2, name: 'React.js', icon: <FaReact />, color: '#61DAFB' },
    { id: 3, name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4' },
    { id: 4, name: 'Laravel', icon: <FaLaravel />, color: '#FF2D20' },
    { id: 9, name: 'PHP', icon: <FaPhp />, color: '#777BB4' },
    { id: 5, name: 'Node.js', icon: <FaNodeJs />, color: '#8CC84B' },
    { id: 6, name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
    { id: 7, name: 'Unity', icon: <FaUnity />, color: '#000000' },
    { id: 8, name: 'Python', icon: <FaPython />, color: '#3776AB' },
    { id: 10, name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
    { id: 11, name: 'AI Integration', icon: <SiOpenai />, color: '#10a37f' },
    { id: 12, name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
];

const experienceSection = () => {
    const { t } = useLanguage();

    return (
        <section id='experience' className='bg-[#11162f] text-white px-5 md:px-20'>
            <div className='text-center font-bold text-2xl py-6'>
                <h1>{t.experience.title}</h1>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 md:mx-24 mt-10'>
                {technologies.map((tech) => (
                    <div
                        key={tech.id}
                        className='flex flex-col items-center justify-center gap-4'
                    >
                        <div
                            className='text-6xl md:text-7xl transition-transform duration-300 hover:scale-110'
                            style={{ color: tech.color }}
                        >
                            {tech.icon}
                        </div>
                        <p className='text-lg md:text-xl font-semibold'>{tech.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default experienceSection;