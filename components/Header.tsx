import React from 'react';
import { Menu } from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  onOpenMenu: () => void;
  visitCount: number;
  viewMode: ViewMode;
}

const Header: React.FC<HeaderProps> = ({ onOpenMenu, visitCount, viewMode }) => {
  return (
    <>
      {/* Ticker */}
      <div className="w-full bg-black overflow-hidden whitespace-nowrap relative z-10 py-2.5">
        <div className="inline-block text-[15px] font-bold animate-marquee bg-gradient-to-r from-[red] via-[yellow] to-[violet] bg-clip-text text-transparent px-[100%]">
          Welcome to Dally Update 02 - Copy Best Prompts for Gemini & Image Generation.
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] px-5 py-4 flex justify-between items-center sticky top-0 z-[1000]">
        <div className="flex flex-col items-start">
          <a href="/" className="text-xl font-bold text-dark uppercase leading-tight no-underline">
            Dally Update <span className="text-primary">02</span>
          </a>
          <div className="font-serif text-sm text-[#27ae60] font-semibold mt-0.5">
             {viewMode === 'ADMIN' ? 'Admin Control Panel' : 'Latest Updates'}
          </div>
          <div className="text-[11px] text-[#7f8c8d] bg-[#f0f2f5] px-2 py-0.5 rounded-[20px] mt-1 font-semibold border border-[#e1e4e8]">
            Total Visit : {visitCount.toLocaleString()}
          </div>
        </div>
        
        <div onClick={onOpenMenu} className="text-[28px] cursor-pointer text-dark p-1">
          <Menu />
        </div>
      </div>
    </>
  );
};

export default Header;
