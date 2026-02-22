import { X, MapPin, CheckCircle, Heart, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { toast } from 'sonner';
import { AdoptionFormModal } from './AdoptionFormModal';

interface Animal {
  id: number;
  name: string;
  image: string;
  age: string;
  location: string;
  vaccinated: boolean;
  gender?: string;
  breed?: string;
  weight?: string;
  description?: string;
  medicalHistory?: string;
}

interface AnimalDetailsModalProps {
  animal: Animal | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AnimalDetailsModal({ animal, isOpen, onClose }: AnimalDetailsModalProps) {
  const [isAdoptFormOpen, setIsAdoptFormOpen] = useState(false);
  if (!animal) return null;

  const handleAdoptionRequest = () => {
    setIsAdoptFormOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Adopt ${animal.name}`,
        text: `Meet ${animal.name}, a lovely ${animal.age} old looking for a forever home!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 hover:bg-white transition-all shadow-lg"
        >
          <X className="w-5 h-5 text-[#3A2E2A]" />
        </button>

        <div className="space-y-6">
          {/* Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <img 
              src={animal.image}
              alt={animal.name}
              className="w-full h-full object-cover"
            />
            {animal.vaccinated && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Vaccinated</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 
                  className="text-[#3A2E2A] mb-2" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}
                >
                  {animal.name}
                </h2>
                <div className="flex items-center gap-2 text-[#5A4E4A]">
                  <MapPin className="w-5 h-5" />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem' }}>{animal.location}</span>
                </div>
              </div>
              <button 
                onClick={handleShare}
                className="p-3 bg-[#FFF6ED] rounded-full hover:bg-[#FFE8D6] transition-all"
              >
                <Share2 className="w-5 h-5 text-[#FF914D]" />
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#FFF6ED] rounded-2xl p-4">
                <p className="text-[#5A4E4A] text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Age</p>
                <p className="text-[#3A2E2A]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.125rem' }}>
                  {animal.age}
                </p>
              </div>
              <div className="bg-[#FFF6ED] rounded-2xl p-4">
                <p className="text-[#5A4E4A] text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Gender</p>
                <p className="text-[#3A2E2A]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.125rem' }}>
                  {animal.gender || 'Male'}
                </p>
              </div>
              <div className="bg-[#FFF6ED] rounded-2xl p-4">
                <p className="text-[#5A4E4A] text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Breed</p>
                <p className="text-[#3A2E2A]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.125rem' }}>
                  {animal.breed || 'Mixed'}
                </p>
              </div>
              <div className="bg-[#FFF6ED] rounded-2xl p-4">
                <p className="text-[#5A4E4A] text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Weight</p>
                <p className="text-[#3A2E2A]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.125rem' }}>
                  {animal.weight || '15 kg'}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 
                className="text-[#3A2E2A] mb-3" 
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.5rem' }}
              >
                About {animal.name}
              </h3>
              <p 
                className="text-[#5A4E4A]"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.7, fontSize: '1rem' }}
              >
                {animal.description || `${animal.name} is a wonderful companion looking for a loving home. Friendly, well-behaved, and loves to play! This sweet soul has been through a lot and deserves a family that will give them all the love and care they need.`}
              </p>
            </div>

            {/* Medical History */}
            <div className="mb-6">
              <h3 
                className="text-[#3A2E2A] mb-3" 
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.5rem' }}
              >
                Medical History
              </h3>
              <p 
                className="text-[#5A4E4A]"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}
              >
                {animal.medicalHistory || 'Fully vaccinated, dewormed, and health checked. No known medical issues. Ready for adoption!'}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAdoptionRequest}
                className="flex-1 px-8 py-4 bg-[#FF914D] text-white rounded-full hover:bg-[#FF7A2E] transition-all hover:shadow-xl flex items-center justify-center gap-2" 
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1.125rem' }}
              >
                <Heart className="w-5 h-5" />
                Request Adoption
              </button>
              <button 
                onClick={onClose}
                className="px-8 py-4 bg-white text-[#3A2E2A] border-2 border-[#3A2E2A] rounded-full hover:bg-[#3A2E2A] hover:text-white transition-all" 
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1.125rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <AdoptionFormModal
      animal={animal}
      isOpen={isAdoptFormOpen}
      onClose={() => setIsAdoptFormOpen(false)}
    />
    </>
  );
}
