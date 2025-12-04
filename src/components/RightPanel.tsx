import React, { useState } from 'react';
import { Download, Sparkles } from 'lucide-react';
import { Toggle } from './ui/Toggle';
import { Slider } from './ui/Slider';

export function RightPanel() {
  const [toggles, setToggles] = useState({
    roof: true,
    windows: true,
    realism: false,
    lighting: true,
  });

  const [sliders, setSliders] = useState({
    intensity: 85,
    texture: 60,
    shadow: 40,
  });

  return (
    <aside className="w-[320px] h-screen fixed right-0 top-0 glass-panel z-20 flex flex-col p-8 overflow-y-auto">
      <div className="mb-10 animate-fade-in">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} className="text-accent" />
          <h3 className="text-xs uppercase tracking-widest font-bold text-neutral-900">AI Controls</h3>
        </div>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Fine-tune the generation engine for maximum architectural accuracy.
        </p>
      </div>

      <div className="space-y-8 mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="space-y-4">
          <Toggle 
            label="Preserve Roof" 
            active={toggles.roof} 
            onClick={() => setToggles(p => ({ ...p, roof: !p.roof }))} 
          />
          <Toggle 
            label="Preserve Windows" 
            active={toggles.windows} 
            onClick={() => setToggles(p => ({ ...p, windows: !p.windows }))} 
          />
          <Toggle 
            label="High Realism Mode" 
            active={toggles.realism} 
            onClick={() => setToggles(p => ({ ...p, realism: !p.realism }))} 
          />
          <Toggle 
            label="Enhanced Lighting" 
            active={toggles.lighting} 
            onClick={() => setToggles(p => ({ ...p, lighting: !p.lighting }))} 
          />
        </div>

        <div className="h-px bg-neutral-200 w-full" />

        <div className="space-y-8">
          <Slider 
            label="Color Intensity" 
            value={sliders.intensity} 
            onChange={(v) => setSliders(p => ({ ...p, intensity: v }))} 
          />
          <Slider 
            label="Texture Realism" 
            value={sliders.texture} 
            onChange={(v) => setSliders(p => ({ ...p, texture: v }))} 
          />
          <Slider 
            label="Shadow Contrast" 
            value={sliders.shadow} 
            onChange={(v) => setSliders(p => ({ ...p, shadow: v }))} 
          />
        </div>
      </div>

      <div className="mt-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <button className="w-full bg-black text-white h-12 rounded-full flex items-center justify-center gap-2 hover:bg-neutral-800 hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl group">
          <span className="text-sm font-medium">Download Mockup</span>
          <Download size={16} className="group-hover:translate-y-0.5 transition-transform duration-300" />
        </button>
        <p className="text-center text-[10px] text-neutral-400 mt-4 tracking-wide">
          SAVE FINAL IMAGE TO SHARE WITH CLIENT
        </p>
      </div>
    </aside>
  );
}
