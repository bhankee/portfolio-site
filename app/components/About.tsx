import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import icons
import { FaXTwitter } from 'react-icons/fa6'

const About: React.FC = () => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 sm:p-12">
            <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-8 sm:gap-16 rounded-xl bg-opacity-80">
                <div className="mt-4 flex flex-col items-center">
                    <Image
                        src="/images/profile_pic.png"
                        alt="Brad profile picture"
                        width={220}
                        height={220}
                        className="mt-4 rounded-full object-cover border-2 border-indigo-600"
                    />

                    <div className="mt-6 flex flex-row gap-6">
                        <Link href="https://github.com/bhankee" target="_blank" rel="noopener noreferrer">
                            <FaGithub size={36} className="text-white-800 hover:text-indigo-600 transition-colors" />
                        </Link>
                        <Link href="https://linkedin.com/in/brad-hankee" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={36} className="text-white-700 hover:text-indigo-600 transition-colors" />
                        </Link>
                        {/* <Link href="https://x.com/brad_hankee" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter size={36} className="text-white-800 hover:text-indigo-600 transition-colors" />
                        </Link> */}
                    </div>
                </div>
                <div className="w-full bg-red p-4 flex flex-col justify-center items-center rounded-xl text-center">
                    <h2 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-200 bg-clip-text text-transparent drop-shadow-lg mb-2">Brad Hankee</h2>
                    <h3 className="text-base sm:text-xl mb-4">Software Developer | JavaScript | Python</h3>
                    <Link
                        href="/resume.pdf"
                        download
                        className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow transition-colors duration-300 hover:from-blue-600 hover:to-purple-600 flex items-center justify-center text-center w-auto"
                    >
                        Download Resume
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default About;