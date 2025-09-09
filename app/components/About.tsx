import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const About: React.FC = () => {
    return (
        <section id="about" className="w-full grid grid-cols-[1fr_2fr] gap-4 min-h-200 mb-8 border-2 border-blue-600 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-75">
            <div className="w-full bg-blue p-4 border-2 border-green-600 flex justify-center items-center">
                <Image
                    src="/images/profile_pic.png"
                    alt="Brad profile picture"
                    width={320}
                    height={320}
                    className="mt-4 rounded-full object-cover border-2 border-indigo-600"
                />
            </div>
            <div className="w-full bg-red p-4 border-2 border-yellow-600 flex flex-col justify-center items-center">
                <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">Brad Hankee</h2>
                <h3>Software Developer | JavaScript | Python</h3>
                <Link
                    href="./resume.pdf"
                    download
                    className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow transition-colors duration-300 hover:from-blue-600 hover:to-purple-600 flex items-center justify-center text-center w-auto"
                >
                    Download Resume
                </Link>
            </div>



        </section>
    );
}

export default About;