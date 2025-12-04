import React, { useState } from 'react';
import { Upload, Paintbrush, Loader2 } from 'lucide-react';
import { useImageManipulation } from '../hooks/useImageManipulation';

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
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    isProcessing,
    outputImage,
    error,
    repaintImage,
    clearError,
  } = useImageManipulation();

  const canPaint = uploadedImage !== null && selectedColor !== null;

  const handlePaintHouse = async () => {
    if (!canPaint || !uploadedImage) return;
    clearError();
    await repaintImage(uploadedImage, selectedColor);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHoveringUpload(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHoveringUpload(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHoveringUpload(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

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
            relative rounded-2xl border-2 border-dashed transition-all duration-500 group overflow-hidden bg-white cursor-pointer
            ${isHoveringUpload ? 'border-accent bg-accent/5' : 'border-neutral-200'}
          `}
          onMouseEnter={() => setIsHoveringUpload(true)}
          onMouseLeave={() => setIsHoveringUpload(false)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="absolute top-6 left-6 z-10">
            <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm border border-neutral-100">
              Input
            </span>
          </div>

          {!uploadedImage ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 gap-4">
              <div className={`
                w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center transition-transform duration-500
                ${isHoveringUpload ? 'scale-110 text-accent' : ''}
              `}>
                <Upload size={24} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium tracking-wide">DRAG & DROP HOUSE PHOTO</p>
            </div>
          ) : (
            <img
              src={uploadedImage}
              alt="House Input"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        {/* Output Card */}
        <div className="relative rounded-2xl bg-white shadow-swiss overflow-hidden group border border-neutral-100">
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
            <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm border border-neutral-100">
              Output
            </span>
          </div>

          {isProcessing ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 gap-4">
              <Loader2 size={32} className="animate-spin" />
              <p className="text-sm font-medium tracking-wide">Processing image...</p>
            </div>
          ) : error ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-red-400 gap-4 p-8">
              <p className="text-sm font-medium tracking-wide text-center">{error}</p>
            </div>
          ) : outputImage ? (
            <img
              src={outputImage}
              alt="House Output"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300 text-sm">
              AI-generated output will appear here
            </div>
          )}
        </div>
      </div>

      {/* Palette Selector and Paint Button */}
      <div className="flex items-center gap-4 self-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-neutral-100 inline-flex gap-2">
          {PALETTES.map((color) => {
            const isSelected = selectedColor.name === color.name;
            return (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`
                  group relative px-4 py-3 rounded-xl flex items-center gap-3
                  transition-all duration-300 ease-out cursor-pointer
                  ${isSelected
                    ? 'bg-black text-white shadow-lg scale-105 ring-2 ring-black ring-offset-2'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:scale-102 active:scale-95'
                  }
                `}
              >
                <div
                  className={`
                    w-4 h-4 rounded-full shadow-md transition-all duration-300
                    ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110' : ''}
                    ${color.border ? 'border border-neutral-200' : ''}
                  `}
                  style={{ backgroundColor: color.hex }}
                />
                <span className={`
                  text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-300
                  ${isSelected ? 'font-bold' : ''}
                `}>
                  {color.name}
                </span>
                {isSelected && (
                  <div className="ml-1 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Paint House Button */}
        <button
          onClick={handlePaintHouse}
          disabled={!canPaint || isProcessing}
          className={`
            px-6 py-3 rounded-xl flex items-center gap-3 font-bold text-sm tracking-wide
            transition-all duration-300 ease-out
            ${canPaint && !isProcessing
              ? 'bg-accent text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }
          `}
        >
          {isProcessing ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Paintbrush size={18} />
          )}
          <span>{isProcessing ? 'Painting...' : 'Paint House'}</span>
        </button>
      </div>
    </main>
  );
}
