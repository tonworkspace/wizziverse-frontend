import { useState, useEffect, useRef } from 'react';

interface Portal {
  id: string;
  title: string;
  icon: string;
  description: string;
  action: string;
  gradient: string;
  borderColor: string;
  features?: string[];
  stats?: {
    users: number;
    success: string;
    rating: number;
  };
}

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  pulsePhase: number;
  trail: { x: number; y: number; opacity: number }[];
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface CosmicCloud {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  driftSpeed: number;
  pulsePhase: number;
}

interface EnergyOrb {
  x: number;
  y: number;
  size: number;
  color: string;
  pulseSpeed: number;
  driftX: number;
  driftY: number;
  glowIntensity: number;
}

interface User {
  name: string;
  level: string;
  avatar: string;
  coins: number;
  experience: number;
  achievements: string[];
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  readTime: string;
  publishDate: string;
  image: string;
  tags: string[];
  likes: number;
  isRecent?: boolean;
}

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: number;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  publishDate: string;
  tags: string[];
  isNew?: boolean;
  isPremium?: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'achievement' | 'onboarding';
  reward: {
    coins: number;
    experience: number;
    achievement?: string;
  };
  progress: number;
  maxProgress: number;
  completed: boolean;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Epic';
  expiresAt?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Epic';
  baseReward: number;
  category: 'Puzzle' | 'Memory' | 'Rhythm' | 'Adventure';
  playTime: string;
  maxScore: number;
}

interface GameSession {
  gameId: string;
  score: number;
  coinsEarned: number;
  timeCompleted: number;
  completed: boolean;
}

function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [cosmicClouds, setCosmicClouds] = useState<CosmicCloud[]>([]);
  const [energyOrbs, setEnergyOrbs] = useState<EnergyOrb[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [wizzicoinCount, setWizzicoinCount] = useState(2847);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('portals');
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [showDashboard, setShowDashboard] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>('All');
  const [videoSearchQuery, setVideoSearchQuery] = useState('');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [showTaskReward, setShowTaskReward] = useState<Task | null>(null);
  const [userLevel, setUserLevel] = useState(5);
  const [userExperience, setUserExperience] = useState(1247);
  const [nextLevelXP, setNextLevelXP] = useState(2000);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [gameCards, setGameCards] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [gameStartTime, setGameStartTime] = useState(0);
  const [crystalPositions, setCrystalPositions] = useState<{x: number, y: number, collected: boolean, type: string}[]>([]);
  const [playerPosition, setPlayerPosition] = useState({x: 50, y: 50});
  const [gameTimer, setGameTimer] = useState(60);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const fullText = "WIZZIVERSE: The Streets of Starlight";

  const user: User = {
    name: "Sacred Seeker",
    level: "Beta Tester",
    avatar: "🌟",
    coins: 1000, // Starting bonus for early users
    experience: 150,
    achievements: ["Early Adopter", "Beta Tester", "Community Member"]
  };

  const testimonials: Testimonial[] = [
    {
      name: "Luna Starweaver",
      role: "Beta Tester & Energy Healer",
      content: "As an early beta tester, I'm amazed by Wizziverse's potential. The platform's vision for sacred technology is exactly what our community needs.",
      rating: 5,
      avatar: "🔮"
    },
    {
      name: "Marcus Voidwalker", 
      role: "Founding Creator & Digital Artist",
      content: "Being part of the founding creators program has been incredible. The 60/30/10 revenue model and the sacred mission make this platform special.",
      rating: 5,
      avatar: "🎨"
    },
    {
      name: "Aria Cosmicflow",
      role: "Early Adopter & Game Developer",
      content: "I joined the waitlist immediately after seeing the gaming metaverse vision. This is the future of spiritual gaming and I'm excited to build here.",
      rating: 5,
      avatar: "🎮"
    }
  ];

  const platformStats = {
    betaUsers: "247",
    waitlistMembers: "1,847", 
    foundingCreators: "23",
    launchDate: "Q2 2024",
    betaSessionsCompleted: "156",
    earlyAccessGames: "12"
  };

  const portals: Portal[] = [
    {
      id: 'founders',
      title: 'Founders Portal',
      icon: '👑',
      description: 'Connect with Sohari\'el and divine streamers. Access exclusive content, live sessions, and sacred teachings from the cosmic leadership.',
      action: 'Join Founders',
      gradient: 'from-purple-600 to-cyan-600',
      borderColor: 'border-purple-500/30 hover:border-cyan-500/50',
      features: ['Exclusive Live Streams', 'Weekly Q&A Sessions', 'Sacred Teachings Archive', 'Founder Mentorship'],
      stats: { users: 47, success: 'Beta', rating: 5.0 }
    },
    {
      id: 'creation',
      title: 'Creation Studio',
      icon: '🎨',
      description: 'Professional creation hub with advanced tools, AI assistance, and direct monetization. Submit to our expert council for featured placement.',
      action: 'Early Access',
      gradient: 'from-cyan-600 to-purple-600',
      borderColor: 'border-cyan-500/30 hover:border-purple-500/50',
      features: ['AI-Powered Creation Tools', 'Revenue Analytics', 'Council Fast-Track', 'Marketing Support'],
      stats: { users: 23, success: 'Beta', rating: 5.0 }
    },
    {
      id: 'academy',
      title: 'Skill Academy',
      icon: '🧠',
      description: 'Professional courses with certification, progress tracking, and mentorship. From forex mastery to spiritual entrepreneurship.',
      action: 'Join Waitlist',
      gradient: 'from-purple-600 to-cyan-600',
      borderColor: 'border-purple-500/30 hover:border-cyan-500/50',
      features: ['Certified Courses', 'Progress Tracking', 'Expert Mentors', 'Career Placement'],
      stats: { users: 89, success: 'Coming Soon', rating: 0 }
    },
    {
      id: 'healers',
      title: 'Healing Network',
      icon: '🔮',
      description: 'Premium healing services with verified practitioners, session recordings, progress tracking, and integration with health systems.',
      action: 'Find Healers',
      gradient: 'from-cyan-600 to-purple-600',
      borderColor: 'border-cyan-500/30 hover:border-purple-500/50',
      features: ['Verified Practitioners', 'Session Analytics', 'Progress Tracking', 'Integration APIs'],
      stats: { users: 34, success: 'Beta', rating: 4.9 }
    },
    {
      id: 'games',
      title: 'Gaming Metaverse',
      icon: '🎮',
      description: 'Advanced gaming ecosystem with blockchain integration, tournaments, NFT rewards, and cross-platform compatibility.',
      action: 'Beta Access',
      gradient: 'from-purple-600 to-cyan-600',
      borderColor: 'border-purple-500/30 hover:border-cyan-500/50',
      features: ['Blockchain Integration', 'Tournament System', 'NFT Rewards', 'Cross-Platform Play'],
      stats: { users: 78, success: 'Beta', rating: 4.8 }
    },
    {
      id: 'wizzicoin',
      title: 'WizziCoin Exchange',
      icon: '🪙',
      description: 'Advanced DeFi platform with staking, yield farming, governance voting, and professional trading tools for WizziCoin ecosystem.',
      action: 'Pre-Launch',
      gradient: 'from-cyan-600 to-purple-600',
      borderColor: 'border-cyan-500/30 hover:border-purple-500/50',
      features: ['DeFi Protocols', 'Staking Rewards', 'Governance Voting', 'Professional Trading'],
      stats: { users: 134, success: 'Pre-Launch', rating: 0 }
    }
  ];

  const blogCategories = [
    'All', 'Cosmic Events', 'Spiritual Tech', 'Healing & Wellness', 
    'Creator Economy', 'Blockchain & DeFi', 'Community Updates'
  ];

  const blogArticles: BlogArticle[] = [
    {
      id: '1',
      title: 'The Rise of Spiritual Technology: How Sacred Apps Are Transforming Consciousness',
      excerpt: 'Exploring the intersection of ancient wisdom and modern technology, and how platforms like Wizziverse are pioneering the next evolution of spiritual practice.',
      content: 'Full article content here...',
      author: {
        name: 'Dr. Luna Celestial',
        avatar: '🌟',
        role: 'Consciousness Researcher'
      },
      category: 'Spiritual Tech',
      readTime: '7 min read',
      publishDate: '2 days ago',
      image: '🧠',
      tags: ['Technology', 'Consciousness', 'Innovation'],
      likes: 247,
      isRecent: true
    },
    {
      id: '2',
      title: 'Portal Opening Alert: Rare Cosmic Alignment Occurring January 25-27, 2024',
      excerpt: 'Astrologers worldwide report a powerful celestial gateway opening this weekend. Learn how to harness this cosmic energy for manifestation and spiritual growth.',
      content: 'Full article content here...',
      author: {
        name: 'Astro Maven',
        avatar: '✨',
        role: 'Cosmic Astrologer'
      },
      category: 'Cosmic Events',
      readTime: '5 min read',
      publishDate: '5 hours ago',
      image: '🌌',
      tags: ['Astrology', 'Manifestation', 'Cosmic Events'],
      likes: 892,
      isRecent: true
    },
    {
      id: '3',
      title: 'Revolutionary Healing Frequencies: New Research Shows 528Hz Can Repair DNA',
      excerpt: 'Breakthrough scientific study reveals how specific sound frequencies can actually repair cellular damage and boost immune function.',
      content: 'Full article content here...',
      author: {
        name: 'Dr. Harmony Soundweaver',
        avatar: '🎵',
        role: 'Sound Healing Scientist'
      },
      category: 'Healing & Wellness',
      readTime: '9 min read',
      publishDate: '1 day ago',
      image: '🎶',
      tags: ['Healing', 'Science', 'Sound Therapy'],
      likes: 1234,
      isRecent: true
    },
    {
      id: '4',
      title: 'Creator Economy Boom: Spiritual Artists Earning $10K+ Monthly on Sacred Platforms',
      excerpt: 'Meet the spiritual entrepreneurs who are building six-figure businesses by monetizing their sacred gifts through new-age creator platforms.',
      content: 'Full article content here...',
      author: {
        name: 'Marcus Abundance',
        avatar: '💰',
        role: 'Spiritual Business Coach'
      },
      category: 'Creator Economy',
      readTime: '6 min read',
      publishDate: '3 days ago',
      image: '🎨',
      tags: ['Creator Economy', 'Entrepreneurship', 'Income'],
      likes: 567
    },
    {
      id: '5',
      title: 'DeFi Meets Dharma: How Blockchain Technology Is Revolutionizing Sacred Economics',
      excerpt: 'Exploring how decentralized finance principles align with ancient abundance teachings, and the emergence of consciousness-based cryptocurrencies.',
      content: 'Full article content here...',
      author: {
        name: 'Crypto Sage',
        avatar: '₿',
        role: 'Spiritual Blockchain Expert'
      },
      category: 'Blockchain & DeFi',
      readTime: '11 min read',
      publishDate: '4 days ago',
      image: '🔗',
      tags: ['Blockchain', 'DeFi', 'Sacred Economics'],
      likes: 345
    },
    {
      id: '6',
      title: 'Community Spotlight: How Our Beta Testers Are Shaping the Future of Spiritual Tech',
      excerpt: 'Exclusive interviews with Wizziverse beta users who are helping us build the most advanced spiritual technology platform ever created.',
      content: 'Full article content here...',
      author: {
        name: 'Sohari\'el Odimegwu',
        avatar: '👑',
        role: 'Founder, Wizziverse'
      },
      category: 'Community Updates',
      readTime: '8 min read',
      publishDate: '5 days ago',
      image: '🌟',
      tags: ['Community', 'Beta Testing', 'Platform Updates'],
      likes: 789
    }
  ];

  const videoCategories = [
    'All', 'Sacred Teachings', 'Meditation & Healing', 'Cosmic Events', 
    'Platform Tutorials', 'Creator Stories', 'Live Sessions', 'Energy Work'
  ];

  const videoLibrary: Video[] = [
    {
      id: '1',
      title: 'Sacred Geometry Meditation: Activating Your Merkaba Field',
      description: 'Join Sohari\'el for a transformative 20-minute guided meditation using sacred geometric visualizations to activate your personal merkaba field and enhance dimensional awareness.',
      thumbnail: '🔮',
      duration: '20:45',
      views: '12.3K',
      likes: 892,
      author: {
        name: 'Sohari\'el Odimegwu',
        avatar: '👑',
        role: 'Founder & Cosmic Guide'
      },
      category: 'Sacred Teachings',
      publishDate: '2 days ago',
      tags: ['Meditation', 'Sacred Geometry', 'Merkaba', 'Activation'],
      isNew: true,
      isPremium: false
    },
    {
      id: '2', 
      title: 'LIVE: Cosmic Portal Opening - January 25th Galactic Alignment',
      description: 'Witness the rare galactic alignment happening this weekend! Live coverage with real-time energy readings, astrological insights, and group meditation session.',
      thumbnail: '🌌',
      duration: '1:24:30',
      views: '8.7K',
      likes: 1456,
      author: {
        name: 'Astro Maven',
        avatar: '✨',
        role: 'Cosmic Astrologer'
      },
      category: 'Cosmic Events',
      publishDate: '6 hours ago',
      tags: ['Live Stream', 'Galactic Alignment', 'Portal Opening'],
      isNew: true,
      isPremium: false
    },
    {
      id: '3',
      title: '528Hz DNA Repair Frequency - 1 Hour Healing Session',
      description: 'Immerse yourself in the miracle tone of 528Hz, scientifically proven to repair DNA and restore cellular harmony. Perfect for deep healing and regeneration.',
      thumbnail: '🎵',
      duration: '1:00:00',
      views: '25.6K',
      likes: 2341,
      author: {
        name: 'Dr. Harmony Soundweaver',
        avatar: '🎶',
        role: 'Sound Healing Scientist'
      },
      category: 'Meditation & Healing',
      publishDate: '1 week ago',
      tags: ['528Hz', 'DNA Repair', 'Healing Frequency', 'Regeneration'],
      isNew: false,
      isPremium: false
    },
    {
      id: '4',
      title: 'Wizziverse Platform Tutorial: Creating Your First Sacred NFT',
      description: 'Step-by-step guide to using our Creation Portal. Learn how to mint your spiritual artwork as NFTs, set pricing, and earn through the 60/30/10 revenue model.',
      thumbnail: '🎨',
      duration: '15:20',
      views: '3.4K',
      likes: 267,
      author: {
        name: 'Marcus Voidwalker',
        avatar: '🎨',
        role: 'Founding Creator'
      },
      category: 'Platform Tutorials',
      publishDate: '3 days ago',
      tags: ['Tutorial', 'NFT', 'Creation Portal', 'Revenue'],
      isNew: true,
      isPremium: false
    },
    {
      id: '5',
      title: 'From Broke to 6-Figures: My Spiritual Creator Journey',
      description: 'Luna shares her incredible transformation from struggling healer to earning $15K monthly through Wizziverse\'s healing network and creation platform.',
      thumbnail: '💫',
      duration: '28:15',
      views: '18.9K',
      likes: 1678,
      author: {
        name: 'Luna Starweaver',
        avatar: '🔮',
        role: 'Master Energy Healer'
      },
      category: 'Creator Stories',
      publishDate: '5 days ago',
      tags: ['Success Story', 'Creator Economy', 'Healing Business'],
      isNew: false,
      isPremium: true
    },
    {
      id: '6',
      title: 'Chakra Balancing with Crystals and Cosmic Energy',
      description: 'Advanced energy work session combining crystal healing, chakra alignment, and cosmic frequency attunement. Includes guided visualization and energy clearing.',
      thumbnail: '💎',
      duration: '45:30',
      views: '14.2K',
      likes: 1089,
      author: {
        name: 'Crystal Sage Aria',
        avatar: '💠',
        role: 'Crystal Healing Master'
      },
      category: 'Energy Work',
      publishDate: '1 week ago',
      tags: ['Chakras', 'Crystal Healing', 'Energy Work', 'Cosmic Energy'],
      isNew: false,
      isPremium: true
    },
    {
      id: '7',
      title: 'WizziCoin Economy Explained: DeFi for the Spiritual Community',
      description: 'Deep dive into our revolutionary blockchain economy. Learn about staking, yield farming, governance voting, and how consciousness meets cryptocurrency.',
      thumbnail: '🪙',
      duration: '22:45',
      views: '7.8K',
      likes: 543,
      author: {
        name: 'Crypto Sage',
        avatar: '₿',
        role: 'Spiritual Blockchain Expert'
      },
      category: 'Platform Tutorials',
      publishDate: '4 days ago',
      tags: ['WizziCoin', 'DeFi', 'Blockchain', 'Crypto'],
      isNew: true,
      isPremium: false
    },
    {
      id: '8',
      title: 'Weekly Cosmic Check-in: Energy Updates & Community Healing Circle',
      description: 'Join our weekly live session for cosmic energy updates, collective healing, community announcements, and answering your spiritual questions.',
      thumbnail: '🌟',
      duration: '1:15:20',
      views: '9.6K',
      likes: 756,
      author: {
        name: 'Sohari\'el Odimegwu',
        avatar: '👑',
        role: 'Founder & Cosmic Guide'
      },
      category: 'Live Sessions',
      publishDate: '2 days ago',
      tags: ['Live Session', 'Community', 'Healing Circle', 'Q&A'],
      isNew: true,
      isPremium: false
    }
  ];

  const availableTasks: Task[] = [
    {
      id: '1',
      title: 'Complete Profile Setup',
      description: 'Add your avatar, bio, and spiritual interests to unlock community features',
      type: 'onboarding',
      reward: { coins: 50, experience: 100, achievement: 'Sacred Seeker' },
      progress: 2,
      maxProgress: 3,
      completed: false,
      icon: '👤',
      difficulty: 'Easy'
    },
    {
      id: '2',
      title: 'Watch 3 Sacred Videos',
      description: 'Explore our video library and watch at least 3 transformative sessions',
      type: 'daily',
      reward: { coins: 25, experience: 50 },
      progress: 1,
      maxProgress: 3,
      completed: false,
      icon: '🎬',
      difficulty: 'Easy',
      expiresAt: '23:59 today'
    },
    {
      id: '3',
      title: 'Join Community Discussion',
      description: 'Participate in our WhatsApp community or leave a comment on a blog post',
      type: 'daily',
      reward: { coins: 30, experience: 75 },
      progress: 0,
      maxProgress: 1,
      completed: false,
      icon: '💬',
      difficulty: 'Easy',
      expiresAt: '23:59 today'
    },
    {
      id: '4',
      title: 'Submit Your First Creation',
      description: 'Upload original spiritual content through our Creation Portal',
      type: 'weekly',
      reward: { coins: 200, experience: 300, achievement: 'Divine Creator' },
      progress: 0,
      maxProgress: 1,
      completed: false,
      icon: '🎨',
      difficulty: 'Medium',
      expiresAt: 'Sunday 11:59 PM'
    },
    {
      id: '5',
      title: 'Book a Healing Session',
      description: 'Experience our verified healers by booking your first consultation',
      type: 'weekly',
      reward: { coins: 100, experience: 150 },
      progress: 0,
      maxProgress: 1,
      completed: false,
      icon: '🔮',
      difficulty: 'Medium',
      expiresAt: 'Sunday 11:59 PM'
    },
    {
      id: '6',
      title: 'Cosmic Alignment Master',
      description: 'Complete 10 meditation sessions and 5 energy healing videos',
      type: 'achievement',
      reward: { coins: 500, experience: 750, achievement: 'Cosmic Aligned' },
      progress: 3,
      maxProgress: 15,
      completed: false,
      icon: '🌌',
      difficulty: 'Epic'
    },
    {
      id: '7',
      title: 'Invite Sacred Souls',
      description: 'Invite 3 friends to join the Wizziverse beta community',
      type: 'weekly',
      reward: { coins: 300, experience: 400, achievement: 'Community Builder' },
      progress: 1,
      maxProgress: 3,
      completed: false,
      icon: '🌟',
      difficulty: 'Hard',
      expiresAt: 'Sunday 11:59 PM'
    },
    {
      id: '8',
      title: 'Early Adopter Bonus',
      description: 'Stay active for 7 consecutive days to claim your loyalty reward',
      type: 'achievement',
      reward: { coins: 1000, experience: 1000, achievement: 'Loyal Seeker' },
      progress: 4,
      maxProgress: 7,
      completed: false,
      icon: '👑',
      difficulty: 'Epic'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Early Adopter',
      description: 'Joined Wizziverse during beta phase',
      icon: '🚀',
      unlocked: true,
      unlockedAt: '5 days ago',
      progress: 1,
      maxProgress: 1
    },
    {
      id: '2',
      title: 'Beta Tester',
      description: 'Actively testing platform features',
      icon: '🧪',
      unlocked: true,
      unlockedAt: '3 days ago',
      progress: 1,
      maxProgress: 1
    },
    {
      id: '3',
      title: 'Community Member',
      description: 'Joined WhatsApp community channels',
      icon: '👥',
      unlocked: true,
      unlockedAt: '2 days ago',
      progress: 1,
      maxProgress: 1
    },
    {
      id: '4',
      title: 'Sacred Seeker',
      description: 'Complete your profile setup',
      icon: '👤',
      unlocked: false,
      progress: 2,
      maxProgress: 3
    },
    {
      id: '5',
      title: 'Divine Creator',
      description: 'Submit your first creation',
      icon: '🎨',
      unlocked: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: '6',
      title: 'Cosmic Aligned',
      description: 'Master meditation and energy work',
      icon: '🌌',
      unlocked: false,
      progress: 3,
      maxProgress: 15
    }
  ];

  const availableGames: Game[] = [
    {
      id: 'cosmic-memory',
      title: 'Cosmic Memory',
      description: 'Match sacred symbols to unlock cosmic wisdom and earn WizziCoins',
      icon: '🧠',
      difficulty: 'Easy',
      baseReward: 15,
      category: 'Memory',
      playTime: '2-5 min',
      maxScore: 1000
    },
    {
      id: 'chakra-align',
      title: 'Chakra Alignment',
      description: 'Balance the seven chakras by solving color-matching puzzles',
      icon: '🌈',
      difficulty: 'Medium',
      baseReward: 25,
      category: 'Puzzle',
      playTime: '3-7 min',
      maxScore: 2000
    },
    {
      id: 'frequency-match',
      title: 'Frequency Matching',
      description: 'Match healing frequencies to create harmonious sound patterns',
      icon: '🎵',
      difficulty: 'Hard',
      baseReward: 40,
      category: 'Rhythm',
      playTime: '5-10 min',
      maxScore: 3000
    },
    {
      id: 'crystal-collector',
      title: 'Crystal Collector',
      description: 'Navigate the cosmic realm to collect sacred crystals and gems',
      icon: '💎',
      difficulty: 'Epic',
      baseReward: 60,
      category: 'Adventure',
      playTime: '10-15 min',
      maxScore: 5000
    }
  ];

  // Navigation Functions
  const handleNavigation = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false); // Close mobile menu if open
    
    // Scroll to section
    const element = document.getElementById(`section-${section}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (section === 'portals') {
      // If portals section doesn't exist, scroll to hero
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scroll listener to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['portals', 'academy', 'creators', 'gaming'];
      const scrollPosition = window.scrollY + 200; // Offset for navbar height
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(`section-${sections[i]}`);
        if (element && element.offsetTop <= scrollPosition) {
          if (activeSection !== sections[i]) {
            setActiveSection(sections[i]);
          }
          break;
        }
      }
      
      // Default to portals if at top
      if (window.scrollY < 100) {
        if (activeSection !== 'portals') {
          setActiveSection('portals');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const completeTask = (task: Task) => {
    if (task.completed) return;
    
    // Update coins and experience
    setWizzicoinCount(prev => prev + task.reward.coins);
    setUserExperience(prev => {
      const newXP = prev + task.reward.experience;
      // Check for level up
      if (newXP >= nextLevelXP) {
        setUserLevel(level => level + 1);
        setNextLevelXP(levelXP => levelXP + 500); // Each level needs 500 more XP
      }
      return newXP;
    });
    
    // Mark task as completed
    setCompletedTasks(prev => [...prev, task.id]);
    
    // Show reward animation
    setShowTaskReward(task);
    setTimeout(() => setShowTaskReward(null), 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 border-green-500/30 bg-green-900/20';
      case 'Medium': return 'text-yellow-400 border-yellow-500/30 bg-yellow-900/20';
      case 'Hard': return 'text-orange-400 border-orange-500/30 bg-orange-900/20';
      case 'Epic': return 'text-purple-400 border-purple-500/30 bg-purple-900/20';
      default: return 'text-gray-400 border-gray-500/30 bg-gray-900/20';
    }
  };

  const getXPProgress = () => {
    const currentLevelXP = nextLevelXP - 500;
    const progressInLevel = userExperience - currentLevelXP;
    return (progressInLevel / 500) * 100;
  };

  const renderTaskRewardModal = () => {
    if (!showTaskReward) return null;
    
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl"></div>
        <div className="relative bg-gradient-to-br from-green-900/90 to-yellow-900/90 backdrop-blur-2xl rounded-2xl p-8 border border-green-500/30 shadow-2xl animate-pulse">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-2">Task Completed!</h2>
            <h3 className="text-xl text-green-300 mb-4">{showTaskReward.title}</h3>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-yellow-400">🪙</span>
                <span className="text-white font-bold">+{showTaskReward.reward.coins} WizziCoins</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-purple-400">⭐</span>
                <span className="text-white font-bold">+{showTaskReward.reward.experience} XP</span>
              </div>
              {showTaskReward.reward.achievement && (
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-cyan-400">🏆</span>
                  <span className="text-white font-bold">Achievement: {showTaskReward.reward.achievement}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Initialize optimized background elements
  useEffect(() => {
    // Performance detection
    const isLowPerformance = window.innerWidth < 768 || 
                            /Mobi|Android/i.test(navigator.userAgent) ||
                            navigator.hardwareConcurrency < 4;

    const createBackgroundElements = () => {
      // Adaptive particle count based on performance
      const particleCount = isLowPerformance ? 15 : 25;
      const starCount = isLowPerformance ? 50 : 100;
      const cloudCount = isLowPerformance ? 3 : 5;
      const orbCount = isLowPerformance ? 4 : 6;

      // Create optimized particles
      const newParticles: FloatingParticle[] = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: ['#a855f7', '#06b6d4', '#8b5cf6'][Math.floor(Math.random() * 3)],
          opacity: Math.random() * 0.3 + 0.1,
          pulsePhase: Math.random() * 2 * Math.PI,
          trail: []
        });
      }
      setParticles(newParticles);

      // Create optimized stars
      const newStars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinklePhase: Math.random() * 2 * Math.PI,
          color: ['#ffffff', '#cde4ff', '#e6ccff'][Math.floor(Math.random() * 3)]
        });
      }
      setStars(newStars);

      // Create optimized cosmic clouds
      const newClouds: CosmicCloud[] = [];
      for (let i = 0; i < cloudCount; i++) {
        newClouds.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 150 + 80,
          opacity: Math.random() * 0.1 + 0.05,
          color: ['#a855f7', '#06b6d4', '#8b5cf6'][Math.floor(Math.random() * 3)],
          driftSpeed: (Math.random() - 0.5) * 0.08,
          pulsePhase: Math.random() * 2 * Math.PI
        });
      }
      setCosmicClouds(newClouds);

      // Create optimized energy orbs
      const newOrbs: EnergyOrb[] = [];
      for (let i = 0; i < orbCount; i++) {
        newOrbs.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 30 + 15,
          color: ['#a855f7', '#06b6d4', '#8b5cf6'][Math.floor(Math.random() * 3)],
          pulseSpeed: Math.random() * 0.02 + 0.01,
          driftX: (Math.random() - 0.5) * 0.15,
          driftY: (Math.random() - 0.5) * 0.15,
          glowIntensity: Math.random() * 0.4 + 0.4
        });
      }
      setEnergyOrbs(newOrbs);
    };

    createBackgroundElements();
    
    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(createBackgroundElements, 300);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Optimized background animation system
  useEffect(() => {
    const isLowPerformance = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
    const frameRate = isLowPerformance ? 100 : 60; // Lower frame rate for mobile
    const mouseThreshold = isLowPerformance ? 100 : 120; // Smaller interaction area for mobile

    let frameCount = 0;
    
    const animateBackground = () => {
      frameCount++;
      const skipFrame = isLowPerformance && frameCount % 2 === 0; // Skip every other frame on mobile
      
      // Animate particles with optimized effects
      if (!skipFrame) {
        setParticles(prev => prev.map(particle => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;
          
          // Optimized mouse interaction (only check occasionally)
          if (frameCount % 3 === 0) {
            const dx = mousePosition.x - newX;
            const dy = mousePosition.y - newY;
            const distance = dx * dx + dy * dy; // Skip sqrt for performance
            
            if (distance < mouseThreshold * mouseThreshold) {
              const attraction = 0.015;
              newX += dx * attraction * 0.1;
              newY += dy * attraction * 0.1;
            }
          }
          
          // Optimized boundary wrapping
          if (newX > window.innerWidth) newX = 0;
          if (newX < 0) newX = window.innerWidth;
          if (newY > window.innerHeight) newY = 0;
          if (newY < 0) newY = window.innerHeight;
          
          // Simplified pulse effect
          const newPulsePhase = particle.pulsePhase + 0.04;
          const pulsedOpacity = particle.opacity * (0.6 + 0.4 * Math.sin(newPulsePhase));
          
          // Simplified trail system
          let newTrail = particle.trail;
          if (!isLowPerformance && frameCount % 2 === 0) {
            newTrail = [...particle.trail.slice(-4), { x: newX, y: newY, opacity: pulsedOpacity * 0.5 }];
          }
          
          return {
            ...particle,
            x: newX,
            y: newY,
            pulsePhase: newPulsePhase,
            opacity: pulsedOpacity,
            trail: newTrail
          };
        }));
      }

      // Animate stars less frequently
      if (frameCount % 4 === 0) {
        setStars(prev => prev.map(star => ({
          ...star,
          twinklePhase: star.twinklePhase + star.twinkleSpeed,
          opacity: 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(star.twinklePhase))
        })));
      }

      // Animate cosmic clouds less frequently
      if (frameCount % 6 === 0) {
        setCosmicClouds(prev => prev.map(cloud => {
          let newX = cloud.x + cloud.driftSpeed;
          if (newX > window.innerWidth + cloud.size) newX = -cloud.size;
          if (newX < -cloud.size) newX = window.innerWidth + cloud.size;
          
          return {
            ...cloud,
            x: newX,
            pulsePhase: cloud.pulsePhase + 0.008,
            opacity: cloud.opacity * (0.8 + 0.2 * Math.sin(cloud.pulsePhase))
          };
        }));
      }

      // Animate energy orbs less frequently
      if (frameCount % 5 === 0) {
        setEnergyOrbs(prev => prev.map(orb => {
          let newX = orb.x + orb.driftX;
          let newY = orb.y + orb.driftY;
          
          // Simplified boundary bouncing
          if (newX <= 0 || newX >= window.innerWidth) orb.driftX *= -1;
          if (newY <= 0 || newY >= window.innerHeight) orb.driftY *= -1;
          
          newX = Math.max(0, Math.min(window.innerWidth, newX));
          newY = Math.max(0, Math.min(window.innerHeight, newY));
          
          return {
            ...orb,
            x: newX,
            y: newY,
            glowIntensity: 0.6 + 0.4 * Math.sin(Date.now() * orb.pulseSpeed * 0.001)
          };
        }));
      }
    };

    const interval = setInterval(animateBackground, frameRate);
    return () => clearInterval(interval);
  }, [mousePosition]);

  // Typewriter effect
  useEffect(() => {
    if (isTyping) return;
    setIsTyping(true);
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  // Optimized canvas background renderer
  useEffect(() => {
    const canvas = backgroundCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Performance detection
    const isLowPerformance = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
    
    const resizeCanvas = () => {
      // Use device pixel ratio for crisp rendering but limit for performance
      const dpr = Math.min(window.devicePixelRatio || 1, isLowPerformance ? 1 : 2);
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };
    
    resizeCanvas();
    
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200);
    };
    
    window.addEventListener('resize', handleResize);

    let frameCount = 0;
    let animationId: number;

    const renderBackground = () => {
      frameCount++;
      
      // Skip frames for better performance on low-end devices
      const shouldRender = isLowPerformance ? frameCount % 2 === 0 : true;
      
      if (shouldRender) {
        const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
        const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
        
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // Simplified animated gradient (only update occasionally)
        if (frameCount % 3 === 0 || !isLowPerformance) {
          const gradient = ctx.createRadialGradient(
            mousePosition.x, mousePosition.y, 0,
            mousePosition.x, mousePosition.y, isLowPerformance ? 200 : 250
          );
          gradient.addColorStop(0, 'rgba(168, 85, 247, 0.08)');
          gradient.addColorStop(0.6, 'rgba(6, 182, 212, 0.04)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        }
        
        // Render cosmic clouds with optimized blur
        if (!isLowPerformance && frameCount % 2 === 0) {
          cosmicClouds.forEach(cloud => {
            ctx.save();
            ctx.globalAlpha = cloud.opacity;
            ctx.filter = 'blur(25px)'; // Reduced blur for performance
            
            const cloudGradient = ctx.createRadialGradient(
              cloud.x, cloud.y, 0,
              cloud.x, cloud.y, cloud.size
            );
            cloudGradient.addColorStop(0, cloud.color + '60');
            cloudGradient.addColorStop(1, cloud.color + '00');
            
            ctx.fillStyle = cloudGradient;
            ctx.fillRect(
              cloud.x - cloud.size, 
              cloud.y - cloud.size, 
              cloud.size * 2, 
              cloud.size * 2
            );
            ctx.restore();
          });
        }

        // Render simplified energy orbs
        if (frameCount % 3 === 0) {
          energyOrbs.forEach(orb => {
            ctx.save();
            ctx.globalAlpha = orb.glowIntensity * 0.8;
            
            // Simplified single glow instead of double
            const orbGlow = ctx.createRadialGradient(
              orb.x, orb.y, 0,
              orb.x, orb.y, orb.size * 1.5
            );
            orbGlow.addColorStop(0, orb.color + 'AA');
            orbGlow.addColorStop(0.7, orb.color + '44');
            orbGlow.addColorStop(1, orb.color + '00');
            
            ctx.fillStyle = orbGlow;
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, orb.size * 1.5, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.restore();
          });
        }

        // Simplified scanning lines (only on desktop)
        if (!isLowPerformance && frameCount % 8 === 0) {
          const time = Date.now() * 0.0008;
          for (let i = 0; i < 2; i++) {
            const y = ((time + i * 3) % 8) * (canvasHeight / 8);
            
            const scanGradient = ctx.createLinearGradient(0, y - 15, 0, y + 15);
            scanGradient.addColorStop(0, 'rgba(6, 182, 212, 0)');
            scanGradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.06)');
            scanGradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
            
            ctx.fillStyle = scanGradient;
            ctx.fillRect(0, y - 15, canvasWidth, 30);
          }
        }
      }

      animationId = requestAnimationFrame(renderBackground);
    };

    animationId = requestAnimationFrame(renderBackground);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [cosmicClouds, energyOrbs, mousePosition]);

  // Optimized mouse tracking with debouncing
  useEffect(() => {
    const isLowPerformance = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
    let rafId: number;
    let lastUpdate = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      
      // Throttle mouse updates for better performance
      if (now - lastUpdate < (isLowPerformance ? 100 : 50)) {
        return;
      }
      
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        lastUpdate = now;
      });
    };

    // Only track mouse on desktop for performance
    if (!isLowPerformance) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const openModal = (portalId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveModal(portalId);
      setIsLoading(false);
      document.body.style.overflow = 'hidden';
    }, 300);
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'unset';
    setFormErrors({});
  };

  const validateForm = (formData: {[key: string]: any}) => {
    const errors: {[key: string]: string} = {};
    
    if (formData.title && formData.title.length < 3) {
      errors.title = 'Title must be at least 3 characters';
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleWizzicoinPurchase = (amount: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setWizzicoinCount(prev => prev + amount);
      setIsLoading(false);
    }, 1000);
  };

  const filteredPortals = portals.filter(portal =>
    portal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    portal.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArticles = blogArticles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(blogSearchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const openArticle = (articleId: string) => {
    setActiveArticle(articleId);
    document.body.style.overflow = 'hidden';
  };

  const closeArticle = () => {
    setActiveArticle(null);
    document.body.style.overflow = 'unset';
  };

  const renderArticleModal = () => {
    if (!activeArticle) return null;

    const article = blogArticles.find(a => a.id === activeArticle);
    if (!article) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-20">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={closeArticle}></div>
        <div className="relative bg-gradient-to-br from-purple-900/95 to-cyan-900/95 backdrop-blur-2xl rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-purple-500/30 shadow-2xl">
          <button 
            onClick={closeArticle}
            className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl z-10 bg-black/20 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm"
          >
            ✕
          </button>
          
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-xl">
                {article.author.avatar}
              </div>
              <div>
                <p className="text-white font-semibold">{article.author.name}</p>
                <p className="text-gray-400 text-sm">{article.author.role}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-gray-400 text-sm">{article.publishDate}</p>
                <p className="text-cyan-400 text-sm">{article.readTime}</p>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{article.image}</div>
              <span className="inline-block bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full text-sm mb-4">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{article.title}</h1>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">{article.excerpt}</p>
            
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-purple-500/30">
              <div className="flex space-x-2">
                {article.tags.map(tag => (
                  <span key={tag} className="bg-cyan-900/30 text-cyan-300 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors">
                  <span>💜</span>
                  <span>{article.likes}</span>
                </button>
                <button className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <span>📤 Share</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Article Preview</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                This would be the full article content. In a real implementation, this would contain the complete blog post with rich text formatting, images, embedded videos, and interactive elements.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                The article would dive deep into the topic, providing valuable insights, research findings, practical applications, and community perspectives on this important aspect of spiritual technology and consciousness evolution.
              </p>
              <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
                <p className="text-purple-300 text-sm">
                  💫 Full articles available to Wizziverse community members. Join our beta to access complete content library and contribute to the spiritual technology revolution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">Sacred Dashboard</h1>
            <p className="text-gray-400 text-sm sm:text-base">Welcome back, {user.name}</p>
          </div>
          <button
            onClick={() => setShowDashboard(false)}
            className="text-white/60 hover:text-white text-xl sm:text-2xl bg-black/20 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center backdrop-blur-sm shrink-0"
          >
            ✕
          </button>
        </div>

        {/* User Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Coins */}
          <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-yellow-500/30">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-yellow-400 text-sm font-medium">WizziCoins</p>
                <p className="text-2xl sm:text-3xl font-bold text-white truncate">{wizzicoinCount.toLocaleString()}</p>
                <p className="text-yellow-300 text-xs">≈ ${(wizzicoinCount * 0.12).toFixed(2)} USD</p>
              </div>
              <div className="text-3xl sm:text-4xl ml-2">🪙</div>
            </div>
            <button 
              onClick={() => openModal('wizzicoin')}
              className="w-full mt-3 bg-yellow-600 hover:bg-yellow-700 py-2 rounded-lg text-sm font-medium transition-colors min-h-[40px]"
            >
              Buy More Coins
            </button>
          </div>

          {/* Level & XP */}
          <div className="bg-gradient-to-br from-purple-900/40 to-cyan-900/40 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1 min-w-0">
                <p className="text-purple-400 text-sm font-medium">Level {userLevel}</p>
                <p className="text-xl sm:text-2xl font-bold text-white truncate">{userExperience.toLocaleString()} XP</p>
              </div>
              <div className="text-3xl sm:text-4xl ml-2">⭐</div>
            </div>
            <div className="w-full bg-black/30 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${getXPProgress()}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400">
              {nextLevelXP - userExperience} XP to Level {userLevel + 1}
            </p>
          </div>

          {/* Achievements */}
          <div className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-cyan-500/30">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-cyan-400 text-sm font-medium">Achievements</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{achievements.filter(a => a.unlocked).length}/{achievements.length}</p>
              </div>
              <div className="text-3xl sm:text-4xl ml-2">🏆</div>
            </div>
            <div className="flex space-x-1 mt-3">
              {achievements.slice(0, 3).map(achievement => (
                <div
                  key={achievement.id}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${
                    achievement.unlocked ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gray-600'
                  }`}
                >
                  {achievement.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Active Tasks */}
          <div className="bg-gradient-to-br from-green-900/40 to-teal-900/40 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-green-500/30">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-green-400 text-sm font-medium">Active Tasks</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">
                  {availableTasks.filter(t => !completedTasks.includes(t.id)).length}
                </p>
              </div>
              <div className="text-3xl sm:text-4xl ml-2">📋</div>
            </div>
            <p className="text-green-300 text-xs mt-2">
              Complete tasks to earn coins & XP
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Tasks Section */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-purple-500/30 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <span className="mr-2 sm:mr-3 text-lg sm:text-2xl">📋</span>
                <span className="truncate">Sacred Tasks & Challenges</span>
              </h2>
              
              {/* Task Categories */}
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                {['Daily', 'Weekly', 'Achievements'].map(category => (
                  <button
                    key={category}
                    className="px-3 sm:px-4 py-2 rounded-full text-sm font-medium bg-purple-900/40 text-purple-300 border border-purple-500/30 hover:bg-purple-800/40 transition-colors min-h-[36px]"
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Tasks List */}
              <div className="space-y-3 sm:space-y-4">
                {availableTasks.map(task => {
                  const isCompleted = completedTasks.includes(task.id);
                  return (
                    <div
                      key={task.id}
                      className={`bg-gradient-to-r from-black/60 to-purple-900/20 rounded-xl p-3 sm:p-4 border transition-all ${
                        isCompleted ? 'border-green-500/50 opacity-75' : 'border-purple-500/20 hover:border-cyan-500/30'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                        <div className="text-2xl sm:text-3xl shrink-0 self-center sm:self-start">{task.icon}</div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className={`font-bold text-sm sm:text-base ${isCompleted ? 'text-green-400 line-through' : 'text-white'}`}>
                              {task.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border shrink-0 ${getDifficultyColor(task.difficulty)}`}>
                              {task.difficulty}
                            </span>
                            {task.type === 'daily' && (
                              <span className="bg-blue-900/40 text-blue-300 px-2 py-1 rounded-full text-xs shrink-0">
                                📅 Daily
                              </span>
                            )}
                            {task.type === 'weekly' && (
                              <span className="bg-indigo-900/40 text-indigo-300 px-2 py-1 rounded-full text-xs shrink-0">
                                📆 Weekly
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-300 text-xs sm:text-sm mb-3">{task.description}</p>
                          
                          {/* Progress Bar */}
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex-1 bg-black/40 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(task.progress / task.maxProgress) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-400 shrink-0">
                              {task.progress}/{task.maxProgress}
                            </span>
                          </div>

                          {/* Rewards */}
                          <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-400">🪙</span>
                              <span className="text-gray-300">{task.reward.coins} coins</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-purple-400">⭐</span>
                              <span className="text-gray-300">{task.reward.experience} XP</span>
                            </div>
                            {task.reward.achievement && (
                              <div className="flex items-center gap-1">
                                <span className="text-cyan-400">🏆</span>
                                <span className="text-gray-300 truncate">{task.reward.achievement}</span>
                              </div>
                            )}
                          </div>

                          {task.expiresAt && (
                            <p className="text-red-400 text-xs">⏰ Expires: {task.expiresAt}</p>
                          )}
                        </div>

                        <div className="shrink-0 self-center">
                          {isCompleted ? (
                            <div className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-center min-h-[36px] flex items-center justify-center">
                              ✅ Completed
                            </div>
                          ) : task.progress >= task.maxProgress ? (
                            <button
                              onClick={() => completeTask(task)}
                              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all animate-pulse min-h-[36px]"
                            >
                              🎉 Claim Reward
                            </button>
                          ) : (
                            <button className="bg-gray-600 text-gray-300 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium cursor-not-allowed min-h-[36px]">
                              In Progress
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="order-1 lg:order-2">
            {/* Recent Activity */}
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-purple-500/30 mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center">
                <span className="mr-2 text-lg sm:text-xl">📊</span>
                <span className="truncate">Recent Activity</span>
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { action: "Watched Sacred Geometry video", reward: "+25 🪙 +50 XP", time: "2 hours ago", icon: "🎬" },
                  { action: "Joined Community WhatsApp", reward: "+30 🪙 +75 XP", time: "5 hours ago", icon: "💬" },
                  { action: "Completed Profile Setup (2/3)", reward: "Progress", time: "1 day ago", icon: "👤" },
                  { action: "Unlocked Beta Tester achievement", reward: "🏆 Achievement", time: "3 days ago", icon: "🧪" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 sm:p-3 bg-purple-900/20 rounded-lg">
                    <span className="text-lg sm:text-2xl shrink-0">{activity.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs sm:text-sm truncate">{activity.action}</p>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-green-400 text-xs">{activity.reward}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-cyan-500/30">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center">
                <span className="mr-2 text-lg sm:text-xl">⚡</span>
                <span className="truncate">Quick Actions</span>
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <button 
                  onClick={() => {
                    setShowDashboard(false);
                    setTimeout(() => openModal('wizzicoin'), 100);
                  }}
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 py-3 rounded-lg font-semibold transition-all text-sm min-h-[44px]"
                >
                  🪙 Buy WizziCoins
                </button>
                <button 
                  onClick={() => {
                    setShowDashboard(false);
                    setTimeout(() => openModal('creation'), 100);
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 py-3 rounded-lg font-semibold transition-all text-sm min-h-[44px]"
                >
                  🎨 Submit Creation
                </button>
                <button 
                  onClick={() => {
                    setShowDashboard(false);
                    setTimeout(() => openModal('healers'), 100);
                  }}
                  className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 py-3 rounded-lg font-semibold transition-all text-sm min-h-[44px]"
                >
                  🔮 Book Healing
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-yellow-500/30 mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
            <span className="mr-2 sm:mr-3 text-lg sm:text-2xl">🏆</span>
            <span className="truncate">Achievement Gallery</span>
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`text-center p-3 sm:p-4 rounded-xl border transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border-yellow-500/30'
                    : 'bg-black/40 border-gray-500/30'
                }`}
              >
                <div className={`text-2xl sm:text-3xl lg:text-4xl mb-2 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <h4 className={`font-bold text-xs sm:text-sm mb-1 ${achievement.unlocked ? 'text-yellow-300' : 'text-gray-400'} truncate`}>
                  {achievement.title}
                </h4>
                <p className="text-xs text-gray-400 mb-2 overflow-hidden h-12 leading-tight">{achievement.description}</p>
                
                {!achievement.unlocked && (
                  <div className="w-full bg-black/40 rounded-full h-1 mb-2">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 h-1 rounded-full transition-all"
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                )}
                
                {achievement.unlocked ? (
                  <p className="text-xs text-green-400">✅ Unlocked</p>
                ) : (
                  <p className="text-xs text-gray-400">{achievement.progress}/{achievement.maxProgress}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderModal = () => {
    if (!activeModal) return null;

    const portal = portals.find(p => p.id === activeModal);
    if (!portal) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={closeModal}></div>
        <div className="relative bg-gradient-to-br from-purple-900/95 to-cyan-900/95 backdrop-blur-2xl rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30 shadow-2xl">
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl z-10 bg-black/20 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm"
          >
            ✕
          </button>
          
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">{portal.icon}</div>
            <h2 className="text-4xl font-bold text-white mb-4">{portal.title}</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">{portal.description}</p>
            
            {portal.stats && (
              <div className="flex justify-center space-x-6 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">{portal.stats.users}</div>
                  <div className="text-sm text-gray-400">Beta Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{portal.stats.success}</div>
                  <div className="text-sm text-gray-400">Status</div>
                </div>
                {portal.stats.rating > 0 && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{portal.stats.rating}⭐</div>
                    <div className="text-sm text-gray-400">Beta Rating</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {portal.features && (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-cyan-300 mb-6 text-center">Professional Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portal.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 bg-black/30 rounded-xl p-4 border border-purple-500/20">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"></div>
                    <span className="text-white font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeModal === 'creation' && (
            <div className="bg-black/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Submit to Creation Studio</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-cyan-300 mb-2 font-medium">Creation Title *</label>
                  <input 
                    type="text" 
                    className={`w-full bg-black/40 border ${formErrors.title ? 'border-red-500' : 'border-purple-500/30'} rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors`}
                    placeholder="Enter your creation title..."
                  />
                  {formErrors.title && <p className="text-red-400 text-sm mt-1">{formErrors.title}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-cyan-300 mb-2 font-medium">Category</label>
                    <select className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none">
                      <option>Digital Art</option>
                      <option>Music & Audio</option>
                      <option>Writing & Poetry</option>
                      <option>Video Content</option>
                      <option>Sacred Geometry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-cyan-300 mb-2 font-medium">Suggested Price (WizziCoins)</label>
                    <input 
                      type="number" 
                      className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none"
                      placeholder="100"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-cyan-300 mb-2 font-medium">Description</label>
                  <textarea 
                    className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none h-24 resize-none"
                    placeholder="Describe your high-vibrational creation..."
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-cyan-300 mb-2 font-medium">Upload File</label>
                    <input 
                      type="file" 
                      className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-600 file:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-300 mb-2 font-medium">Preview Image</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-cyan-600 file:text-white"
                    />
                  </div>
                </div>
                
                <div className="bg-purple-900/20 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-purple-300 mb-2">Revenue Distribution</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">60%</div>
                      <div className="text-gray-400">Creator</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">30%</div>
                      <div className="text-gray-400">Community</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">10%</div>
                      <div className="text-gray-400">Platform</div>
                    </div>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r ${portal.gradient} py-4 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? 'Submitting to Council...' : 'Submit to Council ✨'}
                </button>
              </form>
            </div>
          )}

          {activeModal === 'wizzicoin' && (
            <div className="space-y-8">
              <div className="text-center bg-gradient-to-br from-yellow-900/40 to-orange-900/40 rounded-xl p-8 border border-yellow-500/30">
                <h3 className="text-3xl font-bold text-yellow-400 mb-4">Your WizziCoin Balance</h3>
                <p className="text-5xl font-bold text-white mb-2">{wizzicoinCount.toLocaleString()}</p>
                <p className="text-yellow-300">≈ ${(wizzicoinCount * 0.12).toFixed(2)} USD</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { amount: 1000, price: '$120', bonus: '', popular: false },
                  { amount: 5000, price: '$540', bonus: '10% Bonus!', popular: true },
                  { amount: 10000, price: '$960', bonus: '25% Bonus!', popular: false }
                ].map((package_) => (
                  <button
                    key={package_.amount}
                    onClick={() => handleWizzicoinPurchase(package_.amount)}
                    disabled={isLoading}
                    className={`relative bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border rounded-xl p-6 hover:scale-105 transition-all disabled:opacity-50 ${
                      package_.popular ? 'border-yellow-400/50 ring-2 ring-yellow-400/30' : 'border-yellow-500/30'
                    }`}
                  >
                    {package_.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full text-xs font-bold text-black">
                        MOST POPULAR
                      </div>
                    )}
                    <div className="text-3xl mb-3">{package_.amount.toLocaleString()} 🪙</div>
                    <div className="text-2xl font-bold text-green-400 mb-2">{package_.price}</div>
                    <div className="text-sm text-gray-300 mb-2">
                      ${(package_.amount * 0.12).toFixed(2)} value
                    </div>
                    {package_.bonus && <div className="text-sm text-purple-300 font-medium">{package_.bonus}</div>}
                  </button>
                ))}
              </div>
              
              <div className="bg-black/20 rounded-xl p-6">
                <h4 className="text-xl font-bold text-white mb-4">WizziCoin Utilities</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🎓</div>
                    <div className="text-white">Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🔮</div>
                    <div className="text-white">Healing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🎮</div>
                    <div className="text-white">Gaming</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">💝</div>
                    <div className="text-white">Charity</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderVideoModal = () => {
    if (!activeVideo) return null;

    const video = videoLibrary.find(v => v.id === activeVideo);
    if (!video) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={closeVideo}></div>
        <div className="relative bg-gradient-to-br from-purple-900/95 to-cyan-900/95 backdrop-blur-2xl rounded-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30 shadow-2xl">
          <button 
            onClick={closeVideo}
            className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl z-10 bg-black/20 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm"
          >
            ✕
          </button>
          
          {/* Video Player Area */}
          <div className="mb-8">
            <div className="bg-black rounded-xl overflow-hidden mb-6">
              <div className="aspect-video bg-gradient-to-br from-purple-900 to-cyan-900 flex items-center justify-center relative">
                <div className="text-8xl mb-4">{video.thumbnail}</div>
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                      <div className="w-0 h-0 border-l-8 border-r-0 border-t-6 border-b-6 border-l-white border-t-transparent border-b-transparent ml-1"></div>
                    </div>
                    <p className="text-white text-lg font-medium">Sacred Video Player</p>
                    <p className="text-gray-300 text-sm">Duration: {video.duration}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video Info */}
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-3 leading-tight">{video.title}</h1>
                <p className="text-gray-300 mb-4 leading-relaxed">{video.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
                  <span className="flex items-center space-x-1">
                    <span>👁️</span>
                    <span>{video.views} views</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>💜</span>
                    <span>{video.likes.toLocaleString()} likes</span>
                  </span>
                  <span>{video.publishDate}</span>
                  {video.isPremium && (
                    <span className="bg-yellow-900/40 text-yellow-300 px-2 py-1 rounded text-xs font-medium">
                      ⭐ Premium
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2 mb-6">
                  {video.tags.map(tag => (
                    <span key={tag} className="bg-cyan-900/30 text-cyan-400 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-2xl mb-3">
                  {video.author.avatar}
                </div>
                <p className="text-white font-semibold">{video.author.name}</p>
                <p className="text-gray-400 text-sm">{video.author.role}</p>
                <button className="mt-3 bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform">
                  Follow Creator
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4 pb-6 border-b border-purple-500/30">
              <button className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
                💜 Like ({video.likes.toLocaleString()})
              </button>
              <button className="bg-black/40 border border-purple-500/30 px-6 py-3 rounded-lg font-semibold hover:bg-purple-900/40 transition-colors">
                📤 Share
              </button>
              <button className="bg-black/40 border border-cyan-500/30 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-900/40 transition-colors">
                📥 Save to Playlist
              </button>
              {video.isPremium && (
                <button className="bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
                  ⭐ Unlock Full Video
                </button>
              )}
            </div>
          </div>
          
          {/* Related Videos Preview */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">More Sacred Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {videoLibrary.filter(v => v.id !== video.id).slice(0, 3).map(relatedVideo => (
                <div 
                  key={relatedVideo.id}
                  className="bg-black/40 rounded-lg p-3 border border-purple-500/20 hover:border-cyan-500/30 transition-all cursor-pointer"
                  onClick={() => {
                    closeVideo();
                    setTimeout(() => openVideo(relatedVideo.id), 100);
                  }}
                >
                  <div className="text-center mb-2">
                    <div className="text-3xl">{relatedVideo.thumbnail}</div>
                  </div>
                  <h4 className="text-white text-sm font-medium mb-1 line-clamp-2">{relatedVideo.title}</h4>
                  <p className="text-gray-400 text-xs">{relatedVideo.author.name} • {relatedVideo.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const filteredVideos = videoLibrary.filter(video => {
    const matchesCategory = selectedVideoCategory === 'All' || video.category === selectedVideoCategory;
    const matchesSearch = video.title.toLowerCase().includes(videoSearchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(videoSearchQuery.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(videoSearchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const openVideo = (videoId: string) => {
    setActiveVideo(videoId);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setActiveVideo(null);
    document.body.style.overflow = 'unset';
  };

  // Game Logic Functions
  const startGame = (gameId: string) => {
    setActiveGame(gameId);
    setGameScore(0);
    setGameStartTime(Date.now());
    setIsGameActive(true);
    
    // Initialize game-specific state
    if (gameId === 'cosmic-memory') {
      initializeMemoryGame();
    } else if (gameId === 'crystal-collector') {
      initializeCrystalCollector();
      setGameTimer(60);
    }
    
    document.body.style.overflow = 'hidden';
  };

  const endGame = (finalScore: number) => {
    setIsGameActive(false);
    const game = availableGames.find(g => g.id === activeGame);
    if (!game) return;

    const timeBonus = Math.max(0, 60 - Math.floor((Date.now() - gameStartTime) / 1000));
    const totalScore = finalScore + timeBonus;
    const coinsEarned = Math.floor((totalScore / game.maxScore) * game.baseReward) + game.baseReward;
    
    setWizzicoinCount(prev => prev + coinsEarned);
    setGameSession({
      gameId: activeGame!,
      score: totalScore,
      coinsEarned,
      timeCompleted: Date.now() - gameStartTime,
      completed: true
    });
  };

  const closeGame = () => {
    setActiveGame(null);
    setGameSession(null);
    setIsGameActive(false);
    setGameScore(0);
    setFlippedCards([]);
    setMatchedCards([]);
    setCrystalPositions([]);
    setPlayerPosition({x: 50, y: 50});
    setGameTimer(60);
    document.body.style.overflow = 'unset';
  };

  // Memory Game Logic
  const initializeMemoryGame = () => {
    const symbols = ['🌟', '🔮', '⭐', '🌙', '💫', '✨', '🪐', '🌌'];
    const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    setGameCards(cards);
    setFlippedCards([]);
    setMatchedCards([]);
  };

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      if (gameCards[newFlipped[0]] === gameCards[newFlipped[1]]) {
        // Match found
        setTimeout(() => {
          setMatchedCards(prev => [...prev, ...newFlipped]);
          setFlippedCards([]);
          setGameScore(prev => prev + 100);
          
          // Check if game is complete
          if (matchedCards.length + 2 === gameCards.length) {
            setTimeout(() => endGame(gameScore + 100), 500);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Crystal Collector Logic
  const initializeCrystalCollector = () => {
    const crystals = [];
    const crystalTypes = ['💎', '💠', '🔷', '🔶', '🟣', '🟢', '🔴', '🟡'];
    
    for (let i = 0; i < 15; i++) {
      crystals.push({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        collected: false,
        type: crystalTypes[Math.floor(Math.random() * crystalTypes.length)]
      });
    }
    setCrystalPositions(crystals);
    setPlayerPosition({x: 50, y: 50});
  };

  const movePlayer = (direction: string) => {
    if (!isGameActive) return;
    
    setPlayerPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;
      
      switch (direction) {
        case 'up': newY = Math.max(5, prev.y - 5); break;
        case 'down': newY = Math.min(95, prev.y + 5); break;
        case 'left': newX = Math.max(5, prev.x - 5); break;
        case 'right': newX = Math.min(95, prev.x + 5); break;
      }
      
      // Check crystal collection
      setCrystalPositions(crystals => 
        crystals.map(crystal => {
          if (!crystal.collected && 
              Math.abs(crystal.x - newX) < 3 && 
              Math.abs(crystal.y - newY) < 3) {
            setGameScore(score => score + 50);
            return { ...crystal, collected: true };
          }
          return crystal;
        })
      );
      
      return { x: newX, y: newY };
    });
  };

  // Game Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGameActive && activeGame === 'crystal-collector') {
      interval = setInterval(() => {
        setGameTimer(prev => {
          if (prev <= 1) {
            endGame(gameScore);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isGameActive, activeGame, gameScore]);

  // Keyboard controls for Crystal Collector
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (activeGame !== 'crystal-collector' || !isGameActive) return;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          movePlayer('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          movePlayer('down');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          movePlayer('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          movePlayer('right');
          break;
      }
    };

    if (activeGame === 'crystal-collector') {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [activeGame, isGameActive]);

  const renderGameModal = () => {
    if (!activeGame) return null;

    const game = availableGames.find(g => g.id === activeGame);
    if (!game) return null;

    return (
      <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl">
        <div className="h-full flex flex-col">
          {/* Game Header */}
          <div className="bg-black/80 border-b border-purple-500/30 p-4">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{game.icon}</div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{game.title}</h1>
                  <p className="text-gray-400">{game.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                {activeGame === 'crystal-collector' && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">⏰ {gameTimer}s</div>
                    <div className="text-xs text-gray-400">Time Left</div>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">🪙 {gameScore}</div>
                  <div className="text-xs text-gray-400">Score</div>
                </div>
                <button
                  onClick={closeGame}
                  className="text-white/60 hover:text-white text-2xl bg-black/40 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          {/* Game Content */}
          <div className="flex-1 flex items-center justify-center p-8">
            {activeGame === 'cosmic-memory' && (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-white mb-2">Match the Sacred Symbols</h2>
                  <p className="text-gray-400">Click cards to flip them and find matching pairs</p>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {gameCards.map((symbol, index) => (
                    <div
                      key={index}
                      onClick={() => handleCardClick(index)}
                      className={`aspect-square flex items-center justify-center text-4xl rounded-xl border-2 cursor-pointer transition-all transform hover:scale-105 ${
                        flippedCards.includes(index) || matchedCards.includes(index)
                          ? 'bg-gradient-to-br from-purple-500 to-cyan-500 border-white/30'
                          : 'bg-black/60 border-purple-500/30 hover:border-cyan-500/50'
                      }`}
                    >
                      {flippedCards.includes(index) || matchedCards.includes(index) ? symbol : '✦'}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeGame === 'chakra-align' && (
              <div className="max-w-2xl mx-auto text-center">
                <div className="text-6xl mb-6 animate-pulse">🌈</div>
                <h2 className="text-2xl font-bold text-white mb-4">Chakra Alignment</h2>
                <p className="text-gray-400 mb-8">
                  This advanced chakra balancing game is currently being calibrated with cosmic frequencies. 
                  Check back soon for the full experience!
                </p>
                <div className="grid grid-cols-7 gap-2 mb-8">
                  {['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🤍'].map((color, index) => (
                    <div key={index} className="aspect-square flex items-center justify-center text-4xl bg-black/40 rounded-lg border border-purple-500/30">
                      {color}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => endGame(500)}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-3 rounded-lg font-semibold"
                >
                  Claim Beta Reward (25 🪙)
                </button>
              </div>
            )}

            {activeGame === 'frequency-match' && (
              <div className="max-w-2xl mx-auto text-center">
                <div className="text-6xl mb-6 animate-bounce">🎵</div>
                <h2 className="text-2xl font-bold text-white mb-4">Frequency Matching</h2>
                <p className="text-gray-400 mb-8">
                  The sacred sound frequencies are being tuned to perfection. 
                  This immersive rhythm experience will launch soon!
                </p>
                <div className="flex justify-center space-x-4 mb-8">
                  {[174, 285, 396, 417, 528, 639, 741, 852, 963].map((freq, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-20 bg-gradient-to-t from-purple-600 to-cyan-500 rounded-lg mb-2 animate-pulse" style={{animationDelay: `${index * 0.1}s`}}></div>
                      <div className="text-xs text-gray-400">{freq}Hz</div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => endGame(800)}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-3 rounded-lg font-semibold"
                >
                  Claim Beta Reward (40 🪙)
                </button>
              </div>
            )}

            {activeGame === 'crystal-collector' && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold text-white mb-2">Crystal Collector</h2>
                  <p className="text-gray-400">Use WASD or Arrow keys to move and collect crystals!</p>
                </div>
                
                <div 
                  className="relative w-full h-96 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-xl border border-purple-500/30 overflow-hidden"
                  style={{backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'}}
                >
                  {/* Player */}
                  <div
                    className="absolute w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-white/50 transition-all duration-100 z-10"
                    style={{
                      left: `${playerPosition.x}%`,
                      top: `${playerPosition.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="absolute inset-1 bg-yellow-200 rounded-full animate-pulse"></div>
                  </div>

                  {/* Crystals */}
                  {crystalPositions.map((crystal, index) => (
                    !crystal.collected && (
                      <div
                        key={index}
                        className="absolute text-2xl animate-bounce transition-all duration-300"
                        style={{
                          left: `${crystal.x}%`,
                          top: `${crystal.y}%`,
                          transform: 'translate(-50%, -50%)',
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        {crystal.type}
                      </div>
                    )
                  ))}

                  {/* Collected count */}
                  <div className="absolute top-4 left-4 bg-black/60 rounded-lg px-3 py-2">
                    <span className="text-white font-bold">
                      Collected: {crystalPositions.filter(c => c.collected).length}/{crystalPositions.length}
                    </span>
                  </div>

                  {/* Controls */}
                  <div className="absolute bottom-4 right-4 bg-black/60 rounded-lg p-3">
                    <div className="text-white text-sm text-center mb-2">Controls</div>
                    <div className="grid grid-cols-3 gap-1">
                      <div></div>
                      <button 
                        onClick={() => movePlayer('up')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded text-xs"
                      >
                        ↑
                      </button>
                      <div></div>
                      <button 
                        onClick={() => movePlayer('left')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded text-xs"
                      >
                        ←
                      </button>
                      <div></div>
                      <button 
                        onClick={() => movePlayer('right')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded text-xs"
                      >
                        →
                      </button>
                      <div></div>
                      <button 
                        onClick={() => movePlayer('down')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded text-xs"
                      >
                        ↓
                      </button>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderGameResults = () => {
    if (!gameSession) return null;

    const game = availableGames.find(g => g.id === gameSession.gameId);
    if (!game) return null;

    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl"></div>
        <div className="relative bg-gradient-to-br from-green-900/90 to-yellow-900/90 backdrop-blur-2xl rounded-2xl p-8 border border-green-500/30 shadow-2xl max-w-md w-full">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-2">Game Complete!</h2>
            <h3 className="text-xl text-green-300 mb-6">{game.title}</h3>
            
            <div className="bg-black/30 rounded-xl p-6 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Final Score:</span>
                  <span className="text-yellow-400 font-bold">{gameSession.score.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Coins Earned:</span>
                  <span className="text-green-400 font-bold">+{gameSession.coinsEarned} 🪙</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Time Taken:</span>
                  <span className="text-cyan-400 font-bold">{Math.floor(gameSession.timeCompleted / 1000)}s</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  closeGame();
                  setTimeout(() => startGame(gameSession.gameId), 100);
                }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Play Again
              </button>
              <button 
                onClick={closeGame}
                className="flex-1 bg-black/40 border border-purple-500/30 py-3 rounded-lg font-semibold hover:bg-purple-900/40 transition-colors"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white">Loading Sacred Content...</p>
          </div>
        </div>
      )}

      {/* Advanced Canvas Background */}
      <canvas
        ref={backgroundCanvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Optimized Star Field */}
      <div className="fixed inset-0 pointer-events-none z-[1] will-change-opacity">
        {stars.map((star, index) => (
          <div
            key={`star-${index}`}
            className="absolute rounded-full will-change-opacity"
            style={{
              left: `${star.x}px`,
              top: `${star.y}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              opacity: star.opacity,
              transform: `translate(-50%, -50%)`,
              boxShadow: window.innerWidth > 768 ? `0 0 ${star.size * 1.5}px ${star.color}` : 'none'
            }}
          />
        ))}
      </div>

      {/* Optimized Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-[2] will-change-transform">
        {particles.map(particle => (
          <div key={`particle-group-${particle.id}`} className="will-change-transform">
            {/* Simplified Trail - Only on desktop */}
            {window.innerWidth > 768 && particle.trail.slice(-3).map((point, index) => (
              <div
                key={`trail-${particle.id}-${index}`}
                className="absolute rounded-full will-change-opacity"
                style={{
                  left: `${point.x}px`,
                  top: `${point.y}px`,
                  width: `${particle.size * 0.5}px`,
                  height: `${particle.size * 0.5}px`,
                  backgroundColor: particle.color,
                  opacity: point.opacity * 0.6,
                  transform: `translate(-50%, -50%)`,
                  filter: 'blur(0.3px)'
                }}
              />
            ))}
            {/* Optimized Main Particle */}
            <div
              className="absolute rounded-full will-change-opacity"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                opacity: particle.opacity,
                transform: `translate(-50%, -50%)`,
                boxShadow: window.innerWidth > 768 ? 
                  `0 0 ${particle.size * 2}px ${particle.color}${Math.floor(particle.opacity * 200).toString(16).padStart(2, '0')}` : 
                  'none'
              }}
            />
          </div>
        ))}
      </div>

      {/* Optimized Cosmic Background Layers */}
      <div className="fixed inset-0 z-0">
        {/* Simplified base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/12 via-blue-900/8 to-black"></div>
        
        {/* Optimized dynamic gradient following mouse - Only on desktop */}
        {window.innerWidth > 768 && (
          <div 
            className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl transition-all duration-700 ease-out will-change-transform"
            style={{
              background: `radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(6, 182, 212, 0.15) 60%, transparent 100%)`,
              left: mousePosition.x - 160,
              top: mousePosition.y - 160,
              transform: 'translate(0, 0)'
            }}
          />
        )}
        
        {/* Simplified cosmic energy grid - Desktop only */}
        {window.innerWidth > 768 && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-600/6 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-600/4 via-transparent to-transparent"></div>
          </>
        )}
        
        {/* Simplified animated cosmic waves - Desktop only */}
        {window.innerWidth > 1024 && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/8 to-transparent animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-20">
        {/* Enhanced Responsive Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-xl border-b border-purple-500/30 shadow-2xl">
          {/* Main Navigation Bar */}
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-14">
              
              {/* Logo Section - Enhanced Responsive */}
              <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0 z-20">
                <div className="relative group">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center animate-cosmic-spin">
                    <span className="text-white font-bold text-sm sm:text-base lg:text-lg">W</span>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-30 animate-ping"></div>
                </div>
                <div className="hidden xs:block min-w-0">
                  <h1 className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    WIZZIVERSE
                  </h1>
                  <div className="flex items-center space-x-1 -mt-0.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 text-xs font-medium">BETA</span>
                    <span className="text-gray-500 hidden sm:inline text-xs">• {platformStats.betaUsers} users</span>
                  </div>
                </div>
              </div>
              
              {/* Desktop Navigation - Hidden on mobile/tablet */}
              <div className="hidden lg:flex items-center flex-1 justify-center space-x-8">
                {[
                  { name: 'Portals', icon: '🌀', section: 'portals', tooltip: 'Explore Sacred Portals' },
                  { name: 'Academy', icon: '🎓', section: 'academy', tooltip: 'Learn & Grow' },
                  { name: 'Creators', icon: '🎨', section: 'creators', tooltip: 'Creator Hub' },
                  { name: 'Gaming', icon: '🎮', section: 'gaming', tooltip: 'Cosmic Games' }
                ].map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.section)}
                    className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                      activeSection === item.section 
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg transform scale-105' 
                        : 'text-gray-300 hover:text-white hover:bg-purple-900/40'
                    }`}
                    title={item.tooltip}
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.name}</span>
                    {activeSection !== item.section && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-70"></div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Right Section - Responsive */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Search - Desktop */}
                <div className="hidden md:flex relative group">
                  <input
                    type="text"
                    placeholder="Search portals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-black/40 border border-purple-500/30 rounded-full pl-4 pr-10 py-2 text-white text-sm placeholder:text-gray-400 focus:border-cyan-500/50 focus:outline-none w-48 lg:w-56 xl:w-64 transition-all duration-200 focus:w-56 lg:focus:w-64 xl:focus:w-72"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-cyan-400 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  {searchQuery && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-black/98 backdrop-blur-xl rounded-xl border border-purple-500/30 overflow-hidden shadow-2xl z-50">
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">Search Results</span>
                          <span className="text-xs text-purple-400">{filteredPortals.length} found</span>
                        </div>
                        <div className="space-y-1 max-h-64 overflow-y-auto custom-scrollbar">
                          {filteredPortals.slice(0, 6).map(portal => (
                            <div key={portal.id} className="flex items-center space-x-3 p-3 hover:bg-purple-900/20 rounded-lg cursor-pointer transition-colors group">
                              <span className="text-lg flex-shrink-0">{portal.icon}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-medium truncate group-hover:text-cyan-400">{portal.title}</p>
                                <p className="text-xs text-gray-400 truncate">{portal.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Search Button */}
                <button 
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className="md:hidden p-2 rounded-full bg-black/40 border border-purple-500/30 hover:border-cyan-500/50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                {/* User Stats - Desktop */}
                <div className="hidden lg:flex items-center space-x-2">
                  <div className="flex items-center space-x-3 bg-black/40 px-4 py-2 rounded-full border border-purple-500/30 hover:border-cyan-500/50 transition-colors cursor-pointer" onClick={() => setShowDashboard(true)}>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-purple-400">⭐</span>
                      <span className="text-white font-semibold text-sm">{userLevel}</span>
                    </div>
                    <div className="w-px h-4 bg-gray-600"></div>
                    <div className="flex items-center space-x-1.5" onClick={(e) => { e.stopPropagation(); openModal('wizzicoin'); }}>
                      <span className="text-yellow-400">🪙</span>
                      <span className="text-white font-semibold text-sm">{wizzicoinCount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setShowDashboard(true)}
                      className="flex items-center space-x-2 bg-black/40 px-3 py-2 rounded-full border border-green-500/30 hover:border-green-400/50 transition-colors"
                    >
                      <span className="text-green-400">📋</span>
                      <span className="text-white font-medium text-sm">
                        {availableTasks.filter(t => !completedTasks.includes(t.id)).length}
                      </span>
                    </button>
                    {availableTasks.filter(t => !completedTasks.includes(t.id) && t.progress >= t.maxProgress).length > 0 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                    )}
                  </div>
                </div>

                {/* Mobile Stats - Tablet/Mobile */}
                <div className="lg:hidden">
                  <button 
                    onClick={() => setShowDashboard(true)}
                    className="flex items-center space-x-2 bg-black/40 px-3 py-2 rounded-full border border-purple-500/30 hover:border-cyan-500/50 transition-colors"
                  >
                    <span className="text-purple-400 text-sm">⭐{userLevel}</span>
                    <div className="w-px h-3 bg-gray-600"></div>
                    <span className="text-yellow-400 text-sm">🪙{Math.floor(wizzicoinCount / 1000)}k</span>
                    {availableTasks.filter(t => !completedTasks.includes(t.id) && t.progress >= t.maxProgress).length > 0 && (
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse ml-1"></div>
                    )}
                  </button>
                </div>

                {/* Dashboard Button */}
                <button 
                  onClick={() => setShowDashboard(true)}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-2 rounded-full hover:from-purple-700 hover:to-cyan-700 transition-all hover:scale-105 active:scale-95 text-sm font-medium shadow-lg"
                >
                  <span className="hidden sm:inline">⚡ Dashboard</span>
                  <span className="sm:hidden">⚡</span>
                </button>

                {/* User Avatar & Menu */}
                <div className="relative group">
                  <button className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform animate-cosmic-breathe shadow-lg">
                    <span className="text-lg">{user.avatar}</span>
                  </button>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                    <div className="w-1 h-1 bg-green-300 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* User Menu Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-56 bg-black/98 backdrop-blur-xl rounded-xl border border-purple-500/30 shadow-2xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto z-50">
                    <div className="p-4">
                      <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-purple-500/20">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">{user.avatar}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold truncate">{user.name}</p>
                          <p className="text-gray-400 text-sm">{user.level}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <button className="w-full flex items-center space-x-3 p-3 hover:bg-purple-900/20 rounded-lg transition-colors text-gray-300 hover:text-white">
                          <span className="text-lg">👤</span>
                          <span>Profile Settings</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 p-3 hover:bg-purple-900/20 rounded-lg transition-colors text-gray-300 hover:text-white">
                          <span className="text-lg">🔮</span>
                          <span>Preferences</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 p-3 hover:bg-purple-900/20 rounded-lg transition-colors text-gray-300 hover:text-white">
                          <span className="text-lg">🎯</span>
                          <span>Goals & Progress</span>
                        </button>
                        <hr className="border-purple-500/20 my-2" />
                        <button className="w-full flex items-center space-x-3 p-3 hover:bg-red-900/20 rounded-lg transition-colors text-gray-300 hover:text-red-300">
                          <span className="text-lg">🚪</span>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg bg-black/40 border border-purple-500/30 hover:border-cyan-500/50 transition-colors relative z-20"
                >
                  <div className="w-5 h-5 flex flex-col justify-center items-center">
                    <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                    <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search Overlay */}
          {showMobileSearch && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-xl border-b border-purple-500/30 z-40">
              <div className="p-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search portals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/40 border border-purple-500/30 rounded-full pl-4 pr-10 py-3 text-white placeholder:text-gray-400 focus:border-cyan-500/50 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => setShowMobileSearch(false)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {searchQuery && (
                  <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
                    {filteredPortals.slice(0, 5).map(portal => (
                      <div key={portal.id} className="flex items-center space-x-3 p-3 hover:bg-purple-900/20 rounded-lg cursor-pointer">
                        <span className="text-xl flex-shrink-0">{portal.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{portal.title}</p>
                          <p className="text-sm text-gray-400 truncate">{portal.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu Overlay */}
          <div className={`lg:hidden fixed inset-0 bg-black/95 backdrop-blur-xl transition-all duration-300 z-30 ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}>
            <div className={`absolute top-0 right-0 w-full max-w-sm h-full bg-gradient-to-b from-purple-900/20 to-cyan-900/20 border-l border-purple-500/30 transform transition-transform duration-300 ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              <div className="p-6 pt-20">
                <div className="space-y-6">
                  {/* Navigation Items */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
                    <div className="space-y-2">
                      {[
                        { name: 'Portals', icon: '🌀', section: 'portals', tooltip: 'Explore Sacred Portals' },
                        { name: 'Academy', icon: '🎓', section: 'academy', tooltip: 'Learn & Grow' },
                        { name: 'Creators', icon: '🎨', section: 'creators', tooltip: 'Creator Hub' },
                        { name: 'Gaming', icon: '🎮', section: 'gaming', tooltip: 'Cosmic Games' }
                      ].map((item, index) => (
                        <button
                          key={item.name}
                          className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
                            activeSection === item.section 
                              ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg transform scale-105' 
                              : 'bg-black/40 text-gray-300 hover:text-white hover:bg-purple-900/40 border border-purple-500/30'
                          }`}
                          onClick={() => handleNavigation(item.section)}
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <div className="flex-1 text-left">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm opacity-75">{item.tooltip}</p>
                          </div>
                          {activeSection !== item.section && (
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <button 
                        onClick={() => { setShowDashboard(true); setIsMobileMenuOpen(false); }}
                        className="w-full flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg"
                      >
                        <span className="text-2xl">⚡</span>
                        <span className="font-medium">Dashboard</span>
                      </button>
                      <button 
                        onClick={() => { openModal('wizzicoin'); setIsMobileMenuOpen(false); }}
                        className="w-full flex items-center space-x-4 p-4 rounded-xl bg-black/40 text-gray-300 hover:text-white border border-purple-500/30"
                      >
                        <span className="text-2xl">🪙</span>
                        <span className="font-medium">Buy WizziCoins</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section - Mobile Responsive */}
        <section className="min-h-screen flex items-center justify-center pt-20 lg:pt-16 pb-8 relative">
          <div className="container mx-auto px-4 lg:px-6 text-center">
            {/* Animated Logo */}
            <div className="mb-8 lg:mb-12">
              <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-6 lg:mb-8 rounded-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 p-0.5 animate-spin-slow relative group">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden">
                  <span className="text-xl lg:text-2xl">🌟</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            </div>
            
            {/* Main Title - Responsive Typography */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent leading-tight px-2">
              <span className="block lg:inline">{typedText.split(': ')[0]}</span>
              {typedText.includes(': ') && (
                <>
                  <span className="block lg:inline lg:mx-2">:</span>
                  <span className="block lg:inline text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                    {typedText.split(': ')[1]}
                  </span>
                </>
              )}
              {isTyping && <span className="animate-pulse">|</span>}
            </h1>
            
            {/* Description - Mobile Optimized */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-4 lg:mb-6 max-w-4xl mx-auto leading-relaxed px-4">
              Professional spiritual technology platform connecting high-frequency creators, 
              healers, and innovators in a sacred digital ecosystem.
            </p>
            
            {/* Founder & Beta Info */}
            <div className="text-sm sm:text-base lg:text-lg text-purple-300 mb-8 lg:mb-12 font-medium space-y-2 lg:space-y-0 lg:space-x-4">
              <div className="block lg:inline">Founded by SOHARI'EL Odimegwu</div>
              <div className="hidden lg:inline">•</div>
              <div className="block lg:inline flex items-center justify-center space-x-2">
                <span>Join {platformStats.betaUsers} Beta Users</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse lg:inline-block"></div>
              </div>
            </div>
            
            {/* Action Buttons - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-center mb-8 lg:mb-12 px-4">
              <button 
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-600 px-6 lg:px-8 py-3 lg:py-4 rounded-full text-base lg:text-lg font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25 touch-manipulation"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>🚀</span>
                  <span>Join Beta Access</span>
                </span>
              </button>
              <button 
                onClick={() => setShowDashboard(true)}
                className="w-full sm:w-auto border-2 border-purple-400 px-6 lg:px-8 py-3 lg:py-4 rounded-full text-base lg:text-lg font-semibold hover:bg-purple-400/10 active:bg-purple-400/20 transition-all transform hover:scale-105 active:scale-95 touch-manipulation"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>📊</span>
                  <span className="hidden sm:inline">Beta Dashboard</span>
                  <span className="sm:hidden">Dashboard</span>
                </span>
              </button>
              <button 
                onClick={() => openModal('wizzicoin')}
                className="w-full sm:w-auto border-2 border-cyan-400 px-6 lg:px-8 py-3 lg:py-4 rounded-full text-base lg:text-lg font-semibold hover:bg-cyan-400/10 active:bg-cyan-400/20 transition-all transform hover:scale-105 active:scale-95 touch-manipulation"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>💰</span>
                  <span className="hidden sm:inline">Early Access Coins</span>
                  <span className="sm:hidden">Get Coins</span>
                </span>
              </button>
            </div>

            {/* Platform Statistics - Mobile Responsive */}
            <div className="max-w-5xl mx-auto">
              {/* Mobile: 2x3 grid, Tablet: 3x2 grid, Desktop: 6x1 grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                <div className="text-center bg-black/20 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                  <div className="text-xl lg:text-2xl font-bold text-cyan-400 mb-1">{platformStats.betaUsers}</div>
                  <div className="text-xs lg:text-sm text-gray-400">Beta Users</div>
                </div>
                <div className="text-center bg-black/20 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                  <div className="text-xl lg:text-2xl font-bold text-purple-400 mb-1">{platformStats.waitlistMembers}</div>
                  <div className="text-xs lg:text-sm text-gray-400">Waitlist</div>
                </div>
                <div className="text-center bg-black/20 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-green-500/20 hover:border-green-500/40 transition-colors">
                  <div className="text-xl lg:text-2xl font-bold text-green-400 mb-1">{platformStats.foundingCreators}</div>
                  <div className="text-xs lg:text-sm text-gray-400">Founding Creators</div>
                </div>
                <div className="text-center bg-black/20 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
                  <div className="text-xl lg:text-2xl font-bold text-yellow-400 mb-1">{platformStats.launchDate}</div>
                  <div className="text-xs lg:text-sm text-gray-400">Launch Target</div>
                </div>
                <div className="text-center bg-black/20 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-pink-500/20 hover:border-pink-500/40 transition-colors">
                  <div className="text-xl lg:text-2xl font-bold text-pink-400 mb-1">{platformStats.betaSessionsCompleted}</div>
                  <div className="text-xs lg:text-sm text-gray-400">Beta Sessions</div>
                </div>
                <div className="text-center bg-black/20 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                  <div className="text-xl lg:text-2xl font-bold text-orange-400 mb-1">{platformStats.earlyAccessGames}</div>
                  <div className="text-xs lg:text-sm text-gray-400">Games in Beta</div>
                </div>
              </div>
              
              {/* Beta Status Banner - Mobile Friendly */}
              <div className="mt-6 lg:mt-8 text-center">
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 backdrop-blur-sm rounded-full px-4 lg:px-6 py-2 lg:py-3 border border-purple-500/30">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-medium text-sm lg:text-base">Beta Program Active</span>
                  </div>
                  <div className="w-px h-4 bg-gray-600"></div>
                  <div className="text-gray-300 text-sm lg:text-base">
                    <span className="hidden sm:inline">Next milestone: </span>
                    <span className="text-cyan-400 font-semibold">500 Users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portals Section - News & Blog */}
            <section className="py-20 bg-gradient-to-r from-purple-900/10 to-cyan-900/10">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Spiritual Tech News
                  </h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                    Latest insights on consciousness technology, cosmic events, and the evolving spiritual creator economy
                  </p>
                  
                  {/* Search and Categories */}
                  <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search articles..."
                        value={blogSearchQuery}
                        onChange={(e) => setBlogSearchQuery(e.target.value)}
                        className="bg-black/40 border border-purple-500/30 rounded-full px-6 py-3 text-white text-sm focus:border-cyan-500/50 focus:outline-none w-80"
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        🔍
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {blogCategories.map(category => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedCategory === category
                              ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                              : 'bg-black/40 text-gray-300 hover:bg-purple-900/40 border border-purple-500/30'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Featured Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {filteredArticles.slice(0, 6).map((article) => (
                    <article key={article.id} className="group bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/30 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
                      <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center text-4xl">
                        {article.category === 'Technology' && '🔮'}
                        {article.category === 'Consciousness' && '🧠'}
                        {article.category === 'Creator Economy' && '💫'}
                        {article.category === 'Cosmic Events' && '🌟'}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-purple-400 font-medium">{article.category}</span>
                          <span className="text-xs text-gray-400">{article.readTime}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">{article.excerpt}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-xs">
                              {article.author.avatar}
                            </div>
                            <span className="text-xs text-gray-400">{article.author.name}</span>
                          </div>
                          <button 
                            onClick={() => openArticle(article.id)}
                            className="text-sm text-purple-400 hover:text-cyan-400 transition-colors"
                          >
                            Read more →
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Professional Portals Grid */}
            <section id="section-portals" className="py-20 bg-gradient-to-r from-purple-900/10 to-cyan-900/10">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Sacred Portals
                  </h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Early access to revolutionary spiritual technology platforms
                  </p>
                  <div className="inline-flex items-center bg-purple-900/30 rounded-full px-4 py-2 mt-4">
                    <span className="text-sm text-purple-300 font-medium">🚀 Now in Beta • Join the Movement</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPortals.map((portal) => (
                    <div key={portal.id} className="group bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/30 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
                      <div className={`${portal.gradient} p-8 text-center`}>
                        <div className="text-5xl mb-4">{portal.icon}</div>
                        <h3 className="text-xl font-bold text-white mb-2">{portal.title}</h3>
                        <p className="text-gray-200 text-sm opacity-90">{portal.description}</p>
                      </div>
                      
                      <div className="p-6">
                        {portal.features && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-purple-300 mb-2">Features:</h4>
                            <ul className="space-y-1">
                              {portal.features.map((feature, index) => (
                                <li key={index} className="text-xs text-gray-400 flex items-center">
                                  <span className="text-cyan-400 mr-2">•</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {portal.stats && (
                          <div className="mb-4 grid grid-cols-3 gap-2 text-center">
                            <div>
                              <div className="text-lg font-bold text-white">{portal.stats.users.toLocaleString()}</div>
                              <div className="text-xs text-gray-400">Users</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-green-400">{portal.stats.success}</div>
                              <div className="text-xs text-gray-400">Success</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-yellow-400">{portal.stats.rating}⭐</div>
                              <div className="text-xs text-gray-400">Rating</div>
                            </div>
                          </div>
                        )}
                        
                        <button 
                          onClick={() => openModal(portal.id)}
                          className={`w-full ${portal.borderColor} border-2 py-3 rounded-lg font-semibold transition-all hover:bg-opacity-10 hover:scale-105`}
                        >
                          {portal.action}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

        {/* Academy Section */}
        <section id="section-academy" className="py-20 bg-gradient-to-r from-indigo-900/10 to-purple-900/10">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  🎓 Wizziverse Academy
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Master the spiritual technology arts through our comprehensive learning paths
                </p>
                <div className="inline-flex items-center bg-indigo-900/30 rounded-full px-4 py-2 mt-4">
                  <span className="text-sm text-indigo-300 font-medium">📚 Beta Curriculum • Advanced Learning</span>
                </div>
              </div>

              {/* Learning Paths */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    title: 'Consciousness Coding',
                    description: 'Learn to program with cosmic awareness',
                    icon: '🧠',
                    level: 'Beginner',
                    duration: '6 weeks',
                    modules: 12,
                    gradient: 'bg-gradient-to-br from-indigo-600 to-purple-600'
                  },
                  {
                    title: 'Quantum UI/UX',
                    description: 'Design interfaces that transcend dimensions',
                    icon: '🌀',
                    level: 'Intermediate',
                    duration: '8 weeks',
                    modules: 16,
                    gradient: 'bg-gradient-to-br from-purple-600 to-cyan-600'
                  },
                  {
                    title: 'Sacred Algorithms',
                    description: 'Ancient wisdom meets modern computation',
                    icon: '📐',
                    level: 'Advanced',
                    duration: '12 weeks',
                    modules: 24,
                    gradient: 'bg-gradient-to-br from-cyan-600 to-teal-600'
                  }
                ].map((course, index) => (
                  <div key={index} className="group bg-black/40 backdrop-blur-sm rounded-xl border border-indigo-500/30 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                    <div className={`${course.gradient} p-6 text-center`}>
                      <div className="text-4xl mb-3">{course.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                      <p className="text-gray-200 text-sm">{course.description}</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                        <div>
                          <div className="text-sm font-semibold text-indigo-300">{course.level}</div>
                          <div className="text-xs text-gray-400">Difficulty</div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-purple-300">{course.duration}</div>
                          <div className="text-xs text-gray-400">Duration</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>{course.modules} Modules</span>
                          <span>0/{course.modules} Complete</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{width: '0%'}}></div>
                        </div>
                      </div>
                      
                      <button className="w-full border-2 border-indigo-500 py-3 rounded-lg font-semibold text-indigo-400 hover:bg-indigo-500/10 transition-all hover:scale-105">
                        Begin Journey
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Learning Stats */}
              <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-indigo-500/30 p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-indigo-400 mb-2">1,247</div>
                    <div className="text-gray-400">Active Students</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400 mb-2">89%</div>
                    <div className="text-gray-400">Completion Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-cyan-400 mb-2">4.9</div>
                    <div className="text-gray-400">Average Rating</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">42h</div>
                    <div className="text-gray-400">Avg. Study Time</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* Creators Section */}
        <section id="section-creators" className="py-20 bg-gradient-to-r from-pink-900/10 to-orange-900/10">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                  🎨 Creator Universe
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Empower spiritual content creators with cosmic tools and community
                </p>
                <div className="inline-flex items-center bg-pink-900/30 rounded-full px-4 py-2 mt-4">
                  <span className="text-sm text-pink-300 font-medium">✨ Beta Creator Tools • Revolutionary Platform</span>
                </div>
              </div>

              {/* Creator Tools */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    title: 'Cosmic Content Studio',
                    description: 'AI-powered content creation with spiritual insights',
                    icon: '🎬',
                    features: ['AI Video Generation', 'Cosmic Templates', 'Sacred Sound Library'],
                    gradient: 'bg-gradient-to-br from-pink-600 to-rose-600'
                  },
                  {
                    title: 'Soul Analytics',
                    description: 'Deep insights into your spiritual impact',
                    icon: '📊',
                    features: ['Consciousness Metrics', 'Audience Resonance', 'Growth Predictions'],
                    gradient: 'bg-gradient-to-br from-orange-600 to-pink-600'
                  },
                  {
                    title: 'Sacred Monetization',
                    description: 'Ethical revenue streams aligned with purpose',
                    icon: '💎',
                    features: ['WizziCoin Integration', 'Donation Portals', 'Course Selling'],
                    gradient: 'bg-gradient-to-br from-purple-600 to-orange-600'
                  }
                ].map((tool, index) => (
                  <div key={index} className="group bg-black/40 backdrop-blur-sm rounded-xl border border-pink-500/30 overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
                    <div className={`${tool.gradient} p-6 text-center`}>
                      <div className="text-4xl mb-3">{tool.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
                      <p className="text-gray-200 text-sm">{tool.description}</p>
                    </div>
                    
                    <div className="p-6">
                      <ul className="space-y-2 mb-6">
                        {tool.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-center">
                            <span className="text-pink-400 mr-2">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <button className="w-full border-2 border-pink-500 py-3 rounded-lg font-semibold text-pink-400 hover:bg-pink-500/10 transition-all hover:scale-105">
                        Access Tool
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured Creators */}
              <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-pink-500/30 p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Featured Creators</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: 'Luna Stardust', specialty: 'Cosmic Meditation', followers: '47K', avatar: '🌙' },
                    { name: 'Sage Quantum', specialty: 'Tech Wisdom', followers: '82K', avatar: '⚡' },
                    { name: 'Aurora Divine', specialty: 'Sacred Art', followers: '156K', avatar: '🎨' }
                  ].map((creator, index) => (
                    <div key={index} className="text-center p-4 rounded-lg bg-pink-900/20">
                      <div className="text-3xl mb-2">{creator.avatar}</div>
                      <h4 className="font-semibold text-white">{creator.name}</h4>
                      <p className="text-sm text-gray-400">{creator.specialty}</p>
                      <p className="text-xs text-pink-400 mt-1">{creator.followers} followers</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

        {/* Gaming Section */}
        <section id="section-gaming" className="py-20 bg-gradient-to-r from-green-900/10 to-blue-900/10">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  🎮 Cosmic Gaming
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Transcendent gaming experiences that elevate consciousness
                </p>
                <div className="inline-flex items-center bg-green-900/30 rounded-full px-4 py-2 mt-4">
                  <span className="text-sm text-green-300 font-medium">🚀 Beta Games • Consciousness Expansion</span>
                </div>
              </div>

              {/* Game Library */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {availableGames.map((game) => (
                  <div key={game.id} className="group bg-black/40 backdrop-blur-sm rounded-xl border border-green-500/30 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                    <div className="bg-gradient-to-br from-green-600 to-blue-600 p-6 text-center">
                      <div className="text-4xl mb-3">{game.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                      <p className="text-gray-200 text-sm">{game.description}</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                        <div>
                          <div className="text-sm font-semibold text-green-300">{game.difficulty}</div>
                          <div className="text-xs text-gray-400">Difficulty</div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-blue-300">{game.playTime}</div>
                          <div className="text-xs text-gray-400">Play Time</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>High Score: {game.maxScore.toLocaleString()}</span>
                          <span>Reward: +{game.baseReward} coins</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => startGame(game.id)}
                        className="w-full border-2 border-green-500 py-3 rounded-lg font-semibold text-green-400 hover:bg-green-500/10 transition-all hover:scale-105"
                      >
                        Play Game
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gaming Stats */}
              <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-green-500/30 p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-400 mb-2">12,847</div>
                    <div className="text-gray-400">Active Players</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">2.4M</div>
                    <div className="text-gray-400">Games Played</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400 mb-2">1,247k</div>
                    <div className="text-gray-400">Coins Earned</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">94%</div>
                    <div className="text-gray-400">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* Professional Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-cyan-300">Early Adopter Stories</h2>
              <p className="text-xl text-gray-300">Hear from our founding community members and beta testers</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30 hover:border-cyan-500/50 transition-all group">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-xl mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                  
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    "{testimonial.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Library Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Sacred Video Library
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Immersive spiritual content, cosmic teachings, and transformative sessions from our community of awakened creators
              </p>
              
              {/* Video Search and Categories */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search videos..."
                    value={videoSearchQuery}
                    onChange={(e) => setVideoSearchQuery(e.target.value)}
                    className="bg-black/40 border border-purple-500/30 rounded-full px-6 py-3 text-white text-sm focus:border-cyan-500/50 focus:outline-none w-80"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🎥
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {videoCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedVideoCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedVideoCategory === category
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                          : 'bg-black/40 text-gray-300 hover:bg-purple-900/40 border border-purple-500/30'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredVideos.map((video) => (
                <div 
                  key={video.id}
                  className="group bg-black/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-purple-500/30 hover:border-cyan-500/50 transition-all cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                  onClick={() => openVideo(video.id)}
                >
                  {/* Video Thumbnail */}
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-purple-900/60 to-cyan-900/60 flex items-center justify-center relative overflow-hidden">
                      <div className="text-6xl group-hover:scale-110 transition-transform">
                        {video.thumbnail}
                      </div>
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <div className="w-0 h-0 border-l-4 border-r-0 border-t-3 border-b-3 border-l-white border-t-transparent border-b-transparent ml-1"></div>
                        </div>
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                        {video.duration}
                      </div>
                      
                      {/* Status Badges */}
                      <div className="absolute top-2 left-2 flex space-x-1">
                        {video.isNew && (
                          <span className="bg-green-600/90 text-white px-2 py-1 rounded text-xs font-medium">
                            🔥 New
                          </span>
                        )}
                        {video.isPremium && (
                          <span className="bg-yellow-600/90 text-white px-2 py-1 rounded text-xs font-medium">
                            ⭐ Premium
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors leading-tight line-clamp-2">
                      {video.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-3 group-hover:text-gray-200 transition-colors line-clamp-2">
                      {video.description}
                    </p>
                    
                    {/* Author Info */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-sm">
                        {video.author.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{video.author.name}</p>
                        <p className="text-gray-400 text-xs">{video.author.role}</p>
                      </div>
                    </div>
                    
                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <span>👁️</span>
                          <span>{video.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span>💜</span>
                          <span>{video.likes}</span>
                        </span>
                      </div>
                      <span>{video.publishDate}</span>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex space-x-1 mb-2">
                      {video.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="bg-cyan-900/20 text-cyan-400 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Category */}
                    <div className="text-center">
                      <span className="bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full text-xs">
                        {video.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-br from-purple-900/40 to-cyan-900/40 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30">
                <div className="text-4xl mb-4">🎬</div>
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Create Sacred Content?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Join our community of spiritual creators and share your transformative videos with awakened souls worldwide. Earn through our revolutionary 60/30/10 revenue model.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => openModal('creation')}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    🎥 Upload Sacred Video
                  </button>
                  <button 
                    onClick={() => openModal('academy')}
                    className="border-2 border-purple-400 px-8 py-3 rounded-lg font-semibold hover:bg-purple-400/10 transition-all"
                  >
                    📚 Learn Video Creation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-purple-500/20 bg-black/40">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">W</span>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    WIZZIVERSE
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  Revolutionary spiritual technology platform launching Q2 2024. Join our beta community.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Platform</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>Creators: {platformStats.foundingCreators}</div>
                  <div>Sessions: {platformStats.betaSessionsCompleted}</div>
                  <div>Games: {platformStats.earlyAccessGames}</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>API Documentation</div>
                  <div>Developer Portal</div>
                  <div>Community Guidelines</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Contact</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>support@wizziverse.com</div>
                  <div>Business Partnerships</div>
                  <div>Press & Media</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-purple-500/20 mt-8 pt-8 text-center text-sm text-gray-400">
              © 2024 Wizziverse: The Streets of Starlight. Founded by SOHARI'EL Odimegwu. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      {/* Render Dashboard */}
      {showDashboard && renderDashboard()}

      {/* Render Modal */}
      {renderModal()}

      {/* Render Article Modal */}
      {renderArticleModal()}

      {/* Render Video Modal */}
      {renderVideoModal()}

      {/* Render Task Reward Modal */}
      {renderTaskRewardModal()}

      {/* Render Game Modal */}
      {renderGameModal()}

      {/* Render Game Results */}
      {renderGameResults()}
    </div>
  );
}

export default App;

