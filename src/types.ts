export interface Rider {
  id: string;
  riderNumber: string;
  name: string;
  handle: string;
  team: string;
  teamCode: string;
  city: string;
  points: number;
  races: number;
  avatar?: string;
  avatarInitials: string;
  bike: string;
  gearRatio: string;
  podiums: number;
  status: 'PRO' | 'MEMBER+' | 'MEMBER' | 'ROOKIE';
}

export interface Team {
  id: string;
  code: string;
  name: string;
  city: string;
  membersCount: number;
  totalPoints: number;
  seasonPoints: number;
  racesCount: number;
  podiumsCount: number;
  description: string;
  logo: string;
  color: string;
  captain: string;
  riders: string[];
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  day: string;
  month: string;
  year: string;
  time: string;
  location: string;
  city: string;
  circuitType: string;
  distance: string;
  elevation: string;
  laps?: string;
  status: 'OPEN' | 'COMING_SOON' | 'COMPLETED' | 'ONGOING';
  statusLabel: string;
  badge: string;
  image: string;
  description: string;
  rules: string[];
  maxParticipants: number;
  registeredCount: number;
  price: string;
  category: 'Criterium' | 'Track' | 'Hill Climb' | 'Alleycat' | 'Community Ride';
  targetDate: string; // ISO string for countdown
}

export interface StoryItem {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  category: 'COMMUNITY' | 'RACE DAY' | 'BIKE BUILD' | 'INTERVIEW';
  content: string;
  likes: number;
}

export interface SpotRoute {
  id: string;
  title: string;
  category: 'URBAN CRIT' | 'SPRINT ROUTE' | 'HILL CLIMB' | 'COMMUNITY SPOT' | 'VELODROME';
  distance: string;
  city: string;
  surface: string;
  trafficLevel: 'Low' | 'Moderate' | 'High' | 'Closed Circuit';
  elevation: string;
  description: string;
  meetPoint: string;
  popularDays: string;
  image: string;
  coordinates: { x: number; y: number }; // percentage on map
}

export interface MediaItem {
  id: string;
  title: string;
  category: string;
  date: string;
  photographer: string;
  image: string;
  event: string;
  likes: number;
}

export interface FeedItem {
  id: string;
  title: string;
  description: string;
  type: 'RESULT' | 'ANNOUNCEMENT' | 'HIGHLIGHT' | 'EVENT';
  date: string;
  image: string;
  linkText?: string;
  targetView?: string;
}

export interface UserProfile {
  name: string;
  fullName?: string;
  birthDate?: string;
  age?: number;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | string;
  bloodType?: string;
  emergencyContact?: string;
  handle: string;
  riderId: string;
  membership: string;
  avatar: string;
  city: string;
  about: string;
  bikeName: string;
  bikeSpec: string;
  bikeDescription: string;
  bikeImage: string;
  instagram: string;
  tiktok: string;
  strava: string;
  whatsapp: string;
  youtube: string;
  email: string;
  stats: {
    totalRace: number;
    totalDistanceKm: number;
    totalHours: number;
    totalMinutes: number;
    totalFinishes?: number;
    totalPodiums?: number;
    totalWins?: number;
    overallRanking: number;
    seasonRanking: number;
    teamRanking: number;
    points: number;
  };
}

export interface RaceHistoryItem {
  id: string;
  title: string;
  day: string;
  month: string;
  year: string;
  city: string;
  category: string;
  distance: string;
  time: string;
  rank: string;
  totalRiders: number;
  image: string;
  isFirstPlace?: boolean;
  pointsEarned?: number;
}

export type TabType = 'home' | 'explore' | 'event' | 'ranking' | 'profile';

export type RankingCategory = 
  | 'overall-rider'
  | 'season-rider'
  | 'overall-team'
  | 'season-team'
  | 'rookie-rider'
  | 'rookie-team';
