import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/views/HomeView';
import { ExploreView } from './components/views/ExploreView';
import { EventView } from './components/views/EventView';
import { RankingView } from './components/views/RankingView';
import { ProfileView } from './components/views/ProfileView';
import { RiderPassModal } from './components/RiderPassModal';
import { NotificationModal } from './components/NotificationModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { EventRegistrationModal } from './components/EventRegistrationModal';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-[#030405] text-[#f4f4f4] flex justify-center selection:bg-[#ef1020] selection:text-white font-sans antialiased">
      {/* Mobile-centric Frame Container max-w-lg (430px to 480px on desktop) */}
      <div className="w-full max-w-lg min-h-screen bg-gradient-to-b from-[#08090a] via-[#040506] to-[#020304] border-x border-[#1a1c1f] flex flex-col relative shadow-[0_0_80px_rgba(0,0,0,0.85)]">
        {/* Header */}
        <Header />

        {/* Dynamic View Container */}
        <main className="flex-1 px-3.5 pt-2 pb-24 overflow-x-hidden">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'explore' && <ExploreView />}
          {activeTab === 'event' && <EventView />}
          {activeTab === 'ranking' && <RankingView />}
          {activeTab === 'profile' && <ProfileView />}
        </main>

        {/* Bottom Persistent Navigation */}
        <BottomNav />

        {/* Global Floating & Overlay Modals */}
        <RiderPassModal />
        <NotificationModal />
        <GlobalSearchModal />
        <EventRegistrationModal />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
