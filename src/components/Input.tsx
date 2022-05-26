import { ExclamationCircleIcon } from '@heroicons/react/outline';
import type { FC } from 'react';
import React from 'react';

type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  name: string;
  register: any;
  errors: any;
  type?: string;
  label?: string;
};

const Input: FC<InputProps> = ({ label, type = "text", name, register, errors, ...rest }) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={name}
          className={`shadow-sm ${
            errors[name]
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300  focus:ring-indigo-500 focus:border-indigo-500'
          } border py-2 block w-full sm:text-sm rounded-md`}
          {...register(name)}
          {...rest}
        />
        {errors[name] && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default Input;
