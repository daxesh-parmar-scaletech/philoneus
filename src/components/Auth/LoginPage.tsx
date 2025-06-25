import React, { useState } from 'react';
import InputField from './InputField';
import loginBack from '../../assets/loginBack.jpg';
import { useAuth } from 'contexts/AuthContext';

const LoginPage: React.FC = () => {
    const { login } = useAuth();

    const [isLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched(true);
        if (email.trim() && password.trim()) {
            login(email, password);
        }
    };

    const isFormValid = email.trim() !== '' && password.trim() !== '';

    return (
        <div className='min-h-screen flex flex-col md:flex-row bg-gray-100 font-sans'>
            {/* Left: Background with overlays */}
            <div
                style={{
                    backgroundImage: `url(${loginBack})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                className='md:w-1/2 flex  items-center justify-center  p-8 text-white relative overflow-hidden'
            >
                {/* Overlay for better text visibility */}
                <div className='absolute inset-0 bg-black opacity-80 z-0'></div>
                {/* Existing radial gradient overlay */}
                <div
                    className='absolute inset-0 opacity-10 z-10'
                    style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)' }}
                ></div>
                <div className='relative z-20 flex flex-col items-center justify-center text-center px-4'>
                    <h1 className='text-4xl md:text-2xl font-extrabold mt-8 drop-shadow-lg leading-tight'>Welcome, Philoneos Consultant!</h1>
                    <p className='mt-4 text-lg max-w-md opacity-90 leading-relaxed'>
                        Elevate your consultant practice with our Human + AI augmentation platform. Provide clients with a premium digital consulting
                        environment
                    </p>
                </div>
            </div>
            {/* Right: Login Form */}
            <div className='md:w-1/2 flex items-center justify-center bg-white p-8'>
                <div className='w-full max-w-md p-8 bg-white rounded-xl shadow-2xl space-y-7 border border-gray-100'>
                    <h2 className='text-4xl font-extrabold text-gray-900 mb-6 text-center tracking-tight'> Login</h2>
                    <p className='text-center text-gray-600 mb-8'>Please sign in with your credentials.</p>
                    <form className='space-y-6' onSubmit={handleSubmit} noValidate>
                        <InputField
                            label='Email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched(true)}
                            placeholder='Enter your email'
                            autoComplete='email'
                            error={touched && !email.trim() ? 'Email is required.' : null}
                        />
                        <InputField
                            label='Password'
                            id='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setTouched(true)}
                            placeholder='Enter your password'
                            autoComplete='current-password'
                            error={touched && !password.trim() ? 'Password is required.' : null}
                            showToggle
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                        {/* Error message from API */}
                        <button
                            type='submit'
                            className={`
                                w-full py-3 rounded-lg font-semibold text-white tracking-wide
                                ${
                                    isFormValid && !isLoading
                                        ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out'
                                        : 'bg-blue-400 cursor-not-allowed opacity-80'
                                }
                            `}
                            disabled={!isFormValid || isLoading}
                        >
                            {isLoading ? (
                                <span className='flex items-center justify-center'>
                                    <svg
                                        className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                    >
                                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                        <path
                                            className='opacity-75'
                                            fill='currentColor'
                                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                        ></path>
                                    </svg>
                                    Logging In...
                                </span>
                            ) : (
                                'Login'
                            )}
                        </button>
                        <div className='text-center mt-6 text-gray-600 text-sm'>
                            Don't have an account?
                            <a href='#' className='text-blue-600 hover:underline font-semibold'>
                                Sign Up
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
