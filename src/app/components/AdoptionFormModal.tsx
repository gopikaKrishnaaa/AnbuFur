import { useState } from 'react';
import { X, Heart, ChevronRight, ChevronLeft, User, Home, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { submitAdoptionApplication } from '../../lib/db';
import { toast } from 'sonner';

interface Animal {
  id: number;
  name: string;
  image: string;
  age: string;
  location: string;
  vaccinated: boolean;
  gender?: string;
  breed?: string;
}

interface AdoptionFormModalProps {
  animal: Animal | null;
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  // Step 1 - Personal Info
  fullName: string;
  email: string;
  phone: string;
  city: string;
  // Step 2 - Living Situation
  homeType: string;
  hasYard: string;
  hasOtherPets: string;
  otherPetsDetails: string;
  petExperience: string;
  // Step 3 - Motivation
  whyAdopt: string;
  agreeHomeVisit: boolean;
  agreeResponsibility: boolean;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  homeType: '',
  hasYard: '',
  hasOtherPets: '',
  otherPetsDetails: '',
  petExperience: '',
  whyAdopt: '',
  agreeHomeVisit: false,
  agreeResponsibility: false,
};

const steps = [
  { id: 1, label: 'Personal Info', icon: User },
  { id: 2, label: 'Your Home', icon: Home },
  { id: 3, label: 'Your Story', icon: MessageSquare },
];

export function AdoptionFormModal({ animal, isOpen, onClose }: AdoptionFormModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  if (!animal) return null;

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
      if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid phone number is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
    }

    if (step === 2) {
      if (!formData.homeType) newErrors.homeType = 'Please select your home type';
      if (!formData.hasYard) newErrors.hasYard = 'Please answer this question';
      if (!formData.hasOtherPets) newErrors.hasOtherPets = 'Please answer this question';
      if (!formData.petExperience) newErrors.petExperience = 'Please select your experience level';
    }

    if (step === 3) {
      if (!formData.whyAdopt.trim() || formData.whyAdopt.length < 30)
        newErrors.whyAdopt = 'Please write at least 30 characters about why you want to adopt';
      if (!formData.agreeHomeVisit) newErrors.agreeHomeVisit = 'You must agree to the home visit';
      if (!formData.agreeResponsibility) newErrors.agreeResponsibility = 'You must accept responsibility';
    }

    setErrors(newErrors as Partial<FormData>);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (validateStep(3)) {
      setSubmitted(true);
      const ok = await submitAdoptionApplication({
        animal_id: animal.id,
        animal_name: animal.name,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        home_type: formData.homeType,
        has_yard: formData.hasYard,
        has_other_pets: formData.hasOtherPets,
        other_pets_details: formData.otherPetsDetails,
        pet_experience: formData.petExperience,
        why_adopt: formData.whyAdopt,
        agree_home_visit: formData.agreeHomeVisit,
        agree_responsibility: formData.agreeResponsibility,
      });
      setTimeout(() => {
        if (ok) {
          toast.success(`🎉 Adoption request for ${animal.name} submitted! We'll contact you within 48 hours.`, { duration: 6000 });
        } else {
          toast.error('Submission failed. Please try again.');
        }
        handleClose();
      }, 2000);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData(initialFormData);
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all bg-white text-[#3A2E2A] placeholder-[#B0A099] ${
      errors[field]
        ? 'border-red-400 focus:border-red-400'
        : 'border-[#FFE8D6] focus:border-[#FF914D]'
    }`;

  const radioOption = (
    field: keyof FormData,
    value: string,
    label: string,
    icon?: string
  ) => (
    <label
      key={value}
      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
        formData[field] === value
          ? 'border-[#FF914D] bg-[#FFF6ED]'
          : 'border-[#FFE8D6] bg-white hover:border-[#FFCBA4]'
      }`}
    >
      <input
        type="radio"
        name={field}
        value={value}
        checked={formData[field] === value}
        onChange={() => updateField(field, value)}
        className="sr-only"
      />
      {icon && <span className="text-lg">{icon}</span>}
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }} className="text-[#3A2E2A] text-sm">
        {label}
      </span>
      {formData[field] === value && (
        <CheckCircle2 className="w-4 h-4 text-[#FF914D] ml-auto flex-shrink-0" />
      )}
    </label>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[92vh] overflow-y-auto bg-[#FFFAF7] rounded-3xl p-0 border-0 shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#FF914D] to-[#FF6B2B] p-6 rounded-t-3xl">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-full bg-white/20 hover:bg-white/30 p-2 transition-all"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/30 flex-shrink-0">
              <img src={animal.image} alt={animal.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-white/80 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                Adoption Application
              </p>
              <h2
                className="text-white text-2xl"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
              >
                Adopt {animal.name}
              </h2>
              <p className="text-white/70 text-xs mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                {animal.age} • {animal.location}
              </p>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center gap-2 mt-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isDone = step.id < currentStep;
              return (
                <div key={step.id} className="flex items-center gap-2 flex-1">
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                      isActive
                        ? 'bg-white text-[#FF914D]'
                        : isDone
                        ? 'bg-white/30 text-white'
                        : 'bg-white/10 text-white/50'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <Icon className="w-3 h-3" />
                    )}
                    <span className="hidden sm:inline">{step.label}</span>
                    <span className="sm:hidden">{step.id}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 rounded ${isDone ? 'bg-white/60' : 'bg-white/20'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <Heart className="w-10 h-10 text-green-500 fill-green-500" />
              </div>
              <h3 className="text-[#3A2E2A] text-2xl mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                Application Sent!
              </h3>
              <p className="text-[#5A4E4A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Thank you for giving {animal.name} a chance at a forever home. We'll be in touch within 48 hours.
              </p>
            </div>
          ) : (
            <>
              {/* Step 1 — Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-[#3A2E2A] text-lg mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                      Tell us about yourself
                    </h3>
                    <p className="text-[#8A7E7A] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                      We need your contact details to proceed with the adoption.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[#3A2E2A] text-sm font-semibold mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      value={formData.fullName}
                      onChange={e => updateField('fullName', e.target.value)}
                      className={inputClass('fullName')}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#3A2E2A] text-sm font-semibold mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={e => updateField('email', e.target.value)}
                      className={inputClass('email')}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#3A2E2A] text-sm font-semibold mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={e => updateField('phone', e.target.value)}
                      className={inputClass('phone')}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#3A2E2A] text-sm font-semibold mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai"
                      value={formData.city}
                      onChange={e => updateField('city', e.target.value)}
                      className={inputClass('city')}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.city}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2 — Living Situation */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-[#3A2E2A] text-lg mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                      Your living situation
                    </h3>
                    <p className="text-[#8A7E7A] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                      This helps us match the right animal to your home environment.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[#3A2E2A] text-sm font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Type of home *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {radioOption('homeType', 'apartment', 'Apartment', '🏢')}
                      {radioOption('homeType', 'house', 'Independent House', '🏠')}
                      {radioOption('homeType', 'villa', 'Villa / Bungalow', '🏡')}
                      {radioOption('homeType', 'other', 'Other', '🏗️')}
                    </div>
                    {errors.homeType && (
                      <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.homeType}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#3A2E2A] text-sm font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Do you have a yard or outdoor space? *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {radioOption('hasYard', 'yes', 'Yes, I have a yard', '✅')}
                      {radioOption('hasYard', 'no', 'No outdoor space', '🏙️')}
                    </div>
                    {errors.hasYard && (
                      <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.hasYard}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#3A2E2A] text-sm font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Do you have other pets? *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {radioOption('hasOtherPets', 'yes', 'Yes', '🐾')}
                      {radioOption('hasOtherPets', 'no', 'No other pets', '🚫')}
                    </div>
                    {formData.hasOtherPets === 'yes' && (
                      <textarea
                        placeholder="Tell us about your other pets (species, age, temperament)..."
                        value={formData.otherPetsDetails}
                        onChange={e => updateField('otherPetsDetails', e.target.value)}
                        rows={2}
                        className={`${inputClass('otherPetsDetails')} mt-2 resize-none`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    )}
                    {errors.hasOtherPets && (
                      <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.hasOtherPets}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#3A2E2A] text-sm font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Experience with pets *
                    </label>
                    <div className="space-y-2">
                      {radioOption('petExperience', 'none', 'First-time pet owner', '🌱')}
                      {radioOption('petExperience', 'some', 'Some experience (1–2 pets before)', '🐶')}
                      {radioOption('petExperience', 'experienced', 'Experienced (3+ years with pets)', '⭐')}
                    </div>
                    {errors.petExperience && (
                      <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.petExperience}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3 — Motivation */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-[#3A2E2A] text-lg mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                      Your story
                    </h3>
                    <p className="text-[#8A7E7A] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Help us understand why {animal.name} is the right fit for you.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[#3A2E2A] text-sm font-semibold mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Why do you want to adopt {animal.name}? *
                    </label>
                    <textarea
                      placeholder={`Tell us what drew you to ${animal.name}, your daily routine, and how you plan to care for them...`}
                      value={formData.whyAdopt}
                      onChange={e => updateField('whyAdopt', e.target.value)}
                      rows={5}
                      className={`${inputClass('whyAdopt')} resize-none`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.whyAdopt ? (
                        <p className="text-red-500 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.whyAdopt}</p>
                      ) : (
                        <span />
                      )}
                      <span
                        className={`text-xs ${formData.whyAdopt.length >= 30 ? 'text-green-500' : 'text-[#8A7E7A]'}`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {formData.whyAdopt.length}/30 min
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.agreeHomeVisit
                          ? 'border-[#FF914D] bg-[#FFF6ED]'
                          : errors.agreeHomeVisit
                          ? 'border-red-400 bg-red-50'
                          : 'border-[#FFE8D6] bg-white hover:border-[#FFCBA4]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.agreeHomeVisit}
                        onChange={e => updateField('agreeHomeVisit', e.target.checked)}
                        className="mt-0.5 accent-[#FF914D] flex-shrink-0"
                      />
                      <span className="text-[#3A2E2A] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        I agree to a <strong>home visit</strong> by the AnbuFur team before the adoption is finalized.
                      </span>
                    </label>
                    {errors.agreeHomeVisit && (
                      <p className="text-red-500 text-xs -mt-1 px-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.agreeHomeVisit}</p>
                    )}

                    <label
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.agreeResponsibility
                          ? 'border-[#FF914D] bg-[#FFF6ED]'
                          : errors.agreeResponsibility
                          ? 'border-red-400 bg-red-50'
                          : 'border-[#FFE8D6] bg-white hover:border-[#FFCBA4]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.agreeResponsibility}
                        onChange={e => updateField('agreeResponsibility', e.target.checked)}
                        className="mt-0.5 accent-[#FF914D] flex-shrink-0"
                      />
                      <span className="text-[#3A2E2A] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        I understand that adopting {animal.name} is a <strong>lifelong commitment</strong> and I take full responsibility for their health, safety, and happiness.
                      </span>
                    </label>
                    {errors.agreeResponsibility && (
                      <p className="text-red-500 text-xs -mt-1 px-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.agreeResponsibility}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-8">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#3A2E2A] text-[#3A2E2A] hover:bg-[#3A2E2A] hover:text-white transition-all"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                )}

                {currentStep < 3 ? (
                  <button
                    onClick={handleNext}
                    className="flex-1 flex items-center justify-center gap-2 px-8 py-3 bg-[#FF914D] text-white rounded-full hover:bg-[#FF7A2E] transition-all hover:shadow-lg"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex-1 flex items-center justify-center gap-2 px-8 py-3 bg-[#FF914D] text-white rounded-full hover:bg-[#FF7A2E] transition-all hover:shadow-lg"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    Submit Application
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}