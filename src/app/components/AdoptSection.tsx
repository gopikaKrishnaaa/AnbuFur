import { MapPin, CheckCircle, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AnimalDetailsModal } from './AnimalDetailsModal';

export function AdoptSection() {
  const navigate = useNavigate();
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const animals = [
    {
      id: 1,
      name: 'Max',
      type: 'dog',
      image: '/images/adopt-max.png',
      age: '2 years',
      location: 'Tamilnadu',
      vaccinated: true,
    },
    {
      id: 2,
      name: 'Luna',
      type: 'cat',
      image: '/images/adopt-luna.png',
      age: '1 year',
      location: 'Thiruvallur',
      vaccinated: true,
    },
    {
      id: 3,
      name: 'Charlie',
      type: 'dog',
      image: '/images/adopt-charlie.png',
      age: '3 years',
      location: 'Chennai',
      vaccinated: true,
    },
    {
      id: 4,
      name: 'Bella',
      type: 'cat',
      image: '/images/adopt-bella.png',
      age: '6 months',
      location: 'Chengalpattu',
      vaccinated: true,
    },
  ];

  const openAnimalDetails = (animal: any) => {
    setSelectedAnimal(animal);
    setIsModalOpen(true);
  };

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         animal.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' ||
                         (filterType === 'dogs' && (animal as any).type === 'dog') ||
                         (filterType === 'cats' && (animal as any).type === 'cat');//
                         (filterType === 'dogs' && animal.type === 'dog') ||
                         (filterType === 'cats' && animal.type === 'cat');
    return matchesSearch && matchesFilter;
  });

  return (
    <section id="adopt" className="py-20 bg-[#FFF6ED]">
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
            Meet Your New Best Friend
          </h2>
          <p 
            className="text-[#5A4E4A] text-lg mb-8"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            These lovely animals are waiting for their forever homes
          </p>

          {/* Search and Filter */}
          <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5A4E4A]" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-[#FF914D] focus:outline-none focus:ring-2 focus:ring-[#FF914D] bg-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-6 py-3 rounded-full transition-all ${
                  filterType === 'all' 
                    ? 'bg-[#FF914D] text-white' 
                    : 'bg-white text-[#5A4E4A] border-2 border-[#FFE8D6]'
                }`}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('dogs')}
                className={`px-6 py-3 rounded-full transition-all ${
                  filterType === 'dogs' 
                    ? 'bg-[#FF914D] text-white' 
                    : 'bg-white text-[#5A4E4A] border-2 border-[#FFE8D6]'
                }`}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                Dogs
              </button>
              <button
                onClick={() => setFilterType('cats')}
                className={`px-6 py-3 rounded-full transition-all ${
                  filterType === 'cats' 
                    ? 'bg-[#FF914D] text-white' 
                    : 'bg-white text-[#5A4E4A] border-2 border-[#FFE8D6]'
                }`}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                Cats
              </button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredAnimals.map((animal) => (
            <div 
              key={animal.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              <div className="relative h-64">
                <img 
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-full object-cover"
                />
                {animal.vaccinated && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Vaccinated</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 
                  className="text-[#3A2E2A] mb-2" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  {animal.name}
                </h3>
                <div className="space-y-2 mb-4">
                  <p className="text-[#5A4E4A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Age: {animal.age}
                  </p>
                  <div className="flex items-center gap-1 text-[#5A4E4A]">
                    <MapPin className="w-4 h-4" />
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>{animal.location}</span>
                  </div>
                </div>
                <button 
                  onClick={() => openAnimalDetails(animal)}
                  className="w-full px-6 py-3 bg-[#FF914D] text-white rounded-full hover:bg-[#FF7A2E] transition-all" 
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => { navigate('/adopt'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-10 py-4 bg-[#3A2E2A] text-white rounded-full hover:bg-[#2A1E1A] transition-all hover:shadow-lg"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            View All Animals →
          </button>
        </div>
      </div>

      <AnimalDetailsModal animal={selectedAnimal} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}