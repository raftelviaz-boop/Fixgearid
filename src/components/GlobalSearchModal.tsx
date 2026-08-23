import React, { useState, useMemo } from 'react';
import { X, Search, User, Users, Flag, MapPin, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RIDERS_DATA, TEAMS_DATA, EVENTS_DATA, SPOTS_ROUTES_DATA } from '../data/mockData';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, setActiveTab, setSelectedEventForModal } = useApp();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        riders: RIDERS_DATA.slice(0, 3),
        teams: TEAMS_DATA.slice(0, 2),
        events: EVENTS_DATA.slice(0, 2),
        spots: SPOTS_ROUTES_DATA.slice(0, 2),
      };
    }

    return {
      riders: RIDERS_DATA.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.handle.toLowerCase().includes(q) ||
          r.team.toLowerCase().includes(q) ||
          r.city.toLowerCase().includes(q)
      ),
      teams: TEAMS_DATA.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.code.toLowerCase().includes(q) ||
          t.city.toLowerCase().includes(q)
      ),
      events: EVENTS_DATA.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      ),
      spots: SPOTS_ROUTES_DATA.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      ),
    };
  }, [query]);

  if (!isSearchModalOpen) return null;

  const totalFound =
    searchResults.riders.length +
    searchResults.teams.length +
    searchResults.events.length +
    searchResults.spots.length;

  return (
    <div
      id="modal-search-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsSearchModalOpen(false);
      }}
    >
      <div className="w-full max-w-lg mt-6 bg-[#0d0f12] border border-[#272b30] rounded-2xl overflow-hidden shadow-2xl">
        {/* Search Input Bar */}
        <div className="p-3.5 bg-[#121519] border-b border-[#212429] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#ef1020] shrink-0" />
          <input
            id="input-global-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari rider, tim, balapan, rute spot..."
            className="w-full bg-transparent text-white placeholder-[#686e78] text-sm font-medium focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#828892] hover:text-white px-1.5 py-0.5"
            >
              Hapus
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="w-7 h-7 rounded-full bg-[#1b1e22] text-[#8e9297] hover:text-white flex items-center justify-center shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 max-h-[70vh] overflow-y-auto space-y-4">
          {totalFound === 0 ? (
            <div className="text-center py-10 text-xs text-[#707680]">
              Tidak ada hasil untuk &quot;{query}&quot;. Coba kata kunci seperti &quot;Crit&quot;, &quot;Bandung&quot;, atau &quot;Azis&quot;.
            </div>
          ) : (
            <>
              {/* Riders Section */}
              {searchResults.riders.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#808690] uppercase mb-2">
                    <User className="w-3 h-3 text-[#ef1020]" />
                    <span>Riders ({searchResults.riders.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.riders.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          setActiveTab('ranking');
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#13161a] hover:bg-[#1c2026] border border-[#23272e] text-left transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#22272e] border border-[#353b44] flex items-center justify-center text-xs font-black text-white shrink-0">
                            {r.avatarInitials}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white group-hover:text-[#ef1020] transition-colors">
                              {r.name}
                            </div>
                            <div className="text-[10px] text-[#868c96]">
                              {r.team} • {r.city}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#ef1020]">
                            {r.points} PTS
                          </span>
                          <ChevronRight className="w-4 h-4 text-[#525760] group-hover:text-white transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Teams Section */}
              {searchResults.teams.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#808690] uppercase mb-2">
                    <Users className="w-3 h-3 text-[#3b82f6]" />
                    <span>Teams ({searchResults.teams.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.teams.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          setActiveTab('explore');
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#13161a] hover:bg-[#1c2026] border border-[#23272e] text-left transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0"
                            style={{ backgroundColor: t.color }}
                          >
                            {t.code}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white group-hover:text-[#ef1020] transition-colors">
                              {t.name}
                            </div>
                            <div className="text-[10px] text-[#868c96]">
                              {t.city} • {t.membersCount} Riders
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-white">
                            {t.totalPoints} PTS
                          </span>
                          <ChevronRight className="w-4 h-4 text-[#525760] group-hover:text-white transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Events Section */}
              {searchResults.events.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#808690] uppercase mb-2">
                    <Flag className="w-3 h-3 text-[#10b981]" />
                    <span>Events & Races ({searchResults.events.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.events.map((ev) => (
                      <button
                        key={ev.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          setSelectedEventForModal(ev);
                          setActiveTab('event');
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#13161a] hover:bg-[#1c2026] border border-[#23272e] text-left transition-all group"
                      >
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-[#ef1020] transition-colors">
                            {ev.title}
                          </div>
                          <div className="text-[10px] text-[#868c96]">
                            {ev.date} • {ev.city} ({ev.category})
                          </div>
                        </div>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#20252c] text-[#a0a6b0]">
                          {ev.statusLabel}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Spots Section */}
              {searchResults.spots.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#808690] uppercase mb-2">
                    <MapPin className="w-3 h-3 text-[#f59e0b]" />
                    <span>Spots & Routes ({searchResults.spots.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.spots.map((sp) => (
                      <button
                        key={sp.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          setActiveTab('explore');
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#13161a] hover:bg-[#1c2026] border border-[#23272e] text-left transition-all group"
                      >
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-[#ef1020] transition-colors">
                            {sp.title}
                          </div>
                          <div className="text-[10px] text-[#868c96]">
                            {sp.city} • {sp.distance}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#525760] group-hover:text-white" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
