import React, { useState, useEffect } from 'react';
import { Heart, Star, Gift, Music, PartyPopper, Cake, Sparkles, Crown } from 'lucide-react';

const App = () => {
  const [cakeSlices, setCakeSlices] = useState(0);
  const [balloons, setBalloons] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [showFireworks, setShowFireworks] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [currentWish, setCurrentWish] = useState('');
  const [showSurprise, setShowSurprise] = useState(false);
  const [partyMode, setPartyMode] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);

  // Confetti particles
  useEffect(() => {
    if (confetti.length > 0) {
      const timer = setTimeout(() => {
        setConfetti(confetti.filter((_, i) => i < confetti.length - 10));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [confetti]);

  // Auto-generate balloons
  useEffect(() => {
    const interval = setInterval(() => {
      if (balloons.length < 15) {
        setBalloons(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 100,
          color: ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400'][Math.floor(Math.random() * 6)],
          delay: Math.random() * 2
        }]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [balloons.length]);

  const handleCakeCut = () => {
    setCakeSlices(prev => prev + 1);
    // Create confetti explosion
    const newConfetti = [];
    for (let i = 0; i < 30; i++) {
      newConfetti.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['text-yellow-400', 'text-red-400', 'text-blue-400', 'text-green-400', 'text-purple-400'][Math.floor(Math.random() * 5)]
      });
    }
    setConfetti(prev => [...prev, ...newConfetti]);
    
    if (cakeSlices === 2) {
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 3000);
    }
  };

  const popBalloon = (id) => {
    setBalloons(prev => prev.filter(balloon => balloon.id !== id));
    // Add mini confetti
    const miniConfetti = [];
    for (let i = 0; i < 5; i++) {
      miniConfetti.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: 'text-pink-400'
      });
    }
    setConfetti(prev => [...prev, ...miniConfetti]);
  };

  const addWish = () => {
    if (currentWish.trim()) {
      setWishes(prev => [...prev, currentWish]);
      setCurrentWish('');
    }
  };

  const togglePartyMode = () => {
    setPartyMode(!partyMode);
    setMusicPlaying(!musicPlaying);
  };

  const triggerSurprise = () => {
    setShowSurprise(true);
    // Massive confetti explosion
    const surpriseConfetti = [];
    for (let i = 0; i < 100; i++) {
      surpriseConfetti.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['text-yellow-400', 'text-red-400', 'text-blue-400', 'text-green-400', 'text-purple-400', 'text-pink-400'][Math.floor(Math.random() * 6)]
      });
    }
    setConfetti(prev => [...prev, ...surpriseConfetti]);
    setTimeout(() => setShowSurprise(false), 5000);
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${partyMode ? 'bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 animate-pulse' : 'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600'} relative overflow-hidden`}>
      
      {/* Confetti */}
      {confetti.map(piece => (
        <div
          key={piece.id}
          className={`absolute w-2 h-2 ${piece.color} animate-bounce pointer-events-none z-30`}
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            animationDuration: '2s',
            animationDelay: `${Math.random()}s`
          }}
        >
          ✨
        </div>
      ))}

      {/* Floating Balloons */}
      {balloons.map(balloon => (
        <div
          key={balloon.id}
          className={`absolute w-12 h-16 ${balloon.color} rounded-full cursor-pointer transform hover:scale-110 transition-transform animate-bounce z-20`}
          style={{
            left: `${balloon.x}%`,
            top: '10%',
            animationDuration: '3s',
            animationDelay: `${balloon.delay}s`
          }}
          onClick={() => popBalloon(balloon.id)}
        >
          <div className="w-full h-full rounded-full shadow-lg relative">
            <div className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-gray-800 transform -translate-x-1/2"></div>
          </div>
        </div>
      ))}

      {/* Fireworks */}
      {showFireworks && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping z-40"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 2) * 20}%`
              }}
            >
              <Star className="w-8 h-8 text-yellow-300" />
            </div>
          ))}
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Crown className="w-12 h-12 text-yellow-300 animate-bounce" />
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-pulse">
              Happy Birthday!
            </h1>
            <Crown className="w-12 h-12 text-yellow-300 animate-bounce" />
          </div>
          <p className="text-2xl text-white mb-8 animate-bounce">
            🎉 It's time to celebrate! 🎉
          </p>
        </div>

        {/* Interactive Cake Section */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div 
                className="cursor-pointer transform hover:scale-110 transition-transform duration-300"
                onClick={handleCakeCut}
              >
                <div className="relative inline-block">
                  <div className="text-8xl animate-bounce">🎂</div>
                  {cakeSlices > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold animate-pulse">
                      {cakeSlices}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-white text-xl mt-4 font-semibold">
                Click the cake to cut it! 🍰
              </p>
              {cakeSlices > 0 && (
                <p className="text-yellow-300 text-lg mt-2 animate-pulse">
                  Slices cut: {cakeSlices} 🍰✨
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Party Mode Toggle */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
            <button
              onClick={togglePartyMode}
              className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
                partyMode 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg animate-pulse' 
                : 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-lg'
              }`}
            >
              {partyMode ? (
                <>
                  <Music className="inline w-6 h-6 mr-2" />
                  Party Mode ON! 🔥
                </>
              ) : (
                <>
                  <PartyPopper className="inline w-6 h-6 mr-2" />
                  Start Party Mode
                </>
              )}
            </button>
          </div>

          {/* Gift Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
            <button
              onClick={() => setGiftOpened(!giftOpened)}
              className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg hover:shadow-lg transition-all duration-300"
            >
              <Gift className="inline w-6 h-6 mr-2" />
              {giftOpened ? 'Close Gift 📦' : 'Open Gift! 🎁'}
            </button>
            {giftOpened && (
              <div className="mt-4 p-4 bg-yellow-400 rounded-lg animate-bounce">
                <p className="text-purple-800 font-bold">🎉 May All your dreams come true .Have a great year ahead with your family</p>
              </div>
            )}
          </div>

          {/* Big Surprise Button */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
            <button
              onClick={triggerSurprise}
              className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold text-lg hover:shadow-lg transition-all duration-300 animate-pulse"
            >
              <Sparkles className="inline w-6 h-6 mr-2" />
              BIG SURPRISE! ✨
            </button>
          </div>
        </div>

        {/* Birthday Wishes Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-12 transform hover:scale-105 transition-all duration-300">
          <h2 className="text-3xl font-bold text-center text-white mb-6 flex items-center justify-center gap-2">
            <Heart className="w-8 h-8 text-red-400" />
            Birthday Wishes
            <Heart className="w-8 h-8 text-red-400" />
          </h2>
          
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={currentWish}
              onChange={(e) => setCurrentWish(e.target.value)}
              placeholder="Write a birthday wish..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:border-pink-400 focus:outline-none"
              onKeyPress={(e) => e.key === 'Enter' && addWish()}
            />
            <button
              onClick={addWish}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-bold hover:shadow-lg transition-all duration-300"
            >
              Add Wish ✨
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishes.map((wish, index) => (
              <div key={index} className="bg-white/20 rounded-lg p-4 animate-fade-in">
                <p className="text-white font-medium">💝 {wish}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Surprise Modal */}
        {showSurprise && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-gradient-to-br from-yellow-400 to-pink-500 rounded-3xl p-12 text-center max-w-md mx-4 animate-bounce">
              <div className="text-6xl mb-4">🎊</div>
              <h3 className="text-3xl font-bold text-white mb-4">SURPRISE!</h3>
              <p className="text-xl text-white mb-6">You are absolutely amazing! 🌟</p>
              <div className="text-4xl animate-spin">🎂</div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center">
          <p className="text-white/80 text-lg mb-4">
            Click balloons to pop them! 🎈 | Cut the cake for surprises! 🎂
          </p>
          <div className="flex justify-center gap-4 text-4xl animate-bounce">
            🎉 🎊 🎁 🎂 🎈 🎵 ✨
          </div>
          <p className="text-white/60 mt-6 text-lg">
            Hope your special day is filled with happiness, laughter, and love! 💕
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;