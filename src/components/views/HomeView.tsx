import React, { useState, useEffect } from 'react';
import { ChevronRight, Zap, Shield, Trophy, ArrowUpRight, Flame, Calendar, MapPin, Flag, Users, User, CreditCard } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RIDERS_DATA, TEAMS_DATA, EVENTS_DATA, FG_FEED } from '../../data/mockData';
import { FeedItem } from '../../types';

export const HomeView: React.FC = () => {
  const { profile, setActiveTab, setSelectedEventForModal, setIsRiderPassOpen, t } = useApp();
  const [selectedFeed, setSelectedFeed] = useState<FeedItem | null>(null);

  // Live countdown state for Next Event (August 22, 2026 / dynamic)
  const [countdown, setCountdown] = useState({
    days: 12,
    hours: 8,
    minutes: 45,
    seconds: 30,
  });

  const nextEvent = EVENTS_DATA[0];

  useEffect(() => {
    const timer = setInterval(() => {
      // Countdown ticker simulation
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const top3Riders = RIDERS_DATA.slice(0, 3);
  const top3Teams = TEAMS_DATA.slice(0, 3);

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-200">
      {/* WELCOME / IDENTITY BANNER */}
      <section className="px-1 pt-3 pb-1">
        <div className="text-[9px] font-mono uppercase tracking-widest text-[#85898e] font-extrabold flex items-center gap-1">
          <span>{t.home_welcome}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black italic tracking-tight text-white m-0">
              {profile.name}
            </h1>
            <span className="text-[8px] font-black font-mono text-[#ef1020] bg-[#24090d] border border-[#6e1018] rounded-md px-2 py-0.5 whitespace-nowrap">
              {profile.membership}
            </span>
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className="text-[#888] hover:text-white p-1"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="text-[10px] text-[#8e939a] mt-1 font-mono tracking-wide">
          {t.home_crew} • {t.stat_rank.toUpperCase()} <strong className="text-[#ef1020]">#{String(profile.stats.overallRanking).padStart(3, '0')}</strong>
        </div>
      </section>

      {/* NEXT EVENT HERO CARD */}
      <section className="relative rounded-2xl border border-[#4a141b]/80 overflow-hidden shadow-[0_10px_35px_rgba(239,16,32,0.2)]">
        <div
          className="p-4 min-h-[250px] relative flex flex-col justify-between bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.62) 50%, rgba(0,0,0,0.2) 100%), url("${nextEvent.image}")`,
          }}
        >
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-[#ef1020] text-white px-3 py-1 text-[9px] font-black italic tracking-wider rounded-r-md uppercase [clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]">
              <Flame className="w-3 h-3" />
              <span>{nextEvent.badge}</span>
            </div>

            <h2 className="text-xl font-black italic tracking-wide text-white mt-1.5 leading-tight">
              {nextEvent.title}
            </h2>

            <div className="text-[11px] text-[#d6dadf] leading-relaxed">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[#ef1020]" />
                <span>{nextEvent.date} • {nextEvent.city}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#a4aab4] text-[10px] mt-0.5">
                <Flag className="w-3 h-3 text-[#ef1020]" />
                <span>{nextEvent.circuitType} • {nextEvent.distance}</span>
              </div>
            </div>
          </div>

          {/* Countdown & Action Bar */}
          <div className="relative z-10 pt-3 flex items-end justify-between gap-2">
            {/* Ticker boxes */}
            <div className="flex gap-1.5">
              <div className="w-12 h-12 rounded-lg bg-black/75 border border-[#444850] flex flex-col items-center justify-center text-center">
                <span className="text-base font-black text-white font-mono leading-none">
                  {String(countdown.days).padStart(2, '0')}
                </span>
                <span className="text-[7px] text-[#9398a1] font-mono uppercase mt-0.5">{t.home_days}</span>
              </div>
              <div className="w-12 h-12 rounded-lg bg-black/75 border border-[#444850] flex flex-col items-center justify-center text-center">
                <span className="text-base font-black text-white font-mono leading-none">
                  {String(countdown.hours).padStart(2, '0')}
                </span>
                <span className="text-[7px] text-[#9398a1] font-mono uppercase mt-0.5">{t.home_hours}</span>
              </div>
              <div className="w-12 h-12 rounded-lg bg-black/75 border border-[#444850] flex flex-col items-center justify-center text-center">
                <span className="text-base font-black text-[#ef1020] font-mono leading-none">
                  {String(countdown.minutes).padStart(2, '0')}
                </span>
                <span className="text-[7px] text-[#9398a1] font-mono uppercase mt-0.5">{t.home_minutes}</span>
              </div>
              <div className="w-12 h-12 rounded-lg bg-black/75 border border-[#444850] flex flex-col items-center justify-center text-center">
                <span className="text-base font-black text-white font-mono leading-none">
                  {String(countdown.seconds).padStart(2, '0')}
                </span>
                <span className="text-[7px] text-[#9398a1] font-mono uppercase mt-0.5">{t.home_seconds}</span>
              </div>
            </div>

            {/* Action Trigger */}
            <button
              id="btn-home-view-event"
              onClick={() => setSelectedEventForModal(nextEvent)}
              className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#ef1020] to-[#b80612] text-white text-[10px] font-black italic tracking-wide flex items-center gap-1.5 shadow-[0_4px_16px_rgba(239,16,32,0.4)] hover:brightness-110 active:scale-95 transition-all"
            >
              <span>{t.btn_register}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* MY SNAPSHOT TELEMETRY */}
      <section className="rounded-2xl bg-gradient-to-br from-[#12151b] via-[#0d0f13] to-[#090a0d] border border-[#262b36] p-3.5 space-y-3 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#1e222b] pb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ef1020] animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-[#ef1020] uppercase tracking-widest flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-[#ef1020]" />
              <span>MY SNAPSHOT</span>
            </span>
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className="text-[10px] font-bold text-[#ef1020] hover:text-[#ff3b4b] flex items-center gap-1 transition-colors"
          >
            <span>{t.btn_see_details || 'VIEW PROFILE'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Primary Performance Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Race Count */}
          <div 
            onClick={() => setActiveTab('profile')}
            className="bg-[#151820]/95 border border-[#232731] rounded-xl p-2.5 text-center flex flex-col justify-between hover:border-[#ef1020]/40 transition-colors cursor-pointer group"
          >
            <span className="text-[9px] font-mono text-[#828896] uppercase font-bold tracking-wider truncate block group-hover:text-white transition-colors">
              {t.stat_race || 'RACE'}
            </span>
            <span className="text-lg sm:text-xl font-black italic text-white leading-tight font-mono my-1">
              {profile.stats.totalRace}
            </span>
            <span className="text-[7.5px] font-mono text-[#828896] font-semibold uppercase">
              {t.stat_events || 'EVENTS'}
            </span>
          </div>

          {/* Distance */}
          <div 
            onClick={() => setActiveTab('profile')}
            className="bg-[#151820]/95 border border-[#232731] rounded-xl p-2.5 text-center flex flex-col justify-between hover:border-[#ef1020]/40 transition-colors cursor-pointer group"
          >
            <span className="text-[9px] font-mono text-[#828896] uppercase font-bold tracking-wider truncate block group-hover:text-white transition-colors">
              {t.stat_distance || 'DISTANCE'}
            </span>
            <span className="text-lg sm:text-xl font-black italic text-[#ef1020] leading-tight font-mono my-1">
              {profile.stats.totalDistanceKm}
            </span>
            <span className="text-[7.5px] font-mono text-[#ef1020] font-semibold uppercase">
              KM TOTAL
            </span>
          </div>

          {/* Points / Podium */}
          <div 
            onClick={() => setActiveTab('ranking')}
            className="bg-[#151820]/95 border border-[#232731] rounded-xl p-2.5 text-center flex flex-col justify-between hover:border-[#ffd13b]/40 transition-colors cursor-pointer group"
          >
            <span className="text-[9px] font-mono text-[#828896] uppercase font-bold tracking-wider truncate block group-hover:text-white transition-colors">
              {t.stat_points || 'POINTS'}
            </span>
            <span className="text-lg sm:text-xl font-black italic text-[#ffd13b] leading-tight font-mono my-1">
              {profile.stats.points}
            </span>
            <span className="text-[7.5px] font-mono text-[#ffd13b]/90 font-semibold uppercase">
              SEASON PTS
            </span>
          </div>

          {/* Overall Rank */}
          <div 
            onClick={() => setActiveTab('ranking')}
            className="bg-[#151820]/95 border border-[#232731] rounded-xl p-2.5 text-center flex flex-col justify-between hover:border-[#ef1020]/40 transition-colors cursor-pointer group"
          >
            <span className="text-[9px] font-mono text-[#828896] uppercase font-bold tracking-wider truncate block group-hover:text-white transition-colors">
              {t.stat_rank || 'RANKING'}
            </span>
            <span className="text-lg sm:text-xl font-black italic text-white leading-tight font-mono my-1">
              #{String(profile.stats.overallRanking).padStart(3, '0')}
            </span>
            <span className="text-[7.5px] font-mono text-[#828896] font-semibold uppercase">
              {t.stat_national || 'NATIONAL FG'}
            </span>
          </div>
        </div>
      </section>

      {/* TOP 3 OVERALL RIDERS & STANDINGS */}
      <section className="rounded-2xl bg-gradient-to-br from-[#121417] to-[#090a0c] border border-[#272a2e] overflow-hidden shadow-lg">
        <div className="h-10 px-3.5 flex items-center justify-between border-b border-[#212429]">
          <span className="text-[10px] font-black italic tracking-wider text-white flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-[#ef1020]" />
            <span>TOP 3 OVERALL LEADERBOARD</span>
          </span>
          <button
            onClick={() => setActiveTab('ranking')}
            className="text-[9px] font-bold text-[#ef1020] flex items-center gap-1 hover:underline"
          >
            <span>VIEW ALL</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#212429]">
          {/* Visual Podium Top 3 */}
          <div className="p-4 flex items-end justify-center gap-2 min-h-[175px] bg-[radial-gradient(ellipse_at_bottom,rgba(239,16,32,0.1)_0%,transparent_70%)]">
            {/* Rank 2 (Silver) */}
            <div className="w-[30%] text-center transform translate-y-2">
              <div className="w-5 h-5 rounded-full bg-[#bfc3c8] text-black text-[9px] font-black mx-auto mb-1 flex items-center justify-center">
                2
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-[#bfc3c8] mx-auto overflow-hidden bg-[#1f2329]">
                <img src={top3Riders[1].avatar} alt={top3Riders[1].name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-black italic text-white block mt-1 truncate">
                {top3Riders[1].name}
              </span>
              <span className="text-[8px] font-mono text-[#a0a5b0] block">{top3Riders[1].points} PTS</span>
            </div>

            {/* Rank 1 (Gold) */}
            <div className="w-[36%] text-center">
              <div className="w-6 h-6 rounded-full bg-[#f2bd16] text-black text-[10px] font-black mx-auto mb-1 flex items-center justify-center shadow-[0_0_12px_#f2bd16]">
                1
              </div>
              <div className="w-15 h-15 rounded-full border-2 border-[#f2bd16] mx-auto overflow-hidden bg-[#1f2329] shadow-[0_0_16px_rgba(242,189,22,0.35)]">
                <img src={top3Riders[0].avatar} alt={top3Riders[0].name} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-black italic text-[#f2bd16] block mt-1 truncate">
                {top3Riders[0].name}
              </span>
              <span className="text-[9px] font-mono text-white block font-bold">{top3Riders[0].points} PTS</span>
            </div>

            {/* Rank 3 (Bronze) */}
            <div className="w-[30%] text-center transform translate-y-3">
              <div className="w-5 h-5 rounded-full bg-[#a87852] text-white text-[9px] font-black mx-auto mb-1 flex items-center justify-center">
                3
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-[#a87852] mx-auto overflow-hidden bg-[#1f2329]">
                <img src={top3Riders[2].avatar} alt={top3Riders[2].name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-black italic text-white block mt-1 truncate">
                {top3Riders[2].name}
              </span>
              <span className="text-[8px] font-mono text-[#a0a5b0] block">{top3Riders[2].points} PTS</span>
            </div>
          </div>

          {/* Top 3 Teams List */}
          <div className="p-3.5 space-y-2.5 flex flex-col justify-center">
            <span className="text-[9px] font-mono text-[#808690] uppercase font-bold tracking-widest block">
              TOP RACING SQUADS
            </span>
            {top3Teams.map((team, idx) => (
              <div
                key={team.id}
                onClick={() => setActiveTab('explore')}
                className="flex items-center justify-between p-2 rounded-xl bg-[#14171b] border border-[#23272e] hover:border-[#ef1020]/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`text-xs font-black italic ${idx === 0 ? 'text-[#f2bd16]' : 'text-[#8e94a0]'}`}>
                    #{idx + 1}
                  </span>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black text-white"
                    style={{ backgroundColor: team.color }}
                  >
                    {team.logo}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block leading-tight">{team.name}</span>
                    <span className="text-[9px] text-[#787e88] font-mono">{team.membersCount} Riders</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-black text-white">{team.totalPoints} PTS</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FG COMMUNITY FEED */}
      <section className="rounded-2xl bg-gradient-to-br from-[#121417] to-[#090a0c] border border-[#272a2e] overflow-hidden shadow-lg">
        <div className="h-10 px-3.5 flex items-center justify-between border-b border-[#212429]">
          <span className="text-[10px] font-black italic tracking-wider text-white flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#ef1020]" />
            <span>FG COMMUNITY FEED</span>
          </span>
          <button
            onClick={() => setActiveTab('explore')}
            className="text-[9px] font-bold text-[#ef1020] flex items-center gap-1 hover:underline"
          >
            <span>VIEW STORIES</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="divide-y divide-[#212429]">
          {FG_FEED.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedFeed(item)}
              className="p-3 flex items-center gap-3 hover:bg-[#15191f] cursor-pointer transition-colors group"
            >
              <div
                className="w-12 h-12 rounded-lg bg-[#1f2329] bg-cover bg-center border border-[#30353e] shrink-0"
                style={{ backgroundImage: `url("${item.image}")` }}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={`text-[8px] font-black px-1.5 py-0.5 rounded ${
                      item.type === 'RESULT'
                        ? 'bg-[#ef1020]/20 text-[#ef1020] border border-[#ef1020]/40'
                        : item.type === 'ANNOUNCEMENT'
                        ? 'bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/40'
                        : 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40'
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="text-[8px] font-mono text-[#787e88]">{item.date}</span>
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-[#ef1020] transition-colors truncate">
                  {item.title}
                </h4>
                <p className="text-[10px] text-[#8e94a0] truncate mt-0.5">{item.description}</p>
              </div>

              <ChevronRight className="w-4 h-4 text-[#555a64] group-hover:text-white shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* UPCOMING EVENTS SLIDER */}
      <section className="rounded-2xl bg-gradient-to-br from-[#121417] to-[#090a0c] border border-[#272a2e] overflow-hidden shadow-lg p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black italic tracking-wider text-white flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#ef1020]" />
            <span>UPCOMING CALENDAR</span>
          </span>
          <button
            onClick={() => setActiveTab('event')}
            className="text-[9px] font-bold text-[#ef1020] flex items-center gap-1 hover:underline"
          >
            <span>FULL CALENDAR</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {EVENTS_DATA.slice(0, 3).map((ev) => (
            <div
              key={ev.id}
              onClick={() => {
                setSelectedEventForModal(ev);
              }}
              className="w-44 shrink-0 rounded-xl bg-[#14171b] border border-[#252930] overflow-hidden hover:border-[#ef1020]/60 cursor-pointer transition-all group"
            >
              <div
                className="h-20 bg-cover bg-center relative p-2 flex items-start justify-between"
                style={{ backgroundImage: `url("${ev.image}")` }}
              >
                <div className="bg-black/80 backdrop-blur-sm border border-[#383d46] rounded px-1.5 py-0.5 text-center leading-tight">
                  <span className="text-xs font-black text-white block">{ev.day}</span>
                  <span className="text-[8px] font-mono text-[#ef1020] block uppercase">{ev.month}</span>
                </div>
              </div>

              <div className="p-2.5 space-y-1">
                <h4 className="text-xs font-bold text-white group-hover:text-[#ef1020] transition-colors truncate">
                  {ev.title}
                </h4>
                <p className="text-[9px] text-[#8e94a0] truncate">{ev.city} • {ev.distance}</p>
                <button className="w-full mt-1 py-1 rounded bg-[#20242b] group-hover:bg-[#ef1020] text-white text-[9px] font-black uppercase transition-colors">
                  {ev.statusLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK ACCESS ACTION GRID */}
      <section className="rounded-2xl bg-gradient-to-br from-[#121417] to-[#090a0c] border border-[#272a2e] overflow-hidden shadow-lg p-3">
        <span className="text-[9px] font-mono text-[#808690] uppercase font-bold tracking-widest block mb-2.5 px-1">
          QUICK ACCESS
        </span>
        <div className="grid grid-cols-5 gap-1.5">
          <button
            onClick={() => setActiveTab('event')}
            className="p-2 rounded-xl bg-[#14171c] hover:bg-[#1f2329] border border-[#23272e] flex flex-col items-center justify-center text-center transition-all group"
          >
            <Calendar className="w-5 h-5 text-[#ef1020] mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[8px] font-bold text-white leading-tight">Event<br/>Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab('ranking')}
            className="p-2 rounded-xl bg-[#14171c] hover:bg-[#1f2329] border border-[#23272e] flex flex-col items-center justify-center text-center transition-all group"
          >
            <Trophy className="w-5 h-5 text-[#ffd13b] mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[8px] font-bold text-white leading-tight">Ranking<br/>Center</span>
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className="p-2 rounded-xl bg-[#14171c] hover:bg-[#1f2329] border border-[#23272e] flex flex-col items-center justify-center text-center transition-all group"
          >
            <User className="w-5 h-5 text-[#38bdf8] mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[8px] font-bold text-white leading-tight">Riders<br/>Directory</span>
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className="p-2 rounded-xl bg-[#14171c] hover:bg-[#1f2329] border border-[#23272e] flex flex-col items-center justify-center text-center transition-all group"
          >
            <Users className="w-5 h-5 text-[#10b981] mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[8px] font-bold text-white leading-tight">Teams<br/>Directory</span>
          </button>

          <button
            onClick={() => setIsRiderPassOpen(true)}
            className="p-2 rounded-xl bg-[#14171c] hover:bg-[#1f2329] border border-[#23272e] flex flex-col items-center justify-center text-center transition-all group"
          >
            <CreditCard className="w-5 h-5 text-[#f43f5e] mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[8px] font-bold text-white leading-tight">My Rider<br/>Pass</span>
          </button>
        </div>
      </section>

      {/* BRAND CLOSING BANNER */}
      <section className="relative rounded-2xl border border-[#272a2e] overflow-hidden min-h-[110px] flex items-center p-5 bg-gradient-to-r from-black via-black/80 to-transparent bg-cover bg-center" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 100%), url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80')` }}>
        <div>
          <div className="text-xl font-black italic tracking-tighter text-white leading-none">
            KEEP RIDING.<br />
            <span className="text-[#ef1020]">KEEP STRONG.</span>
          </div>
          <p className="text-[9px] font-mono text-[#a0a5ad] mt-1 tracking-widest">
            AUTHENTIC TRACK BIKE CULTURE • FIXGEAR.ID
          </p>
        </div>
      </section>

      {/* Feed Detail Modal */}
      {selectedFeed && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setSelectedFeed(null)}
        >
          <div
            className="w-full max-w-md bg-[#0c0e11] border border-[#272b30] rounded-t-2xl sm:rounded-2xl p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="h-40 rounded-xl bg-cover bg-center relative"
              style={{ backgroundImage: `url("${selectedFeed.image}")` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent rounded-xl" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[9px] font-black uppercase text-[#ef1020] bg-black/70 px-2 py-0.5 rounded">
                  {selectedFeed.type}
                </span>
                <h3 className="text-sm font-black italic text-white mt-1 leading-snug">
                  {selectedFeed.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#a0a5ad] leading-relaxed">{selectedFeed.description}</p>

            <button
              onClick={() => {
                if (selectedFeed.targetView) setActiveTab(selectedFeed.targetView as any);
                setSelectedFeed(null);
              }}
              className="w-full py-3 rounded-xl bg-[#ef1020] text-white text-xs font-bold uppercase tracking-wider"
            >
              Buka Halaman Terkait
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
