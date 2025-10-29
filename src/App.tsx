import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Feature {
  id: number;
  title: string;
  subtitle: string;
  description: string[];
  phoneGradient: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Smart Booking & Dashboard",
    subtitle: "Feature No.1",
    description: [
      "• Real-time availability tracking across locations.",
      "• Intuitive calendar-based booking interface.",
      "• Automated confirmation and reminder system.",
      "• Comprehensive dashboard with analytics."
    ],
    phoneGradient: "from-purple-500 via-pink-500 to-orange-400"
  },
  {
    id: 2,
    title: "AI-Powered App Suite",
    subtitle: "Feature No.2",
    description: [
      "• Smart recommendations based on user behavior.",
      "• Predictive analytics for business insights.",
      "• Natural language processing for queries.",
      "• Machine learning optimization."
    ],
    phoneGradient: "from-blue-500 via-cyan-500 to-teal-400"
  },
  {
    id: 3,
    title: "Insights & Reports",
    subtitle: "Feature No.3",
    description: [
      "• Detailed performance metrics and KPIs.",
      "• Customizable report generation.",
      "• Visual data representation with charts.",
      "• Export options in multiple formats."
    ],
    phoneGradient: "from-green-500 via-emerald-500 to-cyan-400"
  },
  {
    id: 4,
    title: "Payment Records & History",
    subtitle: "Feature No.4",
    description: [
      "• Complete transaction history tracking.",
      "• Secure payment gateway integration.",
      "• Automated receipt generation.",
      "• Financial reconciliation tools."
    ],
    phoneGradient: "from-yellow-500 via-orange-500 to-red-400"
  },
  {
    id: 5,
    title: "Billing & GST-Compliant Invoicing",
    subtitle: "Feature No.5",
    description: [
      "• Instant digital invoice generation for every transaction.",
      "• GST-ready formats with automatic tax calculation.",
      "• Multiple payment modes supported: cash, UPI, card, online link.",
      "• Integrated daily/weekly revenue reporting."
    ],
    phoneGradient: "from-pink-500 via-rose-500 to-orange-400"
  }
];

const App: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!showcaseRef.current || !containerRef.current) return;

      const showcaseRect = showcaseRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Check if showcase section is in view
      if (showcaseRect.top <= 0 && showcaseRect.bottom >= window.innerHeight) {
        // Calculate scroll progress within the showcase section
        const scrolled = Math.abs(showcaseRect.top);
        const maxScroll = showcaseRect.height - window.innerHeight;
        const progress = Math.min(scrolled / (maxScroll / 5), 4.99);
        
        setScrollProgress(progress);
        setActiveFeature(Math.floor(progress));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFeatureClick = (index: number) => {
    setActiveFeature(index);
    setScrollProgress(index);
  };

  const handlePrevious = () => {
    const newIndex = activeFeature > 0 ? activeFeature - 1 : features.length - 1;
    setActiveFeature(newIndex);
    setScrollProgress(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeFeature < features.length - 1 ? activeFeature + 1 : 0;
    setActiveFeature(newIndex);
    setScrollProgress(newIndex);
  };

  return (
    <div ref={containerRef} className="bg-white">
      {/* Section 1 - Empty Top Section */}
      <section className="h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-900">
            MERN STACK INTERNSHIP <span className="font-normal">SAMPLE</span>
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">TASK</h2>
          <p className="text-lg md:text-xl text-gray-600 font-light">Scroll down to explore features</p>
        </div>
      </section>

      {/* Section 2 - Feature Showcase (Sticky) */}
      <section 
        ref={showcaseRef}
        className="min-h-[500vh] relative"
      >
        <div className="sticky top-0 h-screen bg-white overflow-hidden">
          {/* Header */}
          <header className="bg-gray-900 text-white py-4 px-6 md:px-12">
            <h1 className="text-xl md:text-2xl font-light">Troibits Infotech</h1>
          </header>

          {/* Main Content */}
          <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-8 md:py-0">
            
            {/* Left Side - Feature Details */}
            <div className="w-full md:w-5/12 space-y-6 mb-8 md:mb-0">
              <h3 className="text-cyan-500 text-lg md:text-xl font-medium transition-all duration-500">
                {features[activeFeature].subtitle}
              </h3>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 transition-all duration-500">
                {features[activeFeature].title}
              </h2>
              
              <div className="space-y-3 text-gray-600 text-sm md:text-base transition-all duration-500">
                {features[activeFeature].description.map((line, idx) => (
                  <p key={idx} className="leading-relaxed">{line}</p>
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handlePrevious}
                  className="p-2 rounded-full border-2 border-gray-300 hover:border-cyan-500 hover:text-cyan-500 transition-all duration-300"
                  aria-label="Previous feature"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full border-2 border-gray-300 hover:border-cyan-500 hover:text-cyan-500 transition-all duration-300"
                  aria-label="Next feature"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Center - iPhone Mockup */}
            <div className="w-full md:w-4/12 flex items-center justify-center mb-8 md:mb-0">
              <div className="relative">
                {/* iPhone Frame */}
                <div className="relative w-64 h-[520px] md:w-72 md:h-[580px] lg:w-80 lg:h-[640px] bg-black rounded-[3rem] p-2 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-black rounded-b-3xl z-20"></div>
                  
                  {/* Screen */}
                  <div className={`w-full h-full bg-gradient-to-br ${features[activeFeature].phoneGradient} rounded-[2.5rem] overflow-hidden transition-all duration-700 relative text-white`}>
                    {/* Status Bar */}
                    <div className="absolute top-3 left-6 right-6 flex justify-between items-center text-sm font-semibold z-20">
                      <span>9:41</span>
                      <div className="flex gap-1.5 items-center">
                        <div className="flex gap-0.5">
                          <div className="w-0.5 h-2 bg-white rounded-full"></div>
                          <div className="w-0.5 h-2.5 bg-white rounded-full"></div>
                          <div className="w-0.5 h-3 bg-white rounded-full"></div>
                          <div className="w-0.5 h-3.5 bg-white rounded-full"></div>
                        </div>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                      </div>
                    </div>

                    {/* ----- CENTER TIME BLOCK REMOVED ----- */}

                    {/* Feature List Overlay */}
                    <div className="absolute inset-0 flex items-center justify-end pr-6 md:pr-8">
                      <div className="text-right space-y-2.5">
                        {features.map((feature, index) => (
                          <div
                            key={feature.id}
                            className={`text-xs md:text-sm transition-all duration-300 ${
                              activeFeature === index
                                ? 'font-bold text-cyan-300 opacity-100 scale-110 translate-x-0'
                                : 'font-light opacity-40'
                            }`}
                          >
                            {feature.title}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-16 z-10">
                      <button className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/15 backdrop-blur-xl flex items-center justify-center border border-white/20">
                        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                        </svg>
                      </button>
                      <button className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/15 backdrop-blur-xl flex items-center justify-center border border-white/20">
                        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                        </svg>
                      </button>
                    </div>

                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/80 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Feature List */}
            <div className="w-full md:w-3/12">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Feature Showcase</h3>
              <div className="space-y-1">
                {features.map((feature, index) => (
                  <button
                    key={feature.id}
                    onClick={() => handleFeatureClick(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeFeature === index
                        ? 'bg-cyan-500 text-white border-l-4 border-cyan-600 shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100 border-l-4 border-transparent'
                    }`}
                  >
                    <span className="text-sm md:text-base">{feature.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Empty Bottom Section */}
      <section className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Task Complete</h2>
          <p className="text-xl md:text-2xl opacity-80 mb-8">
            Created with React + TypeScript + Tailwind CSS
          </p>
          <p className="text-lg opacity-70">
            <a href="http://www.troibits.com" className="underline hover:text-cyan-400 transition-colors">
              www.troibits.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;