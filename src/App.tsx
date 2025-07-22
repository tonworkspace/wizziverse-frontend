import { useState, useEffect } from 'react';

interface Feature {
  id: string;
  title: string;
  icon: string;
  description: string;
  status: 'coming-soon' | 'beta' | 'pre-launch';
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

interface LaunchStats {
  waitlistMembers: string;
  betaUsers: string;
  foundingCreators: string;
  launchDate: string;
}

function App() {
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fullText = "WIZZIVERSE: The Future of Spiritual Technology";

  const launchStats: LaunchStats = {
    waitlistMembers: "2,847",
    betaUsers: "342", 
    foundingCreators: "28",
    launchDate: "Q2 2024"
  };

  const features: Feature[] = [
    {
      id: 'creators',
      title: 'Creator Economy',
      icon: '🎨',
      description: 'Monetize your spiritual gifts with our 60/30/10 revenue model and AI-powered creation tools.',
      status: 'beta'
    },
    {
      id: 'healing',
      title: 'Healing Network',
      icon: '🔮',
      description: 'Connect with verified spiritual healers and energy workers worldwide.',
      status: 'beta'
    },
    {
      id: 'academy',
      title: 'Skill Academy',
      icon: '🧠',
      description: 'Master sacred arts, spiritual entrepreneurship, and consciousness expansion.',
      status: 'coming-soon'
    },
    {
      id: 'gaming',
      title: 'Sacred Gaming',
      icon: '🎮',
      description: 'Gamified spiritual growth with blockchain rewards and NFT achievements.',
      status: 'beta'
    },
    {
      id: 'wizzicoin',
      title: 'WizziCoin DeFi',
      icon: '🪙',
      description: 'Decentralized finance platform for the spiritual economy with staking rewards.',
      status: 'pre-launch'
    },
    {
      id: 'community',
      title: 'Sacred Community',
      icon: '🌟',
      description: 'Join a global network of conscious creators, healers, and spiritual entrepreneurs.',
      status: 'beta'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Luna Starweaver",
      role: "Energy Healer & Beta Tester",
      content: "Wizziverse is revolutionizing how we share and monetize spiritual gifts. The platform's vision for sacred technology is exactly what our community needs.",
      rating: 5,
      avatar: "🔮"
    },
    {
      name: "Marcus Voidwalker", 
      role: "Digital Artist & Founding Creator",
      content: "The 60/30/10 revenue model and AI creation tools have transformed my spiritual art business. This is the future of conscious commerce.",
      rating: 5,
      avatar: "🎨"
    },
    {
      name: "Aria Cosmicflow",
      role: "Spiritual Entrepreneur",
      content: "From healing sessions to sacred gaming, Wizziverse brings everything together in one powerful ecosystem. I'm excited to be part of this movement.",
      rating: 5,
      avatar: "🎮"
    }
  ];

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

  // Mouse tracking for interactive background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEarlyAccessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    setTimeout(() => {
      setShowEarlyAccess(false);
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'beta':
        return 'bg-green-900/40 text-green-300 border border-green-500/30';
      case 'pre-launch':
        return 'bg-yellow-900/40 text-yellow-300 border border-yellow-500/30';
      case 'coming-soon':
        return 'bg-purple-900/40 text-purple-300 border border-purple-500/30';
      default:
        return 'bg-gray-900/40 text-gray-300 border border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'beta': return 'Beta Access';
      case 'pre-launch': return 'Pre-Launch';
      case 'coming-soon': return 'Coming Soon';
      default: return 'Available';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black"></div>
        
        {/* Dynamic gradient following mouse */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(6, 182, 212, 0.2) 60%, transparent 100%)`,
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transform: 'translate(0, 0)'
          }}
        />
        
        {/* Floating elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <div className="w-2 h-2 bg-purple-500/30 rounded-full blur-sm"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-20 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            WIZZIVERSE
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => setShowEarlyAccess(true)}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {typedText}
              </span>
              {isTyping && <span className="animate-pulse">|</span>}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Where ancient wisdom meets cutting-edge technology. Join the revolution of conscious creators, 
              spiritual entrepreneurs, and sacred commerce.
            </p>
          </div>

          {/* Launch Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{launchStats.waitlistMembers}</div>
              <div className="text-sm text-gray-400">Waitlist Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{launchStats.betaUsers}</div>
              <div className="text-sm text-gray-400">Beta Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{launchStats.foundingCreators}</div>
              <div className="text-sm text-gray-400">Founding Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{launchStats.launchDate}</div>
              <div className="text-sm text-gray-400">Launch Date</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setShowEarlyAccess(true)}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform shadow-lg shadow-purple-500/25"
            >
              🚀 Get Early Access
            </button>
            <a 
              href="https://whatsapp.com/channel/wizziverse" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-purple-500/50 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-900/20 transition-colors"
            >
              💬 Join Community
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Platform Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the tools that will transform how you share, learn, and monetize your spiritual gifts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:scale-105 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(feature.status)}`}>
                    {getStatusText(feature.status)}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-300 text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                What Our Community Says
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 backdrop-blur-lg rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Ready to Join the Revolution?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Be among the first to experience the future of spiritual technology. 
              Early adopters get exclusive access, founder benefits, and lifetime perks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowEarlyAccess(true)}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform shadow-lg shadow-purple-500/25"
              >
                🚀 Join Waitlist - Free
              </button>
              <a 
                href="mailto:hello@wizziverse.com"
                className="border border-purple-500/50 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-900/20 transition-colors"
              >
                💼 Partnership Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-purple-500/20">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            WIZZIVERSE
          </div>
          <p className="text-gray-400 mb-6">
            Transforming consciousness through sacred technology
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms</a>
            <a href="mailto:hello@wizziverse.com" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Early Access Modal */}
      {showEarlyAccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setShowEarlyAccess(false)}></div>
          <div className="relative bg-gradient-to-br from-purple-900/95 to-cyan-900/95 backdrop-blur-2xl rounded-2xl p-8 max-w-lg w-full border border-purple-500/30 shadow-2xl">
            <button 
              onClick={() => setShowEarlyAccess(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
            >
              ✕
            </button>
            
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-3xl font-bold text-white mb-4">Get Early Access</h2>
              <p className="text-gray-300">
                Join thousands of spiritual entrepreneurs and creators on the waitlist. 
                Get exclusive updates and beta access when we launch.
              </p>
            </div>

            {submitted ? (
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">✨</div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Welcome to the Revolution!</h3>
                <p className="text-gray-300">Check your email for exclusive early access details.</p>
              </div>
            ) : (
              <form onSubmit={handleEarlyAccessSubmit} className="space-y-6">
                <div>
                  <label className="block text-cyan-300 mb-2 font-medium">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div className="bg-purple-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-2">Early Access Benefits:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Beta platform access</li>
                    <li>• Founding creator privileges</li>
                    <li>• Exclusive community access</li>
                    <li>• Early WizziCoin bonuses</li>
                  </ul>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 py-4 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Joining Revolution...' : 'Join Waitlist - Free 🚀'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

