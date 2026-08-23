import React, { useState } from 'react';
import { Users, User, Image, BookOpen, MapPin, ChevronRight, X, Heart, Search, Award, Bike, Navigation } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RIDERS_DATA, TEAMS_DATA, STORIES_DATA, SPOTS_ROUTES_DATA, MEDIA_GALLERY } from '../../data/mockData';
import { Rider, Team, StoryItem, SpotRoute, MediaItem } from '../../types';

type ExploreSection = 'riders' | 'teams' | 'media' | 'stories' | 'spots';

export const ExploreView: React.FC = () => {
  const { t } = useApp();
  const [activeModalSection, setActiveModalSection] = useState<ExploreSection | null>(null);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<SpotRoute | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-200">
      {/* Explore Section Hero Banner */}
      <section className="px-1 pt-3 pb-1">
        <span className="text-[9px] font-mono text-[#85898e] tracking-widest uppercase font-extrabold block">
          DISCOVER THE CULTURE
        </span>
        <h1 className="text-2xl font-black italic tracking-tight text-white mt-0.5">
          {t.explore_title}
        </h1>
        <p className="text-xs text-[#9aa0ab] mt-1">
          {t.explore_subtitle}
        </p>
      </section>

      {/* 1. RIDERS SECTION CARD */}
      <section
        onClick={() => {
          setActiveModalSection('riders');
          setSearchFilter('');
        }}
        className="relative rounded-2xl border border-[#272a2e] overflow-hidden min-h-[190px] p-5 flex flex-col justify-between cursor-pointer hover:border-[#ef1020]/60 transition-all group bg-cover bg-center shadow-lg"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.25) 100%), url("https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=1000&q=85")`,
        }}
      >
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black italic tracking-wide text-white group-hover:text-[#ef1020] transition-colors">
              RIDERS
            </h2>
            <p className="text-xs font-bold text-[#c4c9d0] mt-0.5 font-mono">
              30 ACTIVE MEMBERS • ROSTER & STATS
            </p>
          </div>
          <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>

        {/* Avatar Stack Row */}
        <div className="relative z-10 flex items-center pt-3">
          <div className="flex -space-x-2">
            {RIDERS_DATA.slice(0, 5).map((r) => (
              <div
                key={r.id}
                className="w-10 h-10 rounded-full border-2 border-white/80 overflow-hidden bg-[#1c2026] shadow-md"
              >
                <img src={r.avatar} alt={r.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <span className="ml-3 text-xs font-bold font-mono text-white/90 bg-black/60 px-2.5 py-1 rounded-full border border-white/20">
            +25 Lainnya
          </span>
        </div>
      </section>

      {/* 2. TEAMS SECTION CARD */}
      <section
        onClick={() => {
          setActiveModalSection('teams');
          setSearchFilter('');
        }}
        className="relative rounded-2xl border border-[#272a2e] overflow-hidden min-h-[190px] p-5 flex flex-col justify-between cursor-pointer hover:border-[#ef1020]/60 transition-all group bg-cover bg-center shadow-lg"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.25) 100%), url("https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1000&q=85")`,
        }}
      >
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black italic tracking-wide text-white group-hover:text-[#ef1020] transition-colors">
              TEAMS
            </h2>
            <p className="text-xs font-bold text-[#c4c9d0] mt-0.5 font-mono">
              6 RACING SQUADS • REGIONAL DIVISIONS
            </p>
          </div>
          <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>

        {/* Team Badges Row */}
        <div className="relative z-10 flex gap-2.5 pt-3">
          {TEAMS_DATA.slice(0, 4).map((t) => (
            <span
              key={t.id}
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs text-white shadow-md border border-white/20"
              style={{ backgroundColor: t.color }}
            >
              {t.code}
            </span>
          ))}
          <span className="h-10 px-3 rounded-xl bg-black/60 border border-white/20 flex items-center justify-center text-xs font-mono font-bold text-white">
            Lihat Semua Tim
          </span>
        </div>
      </section>

      {/* 3. MEDIA (Photos & Videos) */}
      <section
        onClick={() => {
          setActiveModalSection('media');
          setSearchFilter('');
        }}
        className="relative rounded-2xl border border-[#272a2e] overflow-hidden min-h-[220px] p-5 flex flex-col justify-between cursor-pointer hover:border-[#ef1020]/60 transition-all group bg-cover bg-center shadow-lg"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.25) 100%), url("https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=1000&q=85")`,
        }}
      >
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black italic tracking-wide text-white group-hover:text-[#ef1020] transition-colors">
              MEDIA & GALLERY
            </h2>
            <p className="text-xs font-bold text-[#c4c9d0] mt-0.5 font-mono">
              HIGH-RES RACE PHOTOGRAPHY & HIGHLIGHTS
            </p>
          </div>
          <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>

        {/* Media Thumbnail Strip */}
        <div className="relative z-10 grid grid-cols-4 gap-2 pt-3">
          {MEDIA_GALLERY.map((m) => (
            <div
              key={m.id}
              className="h-16 rounded-lg bg-cover bg-center border border-white/30 overflow-hidden shadow"
              style={{ backgroundImage: `url("${m.image}")` }}
            />
          ))}
        </div>
      </section>

      {/* 4. FG STORIES */}
      <section
        onClick={() => {
          setActiveModalSection('stories');
          setSearchFilter('');
        }}
        className="relative rounded-2xl border border-[#272a2e] overflow-hidden min-h-[160px] p-5 flex flex-col justify-between cursor-pointer hover:border-[#ef1020]/60 transition-all group bg-cover bg-center shadow-lg"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.25) 100%), url("https://images.unsplash.com/photo-1529429611273-1f3e3b5e4e2a?auto=format&fit=crop&w=1000&q=85")`,
        }}
      >
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black italic tracking-wide text-white group-hover:text-[#ef1020] transition-colors">
              FG STORIES
            </h2>
            <p className="text-xs font-bold text-[#c4c9d0] mt-0.5 font-mono">
              CHRONICLES & JOURNALS FROM RIDERS
            </p>
          </div>
          <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
        <p className="relative z-10 text-[11px] text-[#b0b5be] italic">
          &quot;Cerita dari aspal malam, balik layar hari balap, dan filosofi gir kaku.&quot;
        </p>
      </section>

      {/* 5. SPOTS & ROUTES */}
      <section
        onClick={() => {
          setActiveModalSection('spots');
          setSearchFilter('');
        }}
        className="relative rounded-2xl border border-[#272a2e] overflow-hidden min-h-[190px] p-5 flex flex-col justify-between cursor-pointer hover:border-[#ef1020]/60 transition-all group bg-cover bg-center shadow-lg"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.25) 100%), url("https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85")`,
        }}
      >
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black italic tracking-wide text-white group-hover:text-[#ef1020] transition-colors">
              SPOTS & ROUTES
            </h2>
            <p className="text-xs font-bold text-[#c4c9d0] mt-0.5 font-mono">
              DISCOVER URBAN CIRCUITS & SPRINT SEGMENTS
            </p>
          </div>
          <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>

        {/* Spot Pills */}
        <div className="relative z-10 flex flex-wrap gap-1.5 pt-2">
          {SPOTS_ROUTES_DATA.map((sp) => (
            <span
              key={sp.id}
              className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/75 border border-white/20 text-white flex items-center gap-1"
            >
              <MapPin className="w-3 h-3 text-[#ef1020]" />
              <span>{sp.title.split('(')[0]}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ================= MODAL SECTION VIEWER ================= */}
      {activeModalSection && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
          onClick={() => {
            setActiveModalSection(null);
            setSelectedRider(null);
            setSelectedTeam(null);
            setSelectedStory(null);
            setSelectedSpot(null);
            setSelectedMedia(null);
          }}
        >
          <div
            className="w-full max-w-lg bg-[#0d0f12] border-t sm:border border-[#272b30] rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f2227] bg-[#111417]">
              <div>
                <span className="text-[9px] font-mono text-[#ef1020] uppercase font-bold tracking-widest block">
                  COMMUNITY DIRECTORY
                </span>
                <h3 className="text-base font-black italic tracking-wide text-white uppercase">
                  {activeModalSection === 'riders' && 'RIDERS ROSTER'}
                  {activeModalSection === 'teams' && 'ACTIVE TEAMS'}
                  {activeModalSection === 'media' && 'MEDIA ARCHIVE'}
                  {activeModalSection === 'stories' && 'FG STORIES'}
                  {activeModalSection === 'spots' && 'SPOTS & ROUTES'}
                </h3>
              </div>

              <button
                onClick={() => {
                  setActiveModalSection(null);
                  setSelectedRider(null);
                  setSelectedTeam(null);
                  setSelectedStory(null);
                  setSelectedSpot(null);
                  setSelectedMedia(null);
                }}
                className="w-7 h-7 rounded-full bg-[#1b1e22] text-[#8e9297] hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-search bar inside modal */}
            <div className="p-3 bg-[#13161a] border-b border-[#22252a] flex items-center gap-2">
              <Search className="w-4 h-4 text-[#808690]" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter daftar ini..."
                className="w-full bg-transparent text-xs text-white placeholder-[#626771] focus:outline-none"
              />
            </div>

            {/* Modal Body */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              {/* RIDERS LIST */}
              {activeModalSection === 'riders' && (
                <div className="space-y-2">
                  {RIDERS_DATA.filter((r) =>
                    r.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    r.team.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    r.city.toLowerCase().includes(searchFilter.toLowerCase())
                  ).map((rider) => (
                    <div
                      key={rider.id}
                      onClick={() => setSelectedRider(rider)}
                      className="p-3 rounded-xl bg-[#13161a] hover:bg-[#1a1e24] border border-[#23272e] flex items-center justify-between cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#353a43] bg-[#22262d] shrink-0">
                          <img src={rider.avatar} alt={rider.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white group-hover:text-[#ef1020] transition-colors">
                              {rider.name}
                            </span>
                            <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-[#ef1020]/20 text-[#ef1020]">
                              {rider.status}
                            </span>
                          </div>
                          <div className="text-[10px] text-[#868c96] font-mono mt-0.5">
                            {rider.team} • {rider.city}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-black text-[#ef1020] block">
                          {rider.points} PTS
                        </span>
                        <span className="text-[8px] font-mono text-[#787e88]">
                          {rider.races} Races
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TEAMS LIST */}
              {activeModalSection === 'teams' && (
                <div className="space-y-3">
                  {TEAMS_DATA.filter((t) =>
                    t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    t.city.toLowerCase().includes(searchFilter.toLowerCase())
                  ).map((team) => (
                    <div
                      key={team.id}
                      onClick={() => setSelectedTeam(team)}
                      className="p-4 rounded-xl bg-[#13161a] hover:bg-[#1a1e24] border border-[#23272e] space-y-2.5 cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white"
                            style={{ backgroundColor: team.color }}
                          >
                            {team.logo}
                          </div>
                          <div>
                            <h4 className="text-sm font-black italic text-white">{team.name}</h4>
                            <span className="text-[10px] text-[#868c96] font-mono">
                              {team.city} • Kapten: {team.captain}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-black text-white bg-[#20242a] px-2 py-1 rounded-lg">
                          {team.totalPoints} PTS
                        </span>
                      </div>
                      <p className="text-xs text-[#9aa0ac] leading-relaxed">{team.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* MEDIA GALLERY */}
              {activeModalSection === 'media' && (
                <div className="grid grid-cols-2 gap-2.5">
                  {MEDIA_GALLERY.filter((m) =>
                    m.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    m.category.toLowerCase().includes(searchFilter.toLowerCase())
                  ).map((med) => (
                    <div
                      key={med.id}
                      onClick={() => setSelectedMedia(med)}
                      className="rounded-xl bg-[#13161a] border border-[#23272e] overflow-hidden cursor-pointer group hover:border-[#ef1020]/60 transition-all"
                    >
                      <div
                        className="h-28 bg-cover bg-center relative"
                        style={{ backgroundImage: `url("${med.image}")` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <span className="absolute bottom-2 left-2 text-[8px] font-mono text-white bg-black/60 px-1.5 py-0.5 rounded">
                          {med.category}
                        </span>
                      </div>
                      <div className="p-2.5">
                        <h5 className="text-[11px] font-bold text-white group-hover:text-[#ef1020] transition-colors truncate">
                          {med.title}
                        </h5>
                        <div className="text-[9px] text-[#7f8590] flex items-center justify-between mt-1 font-mono">
                          <span>{med.photographer}</span>
                          <span className="flex items-center gap-0.5 text-[#ef1020]">
                            <Heart className="w-2.5 h-2.5 fill-current" /> {med.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* STORIES */}
              {activeModalSection === 'stories' && (
                <div className="space-y-3">
                  {STORIES_DATA.filter((s) =>
                    s.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    s.author.toLowerCase().includes(searchFilter.toLowerCase())
                  ).map((story) => (
                    <div
                      key={story.id}
                      onClick={() => setSelectedStory(story)}
                      className="p-3.5 rounded-xl bg-[#13161a] hover:bg-[#1a1e24] border border-[#23272e] space-y-2 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-black uppercase text-[#ef1020] bg-[#ef1020]/15 px-2 py-0.5 rounded">
                          {story.category}
                        </span>
                        <span className="text-[9px] font-mono text-[#787e88]">
                          {story.date} • {story.readTime}
                        </span>
                      </div>
                      <h4 className="text-sm font-black italic text-white leading-snug">
                        {story.title}
                      </h4>
                      <p className="text-xs text-[#9aa0ac] line-clamp-2 leading-relaxed">
                        {story.subtitle}
                      </p>
                      <div className="text-[10px] font-mono text-[#c2c5c9]">
                        Penulis: <strong>{story.author}</strong> ({story.authorRole})
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SPOTS & ROUTES */}
              {activeModalSection === 'spots' && (
                <div className="space-y-3">
                  {SPOTS_ROUTES_DATA.filter((s) =>
                    s.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    s.city.toLowerCase().includes(searchFilter.toLowerCase())
                  ).map((spot) => (
                    <div
                      key={spot.id}
                      onClick={() => setSelectedSpot(spot)}
                      className="p-4 rounded-xl bg-[#13161a] hover:bg-[#1a1e24] border border-[#23272e] space-y-2.5 cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase text-[#f59e0b] bg-[#f59e0b]/15 px-2 py-0.5 rounded">
                          {spot.category}
                        </span>
                        <span className="text-[10px] font-mono text-white font-bold">
                          {spot.distance}
                        </span>
                      </div>
                      <h4 className="text-sm font-black italic text-white leading-tight">
                        {spot.title}
                      </h4>
                      <div className="text-xs text-[#9aa0ac] space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Navigation className="w-3.5 h-3.5 text-[#ef1020]" />
                          <span>Titik Kumpul: {spot.meetPoint}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#ef1020]" />
                          <span>Karakter: {spot.surface} ({spot.elevation})</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL DRILL-DOWN: RIDER DETAIL */}
      {selectedRider && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedRider(null)}
        >
          <div
            className="w-full max-w-sm bg-[#0e1014] border border-[#292e37] rounded-2xl p-5 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#ef1020]">
                  <img src={selectedRider.avatar} alt={selectedRider.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-black italic text-white leading-none">{selectedRider.name}</h3>
                  <span className="text-xs text-[#a0a5b0] font-mono">{selectedRider.handle}</span>
                  <span className="block text-[10px] text-[#ef1020] font-bold mt-0.5">{selectedRider.team}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedRider(null)}
                className="w-7 h-7 rounded-full bg-[#1e2229] text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 py-3 bg-[#13161b] rounded-xl border border-[#23272e] text-center">
              <div>
                <span className="text-[8px] font-mono text-[#808690] block">POINTS</span>
                <span className="text-sm font-black text-white">{selectedRider.points}</span>
              </div>
              <div>
                <span className="text-[8px] font-mono text-[#808690] block">RACES</span>
                <span className="text-sm font-black text-[#ef1020]">{selectedRider.races}</span>
              </div>
              <div>
                <span className="text-[8px] font-mono text-[#808690] block">PODIUMS</span>
                <span className="text-sm font-black text-[#ffd13b]">{selectedRider.podiums}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#a0a5b0]">
              <div className="flex justify-between py-1 border-b border-[#20242c]">
                <span>Rig:</span>
                <strong className="text-white">{selectedRider.bike}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#20242c]">
                <span>Gear Ratio:</span>
                <strong className="text-[#ef1020] font-mono">{selectedRider.gearRatio}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#20242c]">
                <span>Status:</span>
                <strong className="text-white">{selectedRider.status}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span>Kota Asal:</span>
                <strong className="text-white">{selectedRider.city}</strong>
              </div>
            </div>

            <button
              onClick={() => setSelectedRider(null)}
              className="w-full py-2.5 rounded-xl bg-[#ef1020] text-white text-xs font-bold uppercase tracking-wider"
            >
              Tutup Profil Rider
            </button>
          </div>
        </div>
      )}

      {/* DETAIL MODAL DRILL-DOWN: STORY READER */}
      {selectedStory && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedStory(null)}
        >
          <div
            className="w-full max-w-lg bg-[#0e1014] border border-[#292e37] rounded-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="h-44 bg-cover bg-center relative shrink-0 p-4 flex flex-col justify-between"
              style={{ backgroundImage: `url("${selectedStory.image}")` }}
            >
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black uppercase text-white bg-black/70 px-2 py-0.5 rounded">
                  {selectedStory.category}
                </span>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="w-7 h-7 rounded-full bg-black/80 text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-lg font-black italic text-white drop-shadow-md">
                {selectedStory.title}
              </h3>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#8b919d] border-b border-[#20242c] pb-3">
                <span>Oleh: <strong className="text-white">{selectedStory.author}</strong></span>
                <span>{selectedStory.date} • {selectedStory.readTime}</span>
              </div>
              <p className="text-xs text-[#c2c7d2] leading-relaxed whitespace-pre-line">
                {selectedStory.content}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL DRILL-DOWN: MEDIA LIGHTBOX */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="w-full max-w-md bg-[#0e1014] border border-[#292e37] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img src={selectedMedia.image} alt={selectedMedia.title} className="w-full h-auto object-cover max-h-[60vh]" />
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              <h4 className="text-sm font-black italic text-white">{selectedMedia.title}</h4>
              <div className="flex items-center justify-between text-xs text-[#8f95a2] font-mono">
                <span>Foto: {selectedMedia.photographer}</span>
                <span>{selectedMedia.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
