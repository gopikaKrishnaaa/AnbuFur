import { MapPin, CheckCircle, Search, Heart, Filter, SlidersHorizontal, Dog, Cat } from 'lucide-react';
import { useState } from 'react';
import { AnimalDetailsModal } from '../components/AnimalDetailsModal';
import { DonationCTA } from '../components/DonationCTA';

const animals = [
  { id: 1, name: 'Max', type: 'dog', breed: 'Indie Mix', age: '2 years', gender: 'Male', weight: '18 kg', location: 'Anna Nagar, Chennai', vaccinated: true, neutered: true, image: '/images/adopt-max.png', description: 'Max is a playful and affectionate indie mix who loves outdoor walks and cuddles. He gets along well with kids and other dogs.', medicalHistory: 'Fully vaccinated, dewormed, neutered. No health issues.', energy: 'High', size: 'Medium' },
  { id: 2, name: 'Luna', type: 'cat', breed: 'Orange Tabby', age: '1 year', gender: 'Female', weight: '4 kg', location: 'T. Nagar, Chennai', vaccinated: true, neutered: true, image: '/images/adopt-luna.png', description: 'Luna is a gentle and curious tabby who loves sunny spots and playing with toys. Perfect for apartment living.', medicalHistory: 'Fully vaccinated, spayed, dewormed. Perfectly healthy.', energy: 'Medium', size: 'Small' },
  { id: 3, name: 'Charlie', type: 'dog', breed: 'Golden Mix', age: '3 years', gender: 'Male', weight: '22 kg', location: 'Adyar, Chennai', vaccinated: true, neutered: false, image: '/images/adopt-charlie.png', description: 'Charlie is a friendly and obedient golden mix who loves fetch and swimming. Trained and well-behaved.', medicalHistory: 'Vaccinated, dewormed. Neutering recommended before adoption.', energy: 'High', size: 'Large' },
  { id: 4, name: 'Bella', type: 'cat', breed: 'Black & White', age: '6 months', gender: 'Female', weight: '2.5 kg', location: 'Velachery, Chennai', vaccinated: true, neutered: false, image: '/images/adopt-bella.png', description: 'Bella is a kitten full of energy and mischief. She loves climbing and chasing toys. Grows on you fast!', medicalHistory: 'Vaccinated, dewormed. Due for spaying at 6 months.', energy: 'High', size: 'Small' },
  { id: 5, name: 'Bruno', type: 'dog', breed: 'Labrador Mix', age: '4 years', gender: 'Male', weight: '28 kg', location: 'Porur, Chennai', vaccinated: true, neutered: true, image: '/images/adopt-bruno.png', description: 'Bruno is a calm and loyal lab mix who loves family time. Great with children and seniors alike.', medicalHistory: 'Fully vaccinated, neutered, healthy checkup done.', energy: 'Low', size: 'Large' },
  { id: 6, name: 'Mia', type: 'cat', breed: 'Persian Mix', age: '2 years', gender: 'Female', weight: '3.5 kg', location: 'Chromepet, Chennai', vaccinated: true, neutered: true, image: '/images/adopt-mia.png', description: 'Mia is a regal and affectionate persian mix who loves being groomed and sitting on laps.', medicalHistory: 'Vaccinated, spayed, no health issues. Regular grooming needed.', energy: 'Low', size: 'Small' },
  { id: 7, name: 'Rocky', type: 'dog', breed: 'Indie', age: '1 year', gender: 'Male', weight: '14 kg', location: 'Tambaram, Chennai', vaccinated: true, neutered: false, image: '/images/adopt-rocky.png', description: 'Rocky is a young energetic indie who is learning commands fast. Loves treats and belly rubs.', medicalHistory: 'Vaccinated, dewormed. Neutering scheduled.', energy: 'High', size: 'Medium' },
  { id: 8, name: 'Coco', type: 'cat', breed: 'Siamese Mix', age: '3 years', gender: 'Female', weight: '4 kg', location: 'Sholinganallur, Chennai', vaccinated: true, neutered: true, image: '/images/adopt-coco.png', description: 'Coco is a vocal and loving siamese mix who loves following her humans around. Very social.', medicalHistory: 'Fully vaccinated, spayed, dental cleaned. Perfectly healthy.', energy: 'Medium', size: 'Small' },
];

const energyColors: Record<string, string> = {
  High: '#FF914D',
  Medium: '#F59E0B',
  Low: '#22C55E',
};

const sizeColors: Record<string, string> = {
  Small: '#8B5CF6',
  Medium: '#2563EB',
  Large: '#DC2626',
};

export function AdoptPage() {
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [filterSize, setFilterSize] = useState('all');
  const [filterEnergy, setFilterEnergy] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredAnimals = animals.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType   = filterType === 'all' || a.type === filterType;
    const matchGender = filterGender === 'all' || a.gender.toLowerCase() === filterGender;
    const matchSize   = filterSize === 'all' || a.size.toLowerCase() === filterSize;
    const matchEnergy = filterEnergy === 'all' || a.energy.toLowerCase() === filterEnergy;
    return matchSearch && matchType && matchGender && matchSize && matchEnergy;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setFilterType('all');
    setFilterGender('all');
    setFilterSize('all');
    setFilterEnergy('all');
  };

  const activeFiltersCount = [filterType, filterGender, filterSize, filterEnergy]
    .filter(f => f !== 'all').length + (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FF914D 0%, #FF6B2B 100%)',
        paddingTop: '120px',
        paddingBottom: '60px',
        textAlign: 'center',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Find Your Forever Friend
        </p>
        <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', margin: '0 0 16px' }}>
          Adopt a Pet in Chennai
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Search + Filter Bar */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-[#FFE8D6]">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A4E4A]" />
              <input
                type="text"
                placeholder="Search by name, breed or location..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-[#FFE8D6] focus:border-[#FF914D] focus:outline-none"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Type Filter */}
            <div className="flex gap-2">
              {[
                { label: 'All', value: 'all' },
                { label: '🐕 Dogs', value: 'dog' },
                { label: '🐈 Cats', value: 'cat' },
              ].map(f => (
                <button
                  key={f.value}
                  onClick={() => setFilterType(f.value)}
                  className={`px-5 py-3 rounded-full transition-all font-semibold text-sm ${
                    filterType === f.value ? 'bg-[#FF914D] text-white shadow-md' : 'bg-[#FFF6ED] text-[#5A4E4A] hover:bg-[#FFE8D6]'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Advanced Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border-2 transition-all font-semibold text-sm ${
                showFilters ? 'border-[#FF914D] bg-[#FFF6ED] text-[#FF914D]' : 'border-[#FFE8D6] text-[#5A4E4A]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters {activeFiltersCount > 0 && <span className="bg-[#FF914D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{activeFiltersCount}</span>}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="pt-4 border-t border-[#FFE8D6] grid sm:grid-cols-3 gap-4">
              {/* Gender */}
              <div>
                <p className="text-[#3A2E2A] text-sm font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Gender</p>
                <div className="flex gap-2">
                  {['all', 'male', 'female'].map(g => (
                    <button key={g} onClick={() => setFilterGender(g)}
                      className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${filterGender === g ? 'bg-[#FF914D] text-white' : 'bg-[#FFF6ED] text-[#5A4E4A]'}`}
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                      {g === 'all' ? 'Any' : g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="text-[#3A2E2A] text-sm font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Size</p>
                <div className="flex gap-2">
                  {['all', 'small', 'medium', 'large'].map(s => (
                    <button key={s} onClick={() => setFilterSize(s)}
                      className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${filterSize === s ? 'bg-[#FF914D] text-white' : 'bg-[#FFF6ED] text-[#5A4E4A]'}`}
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                      {s === 'all' ? 'Any' : s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Energy */}
              <div>
                <p className="text-[#3A2E2A] text-sm font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Energy Level</p>
                <div className="flex gap-2">
                  {['all', 'low', 'medium', 'high'].map(e => (
                    <button key={e} onClick={() => setFilterEnergy(e)}
                      className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${filterEnergy === e ? 'bg-[#FF914D] text-white' : 'bg-[#FFF6ED] text-[#5A4E4A]'}`}
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                      {e === 'all' ? 'Any' : e}
                    </button>
                  ))}
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <div className="sm:col-span-3 flex justify-end">
                  <button onClick={clearFilters} className="text-sm text-[#FF914D] font-semibold underline" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-[#5A4E4A] mb-6 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          Showing <strong className="text-[#FF914D]">{filteredAnimals.length}</strong> animals available for adoption
        </p>

        {/* Animal Grid */}
        {filteredAnimals.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🐾</div>
            <p className="text-[#3A2E2A] text-xl font-semibold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>No animals found</p>
            <p className="text-[#5A4E4A]" style={{ fontFamily: 'Inter, sans-serif' }}>Try adjusting your filters</p>
            <button onClick={clearFilters} className="mt-4 px-6 py-3 bg-[#FF914D] text-white rounded-full font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredAnimals.map(animal => (
              <div
                key={animal.id}
                onClick={() => { setSelectedAnimal(animal); setIsModalOpen(true); }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer border border-[#FFE8D6]"
              >
                {/* Image */}
                <div className="relative h-56">
                  <img src={animal.image} alt={animal.name} className="w-full h-full object-cover" />

                  {/* Wishlist */}
                  <button
                    onClick={e => toggleWishlist(animal.id, e)}
                    className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow transition-all hover:scale-110"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(animal.id) ? 'text-red-500 fill-red-500' : 'text-[#5A4E4A]'}`} />
                  </button>

                  {/* Vaccinated */}
                  {animal.vaccinated && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                      <CheckCircle className="w-3 h-3" />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Vaccinated</span>
                    </div>
                  )}

                  {/* Type badge */}
                  <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded-full text-xs font-semibold text-[#3A2E2A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {animal.type === 'dog' ? '🐕 Dog' : '🐈 Cat'}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-[#3A2E2A]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}>
                      {animal.name}
                    </h3>
                    <span className="text-[#5A4E4A] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{animal.gender}</span>
                  </div>

                  <p className="text-[#5A4E4A] text-sm mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>{animal.breed} · {animal.age}</p>

                  <div className="flex items-center gap-1 text-[#5A4E4A] text-sm mb-4">
                    <MapPin className="w-3 h-3" />
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>{animal.location}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2 mb-4">
                    <span className="px-2 py-1 rounded-full text-white text-xs font-semibold" style={{ backgroundColor: energyColors[animal.energy], fontFamily: 'Inter, sans-serif' }}>
                      {animal.energy} Energy
                    </span>
                    <span className="px-2 py-1 rounded-full text-white text-xs font-semibold" style={{ backgroundColor: sizeColors[animal.size], fontFamily: 'Inter, sans-serif' }}>
                      {animal.size}
                    </span>
                  </div>

                  <button
                    className="w-full py-3 bg-[#FF914D] text-white rounded-full hover:bg-[#FF7A2E] transition-all font-semibold text-sm"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Adoption Process Steps */}
      <div className="bg-[#FFF6ED] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[#3A2E2A] mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
            How Adoption Works
          </h2>
          <p className="text-[#5A4E4A] mb-12" style={{ fontFamily: 'Inter, sans-serif' }}>Simple, transparent, and built around the animal's wellbeing</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', icon: '🔍', title: 'Browse & Choose', desc: 'Explore available animals and find one that matches your lifestyle and home.' },
              { step: '02', icon: '📝', title: 'Apply Online', desc: 'Fill our 3-step adoption form. Takes less than 4 minutes. No paperwork hassle.' },
              { step: '03', icon: '🏠', title: 'Home Visit', desc: "Our team visits your home to ensure it's safe and suitable for your new pet." },
              { step: '04', icon: '🐾', title: 'Welcome Home', desc: 'Bring your new companion home! We provide a starter kit and 30-day support.' },
            ].map(s => (
              <div key={s.step} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-[#FF914D] text-sm font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>STEP {s.step}</div>
                <h3 className="text-[#3A2E2A] mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.1rem' }}>{s.title}</h3>
                <p className="text-[#5A4E4A] text-sm" style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DonationCTA />

      <AnimalDetailsModal animal={selectedAnimal} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}