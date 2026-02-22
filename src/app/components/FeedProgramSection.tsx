import { Progress } from './ui/progress';
import { toast } from 'sonner';

export function FeedProgramSection() {
  const donationGoal = 100000;
  const currentDonation = 67500;
  const progressPercentage = (currentDonation / donationGoal) * 100;

  const handleSponsor = (type: string, amount: number) => {
    toast.success(`Thank you for sponsoring! ₹${amount.toLocaleString()} will help feed hungry animals.`, {
      duration: 5000,
    });
  };

  return (
    <section id="feed" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1728768996484-ae68066041da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXJzJTIwZmVlZGluZyUyMHN0cmF5JTIwZG9ncyUyMGNvbW11bml0eXxlbnwxfHx8fDE3NzE2NTc4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Volunteers feeding dogs"
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <h2 
              className="text-[#3A2E2A]" 
              style={{ 
                fontFamily: 'Poppins, sans-serif', 
                fontWeight: 700, 
                fontSize: 'clamp(2rem, 4vw, 3rem)' 
              }}
            >
              Feed a Hungry Soul
            </h2>
            <p 
              className="text-[#5A4E4A] text-lg"
              style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}
            >
              Our feeding program reaches hundreds of stray animals every day. With your support, 
              we can provide nutritious meals to animals in need across multiple communities.
            </p>

            {/* Donation Progress */}
            <div className="bg-[#FFF6ED] rounded-2xl p-6">
              <div className="flex justify-between mb-3">
                <span className="text-[#3A2E2A]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Current Goal
                </span>
                <span className="text-[#FF914D]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                  ₹{currentDonation.toLocaleString()} / ₹{donationGoal.toLocaleString()}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-[#5A4E4A] mt-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                {Math.round(progressPercentage)}% funded - Help us reach our goal!
              </p>
            </div>

            {/* Sponsor Buttons */}
            <div className="space-y-3">
              <p className="text-[#3A2E2A]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.125rem' }}>
                Choose Your Impact:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  onClick={() => handleSponsor('1 Day', 200)}
                  className="px-6 py-4 bg-[#FF914D] text-white rounded-2xl hover:bg-[#FF7A2E] transition-all hover:shadow-lg"
                >
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Feed 1 Day</div>
                  <div className="text-sm opacity-90" style={{ fontFamily: 'Inter, sans-serif' }}>₹200</div>
                </button>
                <button 
                  onClick={() => handleSponsor('1 Week', 1200)}
                  className="px-6 py-4 bg-[#FF914D] text-white rounded-2xl hover:bg-[#FF7A2E] transition-all hover:shadow-lg"
                >
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Feed 1 Week</div>
                  <div className="text-sm opacity-90" style={{ fontFamily: 'Inter, sans-serif' }}>₹1,200</div>
                </button>
                <button 
                  onClick={() => handleSponsor('Monthly', 5000)}
                  className="px-6 py-4 bg-[#FF914D] text-white rounded-2xl hover:bg-[#FF7A2E] transition-all hover:shadow-lg"
                >
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Monthly</div>
                  <div className="text-sm opacity-90" style={{ fontFamily: 'Inter, sans-serif' }}>₹5,000</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}