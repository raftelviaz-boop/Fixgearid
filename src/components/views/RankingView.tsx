import React, { useState, useMemo } from 'react';
import { Trophy, Search, ChevronRight, Zap, Crown, User, Users, X, Award, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RIDERS_DATA, TEAMS_DATA } from '../../data/mockData';
import { RankingCategory, Rider, Team } from '../../types';

export const RankingView: React.FC = () => {
  const { profile, t } = useApp();
  const [selectedSeason, setSelectedSeason] = useState('SEASON 2026');
  const [selectedRegion, setSelectedRegion] = useState('ALL REGION');
  const [activeCategory, setActiveCategory] = useState<RankingCategory>('overall-rider');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiderModal, setSelectedRiderModal] = useState<Rider | null>(null);

  const categories: { id: RankingCategory; label: string }[] = [
    { id: 'overall-rider', label: t.ranking_tab_overall_rider },
    { id: 'season-rider', label: t.ranking_tab_season_rider },
    { id: 'overall-team', label: t.ranking_tab_overall_team },
    { id: 'season-team', label: t.ranking_tab_season_team },
    { id: 'rookie-rider', label: t.ranking_tab_rookie_rider },
    { id: 'rookie-team', label: t.ranking_tab_rookie_team },
  ];

  // Derive leaderboard data based on activeCategory and search query
  const rankingList = useMemo(() => {
    const isTeam = activeCategory.includes('team');
    const isRookie = activeCategory.includes('rookie');

    if (isTeam) {
      let list = [...TEAMS_DATA];
      if (selectedRegion !== 'ALL REGION') {
        list = list.filter((t) => t.city.toUpperCase().includes(selectedRegion.toUpperCase()));
      }
      if (searchQuery) {
        list = list.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.code.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      return list.sort((a, b) => b.totalPoints - a.totalPoints);
    } else {
      let list = [...RIDERS_DATA];
      if (isRookie) {
        list = list.filter((r) => r.status === 'ROOKIE');
      }
      if (selectedRegion !== 'ALL REGION') {
        list = list.filter((r) => r.city.toUpperCase().includes(selectedRegion.toUpperCase()));
      }
      if (searchQuery) {
        list = list.filter(
          (r) =>
            r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.city.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return list.sort((a, b) => b.points - a.points);
    }
  }, [activeCategory, selectedRegion, searchQuery]);

  const isTeamCategory = activeCategory.includes('team');
  const top3 = rankingList.slice(0, 3);
  const restRankings = rankingList.slice(3);

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-200">
      {/* Ranking Header Banner */}
      <section className="px-1 pt-3 pb-1">
        <span className="text-[9px] font-mono text-[#85898e] tracking-widest uppercase font-extrabold block">
          OFFICIAL FG STANDINGS
        </span>
        <h1 className="text-2xl font-black italic tracking-tight text-white mt-0.5">
          {t.ranking_title}
        </h1>
        <p className="text-xs text-[#9aa0ab] mt-0.5 font-mono">
          {t.ranking_subtitle}
        </p>

        {/* Season & Region Filters */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <select
            id="select-season"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="bg-[#111317] border border-[#262a32] text-white text-xs font-bold font-mono rounded-xl p-2.5 focus:outline-none focus:border-[#ef1020]"
          >
            <option>SEASON 2026</option>
            <option>SEASON 2025</option>
            <option>SEASON 2024</option>
          </select>

          <select
            id="select-region"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-[#111317] border border-[#262a32] text-white text-xs font-bold font-mono rounded-xl p-2.5 focus:outline-none focus:border-[#ef1020]"
          >
            <option>ALL REGION</option>
            <option>INDONESIA</option>
            <option>JAKARTA</option>
            <option>BANDUNG</option>
            <option>BOGOR</option>
            <option>YOGYAKARTA</option>
            <option>SURABAYA</option>
          </select>
        </div>
      </section>

      {/* MY RANKING SNAPSHOT BAR */}
      <section className="rounded-2xl bg-gradient-to-br from-[#1b0a0e] via-[#101215] to-[#08090a] border border-[#54161f] p-4 shadow-[0_4px_25px_rgba(239,16,32,0.15)] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] font-mono text-[#ef1020] font-bold uppercase tracking-widest block">
              MY RANKING STATUS
            </span>
            <h2 className="text-lg font-black italic text-white mt-0.5">{profile.name}</h2>
            <div className="text-[10px] text-[#8e94a0] font-mono">
              FIXGEAR.ID CREW <span className="text-[#ef1020] font-bold">FGC</span>
            </div>
          </div>
          <div className="text-3xl font-black italic text-white font-mono">
            #{String(profile.stats.overallRanking).padStart(3, '0')}
          </div>
        </div>

        <div className="grid grid-cols-4 divide-x divide-[#2e151a] border-t border-[#3a151b] pt-2.5 text-center">
          <div>
            <span className="text-xs font-black text-white font-mono">#{String(profile.stats.overallRanking).padStart(3, '0')}</span>
            <span className="text-[7px] text-[#8a8f9a] font-mono block uppercase mt-0.5">OVERALL</span>
          </div>
          <div>
            <span className="text-xs font-black text-white font-mono">#{String(profile.stats.seasonRanking).padStart(3, '0')}</span>
            <span className="text-[7px] text-[#8a8f9a] font-mono block uppercase mt-0.5">SEASON</span>
          </div>
          <div>
            <span className="text-xs font-black text-[#ef1020] font-mono">#{String(profile.stats.teamRanking).padStart(3, '0')}</span>
            <span className="text-[7px] text-[#8a8f9a] font-mono block uppercase mt-0.5">TEAM</span>
          </div>
          <div>
            <span className="text-xs font-black text-[#ffd13b] font-mono">{profile.stats.points}</span>
            <span className="text-[7px] text-[#8a8f9a] font-mono block uppercase mt-0.5">POINTS</span>
          </div>
        </div>
      </section>

      {/* SEARCH RIDER / TEAM INPUT */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#808690] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          id="input-ranking-search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari rider atau squad dalam leaderboard..."
          className="w-full bg-[#111317] border border-[#262a32] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-[#606670] focus:outline-none focus:border-[#ef1020]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#808690] hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* CATEGORY SELECTOR TABS */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`tab-ranking-${cat.id}`}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-2 rounded-xl text-[10px] font-black italic tracking-wider whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-[#ef1020] to-[#b80612] text-white shadow-[0_0_12px_rgba(239,16,32,0.3)]'
                : 'bg-[#121418] border border-[#23272e] text-[#808690] hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* LEADERBOARD PODIUM & LIST */}
      <section className="rounded-2xl bg-gradient-to-br from-[#121417] to-[#090a0c] border border-[#272a2e] overflow-hidden shadow-lg">
        <div className="h-10 px-3.5 flex items-center justify-between border-b border-[#212429]">
          <span className="text-[10px] font-black italic tracking-wider text-white flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-[#ef1020]" />
            <span className="uppercase">{categories.find((c) => c.id === activeCategory)?.label}</span>
          </span>
          <span className="text-[9px] font-mono text-[#808690]">Updated: 22 Aug 2026</span>
        </div>

        {/* 3D Visual Podium (For Top 3) */}
        {top3.length > 0 && !searchQuery && (
          <div className="p-4 bg-[radial-gradient(ellipse_at_top,rgba(239,16,32,0.15)_0%,transparent_70%)] border-b border-[#212429]">
            <div className="grid grid-cols-3 gap-2 items-end min-h-[190px]">
              {/* #2 Rank (Silver) */}
              {top3[1] && (
                <div
                  onClick={() => !isTeamCategory && setSelectedRiderModal(top3[1] as Rider)}
                  className="text-center p-2 rounded-xl bg-[#13161c] border border-[#30353f] hover:border-[#bfc3c8] cursor-pointer transition-all flex flex-col items-center justify-end min-h-[155px]"
                >
                  <div className="text-[9px] font-black text-[#bfc3c8] font-mono">#2</div>
                  <div className="text-sm my-0.5 text-[#bfc3c8]">🥈</div>
                  <div className="w-11 h-11 rounded-full border-2 border-[#bfc3c8] overflow-hidden bg-[#1f242c] mb-1">
                    {isTeamCategory ? (
                      <div
                        className="w-full h-full flex items-center justify-center font-black text-xs text-white"
                        style={{ backgroundColor: (top3[1] as Team).color }}
                      >
                        {(top3[1] as Team).code}
                      </div>
                    ) : (
                      <img
                        src={(top3[1] as Rider).avatar}
                        alt={(top3[1] as Rider).name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <span className="text-[10px] font-black italic text-white block truncate max-w-full">
                    {isTeamCategory ? (top3[1] as Team).name : (top3[1] as Rider).name}
                  </span>
                  <span className="text-[8px] font-mono text-[#8e94a0] block truncate">
                    {isTeamCategory ? `${(top3[1] as Team).city}` : (top3[1] as Rider).team}
                  </span>
                  <span className="text-[10px] font-black font-mono text-white mt-1">
                    {isTeamCategory ? (top3[1] as Team).totalPoints : (top3[1] as Rider).points} PTS
                  </span>
                </div>
              )}

              {/* #1 Rank (Gold) */}
              {top3[0] && (
                <div
                  onClick={() => !isTeamCategory && setSelectedRiderModal(top3[0] as Rider)}
                  className="text-center p-2.5 rounded-xl bg-gradient-to-b from-[#240e13] to-[#12141a] border border-[#ef1020]/70 hover:border-[#f2bd16] cursor-pointer transition-all flex flex-col items-center justify-end min-h-[185px] shadow-[0_0_20px_rgba(239,16,32,0.2)]"
                >
                  <div className="text-[10px] font-black text-[#f2bd16] font-mono">#1 CHAMPION</div>
                  <Crown className="w-5 h-5 text-[#f2bd16] my-0.5 animate-bounce" />
                  <div className="w-14 h-14 rounded-full border-2 border-[#f2bd16] overflow-hidden bg-[#1f242c] mb-1 shadow-[0_0_12px_#f2bd16]">
                    {isTeamCategory ? (
                      <div
                        className="w-full h-full flex items-center justify-center font-black text-sm text-white"
                        style={{ backgroundColor: (top3[0] as Team).color }}
                      >
                        {(top3[0] as Team).code}
                      </div>
                    ) : (
                      <img
                        src={(top3[0] as Rider).avatar}
                        alt={(top3[0] as Rider).name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <span className="text-xs font-black italic text-[#f2bd16] block truncate max-w-full">
                    {isTeamCategory ? (top3[0] as Team).name : (top3[0] as Rider).name}
                  </span>
                  <span className="text-[9px] font-mono text-[#abb0bb] block truncate">
                    {isTeamCategory ? `${(top3[0] as Team).city}` : (top3[0] as Rider).team}
                  </span>
                  <span className="text-xs font-black font-mono text-white mt-1 bg-[#ef1020]/30 px-2 py-0.5 rounded">
                    {isTeamCategory ? (top3[0] as Team).totalPoints : (top3[0] as Rider).points} PTS
                  </span>
                </div>
              )}

              {/* #3 Rank (Bronze) */}
              {top3[2] && (
                <div
                  onClick={() => !isTeamCategory && setSelectedRiderModal(top3[2] as Rider)}
                  className="text-center p-2 rounded-xl bg-[#13161c] border border-[#30353f] hover:border-[#a87852] cursor-pointer transition-all flex flex-col items-center justify-end min-h-[145px]"
                >
                  <div className="text-[9px] font-black text-[#a87852] font-mono">#3</div>
                  <div className="text-sm my-0.5 text-[#a87852]">🥉</div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#a87852] overflow-hidden bg-[#1f242c] mb-1">
                    {isTeamCategory ? (
                      <div
                        className="w-full h-full flex items-center justify-center font-black text-xs text-white"
                        style={{ backgroundColor: (top3[2] as Team).color }}
                      >
                        {(top3[2] as Team).code}
                      </div>
                    ) : (
                      <img
                        src={(top3[2] as Rider).avatar}
                        alt={(top3[2] as Rider).name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <span className="text-[10px] font-black italic text-white block truncate max-w-full">
                    {isTeamCategory ? (top3[2] as Team).name : (top3[2] as Rider).name}
                  </span>
                  <span className="text-[8px] font-mono text-[#8e94a0] block truncate">
                    {isTeamCategory ? `${(top3[2] as Team).city}` : (top3[2] as Rider).team}
                  </span>
                  <span className="text-[10px] font-black font-mono text-white mt-1">
                    {isTeamCategory ? (top3[2] as Team).totalPoints : (top3[2] as Rider).points} PTS
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Full Roster / Remaining Standings Table */}
        <div className="divide-y divide-[#212429]">
          {(searchQuery ? rankingList : restRankings).map((item, idx) => {
            const actualRank = searchQuery ? idx + 1 : idx + 4;
            const isRider = 'points' in item;

            return (
              <div
                key={item.id}
                onClick={() => isRider && setSelectedRiderModal(item as Rider)}
                className="p-3.5 flex items-center justify-between hover:bg-[#15191f] cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 text-center text-xs font-black italic font-mono text-[#8a8f9a]">
                    #{String(actualRank).padStart(2, '0')}
                  </span>

                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#2f3540] flex items-center justify-center shrink-0">
                    {isRider ? (
                      <img src={(item as Rider).avatar} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-[10px] font-black text-white"
                        style={{ backgroundColor: (item as Team).color }}
                      >
                        {(item as Team).code}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white group-hover:text-[#ef1020] transition-colors truncate">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-[#828894] font-mono block truncate">
                      {isRider
                        ? `${(item as Rider).team} • ${(item as Rider).city}`
                        : `${(item as Team).city} • ${(item as Team).membersCount} Riders`}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-black text-[#ef1020] block">
                    {isRider ? (item as Rider).points : (item as Team).totalPoints} PTS
                  </span>
                  <span className="text-[8px] font-mono text-[#6e7480]">
                    {isRider ? `${(item as Rider).races} Races` : `${(item as Team).podiumsCount} Podiums`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RIDER DRILL-DOWN MODAL */}
      {selectedRiderModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedRiderModal(null)}
        >
          <div
            className="w-full max-w-sm bg-[#0e1014] border border-[#292e37] rounded-2xl p-5 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#ef1020]">
                  <img src={selectedRiderModal.avatar} alt={selectedRiderModal.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-black italic text-white leading-none">{selectedRiderModal.name}</h3>
                  <span className="text-xs text-[#a0a5b0] font-mono">{selectedRiderModal.handle}</span>
                  <span className="block text-[10px] text-[#ef1020] font-bold mt-0.5">{selectedRiderModal.team}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedRiderModal(null)}
                className="w-7 h-7 rounded-full bg-[#1e2229] text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 py-3 bg-[#13161b] rounded-xl border border-[#23272e] text-center">
              <div>
                <span className="text-[8px] font-mono text-[#808690] block">POINTS</span>
                <span className="text-sm font-black text-white">{selectedRiderModal.points}</span>
              </div>
              <div>
                <span className="text-[8px] font-mono text-[#808690] block">RACES</span>
                <span className="text-sm font-black text-[#ef1020]">{selectedRiderModal.races}</span>
              </div>
              <div>
                <span className="text-[8px] font-mono text-[#808690] block">PODIUMS</span>
                <span className="text-sm font-black text-[#ffd13b]">{selectedRiderModal.podiums}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#a0a5b0]">
              <div className="flex justify-between py-1 border-b border-[#20242c]">
                <span>Rig Frame:</span>
                <strong className="text-white">{selectedRiderModal.bike}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#20242c]">
                <span>Gear Ratio:</span>
                <strong className="text-[#ef1020] font-mono">{selectedRiderModal.gearRatio}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#20242c]">
                <span>Kota:</span>
                <strong className="text-white">{selectedRiderModal.city}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span>Status:</span>
                <strong className="text-white">{selectedRiderModal.status}</strong>
              </div>
            </div>

            <button
              onClick={() => setSelectedRiderModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#ef1020] text-white text-xs font-bold uppercase tracking-wider"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
