import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Tech Entrepreneur",
    comment: "AppOrbit helped me connect with an amazing audience. The feedback and exposure were priceless.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Jubayer Khan",
    role: "Developer",
    comment: "I launched my MVP here and got instant traction. The platform is smooth and impactful.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Anika Rahman",
    role: "Startup Founder",
    comment: "Our product went trending in just 2 days. AppOrbit is the ProductHunt of Bangladesh!",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
];

const Testimonials = () => {
  return (
    <section className="relative z-10 bg-gradient-to-br from-[#f0f4ff] to-[#ffffff] py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#1e2a45] mb-12">
          💬 User Experiences
        </h2>

        <div data-aos="fade-left" className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="backdrop-blur-md bg-white/70 border border-gray-200 shadow-xl rounded-2xl p-6 transition-transform hover:scale-[1.02]"
            >
              <FaQuoteLeft className="text-xl text-indigo-400 mb-3" />
              <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
                “{item.comment}”
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full border-2 border-indigo-300"
                />
                <div>
                  <h4 className="text-md font-semibold text-indigo-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
