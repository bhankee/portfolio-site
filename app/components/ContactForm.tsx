"use client"
import React, { FormEvent } from 'react';
import { sendEmail } from '../utils/send-email';

import { useForm } from 'react-hook-form';

export type FormData = {
    name: string;
    email: string;
    message: string;
};

const ContactForm: React.FC = () => {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = async (data: FormData, e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/email', {
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });
            console.log('Form submitted, response:', res);

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };



    return (
        <div className="min-h-200 max-w-lg mx-auto p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Contact Me</h2>
            {false ? (
                <div className="text-green-600 text-center font-semibold">Thank you for your message!</div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder=" Name"
                        {...register('name', { required: true })}
                        className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        {...register('email', { required: true })}
                        className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    />
                    <textarea
                        placeholder="Your Message"
                        {...register('message', { required: true })}
                        rows={5}
                        className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
                    >
                        Send Message
                    </button>
                </form>
            )}
        </div>
    );
};

export default ContactForm;