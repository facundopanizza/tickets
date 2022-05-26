import type { FC } from 'react';

interface CardProps {
  children: any;
  title?: string;
}

/* This example requires Tailwind CSS v2.0+ */
const Card: FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      {title && <div className="px-4 py-5 sm:px-6">{title}</div>}
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
};

export default Card;
