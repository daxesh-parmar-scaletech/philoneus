import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    placeholder?: string;
    error?: string | null;
    type?: string;
    autoComplete?: string;
    showToggle?: boolean;
    showPassword?: boolean;
    setShowPassword?: (show: boolean) => void;
}

export const inputClasses =
    'w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out';

const InputField: React.FC<InputFieldProps> = ({
    label,
    id,
    value,
    onChange,
    onBlur,
    placeholder,
    error,
    type = 'text',
    autoComplete,
    showToggle = false,
    showPassword = false,
    setShowPassword,
    ...rest
}) => {
    return (
        <div className={showToggle ? 'relative' : ''}>
            <label className='block text-gray-800 text-sm font-semibold mb-2' htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                type={showToggle && showPassword ? 'text' : type}
                className={inputClasses + (showToggle ? ' pr-10' : '')}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                autoComplete={autoComplete}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                {...rest}
            />
            {showToggle && setShowPassword && (
                <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-7'
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? (
                        <svg className='h-5 w-5 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M13.875 18.825A10.05 10.05 0 0112 20c-5.14 0-9.282-3.882-9.923-8.814l-.077-.186A11.05 11.05 0 0112 4c1.785 0 3.486.643 4.8 1.76l-1.39-1.39C14.736 3.655 13.432 3 12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c1.432 0 2.736-.355 3.9-1.01l-1.39-1.39zM12 15a3 3 0 100-6 3 3 0 000 6z'
                            />
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M15 12a3 3 0 11-6 0 3 3 0 016 0zM20 12c-1.546 2.654-4.248 4.5-7.5 4.5-3.252 0-5.954-1.846-7.5-4.5M20 12c-1.546-2.654-4.248-4.5-7.5-4.5-3.252 0-5.954-1.846-7.5-4.5'
                            />
                        </svg>
                    ) : (
                        <svg className='h-5 w-5 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                            />
                        </svg>
                    )}
                </button>
            )}
            {error && (
                <p id={`${id}-error`} className='text-red-600 text-sm mt-2 flex items-center'>
                    <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            fillRule='evenodd'
                            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                            clipRule='evenodd'
                        ></path>
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputField;
