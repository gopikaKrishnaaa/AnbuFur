import { RescueSection } from '../components/RescueSection';
import { DonationCTA } from '../components/DonationCTA';

export function VolunteerPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FF914D 0%, #FF6B2B 100%)',
        paddingTop: '120px',
        paddingBottom: '60px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          color: 'rgba(255,255,255,0.85)',
          fontSize: '1rem',
          fontWeight: 600,
          marginBottom: '12px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          Make a Difference
        </p>
        <h1 style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: '#fff',
          margin: '0 0 16px',
        }}>
          Volunteer with AnbuFur
        </h1>
      </div>

      {/* Volunteer Roles + Form */}
      <RescueSection />
      <DonationCTA />
    </div>
  );
}