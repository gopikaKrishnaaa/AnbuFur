import { Heart, Shield, Award } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function DonationCTA() {
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [showDonorForm, setShowDonorForm] = useState(false);

  const presetAmounts = [500, 1000, 2500, 5000];

  const trustBadges = [
    { icon: Shield, text: 'Secure Payment' },
    { icon: Heart, text: '100% goes to animals' },
    { icon: Award, text: 'Registered NGO' },
  ];

  const handleDonate = () => {
    const amount = customAmount || selectedAmount;
    if (!amount) {
      toast.error('Please select or enter a donation amount');
      return;
    }
    setShowDonorForm(true);
  };

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customAmount || selectedAmount;
    
    if (!donorName || !donorEmail) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success(`Thank you ${donorName}! Your donation of ₹${amount.toLocaleString()} will help save lives. 🙏`, {
      duration: 5000,
    });
    
    // Reset form
    setDonorName('');
    setDonorEmail('');
    setShowDonorForm(false);
    setCustomAmount('');
    setSelectedAmount(1000);
  };

  return (
    <section id="donate" className="py-20 bg-gradient-to-br from-[#FF914D] to-[#FF7A2E] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 
            className="text-white mb-4" 
            style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontWeight: 700, 
              fontSize: 'clamp(2rem, 4vw, 3.5rem)' 
            }}
          >
            Your Small Help Can Save a Life
          </h2>
          <p 
            className="text-white/90 text-xl max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}
          >
            Every donation makes a difference. Help us continue our mission to rescue and care for animals in need.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl">
          {!showDonorForm ? (
            <>
              <div className="mb-8">
                <h3 
                  className="text-[#3A2E2A] mb-6 text-center" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  Choose Your Donation Amount
                </h3>
                
                {/* Preset Amounts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`py-4 px-6 rounded-2xl border-2 transition-all ${
                        selectedAmount === amount && !customAmount
                          ? 'bg-[#FF914D] border-[#FF914D] text-white shadow-lg scale-105'
                          : 'border-[#FFF6ED] hover:border-[#FF914D] text-[#3A2E2A]'
                      }`}
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1.25rem' }}
                    >
                      ₹{amount.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3A2E2A] text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    className="w-full pl-10 pr-4 py-4 rounded-2xl border-2 border-[#FFF6ED] focus:outline-none focus:border-[#FF914D] bg-[#FFF6ED]"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem' }}
                  />
                </div>
              </div>

              {/* Donate Button */}
              <button 
                onClick={handleDonate}
                className="w-full py-5 bg-[#FF914D] text-white rounded-full hover:bg-[#FF7A2E] transition-all hover:shadow-xl mb-8 text-lg" 
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                Donate ₹{(customAmount || selectedAmount).toLocaleString()} Now
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmitDonation} className="space-y-6">
              <h3 
                className="text-[#3A2E2A] mb-6 text-center" 
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.5rem' }}
              >
                Complete Your Donation of ₹{(customAmount || selectedAmount).toLocaleString()}
              </h3>

              <div>
                <label className="block text-[#3A2E2A] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 rounded-2xl border-2 border-[#FFF6ED] focus:outline-none focus:border-[#FF914D] bg-[#FFF6ED]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-[#3A2E2A] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-2xl border-2 border-[#FFF6ED] focus:outline-none focus:border-[#FF914D] bg-[#FFF6ED]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowDonorForm(false)}
                  className="flex-1 py-4 bg-white text-[#3A2E2A] border-2 border-[#3A2E2A] rounded-full hover:bg-[#3A2E2A] hover:text-white transition-all"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-[#FF914D] text-white rounded-full hover:bg-[#FF7A2E] transition-all hover:shadow-xl"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                >
                  Complete Donation
                </button>
              </div>
            </form>
          )}

          {/* Trust Badges */}
          {!showDonorForm && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div key={index} className="flex items-center justify-center gap-2 text-[#5A4E4A]">
                    <Icon className="w-5 h-5" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{badge.text}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}