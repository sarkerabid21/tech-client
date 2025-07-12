import React from 'react';

const BeMarchant = () => {
    return (
        <div className="bg-[#03373D] py-4 px-2">
     
      <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
        <div className="space-y-4 flex-1 sm:text-center lg:text-left">
          <h1 className="text-white font-bold text-4xl xl:text-5xl">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
           We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>
          <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
           <button className='bg-[#CAEB66] font-bold border btn py-2 px-4 rounded-4xl border-[#CAEB66]'>Become a Merchant </button>
           <button className='font-bold text-[#CAEB66] bg-[#03373D] border btn py-2 px-4 rounded-4xl border-[#CAEB66]'>Earn with Profast Courier </button>
           
          </div>
        </div>
        <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
          <img
            src="https://i.postimg.cc/HxHyt53c/undraw-heatmap-uyye.png"
            className="w-full mx-auto sm:w-10/12  lg:w-full"
          />
        </div>
      </section>
    </div>
    );
};

export default BeMarchant;