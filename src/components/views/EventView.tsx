import React, { useState } from 'react';
import { Calendar, MapPin, Flag, Flame, CheckCircle2, ChevronRight, Sparkles, AlertCircle, Clock, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EVENTS_DATA } from '../../data/mockData';
import { EventItem } from '../../types';

export const EventView: React.FC = () => {
  const { setSelectedEventForModal, registeredEventIds, profile, setIsRiderPassOpen, t } = useApp();
  const [activeFilter, setActiveFilter] = useState<'UPCOMING' | 'ONGOING' | 'PAST'>('UPCOMING');

  const filteredEvents = EVENTS_DATA.filter((ev) => {
    if (activeFilter === 'UPCOMING') return ev.status === 'OPEN' || ev.status === 'COMING_SOON';
    if (activeFilter === 'ONGOING') return ev.status === 'ONGOING';
    return ev.status === 'COMPLETED';
  });

  const featuredEvent = EVENTS_DATA[0];
  const isRegisteredToFeatured = registeredEventIds.includes(featuredEvent.id);

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-200">
      {/* Event Header Banner */}
      <section className="px-1 pt-3 pb-1">
        <span className="text-[9px] font-mono text-[#85898e] tracking-widest uppercase font-extrabold block">
          SEASON 2026 RACE SERIES
        </span>
        <h1 className="text-2xl font-black italic tracking-tight text-white mt-0.5">
          {t.event_title}
        </h1>
        <p className="text-xs text-[#9aa0ab] mt-1">
          {t.event_subtitle}
        </p>
      </section>

      {/* Filter Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#0e1013] border border-[#23272e] rounded-xl">
        {(['UPCOMING', 'ONGOING', 'PAST'] as const).map((tab) => (
          <button
            key={tab}
            id={`tab-event-${tab.toLowerCase()}`}
            onClick={() => setActiveFilter(tab)}
            className={`py-2 rounded-lg text-[10px] font-black italic tracking-wider transition-all ${
              activeFilter === tab
                ? 'bg-gradient-to-r from-[#ef1020] to-[#b30510] text-white shadow-[0_0_12px_rgba(239,16,32,0.3)]'
                : 'text-[#7e848f] hover:text-white'
            }`}
          >
            {tab === 'UPCOMING' && t.event_tab_upcoming}
            {tab === 'ONGOING' && t.event_tab_ongoing}
            {tab === 'PAST' && t.event_tab_past}
          </button>
        ))}
      </div>

      {/* FEATURED NEXT RACE BANNER */}
      {activeFilter === 'UPCOMING' && (
        <section className="relative rounded-2xl border border-[#52161e] overflow-hidden shadow-[0_10px_35px_rgba(239,16,32,0.25)]">
          <div
            className="p-5 min-h-[260px] relative flex flex-col justify-between bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.2) 100%), url("${featuredEvent.image}")`,
            }}
          >
            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#ef1020] text-white px-3 py-1 text-[9px] font-black italic tracking-wider rounded-r-md uppercase [clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]">
                <Flame className="w-3 h-3" />
                <span>OFFICIAL FLAGSHIP CRIT</span>
              </div>

              <h2 className="text-2xl font-black italic tracking-wide text-white leading-tight">
                {featuredEvent.title}
              </h2>

              <div className="text-xs text-[#dcdfe4] space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#ef1020]" />
                  <span>{featuredEvent.date} • {featuredEvent.time}</span>
                </div>
                <div className="flex items-center gap-2 text-[#abb1bd] text-[11px]">
                  <MapPin className="w-4 h-4 text-[#ef1020]" />
                  <span>{featuredEvent.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#abb1bd] text-[11px]">
                  <Flag className="w-4 h-4 text-[#ef1020]" />
                  <span>{featuredEvent.distance} • {featuredEvent.circuitType}</span>
                </div>
              </div>
            </div>

            {/* Quick Registration Footer */}
            <div className="relative z-10 pt-4 flex items-center justify-between border-t border-[#353941]">
              <div className="text-[10px] font-mono text-[#a1a6b0]">
                Slot Terisi: <strong className="text-white">{featuredEvent.registeredCount}</strong> / {featuredEvent.maxParticipants}
              </div>

              <button
                id="btn-register-featured-event"
                onClick={() => setSelectedEventForModal(featuredEvent)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black italic tracking-wider flex items-center gap-2 shadow-lg transition-all active:scale-95 ${
                  isRegisteredToFeatured
                    ? 'bg-[#10b981] text-white'
                    : 'bg-gradient-to-r from-[#ef1020] to-[#b30510] text-white hover:brightness-110'
                }`}
              >
                {isRegisteredToFeatured ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>SUDAH TERDAFTAR (BIB #027)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>DAFTAR SEKARANG</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* EVENT CATALOG LIST */}
      <section className="rounded-2xl bg-gradient-to-br from-[#121417] to-[#090a0c] border border-[#272a2e] overflow-hidden shadow-lg">
        <div className="h-10 px-3.5 flex items-center justify-between border-b border-[#212429]">
          <span className="text-[10px] font-black italic tracking-wider text-white flex items-center gap-1.5">
            <Flag className="w-3.5 h-3.5 text-[#ef1020]" />
            <span>
              {activeFilter === 'UPCOMING' && 'JADWAL BALAPAN MENDATANG'}
              {activeFilter === 'ONGOING' && 'BALAPAN SEDANG BERLANGSUNG'}
              {activeFilter === 'PAST' && 'HASIL BALAPAN SEBELUMNYA'}
            </span>
          </span>
          <span className="text-[9px] font-mono text-[#808690]">{filteredEvents.length} Event</span>
        </div>

        <div className="divide-y divide-[#212429]">
          {filteredEvents.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#737882]">
              Tidak ada event pada kategori ini.
            </div>
          ) : (
            filteredEvents.map((ev) => {
              const isRegistered = registeredEventIds.includes(ev.id);
              return (
                <div
                  key={ev.id}
                  onClick={() => setSelectedEventForModal(ev)}
                  className="p-4 flex gap-3.5 hover:bg-[#15191f] cursor-pointer transition-colors group"
                >
                  {/* Big Date Stamp */}
                  <div className="w-16 h-20 rounded-xl bg-[#15181d] border border-[#292e37] flex flex-col items-center justify-center text-center shrink-0">
                    <span className="text-xl font-black italic text-white leading-none">{ev.day}</span>
                    <span className="text-[9px] font-mono font-bold text-[#ef1020] uppercase mt-0.5">{ev.month}</span>
                    <span className="text-[8px] font-mono text-[#717781]">{ev.year}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded bg-[#1e2229] text-[#a0a5b0] border border-[#2f3540]">
                        {ev.category}
                      </span>
                      {isRegistered && (
                        <span className="text-[8px] font-mono font-bold text-[#10b981] flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> TERDAFTAR
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-black italic text-white group-hover:text-[#ef1020] transition-colors leading-tight">
                      {ev.title}
                    </h3>

                    <div className="text-[10px] text-[#8e94a0] space-y-0.5">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#ef1020]" />
                        <span>{ev.city} • {ev.circuitType}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#ef1020]" />
                        <span>{ev.distance}</span>
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                          ev.status === 'OPEN'
                            ? 'bg-[#382b08] text-[#e5bd37] border border-[#5d470f]'
                            : ev.status === 'COMPLETED'
                            ? 'bg-[#18191a] text-[#8e94a0]'
                            : 'bg-[#1e2229] text-[#717781]'
                        }`}
                      >
                        {ev.statusLabel}
                      </span>

                      <span className="text-[10px] font-bold text-[#ef1020] flex items-center gap-0.5 group-hover:underline">
                        <span>Detail & Regulasi</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* MY REGISTERED EVENT STATUS CARD */}
      <section className="rounded-2xl bg-gradient-to-br from-[#121417] to-[#090a0c] border border-[#272a2e] overflow-hidden shadow-lg p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#212429] pb-2.5">
          <span className="text-[10px] font-black italic tracking-wider text-white flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#ef1020]" />
            <span>MY EVENT REGISTRATIONS</span>
          </span>
          <button
            onClick={() => setIsRiderPassOpen(true)}
            className="text-[9px] font-bold text-[#ef1020] hover:underline"
          >
            BUKA RIDER PASS →
          </button>
        </div>

        <div className="p-3 rounded-xl bg-[#14171c] border border-[#252930] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ef1020]/20 border border-[#ef1020]/50 flex items-center justify-center text-xs font-black text-[#ef1020] font-mono">
              #01
            </div>
            <div>
              <div className="text-xs font-bold text-white">FG CRITERIUM #01 (Night Race)</div>
              <div className="text-[10px] text-[#8e94a0] font-mono">
                {profile.name} • Assigned Bib <strong className="text-white">#027</strong>
              </div>
            </div>
          </div>
          <span className="text-[9px] font-black uppercase bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 px-2 py-1 rounded-lg">
            CONFIRMED
          </span>
        </div>
      </section>
    </div>
  );
};
