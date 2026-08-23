import React from 'react';
import { X, Bell, CheckCheck, Award, Flag, MessageSquare, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationModal: React.FC = () => {
  const { isNotificationsOpen, setIsNotificationsOpen, notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();

  if (!isNotificationsOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'RACE':
        return <Flag className="w-4 h-4 text-[#ef1020]" />;
      case 'RANK':
        return <Award className="w-4 h-4 text-[#eab308]" />;
      case 'COMMUNITY':
        return <MessageSquare className="w-4 h-4 text-[#38ef7d]" />;
      default:
        return <AlertCircle className="w-4 h-4 text-[#38bdf8]" />;
    }
  };

  return (
    <div
      id="modal-notifications-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsNotificationsOpen(false);
      }}
    >
      <div className="w-full max-w-md bg-[#0c0e11] border-t sm:border border-[#272b30] rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f2227] bg-[#111417]">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#ef1020]" />
            <h3 className="text-base font-black italic tracking-wide text-white">NOTIFIKASI</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsAsRead}
              className="text-xs text-[#8f949c] hover:text-white flex items-center gap-1 font-semibold transition-colors"
              title="Tandai semua telah dibaca"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Baca Semua</span>
            </button>
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="w-7 h-7 rounded-full bg-[#1b1e22] text-[#8e9297] hover:text-white flex items-center justify-center transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-[#737882] text-xs">
              Tidak ada notifikasi baru saat ini.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationAsRead(n.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  n.read
                    ? 'bg-[#111316]/60 border-[#1f2227] opacity-75'
                    : 'bg-[#15181d] border-[#ef1020]/30 shadow-[0_4px_16px_rgba(239,16,32,0.08)]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1e2228] border border-[#2b3038] flex items-center justify-center shrink-0 mt-0.5">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-white leading-tight truncate">{n.title}</h4>
                      <span className="text-[9px] font-mono text-[#787e88] shrink-0">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#a0a5ad] mt-1 leading-relaxed">{n.message}</p>
                  </div>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-[#ef1020] shrink-0 mt-1.5" />}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
