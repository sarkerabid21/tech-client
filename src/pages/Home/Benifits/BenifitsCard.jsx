import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BenifitsCard = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const benefits = [
    {
      id: 1,
      title: 'Live Parcel Tracking',
      description:
        'Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment\'s journey and get instant status updates for complete peace of mind.',
      image: 'https://i.ibb.co/HDw4bfCr/19199567.jpg',
    },
    {
      id: 2,
      title: '100% Safe Delivery',
      description:
        'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
      image: 'https://i.ibb.co/Ndh3fKcz/13.jpg',
    },
    {
      id: 3,
      title: '24/7 Call Center Support',
      description:
        'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
      image: 'https://i.ibb.co/8nJP4cfz/5101593.jpg',
    },
  ];

  return (
    <section className="py-10 px-4 md:px-10 lg:px-20 bg-base-100">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Why Choose Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the benefits of using our reliable parcel delivery services.
        </p>
      </div>

      <div className="space-y-6">
        {benefits.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center gap-6 p-6 border rounded-xl shadow-md bg-white hover:bg-green-50 transition duration-300"
            data-aos="zoom-out-down"
          >
            <div className="w-full md:w-1/3">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            <div className="divider divider-horizontal hidden md:block"></div>
            <hr className="block md:hidden w-full border-gray-300" />

            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-semibold mb-2 text-green-700">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenifitsCard;
