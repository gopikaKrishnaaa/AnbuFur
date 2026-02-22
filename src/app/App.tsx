import { Routes, Route } from 'react-router';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { AdoptSection } from './components/AdoptSection';
import { FeedProgramSection } from './components/FeedProgramSection';
import { PetCareSection } from './components/PetCareSection';
import { SuccessStories } from './components/SuccessStories';
import { DonationCTA } from './components/DonationCTA';
import { Footer } from './components/Footer';
import { CommunityPage } from './pages/CommunityPage';
import { AdoptPage } from './pages/AdoptPage';
import { VolunteerPage } from './pages/volunteer';
import { Toaster } from './components/ui/sonner';

function HomePage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <HeroSection />
      <AboutSection />
      <AdoptSection />
      <FeedProgramSection />
      <PetCareSection />
      <SuccessStories />
      <DonationCTA />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/adopt" element={<AdoptPage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
      </Routes>
      <Footer />
      <Toaster position="top-right" richColors />
    </>
  );
}