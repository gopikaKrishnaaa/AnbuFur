import { Home, Utensils, Heart } from 'lucide-react';

export function AboutSection() {
  const features = [
    {
      icon: Home,
      title: 'Shelter Support',
      description: 'Safe and comfortable shelters for rescued animals until they find their forever homes.',
    },
    {
      icon: Utensils,
      title: 'Feeding Programs',
      description: 'Regular nutritious meals for stray animals in communities across the region.',
    },
    {
      icon: Heart,
      title: 'Medical Care',
      description: 'Complete veterinary care, vaccinations, and treatments for all rescued animals.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-[#3A2E2A] mb-4" 
            style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontWeight: 700, 
              fontSize: 'clamp(2rem, 4vw, 3rem)' 
            }}
          >
            Our Mission
          </h2>
          <p 
            className="text-[#5A4E4A] max-w-2xl mx-auto text-lg"
            style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}
          >
            We are dedicated to rescuing, rehabilitating, and rehoming stray and abandoned animals. 
            Every animal deserves a second chance at life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-[#FFF6ED] rounded-2xl p-8 text-center hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
              >
                <div className="w-16 h-16 bg-[#FF914D] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 
                  className="text-[#3A2E2A] mb-4" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-[#5A4E4A]"
                  style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}