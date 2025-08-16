"use client";

import React from "react";
// import Image from "next/image";
import { motion } from "framer-motion";

const TechPlatformSection = () => {
  return (
    <section className="bg-pink-100 text-pink-700 py-16 px-4 md:px-20">
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl text-gray-900  md:text-5xl font-bold mb-4">
          Discover & Share Next-Gen Tech
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          NextGenTech is a platform where users discover and share the latest
          tech products—web apps, AI tools, software, games, mobile apps, and
          more. Submit new products, upvote your favorites, and share reviews
          with the community.
        </p>
      </motion.div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text Features */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl text-gray-900 font-semibold mb-4">Why NextGenTech?</h3>
          <ul className="space-y-4 text-gray-600">
            <li>✅ Discover innovative web apps, AI tools, and mobile apps</li>
            <li>✅ Submit new products and showcase your creations</li>
            <li>✅ Upvote or downvote products to guide the community</li>
            <li>✅ Post reviews and engage with other users</li>
            <li>✅ Role-based system for users, moderators, and admins</li>
            <li>✅ Unlock premium features through subscriptions</li>
          </ul>
        </motion.div>

        {/* Image / Product Preview */}
        <motion.div
          className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* <Image
            src="https://i.postimg.cc/mZQpHHKG/freepik-br-d8870633-2950-4f38-9b1f-ef377c79ac72.png" // Replace with your actual image path
            alt="NextGenTech Product Preview"
            fill
            
          /> */}
          <img className="object-cover" src="https://i.postimg.cc/mZQpHHKG/freepik-br-d8870633-2950-4f38-9b1f-ef377c79ac72.png" alt="NextGenTech Product Preview"/>
        </motion.div>
      </div>
    </section>
  );
};

export default TechPlatformSection;
