import React, { useState } from 'react';
import { X, ShieldCheck, Zap, RotateCw, CheckCircle2, Copy, Maximize2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FGQRCode } from './FGQRCode';

export const RiderPassModal: React.FC = () => {
  const { isRiderPassOpen, setIsRiderPassOpen, profile, t, language } = useApp();
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isZoomedQr, setIsZoomedQr] = useState(false);

  if (!isRiderPassOpen) return null;

  const copyRiderId = () => {
    navigator.clipboard?.writeText(profile.riderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="modal-rider-pass-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsRiderPassOpen(false);
      }}
    >
      <div className="w-full max-w-sm my-auto bg-[#0a0c0e] border border-[#272b30] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f2227] bg-[#0f1114]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ef1020] animate-ping"></div>
            <span className="text-xs font-black tracking-widest text-[#ef1020] uppercase font-mono">
              OFFICIAL DIGITAL RIDER PASS
            </span>
          </div>
          <button
            id="btn-close-rider-pass"
            onClick={() => setIsRiderPassOpen(false)}
            className="w-7 h-7 rounded-full bg-[#1b1e22] text-[#8e9297] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-4">
          {/* 3D Holo Card Container - Identical fixed dimensions & diameter for front and back */}
          <div
            className="relative w-full min-h-[365px] rounded-2xl p-5 border border-[#ff2a3a]/40 overflow-hidden shadow-[0_10px_35px_rgba(239,16,32,0.25)] transition-all duration-300 flex flex-col justify-between"
            style={{
              background: isFlipped
                ? 'linear-gradient(145deg, #121418 0%, #08090a 100%)'
                : 'radial-gradient(circle at 85% 15%, rgba(239, 16, 32, 0.35) 0%, transparent 60%), linear-gradient(135deg, #18090b 0%, #0d0f12 50%, #060708 100%)',
            }}
          >
            {/* Holographic Watermark lines */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-[#ef1020]/20 blur-2xl pointer-events-none" />

            {!isFlipped ? (
              /* FRONT OF PASS */
              <div className="relative z-10 flex flex-col justify-between h-full space-y-3.5 flex-1">
                <div className="space-y-3.5">
                  {/* Top Row: Brand & Pass Tag */}
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-2xl font-black italic tracking-tighter text-white">
                        FIXGEAR<span className="text-[#ef1020]">.ID</span>
                      </div>
                      <div className="text-[8px] font-mono tracking-widest text-[#a1a5ab] uppercase">
                        CRIT PASS • SEASON 2026
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="px-2 py-0.5 rounded bg-[#ef1020] text-white text-[9px] font-black tracking-wider uppercase italic">
                        {profile.membership}
                      </span>
                      <span className="text-[9px] font-mono text-[#8a8f96] mt-0.5 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#38ef7d]" /> VERIFIED
                      </span>
                    </div>
                  </div>

                  {/* Rider Photo & Info */}
                  <div className="flex gap-3.5 items-center">
                    <div className="relative w-15 h-15 rounded-xl overflow-hidden border-2 border-[#ef1020]/80 shadow-[0_0_15px_rgba(239,16,32,0.3)] bg-[#1c1f24] shrink-0">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 right-0 left-0 bg-[#ef1020]/90 text-white text-[7px] font-black text-center py-0.5">
                        #027
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-lg font-black italic text-white tracking-tight leading-none truncate">
                        {profile.name}
                      </div>
                      <div className="text-xs text-[#a0a5ad] font-mono mt-0.5">{profile.handle}</div>
                      <div className="text-[10px] text-[#ef1020] font-bold mt-1 tracking-wide flex items-center gap-1">
                        <Zap className="w-3 h-3" /> FIXGEAR.ID CREW (FGC)
                      </div>
                    </div>
                  </div>

                  {/* Stats Matrix */}
                  <div className="grid grid-cols-4 gap-1.5 py-2 px-2.5 rounded-xl bg-black/60 border border-[#2b2f36]/70 text-center">
                    <div>
                      <span className="block text-[8px] text-[#808690] uppercase font-bold">RACES</span>
                      <span className="text-xs font-black text-white">{profile.stats.totalRace}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-[#808690] uppercase font-bold">DISTANCE</span>
                      <span className="text-xs font-black text-[#ef1020]">{profile.stats.totalDistanceKm} KM</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-[#808690] uppercase font-bold">FINISH</span>
                      <span className="text-xs font-black text-white">{profile.stats.totalFinishes ?? profile.stats.totalRace}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-[#808690] uppercase font-bold">POINTS</span>
                      <span className="text-xs font-black text-[#ffd13b]">{profile.stats.points}</span>
                    </div>
                  </div>
                </div>

                {/* Single Official Verification Barcode (QR Code with FG Center Logo) */}
                <div className="pt-2 border-t border-[#2d3138] flex items-center justify-between gap-3 mt-auto">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 text-[8px] font-mono text-[#ef1020] uppercase font-bold tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ef1020] animate-pulse" />
                      <span>OFFICIAL VENUE SCAN</span>
                    </div>
                    <div className="text-xs font-mono font-black text-white tracking-widest mt-0.5">
                      {profile.riderId}
                    </div>
                    <div className="text-[8px] text-[#8a8f98] font-mono mt-0.5 uppercase">
                      Race Bib & Transponder Auth
                    </div>
                  </div>

                  {/* Single 1-Barcode QR with FG Emblem */}
                  <button
                    type="button"
                    onClick={() => setIsZoomedQr(true)}
                    className="relative group shrink-0"
                    title="Klik untuk memperbesar QR Code"
                  >
                    <FGQRCode
                      size={68}
                      riderId={profile.riderId}
                      className="border-2 border-[#ef1020]/70 group-hover:border-[#ef1020] group-hover:scale-105 transition-all cursor-pointer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-xl flex items-center justify-center transition-opacity pointer-events-none">
                      <Maximize2 className="w-4 h-4 text-white drop-shadow" />
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              /* BACK OF PASS (Official Rider Identity & Medical Dossier) */
              <div className="relative z-10 flex flex-col justify-between h-full space-y-2.5 text-xs flex-1">
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center border-b border-[#2b2f36] pb-2">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#ef1020]" />
                      <span className="text-[10px] font-mono font-bold text-[#ef1020] uppercase tracking-wider">
                        {t.pass_official_dossier}
                      </span>
                    </div>
                    <span className="text-[9px] text-[#9398a1] font-mono">SEAL #2026-FG</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    {/* FULL NAME (Span 2 cols) */}
                    <div className="col-span-2 bg-[#12151a]/80 p-2.5 rounded-xl border border-[#232730]">
                      <span className="text-[#7e848e] text-[8.5px] font-mono uppercase block font-bold tracking-wider">
                        {t.pass_full_name}
                      </span>
                      <span className="font-black text-white text-xs tracking-wide">
                        {profile.fullName || 'Muhammad Azzy Zaid Arkan'}
                      </span>
                    </div>

                    {/* HOME CITY */}
                    <div className="bg-[#12151a]/80 p-2.5 rounded-xl border border-[#232730]">
                      <span className="text-[#7e848e] text-[8.5px] font-mono uppercase block font-bold tracking-wider">
                        {t.pass_home_city}
                      </span>
                      <span className="text-white font-medium text-[11px]">
                        {profile.city || 'Jakarta, Indonesia'}
                      </span>
                    </div>

                    {/* BLOOD TYPE */}
                    <div className="bg-[#12151a]/80 p-2.5 rounded-xl border border-[#232730] flex items-center justify-between">
                      <div>
                        <span className="text-[#7e848e] text-[8.5px] font-mono uppercase block font-bold tracking-wider">
                          {t.pass_blood_type}
                        </span>
                        <span className="font-mono font-black text-[#ef1020] text-xs">
                          {profile.bloodType || 'AB+'}
                        </span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-[#ef1020]/20 text-[#ef1020] font-bold border border-[#ef1020]/40">
                        MED
                      </span>
                    </div>

                    {/* DATE OF BIRTH */}
                    <div className="bg-[#12151a]/80 p-2.5 rounded-xl border border-[#232730]">
                      <span className="text-[#7e848e] text-[8.5px] font-mono uppercase block font-bold tracking-wider">
                        {t.pass_dob_age}
                      </span>
                      <span className="font-mono font-bold text-white text-[11px]">
                        {profile.birthDate || '14 Mei 2002'}
                      </span>
                    </div>

                    {/* GENDER */}
                    <div className="bg-[#12151a]/80 p-2.5 rounded-xl border border-[#232730]">
                      <span className="text-[#7e848e] text-[8.5px] font-mono uppercase block font-bold tracking-wider">
                        {t.pass_gender}
                      </span>
                      <span className="font-mono font-black text-white text-[11px]">
                        {profile.gender === 'FEMALE' 
                          ? (language === 'id' ? 'Perempuan' : 'Female') 
                          : (language === 'id' ? 'Laki-laki' : 'Male')}
                      </span>
                    </div>

                    {/* EMERGENCY CONTACT (Span 2 cols) */}
                    <div className="col-span-2 bg-[#12151a]/80 p-2.5 rounded-xl border border-[#232730]">
                      <span className="text-[#7e848e] text-[8.5px] font-mono uppercase block font-bold tracking-wider">
                        {t.pass_emergency_contact}
                      </span>
                      <span className="font-mono font-bold text-white text-[11px]">
                        {profile.emergencyContact || profile.whatsapp || '+62 812 3456 7890'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#2b2f36] text-[8px] text-[#717781] leading-relaxed mt-auto">
                  {t.pass_validity_note}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons below Pass */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id="btn-flip-rider-pass"
              onClick={() => setIsFlipped(!isFlipped)}
              className="py-2.5 px-3 rounded-xl bg-[#17191d] hover:bg-[#22262c] text-white text-xs font-bold border border-[#2d3138] flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#ef1020]" />
              <span>{isFlipped ? t.pass_view_front : t.pass_view_back}</span>
            </button>

            <button
              id="btn-copy-rider-id"
              onClick={copyRiderId}
              className="py-2.5 px-3 rounded-xl bg-[#17191d] hover:bg-[#22262c] text-white text-xs font-bold border border-[#2d3138] flex items-center justify-center gap-1.5 transition-all"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38ef7d]" />
                  <span className="text-[#38ef7d]">{t.pass_copied ? 'Tersalin / Copied!' : 'Tersalin!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#c2c5c9]" />
                  <span>ID: {profile.riderId}</span>
                </>
              )}
            </button>
          </div>

          {/* Official Verification Notice */}
          <div className="p-2.5 rounded-xl bg-[#111316] border border-[#22252a] text-center text-[10px] text-[#808690]">
            Tunjukkan QR Code ini pada Race Marshall saat registrasi ulang di venue untuk mengambil Transponder & Bib Balap.
          </div>
        </div>
      </div>

      {/* ================= ZOOMED QR CODE MODAL FOR VENUE MARSHALLS ================= */}
      {isZoomedQr && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setIsZoomedQr(false)}
        >
          <div
            className="w-full max-w-xs bg-[#0f1115] border border-[#ef1020]/60 rounded-3xl p-6 text-center space-y-4 shadow-[0_0_50px_rgba(239,16,32,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <span className="text-[9px] font-mono text-[#ef1020] uppercase font-bold tracking-widest block">
                  MARSHALL SCAN GATE
                </span>
                <span className="text-xs font-black text-white italic">
                  FIXGEAR.ID AUTHENTICATED
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomedQr(false)}
                className="w-7 h-7 rounded-full bg-[#1c1f24] text-white/70 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Large High-Contrast QR Code */}
            <div className="p-3 bg-white rounded-2xl shadow-xl mx-auto flex items-center justify-center">
              <FGQRCode size={220} riderId={profile.riderId} />
            </div>

            <div className="space-y-1">
              <div className="text-sm font-black italic text-white tracking-wide">
                {profile.name}
              </div>
              <div className="text-xs font-mono text-[#ef1020] font-bold">
                {profile.riderId} • BIB #027
              </div>
              <p className="text-[10px] text-[#868c98] font-mono pt-1">
                Scan via FIXGEAR Marshall Scanner Device
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsZoomedQr(false)}
              className="w-full py-2.5 rounded-xl bg-[#1b1e24] hover:bg-[#252a32] text-white text-xs font-bold transition-colors"
            >
              Tutup QR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
