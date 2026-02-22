export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-[#FFF6ED] via-[#FFE8D6] to-[#FFF6ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 
              className="text-[#3A2E2A]" 
              style={{ 
                fontFamily: 'Poppins, sans-serif', 
                fontWeight: 800, 
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.2 
              }}
            >
              Every Paw Deserves Love & Care
            </h1>
            <p 
              className="text-[#5A4E4A] text-lg sm:text-xl"
              style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}
            >
              Join us in rescuing and protecting stray animals in your area. Together, we can make a difference in their lives.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('#adopt')}
                className="px-8 py-4 bg-[#FF914D] text-white rounded-full hover:bg-[#FF7A2E] transition-all hover:shadow-xl hover:scale-105" 
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >Adopt Now</button>
              <button 
                onClick={() => scrollToSection('#donate')}
                className="px-8 py-4 bg-white text-[#FF914D] border-2 border-[#FF914D] rounded-full hover:bg-[#FF914D] hover:text-white transition-all hover:shadow-lg" 
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                Donate Now
              </button>
            </div>
          </div>

          {/* Right Image Grid - Before & After */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-[300px]">
                <img 
                  src="/images/hero-before.png"
                  alt="Dog before rescue"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Before
                </div>
              </div>
            </div>
            <div className="space-y-2 mt-12">
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-[300px]">
                <img 
                  src="/images/hero-after.png"
                  alt="Dog after rescue"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  After
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}