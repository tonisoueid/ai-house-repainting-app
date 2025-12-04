import React, { useState } from 'react';
import { Upload, ArrowRight, Check } from 'lucide-react';

const PALETTES = [
  { name: 'Swiss White', hex: '#FFFFFF', border: true },
  { name: 'Midnight Black', hex: '#171717' },
  { name: 'Slate Blue', hex: '#475569' },
  { name: 'Forest Green', hex: '#14532d' },
  { name: 'Burnt Sienna', hex: '#7c2d12' },
  { name: 'Classic Navy', hex: '#1e3a8a' },
];

export function MainWorkspace() {
  const [selectedColor, setSelectedColor] = useState(PALETTES[2]);
  const [isHoveringUpload, setIsHoveringUpload] = useState(false);

  return (
    <main className="flex-1 ml-[80px] mr-[320px] min-h-screen bg-surface swiss-grid p-12 flex flex-col">
      {/* Header */}
      <header className="mb-16 animate-slide-up">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-md">
            Beta v2.0
          </span>
          <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest">
            Powered by Nano Banana Pro
          </span>
        </div>
        <h1 className="text-5xl font-bold tracking-tighter text-neutral-900 mb-4 leading-[1.1]">
          Repaint Any House<br />in Seconds.
        </h1>
        <p className="text-lg text-neutral-500 font-light max-w-md leading-relaxed">
          Upload a photo, select a color, and let our Swiss-engineered AI handle the rest. Close more jobs with instant previews.
        </p>
      </header>

      {/* Comparison Area */}
      <div className="grid grid-cols-2 gap-8 mb-12 flex-1 min-h-[400px]">
        {/* Input Card */}
        <div 
          className={`
            relative rounded-2xl border-2 border-dashed transition-all duration-500 group overflow-hidden bg-white
            ${isHoveringUpload ? 'border-accent bg-accent/5' : 'border-neutral-200'}
          `}
          onMouseEnter={() => setIsHoveringUpload(true)}
          onMouseLeave={() => setIsHoveringUpload(false)}
        >
          <div className="absolute top-6 left-6 z-10">
            <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm border border-neutral-100">
              Input
            </span>
          </div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 gap-4">
            <div className={`
              w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center transition-transform duration-500
              ${isHoveringUpload ? 'scale-110 text-accent' : ''}
            `}>
              <Upload size={24} strokeWidth={1.5} />
            </div>
            <p className="text-sm font-medium tracking-wide">DRAG & DROP HOUSE PHOTO</p>
          </div>
          
          {/* Placeholder Image (Simulating uploaded state for design) */}
          <img 
            src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="House Input"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-multiply grayscale"
          />
        </div>

        {/* Output Card */}
        <div className="relative rounded-2xl bg-white shadow-swiss overflow-hidden group border border-neutral-100">
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
            <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm border border-neutral-100">
              Output
            </span>
            <span className="px-3 py-1 bg-black/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedColor.hex }} />
              {selectedColor.name}
            </span>
          </div>

          <img 
            src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="House Output"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Color Overlay Simulation */}
          <div 
            className="absolute inset-0 mix-blend-multiply transition-colors duration-500 pointer-events-none"
            style={{ backgroundColor: selectedColor.hex, opacity: 0.4 }}
          />
        </div>
      </div>

      {/* Palette Selector */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-neutral-100 inline-flex gap-2 self-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
        {PALETTES.map((color) => (
          <button
            key={color.name}
            onClick={() => setSelectedColor(color)}
            className={`
              group relative px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-300
              ${selectedColor.name === color.name ? 'bg-black text-white shadow-lg scale-105' : 'hover:bg-neutral-50 text-neutral-600'}
            `}
          >
            <div 
              className={`w-4 h-4 rounded-full shadow-sm ${color.border ? 'border border-neutral-200' : ''}`}
              style={{ backgroundColor: color.hex }}
            />
            <span className="text-xs font-medium tracking-wide whitespace-nowrap">
              {color.name}
            </span>
            {selectedColor.name === color.name && (
              <Check size={12} className="text-white ml-1" />
            )}
          </button>
        ))}
      </div>
    </main>
  );
}
