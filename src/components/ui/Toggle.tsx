import React from 'react';

interface ToggleProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function Toggle({ label, active, onClick }: ToggleProps) {
  return (
    <div className="flex items-center justify-between group cursor-pointer py-1" onClick={onClick}>
      <span className="text-sm font-medium text-neutral-600 group-hover:text-black transition-colors duration-200">
        {label}
      </span>
      <div className={`
        w-10 h-6 rounded-full p-1 transition-colors duration-300 ease-out relative
        ${active ? 'bg-black' : 'bg-neutral-200'}
      `}>
        <div className={`
          w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${active ? 'translate-x-4' : 'translate-x-0'}
        `} />
      </div>
    </div>
  );
}
