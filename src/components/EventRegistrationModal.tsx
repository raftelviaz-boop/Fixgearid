import React, { useState } from 'react';
import { X, CheckCircle2, ShieldAlert, Flag, Calendar, MapPin, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const EventRegistrationModal: React.FC = () => {
  const { selectedEventForModal, setSelectedEventForModal, registerForEvent, registeredEventIds, profile } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'Fixed Open' | 'Fixed Rookie' | 'Sprint Keirin'>('Fixed Open');
  const [gearRatio, setGearRatio] = useState('49x15');
  const [agreedToRules, setAgreedToRules] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!selectedEventForModal) return null;

  const isAlreadyRegistered = registeredEventIds.includes(selectedEventForModal.id);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToRules) return;

    registerForEvent(selectedEventForModal.id);
    setIsSuccess(true);

    // Fire Confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ef1020', '#ffffff', '#ffd13b'],
    });

    setTimeout(() => {
      setIsSuccess(false);
      setSelectedEventForModal(null);
    }, 2400);
  };

  return (
    <div
      id="modal-event-registration-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedEventForModal(null);
      }}
    >
      <div className="w-full max-w-md bg-[#0c0e11] border-t sm:border border-[#272b30] rounded-t-2xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f2227] bg-[#111417]">
          <div>
            <span className="text-[9px] font-mono text-[#ef1020] uppercase font-bold tracking-widest block">
              RACE REGISTRATION
            </span>
            <h3 className="text-sm font-black italic tracking-wide text-white leading-tight">
              {selectedEventForModal.title}
            </h3>
          </div>
          <button
            onClick={() => setSelectedEventForModal(null)}
            className="w-7 h-7 rounded-full bg-[#1b1e22] text-[#8e9297] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {isSuccess ? (
            <div className="text-center py-8 space-y-3 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-[#ef1020]/20 border-2 border-[#ef1020] mx-auto flex items-center justify-center text-[#ef1020]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-black italic text-white">PENDAFTARAN BERHASIL!</h4>
              <p className="text-xs text-[#a0a5b0] max-w-xs mx-auto">
                Slot balap telah dikonfirmasi. Nomor Bib <strong className="text-white">#027</strong> dan transponder telah disematkan di Rider Pass kamu.
              </p>
              <div className="p-3 bg-[#171a20] rounded-xl border border-[#2b303a] text-xs font-mono text-[#ef1020]">
                RIDER ID: {profile.riderId}
              </div>
            </div>
          ) : isAlreadyRegistered ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#10b981]/20 border border-[#10b981] mx-auto flex items-center justify-center text-[#10b981]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black italic text-white">KAMU SUDAH TERDAFTAR</h4>
              <p className="text-xs text-[#9aa0ac]">
                Kamu telah terdaftar di event ini dengan status <strong className="text-[#38ef7d]">CONFIRMED</strong>. Tunjukkan Digital Rider Pass saat pengambilan race pack di lokasi.
              </p>
              <button
                onClick={() => setSelectedEventForModal(null)}
                className="w-full py-3 rounded-xl bg-[#1b1e24] hover:bg-[#252a32] text-white text-xs font-bold transition-all mt-2"
              >
                Tutup
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Event Brief banner */}
              <div className="p-3.5 rounded-xl bg-[#12151a] border border-[#22262d] space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-[#dcdfe4]">
                  <Calendar className="w-4 h-4 text-[#ef1020]" />
                  <span>{selectedEventForModal.date} • {selectedEventForModal.time}</span>
                </div>
                <div className="flex items-center gap-2 text-[#8e94a0]">
                  <MapPin className="w-4 h-4 text-[#ef1020]" />
                  <span>{selectedEventForModal.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#8e94a0]">
                  <Flag className="w-4 h-4 text-[#ef1020]" />
                  <span>{selectedEventForModal.distance} ({selectedEventForModal.circuitType})</span>
                </div>
              </div>

              {/* Rider Identity Check */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#888e99] mb-1.5">
                  Rider Terdaftar
                </label>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#14171c] border border-[#262b33]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#20252d] overflow-hidden">
                      <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{profile.name}</div>
                      <div className="text-[10px] text-[#8e94a0] font-mono">{profile.riderId}</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#ef1020]/20 text-[#ef1020] border border-[#ef1020]/40 font-bold">
                    BIB #027
                  </span>
                </div>
              </div>

              {/* Category Picker */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#888e99] mb-1.5">
                  Pilih Kategori Balap
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Fixed Open', 'Fixed Rookie', 'Sprint Keirin'] as const).map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedCategory === cat
                          ? 'bg-[#ef1020]/15 border-[#ef1020] text-white shadow-[0_0_12px_rgba(239,16,32,0.2)]'
                          : 'bg-[#121519] border-[#22272e] text-[#8e94a0] hover:text-white'
                      }`}
                    >
                      <span className="text-[11px] font-bold block">{cat}</span>
                      <span className="text-[8px] font-mono block opacity-70">Brakeless FG</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gear Ratio Check */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#888e99] mb-1.5">
                  Rasio Gir yang Digunakan (Chainring x Cog)
                </label>
                <input
                  type="text"
                  value={gearRatio}
                  onChange={(e) => setGearRatio(e.target.value)}
                  placeholder="Contoh: 49x15, 48x17"
                  className="w-full bg-[#121519] border border-[#272c35] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#5d636e] focus:outline-none focus:border-[#ef1020]"
                  required
                />
              </div>

              {/* Safety Regulations Agreement */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-[#14171c] border border-[#242930] cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToRules}
                  onChange={(e) => setAgreedToRules(e.target.checked)}
                  className="mt-0.5 rounded border-[#3a414d] text-[#ef1020] focus:ring-0"
                />
                <div className="text-[10px] text-[#9399a5] leading-relaxed">
                  Saya menyetujui regulasi teknis balap (helm bersertifikat, sepeda track brakeless, lockring kencang, pedal clipless/toe-clip).
                </div>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                id="btn-confirm-registration"
                disabled={!agreedToRules}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ef1020] via-[#cf0a18] to-[#99040e] text-white text-xs font-black italic tracking-wider flex items-center justify-center gap-2 shadow-[0_6px_25px_rgba(239,16,32,0.35)] transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>KONFIRMASI & AMBIL RACE BIB ({selectedEventForModal.price.split(' ')[0]} {selectedEventForModal.price.split(' ')[1] || 'GRATIS'})</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
