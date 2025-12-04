import React from 'react';
import { LayoutGrid, FolderOpen, Palette, Settings, Command } from 'lucide-react';

const navItems = [
  { icon: LayoutGrid, label: 'Mockups', active: true },
  { icon: FolderOpen, label: 'Projects', active: false },
  { icon: Palette, label: 'Palettes', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export function Sidebar() {
  return (
    <aside className="w-[80px] h-screen flex flex-col items-center py-8 border-r border-border bg-white z-20 fixed left-0 top-0">
      <div className="mb-12">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
          <Command size={16} />
        </div>
      </div>

      <nav className="flex flex-col gap-8 w-full">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="group relative w-full flex flex-col items-center gap-2 py-2 focus:outline-none"
          >
            {item.active && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-accent rounded-r-full" />
            )}
            <div className={`
              p-2 rounded-xl transition-all duration-300 ease-out
              ${item.active ? 'text-black' : 'text-neutral-400 group-hover:text-neutral-600'}
            `}>
              <item.icon size={20} strokeWidth={1.5} />
            </div>
            <span className={`
              text-[9px] uppercase tracking-widest font-medium transition-colors duration-300
              ${item.active ? 'text-black' : 'text-neutral-300 group-hover:text-neutral-500'}
            `}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
