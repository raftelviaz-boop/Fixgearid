export type Language = 'id' | 'en';

export interface Translations {
  // Navigation
  nav_home: string;
  nav_explore: string;
  nav_event: string;
  nav_ranking: string;
  nav_profile: string;
  nav_rider_pass: string;

  // Header & Device
  header_tagline: string;
  header_search_placeholder: string;
  header_notifications: string;
  header_my_profile: string;
  lang_switch_tooltip: string;

  // Common UI
  btn_view_all: string;
  btn_close: string;
  btn_save: string;
  btn_cancel: string;
  btn_share: string;
  btn_edit: string;
  btn_filter: string;
  btn_search: string;
  btn_register: string;
  btn_registered: string;
  btn_register_now: string;
  btn_see_details: string;
  btn_read_more: string;
  btn_read_less: string;
  btn_download: string;

  // Telemetry & Stats
  stat_race: string;
  stat_distance: string;
  stat_time: string;
  stat_finish: string;
  stat_podiums: string;
  stat_win: string;
  stat_point: string;
  stat_points: string;
  stat_rank: string;
  stat_events: string;
  stat_national: string;
  stat_of_riders: string;

  // Home View
  home_welcome: string;
  home_crew: string;
  home_next_race: string;
  home_days: string;
  home_hours: string;
  home_minutes: string;
  home_seconds: string;
  home_view_circuit: string;
  home_leaderboard_title: string;
  home_top_riders: string;
  home_top_teams: string;
  home_fast_feed: string;
  home_community_feed: string;
  home_stories_title: string;
  home_quick_pass_desc: string;

  // Explore View
  explore_title: string;
  explore_subtitle: string;
  explore_search_placeholder: string;
  explore_tab_circuits: string;
  explore_tab_teams: string;
  explore_tab_builders: string;
  explore_tab_spots: string;
  explore_surface: string;
  explore_elevation: string;
  explore_length: string;

  // Event View
  event_title: string;
  event_subtitle: string;
  event_tab_upcoming: string;
  event_tab_ongoing: string;
  event_tab_past: string;
  event_location: string;
  event_category: string;
  event_quota: string;
  event_fee: string;
  event_rules: string;
  event_prizes: string;
  event_registered_success: string;
  event_cancel_reg: string;

  // Ranking View
  ranking_title: string;
  ranking_subtitle: string;
  ranking_tab_overall_rider: string;
  ranking_tab_season_rider: string;
  ranking_tab_overall_team: string;
  ranking_tab_season_team: string;
  ranking_tab_rookie_rider: string;
  ranking_tab_rookie_team: string;
  ranking_all_region: string;
  ranking_search_rider: string;

  // Profile View
  profile_official: string;
  profile_share_btn: string;
  profile_rider_pass_btn: string;
  profile_edit_profile_btn: string;
  profile_about_title: string;
  profile_my_bike: string;
  profile_bike_specs: string;
  profile_race_history: string;
  profile_rider_record: string;
  profile_badges_title: string;
  profile_timeline_title: string;
  profile_social_title: string;
  profile_language_pref: string;
  profile_language_desc: string;
  profile_change_lang: string;

  // Rider Pass Modal
  pass_title: string;
  pass_subtitle: string;
  pass_view_front: string;
  pass_view_back: string;
  pass_official_dossier: string;
  pass_full_name: string;
  pass_rider_id: string;
  pass_member_status: string;
  pass_home_city: string;
  pass_dob_age: string;
  pass_gender: string;
  pass_blood_type: string;
  pass_emergency_contact: string;
  pass_registered_rig: string;
  pass_gear_ratio: string;
  pass_validity_note: string;
  pass_copied: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  id: {
    // Navigation
    nav_home: 'Home',
    nav_explore: 'Explore',
    nav_event: 'Event',
    nav_ranking: 'Ranking',
    nav_profile: 'Profile',
    nav_rider_pass: 'RIDER PASS',

    // Header & Device
    header_tagline: 'CIRCUIT & COMMUNITY',
    header_search_placeholder: 'Cari rider, tim, spot...',
    header_notifications: 'Notifikasi',
    header_my_profile: 'Profil Saya',
    lang_switch_tooltip: 'Ganti ke Bahasa Inggris',

    // Common UI
    btn_view_all: 'VIEW ALL',
    btn_close: 'Tutup',
    btn_save: 'Simpan',
    btn_cancel: 'Batal',
    btn_share: 'Bagikan',
    btn_edit: 'Edit',
    btn_filter: 'Filter',
    btn_search: 'Cari',
    btn_register: 'Daftar Event',
    btn_registered: 'Terdaftar',
    btn_register_now: 'DAFTAR SEKARANG',
    btn_see_details: 'Lihat Detail',
    btn_read_more: 'Baca Selengkapnya',
    btn_read_less: 'Tutup',
    btn_download: 'Unduh Pass',

    // Telemetry & Stats
    stat_race: 'Race',
    stat_distance: 'Distance',
    stat_time: 'Time',
    stat_finish: 'Finish',
    stat_podiums: 'Podiums',
    stat_win: 'Win',
    stat_point: 'Point',
    stat_points: 'PTS',
    stat_rank: 'Rank',
    stat_events: 'EVENTS',
    stat_national: 'NATIONAL',
    stat_of_riders: 'OF',

    // Home View
    home_welcome: 'WELCOME BACK,',
    home_crew: 'FIXGEAR.ID CREW',
    home_next_race: 'NEXT CRITERIUM RACE',
    home_days: 'HARI',
    home_hours: 'JAM',
    home_minutes: 'MENIT',
    home_seconds: 'DETIK',
    home_view_circuit: 'LIHAT SIRKUIT',
    home_leaderboard_title: 'LEADERBOARD',
    home_top_riders: 'TOP RIDERS',
    home_top_teams: 'TOP TEAMS',
    home_fast_feed: 'COMMUNITY FEED',
    home_community_feed: 'Update Terbaru Rider Fixie',
    home_stories_title: 'COMMUNITY STORIES',
    home_quick_pass_desc: 'Tunjukkan digital pass kamu di gate registrasi balap.',

    // Explore View
    explore_title: 'EXPLORE FG CIRCUIT',
    explore_subtitle: 'Cari sirkuit criterium, spot nongkrong fixie, bengkel & tim lokal',
    explore_search_placeholder: 'Cari rute, lintasan, bengkel...',
    explore_tab_circuits: 'CIRCUITS',
    explore_tab_teams: 'SQUADS',
    explore_tab_builders: 'BUILDERS',
    explore_tab_spots: 'SPOTS',
    explore_surface: 'Permukaan',
    explore_elevation: 'Elevasi',
    explore_length: 'Panjang Rute',

    // Event View
    event_title: 'RACE CALENDAR 2026',
    event_subtitle: 'Criterium resmi, alleycat liar, sprint race, & track day',
    event_tab_upcoming: 'UPCOMING',
    event_tab_ongoing: 'BERLANGSUNG',
    event_tab_past: 'SELESAI',
    event_location: 'Lokasi',
    event_category: 'Kategori',
    event_quota: 'Sisa Slot',
    event_fee: 'Biaya Registrasi',
    event_rules: 'Peraturan Balap',
    event_prizes: 'Hadiah Podium',
    event_registered_success: 'Registrasi Berhasil!',
    event_cancel_reg: 'Batalkan Registrasi',

    // Ranking View
    ranking_title: 'RANKING CENTER',
    ranking_subtitle: 'RANK. RIDE. REPEAT. • TIMING & TELEMETRY',
    ranking_tab_overall_rider: 'OVERALL RIDER',
    ranking_tab_season_rider: 'SEASON RIDER',
    ranking_tab_overall_team: 'OVERALL TEAM',
    ranking_tab_season_team: 'SEASON TEAM',
    ranking_tab_rookie_rider: 'ROOKIE RIDER',
    ranking_tab_rookie_team: 'ROOKIE TEAM',
    ranking_all_region: 'ALL REGION',
    ranking_search_rider: 'Cari nama rider, tim, kota...',

    // Profile View
    profile_official: 'OFFICIAL PROFILE',
    profile_share_btn: 'Share Profile',
    profile_rider_pass_btn: 'Rider Pass',
    profile_edit_profile_btn: 'Edit Profil',
    profile_about_title: 'TENTANG SAYA',
    profile_my_bike: 'SEPEDA SAYA',
    profile_bike_specs: 'Spesifikasi & Drivetrain',
    profile_race_history: 'RACE HISTORY',
    profile_rider_record: 'RIDER RECORD',
    profile_badges_title: 'BADGES & ACHIEVEMENTS',
    profile_timeline_title: 'TIMELINE & HISTORY',
    profile_social_title: 'MEDIA SOSIAL & KONTAK',
    profile_language_pref: 'BAHASA / LANGUAGE',
    profile_language_desc: 'Pilih bahasa antarmuka aplikasi',
    profile_change_lang: 'Ganti Bahasa',

    // Rider Pass Modal
    pass_title: 'OFFICIAL DIGITAL RIDER PASS',
    pass_subtitle: 'FIXGEAR.ID ATHLETE & COMMUNITY CREDENTIAL',
    pass_view_front: 'Lihat Depan',
    pass_view_back: 'Lihat Info Rider',
    pass_official_dossier: 'OFFICIAL RIDER DOSSIER',
    pass_full_name: 'FULL NAME',
    pass_rider_id: 'RIDER ID',
    pass_member_status: 'MEMBER STATUS',
    pass_home_city: 'HOME CITY',
    pass_dob_age: 'TANGGAL LAHIR',
    pass_gender: 'JENIS KELAMIN',
    pass_blood_type: 'BLOOD TYPE',
    pass_emergency_contact: 'EMERGENCY CONTACT',
    pass_registered_rig: 'REGISTERED RIG',
    pass_gear_ratio: 'GEAR RATIO',
    pass_validity_note: 'Kartu ini memverifikasi identitas resmi atlet & data medis di FIXGEAR.ID.',
    pass_copied: 'Tautan digital pass berhasil disalin!',
  },
  en: {
    // Navigation
    nav_home: 'Home',
    nav_explore: 'Explore',
    nav_event: 'Event',
    nav_ranking: 'Ranking',
    nav_profile: 'Profile',
    nav_rider_pass: 'RIDER PASS',

    // Header & Device
    header_tagline: 'CIRCUIT & COMMUNITY',
    header_search_placeholder: 'Search riders, squads, spots...',
    header_notifications: 'Notifications',
    header_my_profile: 'My Profile',
    lang_switch_tooltip: 'Switch to Indonesian',

    // Common UI
    btn_view_all: 'VIEW ALL',
    btn_close: 'Close',
    btn_save: 'Save',
    btn_cancel: 'Cancel',
    btn_share: 'Share',
    btn_edit: 'Edit',
    btn_filter: 'Filter',
    btn_search: 'Search',
    btn_register: 'Register Event',
    btn_registered: 'Registered',
    btn_register_now: 'REGISTER NOW',
    btn_see_details: 'View Details',
    btn_read_more: 'Read More',
    btn_read_less: 'Show Less',
    btn_download: 'Download Pass',

    // Telemetry & Stats
    stat_race: 'Race',
    stat_distance: 'Distance',
    stat_time: 'Time',
    stat_finish: 'Finish',
    stat_podiums: 'Podiums',
    stat_win: 'Win',
    stat_point: 'Point',
    stat_points: 'PTS',
    stat_rank: 'Rank',
    stat_events: 'EVENTS',
    stat_national: 'NATIONAL',
    stat_of_riders: 'OF',

    // Home View
    home_welcome: 'WELCOME BACK,',
    home_crew: 'FIXGEAR.ID CREW',
    home_next_race: 'NEXT CRITERIUM RACE',
    home_days: 'DAYS',
    home_hours: 'HOURS',
    home_minutes: 'MINS',
    home_seconds: 'SECS',
    home_view_circuit: 'VIEW CIRCUIT',
    home_leaderboard_title: 'LEADERBOARD',
    home_top_riders: 'TOP RIDERS',
    home_top_teams: 'TOP SQUADS',
    home_fast_feed: 'COMMUNITY FEED',
    home_community_feed: 'Latest Updates from Fixie Riders',
    home_stories_title: 'COMMUNITY STORIES',
    home_quick_pass_desc: 'Present your digital pass at race registration gates.',

    // Explore View
    explore_title: 'EXPLORE FG CIRCUIT',
    explore_subtitle: 'Discover crit tracks, fixie hangouts, builders & local squads',
    explore_search_placeholder: 'Search tracks, circuits, workshops...',
    explore_tab_circuits: 'CIRCUITS',
    explore_tab_teams: 'SQUADS',
    explore_tab_builders: 'BUILDERS',
    explore_tab_spots: 'SPOTS',
    explore_surface: 'Surface',
    explore_elevation: 'Elevation',
    explore_length: 'Track Length',

    // Event View
    event_title: 'RACE CALENDAR 2026',
    event_subtitle: 'Official criteriums, underground alleycats, sprint races & track days',
    event_tab_upcoming: 'UPCOMING',
    event_tab_ongoing: 'LIVE NOW',
    event_tab_past: 'COMPLETED',
    event_location: 'Location',
    event_category: 'Category',
    event_quota: 'Available Slots',
    event_fee: 'Entry Fee',
    event_rules: 'Race Regulations',
    event_prizes: 'Podium Prizes',
    event_registered_success: 'Registration Confirmed!',
    event_cancel_reg: 'Cancel Registration',

    // Ranking View
    ranking_title: 'RANKING CENTER',
    ranking_subtitle: 'RANK. RIDE. REPEAT. • TIMING & TELEMETRY',
    ranking_tab_overall_rider: 'OVERALL RIDER',
    ranking_tab_season_rider: 'SEASON RIDER',
    ranking_tab_overall_team: 'OVERALL TEAM',
    ranking_tab_season_team: 'SEASON TEAM',
    ranking_tab_rookie_rider: 'ROOKIE RIDER',
    ranking_tab_rookie_team: 'ROOKIE TEAM',
    ranking_all_region: 'ALL REGIONS',
    ranking_search_rider: 'Search rider name, squad, city...',

    // Profile View
    profile_official: 'OFFICIAL PROFILE',
    profile_share_btn: 'Share Profile',
    profile_rider_pass_btn: 'Rider Pass',
    profile_edit_profile_btn: 'Edit Profile',
    profile_about_title: 'ABOUT ME',
    profile_my_bike: 'MY BIKE',
    profile_bike_specs: 'Specifications & Drivetrain',
    profile_race_history: 'RACE HISTORY',
    profile_rider_record: 'RIDER RECORD',
    profile_badges_title: 'BADGES & ACHIEVEMENTS',
    profile_timeline_title: 'TIMELINE & HISTORY',
    profile_social_title: 'SOCIAL MEDIA & CONTACT',
    profile_language_pref: 'LANGUAGE / BAHASA',
    profile_language_desc: 'Select application interface language',
    profile_change_lang: 'Switch Language',

    // Rider Pass Modal
    pass_title: 'OFFICIAL DIGITAL RIDER PASS',
    pass_subtitle: 'FIXGEAR.ID ATHLETE & COMMUNITY CREDENTIAL',
    pass_view_front: 'View Front',
    pass_view_back: 'View Rider Info',
    pass_official_dossier: 'OFFICIAL RIDER DOSSIER',
    pass_full_name: 'FULL NAME',
    pass_rider_id: 'RIDER ID',
    pass_member_status: 'MEMBER STATUS',
    pass_home_city: 'HOME CITY',
    pass_dob_age: 'DATE OF BIRTH',
    pass_gender: 'GENDER',
    pass_blood_type: 'BLOOD TYPE',
    pass_emergency_contact: 'EMERGENCY CONTACT',
    pass_registered_rig: 'REGISTERED RIG',
    pass_gear_ratio: 'GEAR RATIO',
    pass_validity_note: 'This pass verifies authenticated rider identity & medical registry in FIXGEAR.ID.',
    pass_copied: 'Digital pass link copied to clipboard!',
  },
};
