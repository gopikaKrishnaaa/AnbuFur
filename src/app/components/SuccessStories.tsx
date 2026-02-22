import { ArrowRight } from 'lucide-react';

export function SuccessStories() {
  const story = {
    before: 'https://images.unsplash.com/photo-1663675222536-447e1071ee9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJheSUyMGRvZyUyMGJlZm9yZSUyMHJlc2N1ZSUyMHNhZHxlbnwxfHx8fDE3NzE2NTc4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    after: 'https://images.unsplash.com/photo-1701722579310-e033b550d55e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGFkb3B0ZWQlMjBkb2clMjBmYW1pbHklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzE2NTc4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    name: 'Rocky',
    story: 'Rocky was found abandoned on the streets, malnourished and scared. After months of love, care, and medical attention, he found his forever home with a loving family. Today, Rocky is happy, healthy, and brings joy to everyone around him.',
  };

  return (
    <section id="success-stories" className="py-20 bg-[#FFF6ED]">
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
            Success Stories
          </h2>
          <p 
            className="text-[#5A4E4A] text-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Every rescue has a happy ending
          </p>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Before & After Images */}
            <div className="relative">
              <div className="grid grid-cols-2 h-full">
                <div className="relative">
                  <img 
                    src={story.before}
                    alt="Before rescue"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    Before
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src={story.after}
                    alt="After rescue"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    After
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-xl">
                <ArrowRight className="w-6 h-6 text-[#FF914D]" />
              </div>
            </div>

            {/* Story Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 
                className="text-[#3A2E2A] mb-4" 
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem' }}
              >
                Meet {story.name}
              </h3>
              <p 
                className="text-[#5A4E4A] text-lg mb-6"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.8 }}
              >
                {story.story}
              </p>
              <button className="px-8 py-4 bg-[#FF914D] text-white rounded-full hover:bg-[#FF7A2E] transition-all hover:shadow-lg w-fit" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Read More Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}