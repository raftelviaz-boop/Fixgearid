import React, { useState, useRef } from 'react';
import { 
  CreditCard, Edit3, Camera, Share2, ShieldCheck, Award, Trophy, 
  ChevronRight, Check, X, Sparkles, Bike, MapPin, Tag, Route, 
  Clock, Crown, ArrowRight, Calendar, Flag, Zap, Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RACE_HISTORIES } from '../../data/mockData';
import { RaceHistoryItem } from '../../types';

export const ProfileView: React.FC = () => {
  const { profile, updateProfile, setIsRiderPassOpen, language, setLanguage, toggleLanguage, t } = useApp();

  // Race history modal state
  const [showAllRaces, setShowAllRaces] = useState(false);
  const [selectedRace, setSelectedRace] = useState<RaceHistoryItem | null>(null);

  // Edit Drawer states
  const [activeEditModal, setActiveEditModal] = useState<'profile' | 'about' | 'bike' | 'contact' | null>(null);

  // Form values
  const [nameVal, setNameVal] = useState(profile.name);
  const [fullNameVal, setFullNameVal] = useState(profile.fullName || '');
  const [birthDateVal, setBirthDateVal] = useState(profile.birthDate || '');
  const [ageVal, setAgeVal] = useState<number | string>(profile.age || 24);
  const [genderVal, setGenderVal] = useState(profile.gender || 'MALE');
  const [bloodTypeVal, setBloodTypeVal] = useState(profile.bloodType || 'AB+');
  const [emergencyContactVal, setEmergencyContactVal] = useState(profile.emergencyContact || '');
  const [handleVal, setHandleVal] = useState(profile.handle);
  const [cityVal, setCityVal] = useState(profile.city);
  const [aboutVal, setAboutVal] = useState(profile.about);
  const [bikeNameVal, setBikeNameVal] = useState(profile.bikeName);
  const [bikeSpecVal, setBikeSpecVal] = useState(profile.bikeSpec);
  const [bikeDescVal, setBikeDescVal] = useState(profile.bikeDescription);
  const [instagramVal, setInstagramVal] = useState(profile.instagram);
  const [tiktokVal, setTiktokVal] = useState(profile.tiktok);
  const [stravaVal, setStravaVal] = useState(profile.strava);
  const [whatsappVal, setWhatsappVal] = useState(profile.whatsapp);
  const [youtubeVal, setYoutubeVal] = useState(profile.youtube);
  const [emailVal, setEmailVal] = useState(profile.email);

  // Read more states
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isBikeExpanded, setIsBikeExpanded] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bikeInputRef = useRef<HTMLInputElement>(null);

  // Handle avatar image file upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updateProfile({ avatar: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle bike image file upload
  const handleBikeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updateProfile({ bikeImage: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `FIXGEAR.ID - ${profile.name}`,
        text: `Lihat profil rider ${profile.name} (${profile.handle}) di FIXGEAR.ID!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Tautan profil disalin ke clipboard!');
    }
  };

  const handleSaveEdit = () => {
    if (activeEditModal === 'profile') {
      updateProfile({
        name: nameVal,
        fullName: fullNameVal,
        birthDate: birthDateVal,
        age: Number(ageVal) || undefined,
        gender: genderVal,
        bloodType: bloodTypeVal,
        emergencyContact: emergencyContactVal,
        handle: handleVal,
        city: cityVal,
      });
    } else if (activeEditModal === 'about') {
      updateProfile({ about: aboutVal });
    } else if (activeEditModal === 'bike') {
      updateProfile({ bikeName: bikeNameVal, bikeSpec: bikeSpecVal, bikeDescription: bikeDescVal });
    } else if (activeEditModal === 'contact') {
      updateProfile({
        instagram: instagramVal,
        tiktok: tiktokVal,
        strava: stravaVal,
        whatsapp: whatsappVal,
        youtube: youtubeVal,
        email: emailVal,
      });
    }
    setActiveEditModal(null);
  };

  return (
    <div className="space-y-4 pb-16 animate-in fade-in duration-200">
      {/* PROFILE HERO CARD */}
      <section className="relative rounded-2xl border border-[#272a2e] overflow-hidden bg-gradient-to-b from-[#18080b] via-[#0d0f12] to-[#060708] p-5 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
        {/* Background Bike Watermark */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none filter contrast-125"
          style={{ backgroundImage: `url("${profile.bikeImage || 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80'}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08090a]/80 to-[#08090a]" />

        {/* Hero Top Actions */}
        <div className="relative z-10 flex justify-between items-center mb-4">
          <div className="flex items-center gap-1.5 bg-[#ef1020]/20 border border-[#ef1020]/40 px-2.5 py-1 rounded-full text-[9px] font-mono text-[#ef1020] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ef1020]" />
            <span>OFFICIAL PROFILE</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareProfile}
              className="w-8 h-8 rounded-lg bg-[#181a1f] border border-[#2a2e36] text-[#c0c5cf] hover:text-white flex items-center justify-center transition-colors"
              title="Bagikan Profil"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setNameVal(profile.name);
                setFullNameVal(profile.fullName || 'Muhammad Azzy Zaid Arkan');
                setBirthDateVal(profile.birthDate || '14 Mei 2002');
                setAgeVal(profile.age || 24);
                setGenderVal(profile.gender || 'MALE');
                setBloodTypeVal(profile.bloodType || 'AB+');
                setEmergencyContactVal(profile.emergencyContact || '+62 812 3456 7890');
                setHandleVal(profile.handle);
                setCityVal(profile.city);
                setActiveEditModal('profile');
              }}
              className="w-8 h-8 rounded-lg bg-[#181a1f] border border-[#2a2e36] text-[#c0c5cf] hover:text-[#ef1020] flex items-center justify-center transition-colors"
              title="Edit Nama & Handle"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Avatar & Rider Identity */}
        <div className="relative z-10 text-center space-y-2">
          <div className="relative w-22 h-22 mx-auto">
            <div className="w-22 h-22 rounded-2xl overflow-hidden border-2 border-[#ef1020] shadow-[0_0_20px_rgba(239,16,32,0.35)] bg-[#1a1d22]">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <button
              onClick={() => avatarInputRef.current?.click()}
              className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#ef1020] text-white flex items-center justify-center shadow-lg border-2 border-black hover:scale-110 transition-transform"
              title="Ganti Foto Profil"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>

          <div>
            <h2 className="text-2xl font-black italic text-white tracking-wide">{profile.name}</h2>
            <div className="text-xs text-[#a0a5b0] font-mono mt-0.5">{profile.handle} • {profile.city}</div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-[9px] font-black uppercase tracking-wider bg-[#ef1020] text-white px-2.5 py-0.5 rounded">
                {profile.membership}
              </span>
              <span className="text-[10px] font-mono text-[#8a909b] bg-black/60 px-2 py-0.5 rounded border border-[#2a2e36]">
                {profile.riderId}
              </span>
            </div>
          </div>

          {/* RIDER PASS BUTTON TRIGGER */}
          <div className="pt-2">
            <button
              id="btn-profile-rider-pass"
              onClick={() => setIsRiderPassOpen(true)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ef1020] via-[#cf0a18] to-[#99040e] text-white text-xs font-black italic tracking-widest flex items-center justify-center gap-2 shadow-[0_6px_25px_rgba(239,16,32,0.35)] border border-[#ff3b4b]/40 hover:brightness-110 active:scale-95 transition-all"
            >
              <CreditCard className="w-4 h-4" />
              <span>DIGITAL RIDER PASS</span>
            </button>
          </div>
        </div>
      </section>

      {/* 1. TENTANG SAYA (ABOUT ME) */}
      <section className="rounded-2xl bg-gradient-to-br from-[#121417] to-[#090a0c] border border-[#272a2e] overflow-hidden shadow-lg p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#212429] pb-2.5">
          <span className="text-[10px] font-black italic tracking-wider text-white flex items-center gap-1.5">
            <span className="text-[#ef1020]">⌁</span>
            <span>TENTANG SAYA</span>
          </span>
          <button
            onClick={() => {
              setAboutVal(profile.about);
              setActiveEditModal('about');
            }}
            className="text-[9px] font-bold text-[#ef1020] hover:underline"
          >
            EDIT
          </button>
        </div>

        <div>
          <p className={`text-xs text-[#b8bdc8] leading-relaxed whitespace-pre-line ${!isAboutExpanded ? 'line-clamp-3' : ''}`}>
            {profile.about}
          </p>
          {profile.about.length > 90 && (
            <button
              onClick={() => setIsAboutExpanded(!isAboutExpanded)}
              className="text-[10px] font-bold text-[#ef1020] mt-1.5 hover:underline block"
            >
              {isAboutExpanded ? 'Sembunyikan' : 'Baca Selengkapnya...'}
            </button>
          )}
        </div>
      </section>

      {/* 2. SEPEDA SAYA (MY BIKE) */}
      <section className="rounded-2xl bg-gradient-to-br from-[#121417] to-[#090a0c] border border-[#272a2e] overflow-hidden shadow-lg p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#212429] pb-2.5">
          <span className="text-[10px] font-black italic tracking-wider text-white flex items-center gap-1.5">
            <Bike className="w-3.5 h-3.5 text-[#ef1020]" />
            <span>SEPEDA SAYA</span>
          </span>
          <button
            onClick={() => {
              setBikeNameVal(profile.bikeName);
              setBikeSpecVal(profile.bikeSpec);
              setBikeDescVal(profile.bikeDescription);
              setActiveEditModal('bike');
            }}
            className="text-[9px] font-bold text-[#ef1020] hover:underline"
          >
            EDIT
          </button>
        </div>

        {/* Bike Showcase Display */}
        <div className="relative rounded-xl overflow-hidden border border-[#242830] bg-[#14171d] min-h-[160px] flex items-center justify-center">
          <img
            src={profile.bikeImage}
            alt={profile.bikeName}
            className="w-full h-44 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80';
            }}
          />
          <button
            onClick={() => bikeInputRef.current?.click()}
            className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20 text-white text-[9px] font-bold flex items-center gap-1.5 hover:bg-black"
          >
            <Camera className="w-3 h-3 text-[#ef1020]" />
            <span>Ganti Foto Sepeda</span>
          </button>
          <input
            ref={bikeInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBikeUpload}
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-black italic text-white leading-tight">{profile.bikeName}</h3>
          <div className="text-[10px] font-mono text-[#ef1020] font-bold">{profile.bikeSpec}</div>
          <p className={`text-xs text-[#9aa0ab] leading-relaxed pt-1 whitespace-pre-line ${!isBikeExpanded ? 'line-clamp-2' : ''}`}>
            {profile.bikeDescription}
          </p>
          {profile.bikeDescription.length > 70 && (
            <button
              onClick={() => setIsBikeExpanded(!isBikeExpanded)}
              className="text-[10px] font-bold text-[#ef1020] mt-1 hover:underline block"
            >
              {isBikeExpanded ? 'Sembunyikan' : 'Baca Setup Lengkap...'}
            </button>
          )}
        </div>
      </section>

      {/* ================= RACE HISTORY SECTION ================= */}
      <section className="space-y-3 pt-1">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2.5 h-5 bg-[#ef1020] skew-x-[-18deg] rounded-[1px] shadow-[0_0_10px_rgba(239,16,32,0.6)]" />
            <h2 className="text-base sm:text-lg font-black italic tracking-wider text-white uppercase leading-none">
              RACE HISTORY
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowAllRaces(true)}
            className="px-3.5 py-1.5 rounded-lg border border-[#ef1020] text-[#ef1020] text-[11px] font-black italic tracking-wider hover:bg-[#ef1020]/15 flex items-center gap-1.5 transition-all active:scale-95 shadow-[0_0_15px_rgba(239,16,32,0.15)] group"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* RIDER RECORD TELEMETRY BOARD (8 Core Metrics) */}
        <div className="rounded-2xl bg-gradient-to-br from-[#12151b] via-[#0d0f13] to-[#090a0d] border border-[#262b36] p-3 sm:p-3.5 space-y-2.5 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#1e222b] pb-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ef1020] animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-[#ef1020] uppercase tracking-widest">
                RIDER RECORD
              </span>
            </div>
            <span className="text-[9px] font-mono text-[#8a909d]">
              ID: {profile.riderId}
            </span>
          </div>

          {/* 8 Metric Grid */}
          <div className="grid grid-cols-4 gap-2">
            {/* 1. Race */}
            <div className="bg-[#151820]/95 border border-[#232731] rounded-xl p-2 text-center flex flex-col justify-between hover:border-[#3a4150] transition-colors">
              <span className="text-[8.5px] sm:text-[9.5px] font-mono text-[#828896] uppercase font-bold tracking-wider truncate block">
                Race
              </span>
              <span className="text-base sm:text-lg font-black italic text-white leading-tight font-mono my-0.5">
                {profile.stats.totalRace}
              </span>
              <span className="text-[7.5px] font-mono text-[#828896] font-semibold">EVENTS</span>
            </div>

            {/* 2. Distance */}
            <div className="bg-[#151820]/95 border border-[#232731] rounded-xl p-2 text-center flex flex-col justify-between hover:border-[#3a4150] transition-colors">
              <span className="text-[8.5px] sm:text-[9.5px] font-mono text-[#828896] uppercase font-bold tracking-wider truncate block">
                Distance
              </span>
              <span className="text-base sm:text-lg font-black italic text-[#ef1020] leading-tight font-mono my-0.5">
                {profile.stats.totalDistanceKm}
              </span>
              <span className="text-[7.5px] font-mono text-[#ef1020] font-semibold">KM TOTAL</span>
            </div>

            {/* 3. Time */}
            <div className="bg-[#151820]/95 border border-[#232731] rounded-xl p-2 text-center flex flex-col justify-between hover:border-[#3a4150] transition-colors">
              <span className="text-[8.5px] sm:text-[9.5px] font-mono text-[#828896] uppercase font-bold tracking-wider truncate block">
                Time
              </span>
              <span className="text-xs sm:text-sm font-black italic text-white leading-tight font-mono my-0.5">
                {profile.stats.totalHours}h {profile.stats.totalMinutes}m
              </span>
              <span className="text-[7.5px] font-mono text-[#828896] font-semibold">HOURS</span>
            </div>

            {/* 4. Finish */}
            <div className="bg-[#151820]/95 border border-[#232731] rounded-xl p-2 text-center flex flex-col justify-between hover:border-[#3a4150] transition-colors">
              <span className="text-[8.5px] sm:text-[9.5px] font-mono text-[#828896] uppercase font-bold tracking-wider truncate block">
                Finish
              </span>
              <span className="text-base sm:text-lg font-black italic text-emerald-400 leading-tight font-mono my-0.5">
                {profile.stats.totalFinishes ?? profile.stats.totalRace}
              </span>
              <span className="text-[7.5px] font-mono text-emerald-500/90 font-semibold">FINISHES</span>
            </div>

            {/* 5. Podiums */}
            <div className="bg-[#151820]/95 border border-[#232731] rounded-xl p-2 text-center flex flex-col justify-between hover:border-[#3a4150] transition-colors">
              <span className="text-[8.5px] sm:text-[9.5px] font-mono text-[#828896] uppercase font-bold tracking-wider truncate block">
                Podiums
              </span>
              <span className="text-base sm:text-lg font-black italic text-[#f59e0b] leading-tight font-mono my-0.5">
                {profile.stats.totalPodiums ?? 14}
              </span>
              <span className="text-[7.5px] font-mono text-[#f59e0b]/90 font-semibold">TOP 3</span>
            </div>

            {/* 6. Win */}
            <div className="bg-gradient-to-br from-[#1d1316] to-[#151820] border border-[#ef1020]/40 rounded-xl p-2 text-center flex flex-col justify-between shadow-[0_0_12px_rgba(239,16,32,0.15)]">
              <span className="text-[8.5px] sm:text-[9.5px] font-mono text-[#ef1020] uppercase font-bold tracking-wider truncate block">
                Win
              </span>
              <span className="text-base sm:text-lg font-black italic text-white leading-tight font-mono my-0.5 flex items-center justify-center gap-1">
                <Crown className="w-3.5 h-3.5 text-[#ffd700] fill-[#ffd700] shrink-0 drop-shadow" />
                {profile.stats.totalWins ?? 8}
              </span>
              <span className="text-[7.5px] font-mono text-[#ef1020] font-semibold">1ST PLACE</span>
            </div>

            {/* 7. Point */}
            <div className="bg-[#151820]/95 border border-[#232731] rounded-xl p-2 text-center flex flex-col justify-between hover:border-[#3a4150] transition-colors">
              <span className="text-[8.5px] sm:text-[9.5px] font-mono text-[#828896] uppercase font-bold tracking-wider truncate block">
                Point
              </span>
              <span className="text-base sm:text-lg font-black italic text-[#f2bd16] leading-tight font-mono my-0.5">
                {profile.stats.points}
              </span>
              <span className="text-[7.5px] font-mono text-[#f2bd16]/90 font-semibold">POINTS</span>
            </div>

            {/* 8. Rank */}
            <div className="bg-[#151820]/95 border border-[#232731] rounded-xl p-2 text-center flex flex-col justify-between hover:border-[#3a4150] transition-colors">
              <span className="text-[8.5px] sm:text-[9.5px] font-mono text-[#828896] uppercase font-bold tracking-wider truncate block">
                Rank
              </span>
              <span className="text-base sm:text-lg font-black italic text-white leading-tight font-mono my-0.5">
                #{profile.stats.overallRanking.toString().padStart(3, '0')}
              </span>
              <span className="text-[7.5px] font-mono text-[#828896] font-semibold">NATIONAL</span>
            </div>
          </div>
        </div>

        {/* Race Cards List */}
        <div className="space-y-2.5">
          {RACE_HISTORIES.slice(0, 4).map((race) => (
            <div
              key={race.id}
              onClick={() => setSelectedRace(race)}
              className="rounded-2xl bg-[#0e1014] border border-[#232730] hover:border-[#3d4452] transition-all p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3.5 relative overflow-hidden group shadow-lg cursor-pointer active:scale-[0.99]"
            >
              {/* Left Image Thumbnail */}
              <div className="w-20 sm:w-28 h-20 sm:h-22 rounded-xl overflow-hidden bg-[#161920] shrink-0 relative border border-[#252a34]">
                <img
                  src={race.image}
                  alt={race.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=500&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Date Column */}
              <div className="text-center w-7 sm:w-9 shrink-0 flex flex-col items-center justify-center">
                <span className="text-lg sm:text-xl font-black text-white leading-none tracking-tight">
                  {race.day}
                </span>
                <span className="text-[10px] sm:text-xs font-black text-[#ef1020] uppercase leading-tight mt-0.5">
                  {race.month}
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] font-mono text-[#787f8b] font-medium leading-tight mt-0.5">
                  {race.year}
                </span>
              </div>

              {/* Divider Line */}
              <div className="w-[1px] h-14 bg-[#1f232b] shrink-0" />

              {/* Middle Race Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="text-xs sm:text-sm font-black italic text-white tracking-wide truncate group-hover:text-[#ff3848] transition-colors">
                  {race.title}
                </h3>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[#8b919e] text-[9.5px] sm:text-[10.5px] font-bold">
                    <MapPin className="w-3 h-3 text-[#787e8b] shrink-0" />
                    <span className="truncate">{race.city}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#8b919e] text-[9.5px] sm:text-[10.5px] font-bold">
                    <Tag className="w-3 h-3 text-[#787e8b] shrink-0" />
                    <span className="truncate">{race.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-0.5 text-[9.5px] sm:text-[10.5px] text-white font-mono font-bold">
                  <div className="flex items-center gap-1">
                    <Route className="w-3 h-3 text-[#7d8492] shrink-0" />
                    <span>{race.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#7d8492] shrink-0" />
                    <span>{race.time}</span>
                  </div>
                </div>
              </div>

              {/* Right Rank Badge */}
              {race.isFirstPlace ? (
                <div className="w-20 sm:w-24 h-18 sm:h-20 rounded-xl bg-gradient-to-br from-[#ef1020] via-[#c70b18] to-[#8f040d] p-1.5 sm:p-2 flex flex-col items-center justify-center text-center shrink-0 shadow-[0_0_20px_rgba(239,16,32,0.45)] border border-[#ff4755]/50">
                  <Crown className="w-4 h-4 text-[#ffd700] fill-[#ffd700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                  <span className="text-base sm:text-xl font-black italic text-white tracking-tight leading-none mt-0.5">
                    {race.rank}
                  </span>
                  <span className="text-[7.5px] sm:text-[8px] font-mono text-white/90 font-bold uppercase tracking-wider leading-tight mt-0.5">
                    OF {race.totalRiders} RIDERS
                  </span>
                </div>
              ) : (
                <div className="w-20 sm:w-24 h-18 sm:h-20 rounded-xl bg-[#13161c] border border-[#262b36] p-1.5 sm:p-2 flex flex-col items-center justify-center text-center shrink-0 group-hover:border-[#383f4f] transition-colors">
                  <span className="text-base sm:text-xl font-black italic text-[#cbd0d8] font-mono tracking-tight leading-none">
                    {race.rank}
                  </span>
                  <span className="text-[7.5px] sm:text-[8px] font-mono text-[#787f8b] font-bold uppercase tracking-wider leading-tight mt-1">
                    OF {race.totalRiders} RIDERS
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. TIMELINE & HISTORY */}
      <section className="rounded-2xl bg-gradient-to-br from-[#121417] to-[#090a0c] border border-[#272a2e] overflow-hidden shadow-lg p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#212429] pb-2.5">
          <span className="text-[10px] font-black italic tracking-wider text-white flex items-center gap-1.5">
            <span className="text-[#ef1020]">⌁</span>
            <span>HISTORY & MILESTONES</span>
          </span>
          <span className="text-[9px] font-mono text-[#787e88]">3 Milestones</span>
        </div>

        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-[9px] font-mono font-bold text-[#808690] w-16 shrink-0 pt-0.5">
              DEC 2026
            </span>
            <div>
              <h4 className="text-xs font-bold text-white">Legacy Rider Status</h4>
              <p className="text-[10px] text-[#8e94a0]">Active competition record preserved in FIXGEAR.ID leaderboard.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-[9px] font-mono font-bold text-[#ef1020] w-16 shrink-0 pt-0.5">
              MAY 2026
            </span>
            <div>
              <h4 className="text-xs font-bold text-white">Membership Upgrade</h4>
              <p className="text-[10px] text-[#8e94a0]">Upgraded to FG Member+ status with priority criterium registration.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-[9px] font-mono font-bold text-[#808690] w-16 shrink-0 pt-0.5">
              MAR 2026
            </span>
            <div>
              <h4 className="text-xs font-bold text-white">Joined FIXGEAR.ID</h4>
              <p className="text-[10px] text-[#8e94a0]">Official rider registration & assigned Rider ID: FGM-2503127.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACHIEVEMENTS & MEDALS */}
      <section className="rounded-2xl bg-gradient-to-br from-[#121417] to-[#090a0c] border border-[#272a2e] overflow-hidden shadow-lg p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#212429] pb-2.5">
          <span className="text-[10px] font-black italic tracking-wider text-white flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#ef1020]" />
            <span>ACHIEVEMENTS</span>
          </span>
          <span className="text-[9px] font-mono text-[#f2bd16]">3 Unlocked</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-[#14171c] border border-[#282d36] space-y-1">
            <div className="w-10 h-10 rounded-xl bg-[#d99124]/20 border border-[#d99124] text-[#e7a126] flex items-center justify-center text-lg mx-auto">
              🏆
            </div>
            <span className="text-xs font-black text-white block">1000 KM</span>
            <span className="text-[8px] font-mono text-[#8e94a0] block uppercase">DISTANCE MASTER</span>
          </div>

          <div className="p-3 rounded-xl bg-[#14171c] border border-[#282d36] space-y-1">
            <div className="w-10 h-10 rounded-xl bg-[#d99124]/20 border border-[#d99124] text-[#e7a126] flex items-center justify-center text-lg mx-auto">
              🏁
            </div>
            <span className="text-xs font-black text-white block">5 EVENTS</span>
            <span className="text-[8px] font-mono text-[#8e94a0] block uppercase">CRIT FINISHER</span>
          </div>

          <div className="p-3 rounded-xl bg-[#14171c] border border-[#282d36] space-y-1">
            <div className="w-10 h-10 rounded-xl bg-[#bfc3c8]/20 border border-[#bfc3c8] text-[#bfc3c8] flex items-center justify-center text-lg mx-auto">
              🥈
            </div>
            <span className="text-xs font-black text-white block">PODIUM</span>
            <span className="text-[8px] font-mono text-[#8e94a0] block uppercase">TOP 3 FINISH</span>
          </div>
        </div>
      </section>

      {/* 5. SOCIAL & CONTACT */}
      <section className="rounded-2xl bg-gradient-to-br from-[#121417] to-[#090a0c] border border-[#272a2e] overflow-hidden shadow-lg p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#212429] pb-2.5">
          <span className="text-[10px] font-black italic tracking-wider text-white flex items-center gap-1.5">
            <span className="text-[#ef1020]">⌁</span>
            <span>SOCIAL & CONTACT</span>
          </span>
          <button
            onClick={() => {
              setInstagramVal(profile.instagram);
              setTiktokVal(profile.tiktok);
              setStravaVal(profile.strava);
              setWhatsappVal(profile.whatsapp);
              setYoutubeVal(profile.youtube);
              setEmailVal(profile.email);
              setActiveEditModal('contact');
            }}
            className="text-[9px] font-bold text-[#ef1020] hover:underline"
          >
            EDIT
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[9px] font-mono text-[#787e88] block">Instagram</span>
            <span className="font-bold text-white">{profile.instagram}</span>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#787e88] block">TikTok</span>
            <span className="font-bold text-white">{profile.tiktok}</span>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#787e88] block">Strava</span>
            <span className="font-bold text-white">{profile.strava}</span>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#787e88] block">WhatsApp</span>
            <span className="font-bold text-white">{profile.whatsapp}</span>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#787e88] block">YouTube</span>
            <span className="font-bold text-white">{profile.youtube}</span>
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#787e88] block">Email</span>
            <span className="font-bold text-white truncate block">{profile.email}</span>
          </div>
        </div>
      </section>

      {/* LANGUAGE PREFERENCE SECTION */}
      <section className="rounded-2xl border border-[#262b35] bg-[#0c0e12] p-4 shadow-lg space-y-3">
        <div className="flex items-center justify-between border-b border-[#1b1e25] pb-2.5">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#ef1020]" />
            <div>
              <span className="text-[10px] font-mono text-[#ef1020] uppercase font-bold tracking-wider block leading-none">
                {t.profile_language_pref}
              </span>
              <span className="text-xs text-[#8c929e] font-sans mt-0.5 block">
                {t.profile_language_desc}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#1c2027] text-white border border-[#2d3340] uppercase">
            {language === 'id' ? 'Bahasa Indonesia' : 'English'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            id="btn-lang-id"
            onClick={() => setLanguage('id')}
            className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              language === 'id'
                ? 'bg-[#180a0d] border-[#ef1020] text-white shadow-[0_0_12px_rgba(239,16,32,0.25)]'
                : 'bg-[#14171d] border-[#222731] text-[#8c929e] hover:text-white hover:border-[#353c4b]'
            }`}
          >
            <div className="flex items-center gap-2.5 text-left">
              <span className="text-lg">🇮🇩</span>
              <div>
                <span className="text-xs font-black block leading-tight">Bahasa Indonesia</span>
                <span className="text-[9px] font-mono text-[#8a909d]">Default</span>
              </div>
            </div>
            {language === 'id' && (
              <div className="w-5 h-5 rounded-full bg-[#ef1020] flex items-center justify-center text-white shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            )}
          </button>

          <button
            type="button"
            id="btn-lang-en"
            onClick={() => setLanguage('en')}
            className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              language === 'en'
                ? 'bg-[#180a0d] border-[#ef1020] text-white shadow-[0_0_12px_rgba(239,16,32,0.25)]'
                : 'bg-[#14171d] border-[#222731] text-[#8c929e] hover:text-white hover:border-[#353c4b]'
            }`}
          >
            <div className="flex items-center gap-2.5 text-left">
              <span className="text-lg">🇬🇧</span>
              <div>
                <span className="text-xs font-black block leading-tight">English</span>
                <span className="text-[9px] font-mono text-[#8a909d]">International</span>
              </div>
            </div>
            {language === 'en' && (
              <div className="w-5 h-5 rounded-full bg-[#ef1020] flex items-center justify-center text-white shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            )}
          </button>
        </div>
      </section>

      {/* FOOTER MOTTO */}
      <div className="py-6 text-center space-y-1">
        <div className="text-3xl font-black italic tracking-tighter text-white leading-none">
          FG
        </div>
        <div className="text-sm font-black tracking-widest text-[#ef1020]">FIXGEAR.ID</div>
        <div className="text-[9px] font-mono text-[#666c76] uppercase">
          FIXED GEAR IDENTITY™ • INDONESIA
        </div>
      </div>

      {/* ================= EDIT BOTTOM DRAWER / FULL MOBILE MODAL ================= */}
      {activeEditModal && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col sm:items-center sm:justify-center p-0 sm:p-4 overscroll-contain animate-in fade-in duration-200"
          onClick={() => setActiveEditModal(null)}
        >
          <div
            className="w-full max-w-md bg-[#0e1014] sm:border border-[#292e37] sm:rounded-2xl h-[100dvh] sm:h-auto sm:max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header (Clean title with Close button only) */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f2227] bg-[#111417] shrink-0">
              <div>
                <span className="text-[8px] font-mono text-[#ef1020] uppercase font-bold tracking-widest block leading-tight">
                  RIDER IDENTITY
                </span>
                <h3 className="text-sm font-black italic tracking-wide text-white uppercase leading-none mt-0.5">
                  {activeEditModal === 'profile' && 'EDIT PROFIL'}
                  {activeEditModal === 'about' && 'EDIT TENTANG SAYA'}
                  {activeEditModal === 'bike' && 'EDIT DATA SEPEDA'}
                  {activeEditModal === 'contact' && 'EDIT SOCIAL & KONTAK'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveEditModal(null)}
                className="w-8 h-8 rounded-full bg-[#1a1d22] text-[#8e9297] hover:text-white flex items-center justify-center transition-colors shrink-0"
                title="Tutup Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form wrapper with scrollable fields and bottom CTA */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
              }}
              className="flex flex-col flex-1 min-h-0 overflow-hidden"
            >
              {/* Modal Body (Scrollable Inputs Area) */}
              <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1 overscroll-contain">
                {activeEditModal === 'profile' && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#888e99] mb-1">
                          Nama Rider (Panggilan)
                        </label>
                        <input
                          type="text"
                          value={nameVal}
                          onChange={(e) => setNameVal(e.target.value)}
                          className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                          placeholder="Contoh: AZISS"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#888e99] mb-1">
                          Nama Lengkap (Dossier)
                        </label>
                        <input
                          type="text"
                          value={fullNameVal}
                          onChange={(e) => setFullNameVal(e.target.value)}
                          className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                          placeholder="Muhammad Azzy Zaid Arkan"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#888e99] mb-1">
                          Tgl Lahir
                        </label>
                        <input
                          type="text"
                          value={birthDateVal}
                          onChange={(e) => setBirthDateVal(e.target.value)}
                          className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                          placeholder="14 Mei 2002"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#888e99] mb-1">
                          Usia (Tahun)
                        </label>
                        <input
                          type="number"
                          value={ageVal}
                          onChange={(e) => setAgeVal(e.target.value)}
                          className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                          placeholder="24"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#888e99] mb-1">
                          {language === 'id' ? 'Jenis Kelamin' : 'Gender'}
                        </label>
                        <select
                          value={genderVal}
                          onChange={(e) => setGenderVal(e.target.value)}
                          className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                        >
                          <option value="MALE">{language === 'id' ? 'Laki-laki' : 'Male'}</option>
                          <option value="FEMALE">{language === 'id' ? 'Perempuan' : 'Female'}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#888e99] mb-1">
                          Golongan Darah
                        </label>
                        <select
                          value={bloodTypeVal}
                          onChange={(e) => setBloodTypeVal(e.target.value)}
                          className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                        >
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#888e99] mb-1">
                          Username / Handle
                        </label>
                        <input
                          type="text"
                          value={handleVal}
                          onChange={(e) => setHandleVal(e.target.value)}
                          className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                          placeholder="@azis.fixed"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#888e99] mb-1">
                          Kota Domisili
                        </label>
                        <input
                          type="text"
                          value={cityVal}
                          onChange={(e) => setCityVal(e.target.value)}
                          className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                          placeholder="Jakarta, ID"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#888e99] mb-1">
                        Kontak Darurat (Emergency Contact)
                      </label>
                      <input
                        type="text"
                        value={emergencyContactVal}
                        onChange={(e) => setEmergencyContactVal(e.target.value)}
                        className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                        placeholder="+62 812 3456 7890"
                      />
                    </div>
                  </>
                )}

                {activeEditModal === 'about' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-mono uppercase text-[#888e99]">
                        Bio / Tentang Saya
                      </label>
                      <span className="text-[9px] font-mono text-[#6d737f]">
                        {aboutVal.length} / 500
                      </span>
                    </div>
                    <textarea
                      rows={6}
                      maxLength={500}
                      value={aboutVal}
                      onChange={(e) => setAboutVal(e.target.value)}
                      className="w-full bg-[#13161b] border border-[#272b33] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#ef1020] resize-none leading-relaxed"
                      placeholder="Ceritakan latar belakangmu bersepeda fixed gear..."
                    />
                  </div>
                )}

                {activeEditModal === 'bike' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#888e99] mb-1">
                        Nama / Tipe Frame Sepeda
                      </label>
                      <input
                        type="text"
                        value={bikeNameVal}
                        onChange={(e) => setBikeNameVal(e.target.value)}
                        className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                        placeholder="Engine11 Crit-D Gunmetal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#888e99] mb-1">
                        Spesifikasi Singkat (Size, Rasio Drivetrain)
                      </label>
                      <input
                        type="text"
                        value={bikeSpecVal}
                        onChange={(e) => setBikeSpecVal(e.target.value)}
                        className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                        placeholder="Size 54 • Ratio 49x15"
                        required
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-mono uppercase text-[#888e99]">
                          Keterangan Setup Komponen
                        </label>
                        <span className="text-[9px] font-mono text-[#6d737f]">
                          {bikeDescVal.length} / 300
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        maxLength={300}
                        value={bikeDescVal}
                        onChange={(e) => setBikeDescVal(e.target.value)}
                        className="w-full bg-[#13161b] border border-[#272b33] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#ef1020] resize-none leading-relaxed"
                        placeholder="Wheelset H Plus Son Archetype, Sugino 75 Crankset, Deda Pista Dropbar..."
                      />
                    </div>
                  </>
                )}

                {activeEditModal === 'contact' && (
                  <div className="grid grid-cols-2 gap-2.5 pb-2">
                    <div>
                      <label className="block text-[10px] font-mono text-[#888e99] mb-1">Instagram</label>
                      <input
                        type="text"
                        value={instagramVal}
                        onChange={(e) => setInstagramVal(e.target.value)}
                        placeholder="@username"
                        className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-[#888e99] mb-1">TikTok</label>
                      <input
                        type="text"
                        value={tiktokVal}
                        onChange={(e) => setTiktokVal(e.target.value)}
                        placeholder="@username"
                        className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-[#888e99] mb-1">Strava</label>
                      <input
                        type="text"
                        value={stravaVal}
                        onChange={(e) => setStravaVal(e.target.value)}
                        placeholder="Nama Strava"
                        className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-[#888e99] mb-1">WhatsApp</label>
                      <input
                        type="text"
                        value={whatsappVal}
                        onChange={(e) => setWhatsappVal(e.target.value)}
                        placeholder="+628..."
                        className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-[#888e99] mb-1">YouTube</label>
                      <input
                        type="text"
                        value={youtubeVal}
                        onChange={(e) => setYoutubeVal(e.target.value)}
                        placeholder="Channel"
                        className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-[#888e99] mb-1">Email</label>
                      <input
                        type="email"
                        value={emailVal}
                        onChange={(e) => setEmailVal(e.target.value)}
                        placeholder="email@domain.com"
                        className="w-full bg-[#13161b] border border-[#272b33] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ef1020]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* SINGLE BOTTOM ACTION BAR (EXCLUSIVELY AT THE BOTTOM) */}
              <div className="p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] border-t border-[#1f2227] bg-[#111417] flex items-center gap-2.5 shrink-0 shadow-[0_-10px_25px_rgba(0,0,0,0.6)]">
                <button
                  type="button"
                  onClick={() => setActiveEditModal(null)}
                  className="w-1/3 py-3 rounded-xl bg-[#1b1e24] hover:bg-[#262a33] text-[#b0b5c0] hover:text-white text-xs font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  id="btn-save-profile-edit"
                  className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-[#ef1020] via-[#d60b19] to-[#a80512] hover:brightness-110 active:scale-[0.98] text-white text-xs font-black italic tracking-wide transition-all shadow-[0_4px_16px_rgba(239,16,32,0.35)] flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>SIMPAN PERUBAHAN</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= VIEW ALL RACE HISTORY MODAL ================= */}
      {showAllRaces && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col sm:items-center sm:justify-center p-0 sm:p-4 overscroll-contain animate-in fade-in duration-200"
          onClick={() => setShowAllRaces(false)}
        >
          <div
            className="w-full max-w-lg bg-[#0e1014] sm:border border-[#292e37] sm:rounded-2xl h-[100dvh] sm:h-auto sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f2227] bg-[#111417] shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="inline-block w-2 h-4 bg-[#ef1020] skew-x-[-18deg] rounded-[1px]" />
                <div>
                  <span className="text-[8px] font-mono text-[#ef1020] uppercase font-bold tracking-widest block leading-tight">
                    RIDER RECORD
                  </span>
                  <h3 className="text-sm font-black italic tracking-wide text-white uppercase leading-none mt-0.5">
                    ALL RACE HISTORY
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAllRaces(false)}
                className="w-8 h-8 rounded-full bg-[#1a1d22] text-[#8e9297] hover:text-white flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Rider Summary Ribbon */}
            <div className="bg-[#14171d] px-4 py-2.5 border-b border-[#21252d] grid grid-cols-4 sm:grid-cols-8 gap-2 text-center shrink-0">
              <div className="text-center">
                <span className="text-[7.5px] font-mono text-[#8a909c] uppercase block font-bold">Race</span>
                <span className="text-xs sm:text-sm font-black text-white">{profile.stats.totalRace}</span>
              </div>
              <div className="text-center">
                <span className="text-[7.5px] font-mono text-[#8a909c] uppercase block font-bold">Distance</span>
                <span className="text-xs sm:text-sm font-black text-[#ef1020]">{profile.stats.totalDistanceKm}K</span>
              </div>
              <div className="text-center">
                <span className="text-[7.5px] font-mono text-[#8a909c] uppercase block font-bold">Time</span>
                <span className="text-xs sm:text-sm font-black text-white">{profile.stats.totalHours}h</span>
              </div>
              <div className="text-center">
                <span className="text-[7.5px] font-mono text-[#8a909c] uppercase block font-bold">Finish</span>
                <span className="text-xs sm:text-sm font-black text-emerald-400">{profile.stats.totalFinishes ?? profile.stats.totalRace}</span>
              </div>
              <div className="text-center">
                <span className="text-[7.5px] font-mono text-[#8a909c] uppercase block font-bold">Podiums</span>
                <span className="text-xs sm:text-sm font-black text-[#f59e0b]">{profile.stats.totalPodiums ?? 14}</span>
              </div>
              <div className="text-center">
                <span className="text-[7.5px] font-mono text-[#8a909c] uppercase block font-bold">Win</span>
                <span className="text-xs sm:text-sm font-black text-[#ef1020]">{profile.stats.totalWins ?? 8}</span>
              </div>
              <div className="text-center">
                <span className="text-[7.5px] font-mono text-[#8a909c] uppercase block font-bold">Point</span>
                <span className="text-xs sm:text-sm font-black text-[#f2bd16]">{profile.stats.points}</span>
              </div>
              <div className="text-center">
                <span className="text-[7.5px] font-mono text-[#8a909c] uppercase block font-bold">Rank</span>
                <span className="text-xs sm:text-sm font-black text-white">#{profile.stats.overallRanking}</span>
              </div>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {RACE_HISTORIES.map((race) => (
                <div
                  key={race.id}
                  onClick={() => setSelectedRace(race)}
                  className="rounded-2xl bg-[#12141a] border border-[#232730] hover:border-[#3d4452] transition-all p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3.5 relative overflow-hidden group shadow-lg cursor-pointer"
                >
                  <div className="w-20 sm:w-24 h-18 sm:h-20 rounded-xl overflow-hidden bg-[#161920] shrink-0 relative border border-[#252a34]">
                    <img
                      src={race.image}
                      alt={race.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="text-center w-7 sm:w-8 shrink-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-white leading-none">{race.day}</span>
                    <span className="text-[10px] font-black text-[#ef1020] uppercase leading-tight mt-0.5">{race.month}</span>
                    <span className="text-[8.5px] font-mono text-[#787f8b] font-medium leading-tight mt-0.5">{race.year}</span>
                  </div>

                  <div className="w-[1px] h-12 bg-[#1f232b] shrink-0" />

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-black italic text-white tracking-wide truncate group-hover:text-[#ef1020] transition-colors">
                      {race.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[#8b919e] text-[9.5px] font-bold">
                      <span className="truncate">{race.city}</span>
                      <span>•</span>
                      <span className="truncate">{race.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[9.5px] text-white font-mono font-bold">
                      <span>{race.distance}</span>
                      <span>•</span>
                      <span>{race.time}</span>
                    </div>
                  </div>

                  {race.isFirstPlace ? (
                    <div className="w-16 sm:w-20 h-16 sm:h-18 rounded-xl bg-gradient-to-br from-[#ef1020] to-[#8f040d] p-1 flex flex-col items-center justify-center text-center shrink-0 border border-[#ff4755]/50">
                      <Crown className="w-3.5 h-3.5 text-[#ffd700] fill-[#ffd700]" />
                      <span className="text-sm sm:text-base font-black italic text-white leading-none mt-0.5">{race.rank}</span>
                      <span className="text-[7px] font-mono text-white/90 font-bold uppercase mt-0.5">OF {race.totalRiders}</span>
                    </div>
                  ) : (
                    <div className="w-16 sm:w-20 h-16 sm:h-18 rounded-xl bg-[#171a21] border border-[#272c38] p-1 flex flex-col items-center justify-center text-center shrink-0">
                      <span className="text-sm sm:text-base font-black italic text-[#cbd0d8] font-mono leading-none">{race.rank}</span>
                      <span className="text-[7px] font-mono text-[#787f8b] font-bold uppercase mt-0.5">OF {race.totalRiders}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal Bottom CTA */}
            <div className="p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] border-t border-[#1f2227] bg-[#111417] shrink-0">
              <button
                type="button"
                onClick={() => setShowAllRaces(false)}
                className="w-full py-3 rounded-xl bg-[#1a1d22] hover:bg-[#252a32] text-white text-xs font-bold transition-colors"
              >
                Tutup History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= RACE DETAIL MODAL ================= */}
      {selectedRace && (
        <div
          className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overscroll-contain animate-in fade-in duration-150"
          onClick={() => setSelectedRace(null)}
        >
          <div
            className="w-full max-w-sm bg-[#0e1014] border border-[#ef1020]/40 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(239,16,32,0.3)] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Race Image Banner */}
            <div className="relative h-44 bg-[#14171d]">
              <img
                src={selectedRace.image}
                alt={selectedRace.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1014] via-black/40 to-transparent" />
              
              <button
                type="button"
                onClick={() => setSelectedRace(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-sm text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[9px] font-mono text-[#ef1020] uppercase font-bold tracking-widest block">
                    {selectedRace.day} {selectedRace.month} {selectedRace.year} • {selectedRace.city}
                  </span>
                  <h3 className="text-base font-black italic text-white uppercase tracking-wide">
                    {selectedRace.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Race Stat Highlights */}
            <div className="px-5 pb-5 space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-[#14171c] border border-[#242831]">
                  <span className="text-[8px] font-mono text-[#868c98] block uppercase font-bold">FINISH RANK</span>
                  <span className="text-sm font-black text-[#ef1020] font-mono">{selectedRace.rank}</span>
                  <span className="text-[7.5px] font-mono text-[#787f8b] block">/ {selectedRace.totalRiders}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#14171c] border border-[#242831]">
                  <span className="text-[8px] font-mono text-[#868c98] block uppercase font-bold">DISTANCE</span>
                  <span className="text-sm font-black text-white font-mono">{selectedRace.distance}</span>
                  <span className="text-[7.5px] font-mono text-[#787f8b] block">TRACK DIST</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#14171c] border border-[#242831]">
                  <span className="text-[8px] font-mono text-[#868c98] block uppercase font-bold">CHIP TIME</span>
                  <span className="text-sm font-black text-white font-mono">{selectedRace.time}</span>
                  <span className="text-[7.5px] font-mono text-[#787f8b] block">OFFICIAL</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#12151b] border border-[#232730] space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-[#8e94a0] text-[11px]">
                  <span>Category</span>
                  <span className="font-bold text-white">{selectedRace.category}</span>
                </div>
                <div className="flex justify-between items-center text-[#8e94a0] text-[11px]">
                  <span>Rider Category</span>
                  <span className="font-bold text-[#ef1020]">FG MEMBER+</span>
                </div>
                <div className="flex justify-between items-center text-[#8e94a0] text-[11px]">
                  <span>Points Awarded</span>
                  <span className="font-mono font-bold text-[#f2bd16]">+{selectedRace.pointsEarned || 150} PTS</span>
                </div>
                <div className="flex justify-between items-center text-[#8e94a0] text-[11px]">
                  <span>Verification</span>
                  <span className="font-mono text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" /> Transponder Confirmed
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRace(null)}
                className="w-full py-2.5 rounded-xl bg-[#181b22] hover:bg-[#222730] text-white text-xs font-bold transition-colors"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
