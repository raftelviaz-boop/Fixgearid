import React from 'react';
import { Home, Compass, Flag, Trophy, User, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'event', label: 'Event', icon: Flag },
  { id: 'ranking', label: 'Ranking', icon: Trophy },
  { id: 'profile', label: 'Profile', icon: User },
];

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setIsRiderPassOpen, t } = useApp();

  const navItems: NavItem[] = [
    { id: 'home', label: t.nav_home, icon: Home },
    { id: 'explore', label: t.nav_explore, icon: Compass },
    { id: 'event', label: t.nav_event, icon: Flag },
    { id: 'ranking', label: t.nav_ranking, icon: Trophy },
    { id: 'profile', label: t.nav_profile, icon: User },
  ];

  return (
    <>
      {/* Floating Action Button for Quick Rider Pass access */}
      <div className="fixed bottom-[74px] right-4 z-40 sm:right-[calc(50%-200px)]">
        <button
          id="btn-floating-rider-pass"
          onClick={() => setIsRiderPassOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#ef1020] via-[#c40816] to-[#99040e] text-white text-xs font-black italic tracking-wide shadow-[0_4px_20px_rgba(239,16,32,0.45)] border border-[#ff3e4d]/40 transition-all hover:scale-105 active:scale-95 group"
          title={t.nav_rider_pass}
        >
          <CreditCard className="w-3.5 h-3.5 transition-transform group-hover:rotate-12" />
          <span>{t.nav_rider_pass}</span>
        </button>
      </div>

      {/* Persistent Bottom Navigation */}
      <nav
        id="globalNav"
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#070809]/95 backdrop-blur-xl border-t border-[#22252a] max-w-lg mx-auto pb-[env(safe-area-inset-bottom)]"
        aria-label="Navigasi Utama"
      >
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative flex flex-col items-center justify-center gap-1 transition-all select-none ${
                  isActive ? 'text-white' : 'text-[#737880] hover:text-[#b4b9c2]'
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isActive && (
                  <span className="absolute top-0 left-3 right-3 h-[2.5px] bg-[#ef1020] rounded-full shadow-[0_0_8px_#ef1020]" />
                )}

                <div
                  className={`p-1 rounded-lg transition-transform ${
                    isActive ? 'scale-110 text-[#ef1020]' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`text-[9px] uppercase tracking-wider font-extrabold transition-colors ${
                    isActive ? 'text-white font-black' : 'text-[#7e848d]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
