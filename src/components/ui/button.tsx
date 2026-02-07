import { ReactNode, HTMLAttributes } from 'react';

// Extending HTMLAttributes ensures your Card supports standard 
// div props like 'id', 'style', or 'onClick'.
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div 
      {...props}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`.trim()}
    >
      {children}
    </div>
  );
}