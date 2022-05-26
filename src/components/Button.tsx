import type { FC } from 'react';
import React from 'react';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  variant: 'primary' | 'secondary' | 'white' | 'danger';
  fullwidth?: boolean;
};

const Button: FC<ButtonProps> = ({
  variant,
  children,
  fullwidth = false,
  ...rest
}) => {
  const getVariant = () => {
    switch (variant) {
      case 'primary':
        return 'inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
      case 'secondary':
        return 'inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
      case 'white':
        return 'inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
      case 'danger':
        return 'inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2';
    }
  };

  return (
    <button
      type="button"
      className={`${getVariant()} ${fullwidth ? 'w-full' : ''}`}
      {...rest}>
      {children}
    </button>
  );
};

export default Button;
