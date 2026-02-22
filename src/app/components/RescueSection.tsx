import { Heart, Users, Clock, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { submitVolunteerSignup } from '../../lib/db';

export function RescueSection() {
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const roles = [
    {
      icon: '🚑',
      title: 'Rescue Volunteer',
      description: 'Respond to rescue alerts in your area. Help transport injured animals to shelters and vets.',
      time: '4–6 hrs/week',
      spots: '12 spots open',
    },
    {
      icon: '🏠',
      title: 'Foster Parent',
      description: 'Provide a temporary loving home for animals recovering from illness or waiting for adoption.',
      time: '2–8 weeks',
      spots: '8 spots open',
    },
    {
      icon: '📸',
      title: 'Content Creator',
      description: 'Photograph and document animals at shelters to help improve their adoption chances online.',
      time: '2–3 hrs/week',
      spots: '5 spots open',
    },
    {
      icon: '🍽️',
      title: 'Feed Coordinator',
      description: 'Organise and run community feeding drives for stray animals in your neighbourhood.',
      time: '3–4 hrs/week',
      spots: '10 spots open',
    },
    {
      icon: '🏥',
      title: 'Vet Assistant',
      description: 'Support veterinary check-ups, vaccinations, and post-surgery care for rescued animals.',
      time: '5–8 hrs/week',
      spots: '3 spots open',
    },
    {
      icon: '📣',
      title: 'Awareness Champion',
      description: 'Spread the word in your community, schools, and online about animal welfare and adoption.',
      time: 'Flexible',
      spots: 'Always open',
    },
  ];

  const stats = [
    { value: '520+', label: 'Active Volunteers', icon: Users },
    { value: '3,800+', label: 'Animals Helped', icon: Heart },
    { value: '18 Cities', label: 'Across India', icon: Award },
    { value: '4 hrs', label: 'Avg. Weekly Impact', icon: Clock },
  ];

  const handleJoin = async () => {
    if (!name.trim() || !email.trim() || !role) {
      toast.error('Please fill in all fields');
      return;
    }
    const ok = await submitVolunteerSignup({ name, email, role });
    if (ok) {
      toast.success(`Welcome aboard, ${name}! We'll reach out within 48 hours about your ${role} role. 🐾`);
      setName(''); setEmail(''); setRole(''); setFormOpen(false);
    } else {
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <section id="rescue" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1 bg-[#FFF6ED] text-[#FF914D] rounded-full text-sm mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            Join Our Mission
          </span>
          <h2
            className="text-[#3A2E2A] mb-4"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Become a Volunteer
          </h2>
          <p
            className="text-[#5A4E4A] text-lg max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}
          >
            You don't need to be a vet to make a difference. Every hour you give changes a life.
            Find the role that fits your time, skills, and passion.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-[#FFF6ED] rounded-2xl p-6 text-center hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-[#FF914D] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className="text-[#3A2E2A] text-2xl mb-1"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[#5A4E4A] text-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Role Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {roles.map((r) => (
            <div
              key={r.title}
              className="bg-white border-2 border-[#FFE8D6] rounded-2xl p-6 hover:shadow-xl hover:border-[#FF914D] transition-all group"
            >
              <div className="text-4xl mb-4">{r.icon}</div>
              <h3
                className="text-[#3A2E2A] mb-2"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.2rem' }}
              >
                {r.title}
              </h3>
              <p
                className="text-[#5A4E4A] text-sm mb-5"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}
              >
                {r.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[#5A4E4A] text-xs">
                    <Clock className="w-3 h-3" />
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>{r.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#FF914D] text-xs">
                    <CheckCircle className="w-3 h-3" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{r.spots}</span>
                  </div>
                </div>
                <button
                  onClick={() => { setRole(r.title); setFormOpen(true); }}
                  className="flex items-center gap-1 px-4 py-2 bg-[#FFF6ED] text-[#FF914D] rounded-full text-sm group-hover:bg-[#FF914D] group-hover:text-white transition-all"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Apply
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sign Up Form */}
        {formOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-[#3A2E2A]"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}
                >
                  Join as {role}
                </h3>
                <button
                  onClick={() => setFormOpen(false)}
                  className="p-2 rounded-full hover:bg-[#FFF6ED] transition-all text-[#5A4E4A]"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-[#3A2E2A] text-sm font-semibold mb-1.5"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Priya Sharma"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#FFE8D6] focus:border-[#FF914D] focus:outline-none bg-white text-[#3A2E2A]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                <div>
                  <label
                    className="block text-[#3A2E2A] text-sm font-semibold mb-1.5"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#FFE8D6] focus:border-[#FF914D] focus:outline-none bg-white text-[#3A2E2A]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                <div>
                  <label
                    className="block text-[#3A2E2A] text-sm font-semibold mb-1.5"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Volunteer Role *
                  </label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#FFE8D6] focus:border-[#FF914D] focus:outline-none bg-white text-[#3A2E2A]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <option value="">Select a role</option>
                    {roles.map(r => (
                      <option key={r.title} value={r.title}>{r.title}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setFormOpen(false)}
                    className="flex-1 px-6 py-3 rounded-full border-2 border-[#FFE8D6] text-[#5A4E4A] hover:bg-[#FFF6ED] transition-all"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleJoin}
                    className="flex-1 px-6 py-3 rounded-full bg-[#FF914D] text-white hover:bg-[#FF7A2E] transition-all hover:shadow-lg"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    Join Now 🐾
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA bottom */}
        <div className="text-center">
          <p className="text-[#5A4E4A] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Not sure which role is right for you?
          </p>
          <button
            onClick={() => setFormOpen(true)}
            className="px-10 py-4 bg-[#FF914D] text-white rounded-full hover:bg-[#FF7A2E] transition-all hover:shadow-xl"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            Sign Up as Volunteer
          </button>
        </div>

      </div>
    </section>
  );
}