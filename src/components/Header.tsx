import React, { useState, useEffect } from 'react';
import { Bell, Search, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { profile, notifications, setIsNotificationsOpen, setIsSearchModalOpen, setActiveTab, language, toggleLanguage, t } = useApp();
  const [timeStr, setTimeStr] = useState('09:41');

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hours}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#070809]/95 backdrop-blur-md border-b border-[#1f2124]">
      {/* Mini Device Status Bar Simulation */}
      <div className="px-5 pt-1.5 pb-1 flex justify-between items-center text-[10px] font-semibold text-[#8e9297] tracking-wider">
        <span>{timeStr}</span>
        <div className="flex items-center gap-1.5 text-[9px]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ef1020]"></span>
          <span className="font-mono">5G</span>
          <span className="tracking-tighter">100%</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="h-14 px-4 flex items-center justify-between">
        {/* Left Side: Brand Logo */}
        <button
          id="btn-header-logo"
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 text-left group transition-transform active:scale-95"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ef1020] to-[#80050d] flex items-center justify-center font-black italic tracking-tighter text-white text-base shadow-[0_0_12px_rgba(239,16,32,0.4)]">
            FG
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black italic tracking-wider text-white leading-none">
              FIXGEAR<span className="text-[#ef1020]">.ID</span>
            </span>
            <span className="text-[8px] font-mono text-[#85898e] tracking-widest leading-none mt-0.5">
              CIRCUIT & COMMUNITY
            </span>
          </div>
        </button>

        {/* Right Side Actions: Language Switcher, Search, Notification Bell, Rider Quick Avatar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Switcher Button */}
          <button
            id="btn-header-language"
            type="button"
            onClick={toggleLanguage}
            className="h-8 px-2 sm:px-2.5 rounded-lg bg-[#111315] hover:bg-[#1a1d22] border border-[#272a2d] hover:border-[#383d46] flex items-center gap-1.5 text-xs font-mono font-bold transition-all active:scale-95 text-[#c2c5c9] hover:text-white group"
            title={t.lang_switch_tooltip}
            aria-label={t.lang_switch_tooltip}
          >
            <Globe className="w-3.5 h-3.5 text-[#ef1020] group-hover:rotate-12 transition-transform" />
            <div className="flex items-center text-[10px] tracking-tight font-black">
              <span className={language === 'id' ? 'text-white underline decoration-[#ef1020] decoration-2 underline-offset-2' : 'text-[#626772]'}>
                ID
              </span>
              <span className="text-[#3b404a] mx-0.5">/</span>
              <span className={language === 'en' ? 'text-white underline decoration-[#ef1020] decoration-2 underline-offset-2' : 'text-[#626772]'}>
                EN
              </span>
            </div>
          </button>

          {/* Search Trigger */}
          <button
            id="btn-header-search"
            onClick={() => setIsSearchModalOpen(true)}
            className="w-8 h-8 rounded-lg bg-[#111315] hover:bg-[#1c1f24] border border-[#272a2d] flex items-center justify-center text-[#c2c5c9] hover:text-white transition-all active:scale-95"
            aria-label={t.btn_search}
            title={t.header_search_placeholder}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notification Trigger */}
          <button
            id="btn-header-notifications"
            onClick={() => setIsNotificationsOpen(true)}
            className="relative w-8 h-8 rounded-lg bg-[#111315] hover:bg-[#1c1f24] border border-[#272a2d] flex items-center justify-center text-[#c2c5c9] hover:text-white transition-all active:scale-95"
            aria-label={t.header_notifications}
            title={t.header_notifications}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ef1020] ring-2 ring-[#070809] animate-pulse"></span>
            )}
          </button>

          {/* Quick Profile Avatar Badge */}
          <button
            id="btn-header-profile"
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-lg bg-[#111315] hover:bg-[#1c1f24] border border-[#272a2d] transition-all active:scale-95"
            title={t.header_my_profile}
          >
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#2a2e33] to-[#0c0e10] border border-[#40454c] overflow-hidden flex items-center justify-center text-[10px] font-black text-white">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to initials if image link breaks
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                'AT'
              )}
            </div>
            <span className="text-[10px] font-black tracking-tight text-[#ef1020]">#027</span>
          </button>
        </div>
      </div>
    </header>
  );
};
