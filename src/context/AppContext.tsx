import React, { createContext, useContext, useState, useEffect } from 'react';
import { TabType, UserProfile, EventItem } from '../types';
import { INITIAL_USER_PROFILE, EVENTS_DATA } from '../data/mockData';
import { Language, Translations, TRANSLATIONS } from '../data/translations';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'RACE' | 'RANK' | 'COMMUNITY' | 'SYSTEM';
}

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isRiderPassOpen: boolean;
  setIsRiderPassOpen: (open: boolean) => void;
  registeredEventIds: string[];
  registerForEvent: (eventId: string) => void;
  cancelEventRegistration: (eventId: string) => void;
  selectedEventForModal: EventItem | null;
  setSelectedEventForModal: (event: EventItem | null) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'fixgear_profile_v1',
  REGISTERED_EVENTS: 'fixgear_registered_events_v1',
  NOTIFICATIONS: 'fixgear_notifications_v1',
  LANGUAGE: 'fixgear_language_v1',
};

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Registration Confirmed: FG CRITERIUM #01',
    message: 'Your slot is secured! Bib #027 has been assigned to your Rider Pass.',
    time: '2 hours ago',
    read: false,
    type: 'RACE',
  },
  {
    id: 'n-2',
    title: 'Ranking Update: +3 Positions',
    message: 'Your overall ranking improved to #027 after Season Opening validation.',
    time: 'Yesterday',
    read: false,
    type: 'RANK',
  },
  {
    id: 'n-3',
    title: 'Track Day Velodrome Session Announced',
    message: 'Registration opens on Sep 01 for Jakarta International Velodrome.',
    time: '3 days ago',
    read: true,
    type: 'COMMUNITY',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isRiderPassOpen, setIsRiderPassOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [selectedEventForModal, setSelectedEventForModal] = useState<EventItem | null>(null);

  // Load language preference from localStorage
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
      if (saved === 'id' || saved === 'en') return saved;
      return 'id'; // Default to Indonesian
    } catch {
      return 'id';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    } catch (e) {
      console.error('Failed to save language preference', e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  const t = TRANSLATIONS[language];

  // Load profile from localStorage
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'AZIS TR' || parsed.name === 'Azis Tr' || parsed.name === 'Azis') {
          parsed.name = 'AZISS';
          parsed.handle = '@aziss';
        }
        return {
          ...INITIAL_USER_PROFILE,
          ...parsed,
          fullName: parsed.fullName || INITIAL_USER_PROFILE.fullName,
          bloodType: parsed.bloodType || INITIAL_USER_PROFILE.bloodType,
          emergencyContact: parsed.emergencyContact || INITIAL_USER_PROFILE.emergencyContact,
        };
      }
      return INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  // Load registered events from localStorage
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTERED_EVENTS);
      return saved ? JSON.parse(saved) : ['ev-1']; // Default registered for FG Crit #01
    } catch {
      return ['ev-1'];
    }
  });

  // Load notifications from localStorage
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  });

  // Sync profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile to localStorage', e);
    }
  }, [profile]);

  // Sync registered events to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTERED_EVENTS, JSON.stringify(registeredEventIds));
    } catch (e) {
      console.error('Failed to save events to localStorage', e);
    }
  }, [registeredEventIds]);

  // Sync notifications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed to save notifications to localStorage', e);
    }
  }, [notifications]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...updates,
      stats: updates.stats ? { ...prev.stats, ...updates.stats } : prev.stats,
    }));
  };

  const registerForEvent = (eventId: string) => {
    if (!registeredEventIds.includes(eventId)) {
      setRegisteredEventIds(prev => [...prev, eventId]);
      const event = EVENTS_DATA.find(e => e.id === eventId);
      const newNotif: NotificationItem = {
        id: `n-${Date.now()}`,
        title: `Registered: ${event ? event.title : 'Race Event'}`,
        message: 'Registration confirmed. Race guide and bib have been added to your Rider Pass.',
        time: 'Just now',
        read: false,
        type: 'RACE',
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  const cancelEventRegistration = (eventId: string) => {
    setRegisteredEventIds(prev => prev.filter(id => id !== eventId));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        toggleLanguage,
        t,
        profile,
        updateProfile,
        isRiderPassOpen,
        setIsRiderPassOpen,
        registeredEventIds,
        registerForEvent,
        cancelEventRegistration,
        selectedEventForModal,
        setSelectedEventForModal,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        isNotificationsOpen,
        setIsNotificationsOpen,
        globalSearchQuery,
        setGlobalSearchQuery,
        isSearchModalOpen,
        setIsSearchModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
