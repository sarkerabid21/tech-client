import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';


const slides = [
  {
    src: 'https://i.ibb.co/WvZNMdVz/e53781230f8587917cec3e3e7f71342e.jpg',
    title: 'Discover Amazing',
    subtitle: 'Tech Products',
    description: 'Find the best web apps, AI tools, software, games, and mobile apps. Share your discoveries with the tech community.'
  },
  {
    src: 'https://i.ibb.co/0x4mQ4X/d0957c509617de589661f9fd73788700.jpg ',
    title: 'AI-Powered',
    subtitle: 'Innovation',
    description: 'Explore cutting-edge AI tools and machine learning applications that are transforming how we work and create.'
  },
  {
    src: 'https://i.ibb.co/yF9zsVKG/0198cfea858bc13f3e0f2fd9a2c8a459.jpg',
    title: 'Creative',
    subtitle: 'Design Tools',
    description: 'Discover powerful design platforms and creative software that help bring your ideas to life with professional results.'
  },
  {
    src: 'https://i.ibb.co/JjsR2hW5/1130111cab7f4795dac7a3c42fa17f8e.jpg',
    title: 'Mobile',
    subtitle: 'Innovation',
    description: 'Find the most innovative mobile apps and development tools that are reshaping the mobile experience.'
  }
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);

  return (
    <section className="relative lg:min-h-screen overflow-hidden w-full h-96">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${slide.src}')`
            }}
          ></div>
        </div>
      ))}

      <div className="relative z-10 flex items-center lg:min-h-screen h-72  px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="my-10 text-2xl md:text-6xl font-bold text-white mb-6">
            {slides[currentSlide].title}
            <span className="block text-indigo-400">{slides[currentSlide].subtitle}</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            {slides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/productPage"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition "
            >
              Start Exploring
            </Link>
            <Link
              to="/dashboard/addProduct"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Submit Your Product
            </Link>
          </div>
        </div>
      </div>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 text-white p-3 rounded-full hover:bg-white/30">
        ❮
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 text-white p-3 rounded-full hover:bg-white/30">
        ❯
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      
    </section>
  );
};

export default Banner;