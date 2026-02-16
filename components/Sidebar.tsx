import React from 'react';
import { X, Home, Mail, Facebook, LayoutDashboard } from 'lucide-react';
import { ViewMode } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: ViewMode;
  onToggleMode: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentMode, onToggleMode }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[2500] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[3000] shadow-[-5px_0_15px_rgba(0,0,0,0.1)] transition-transform duration-400 pt-[60px] overflow-x-hidden ${isOpen ? 'translate-x-0' : 'translate-x-[300px]'}`}
      >
        <button 
          onClick={onClose}
          className="absolute top-2.5 right-5 text-4xl text-red-500 border-none bg-transparent cursor-pointer"
        >
          &times;
        </button>

        <div className="text-center mb-5 text-[#888] text-sm tracking-widest">MENU</div>

        <nav className="flex flex-col">
          <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }} className="px-6 py-4 text-base font-semibold text-dark border-b border-gray-100 hover:bg-gray-50 flex items-center gap-2.5 transition-colors">
            <Home size={18} /> Home
          </a>
          <a href="mailto:contact@dallyupdate.com" className="px-6 py-4 text-base font-semibold text-dark border-b border-gray-100 hover:bg-gray-50 flex items-center gap-2.5 transition-colors">
            <Mail size={18} /> Email Me
          </a>
          <a href="#" className="px-6 py-4 text-base font-semibold text-dark border-b border-gray-100 hover:bg-gray-50 flex items-center gap-2.5 transition-colors">
            <Facebook size={18} /> Facebook
          </a>
          
          <div className="mt-8 px-6">
             <div className="text-xs text-gray-400 mb-2 uppercase font-bold">Admin Controls</div>
             <button 
               onClick={() => {
                 onToggleMode();
                 onClose();
               }}
               className={`w-full py-3 px-4 rounded-lg flex items-center gap-2 font-bold transition-colors ${currentMode === 'ADMIN' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-primary'}`}
             >
                <LayoutDashboard size={18} />
                {currentMode === 'ADMIN' ? 'Exit Admin Panel' : 'Go to Admin Panel'}
             </button>
          </div>
        </nav>

        <div className="absolute bottom-5 w-full text-center text-xs text-[#aaa]">
          Version 1.0 (Dally)
        </div>
      </div>
    </>
  );
};

export default Sidebar;
