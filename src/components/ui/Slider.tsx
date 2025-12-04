import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
}

export function Slider({ label, value, onChange }: SliderProps) {
  return (
    <div className="flex flex-col gap-3 group">
      <div className="flex justify-between items-center">
        <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium group-hover:text-neutral-600 transition-colors">
          {label}
        </span>
        <span className="text-xs font-mono text-neutral-400 w-8 text-right">
          {value}%
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
