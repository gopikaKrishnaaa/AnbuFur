import { Search, Star, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function PetCareSection() {
  const [searchLocation, setSearchLocation] = useState('');

  const clinics = [
    {
      id: 1,
      name: 'Care Paws Veterinary Clinic',
      rating: 4.8,
      reviews: 234,
      address: 'Anna Nagar, Chennai',
      phone: '+91 98765 43210',
      image: '/images/clinic-1.png',

    },
    {
      id: 2,
      name: 'Happy Tails Pet Hospital',
      rating: 4.9,
      reviews: 456,
      address: 'T. Nagar, Chennai',
      phone: '+91 98765 43211',
      image: '/images/clinic-2.png',
    },
    {
      id: 3,
      name: 'Pet Care Plus',
      rating: 4.7,
      reviews: 189,
      address: 'Adyar, Chennai',
      phone: '+91 98765 43212',
      image: '/images/clinic-3.png',
    },
  ];

  const handleCallClinic = (clinicName: string, phone: string) => {
    toast.success(`Calling ${clinicName}... ${phone}`);
  };

  const handleSearch = () => {
    if (!searchLocation.trim()) {
      toast.error('Please enter a location to search');
      return;
    }
    toast.success(`Searching for clinics near ${searchLocation}...`);
  };

  return (
    <section id="pet-care" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            className="text-[#3A2E2A] mb-4" 
            style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontWeight: 700, 
              fontSize: 'clamp(2rem, 4vw, 3rem)' 
            }}
          >
            Pet Care Near You
          </h2>
          <p 
            className="text-[#5A4E4A] text-lg mb-8"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Find trusted veterinary clinics in your area
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5A4E4A]" />
                <input 
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Enter your location to find nearby clinics..."
                  className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-[#FF914D] focus:outline-none focus:ring-2 focus:ring-[#FF914D] bg-[#FFF6ED]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button 
                onClick={handleSearch}
                className="px-8 py-4 bg-[#FF914D] text-white rounded-full hover:bg-[#FF7A2E] transition-all"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {clinics.map((clinic) => (
            <div 
              key={clinic.id}
              className="bg-white border-2 border-[#FFF6ED] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-[#FF914D] transition-all hover:scale-105 cursor-pointer"
            >
              <div className="h-48">
                <img 
                  src={clinic.image}
                  alt={clinic.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 
                  className="text-[#3A2E2A] mb-2" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.25rem' }}
                >
                  {clinic.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 text-[#FF914D]">
                    <Star className="w-4 h-4 fill-current" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{clinic.rating}</span>
                  </div>
                  <span className="text-[#5A4E4A] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    ({clinic.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#5A4E4A] mb-4">
                  <MapPin className="w-4 h-4" />
                  <span style={{ fontFamily: 'Inter, sans-serif' }}>{clinic.address}</span>
                </div>
                <button 
                  onClick={() => handleCallClinic(clinic.name, clinic.phone)}
                  className="w-full px-6 py-3 bg-[#FF914D] text-white rounded-full hover:bg-[#FF7A2E] transition-all flex items-center justify-center gap-2" 
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}