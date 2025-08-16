import React, { useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "Is the website free?",
    answer: "Yes, basic access is free. Premium features may be added in the future."
  },
  {
    question: "What Are the Types of NextGenTech?",
    answer: "Gadgets include everything from phones like iPhone and VR headsets like Oculus to gaming consoles like PlayStation 5 and robots like Roomba.."
  },
  {
    question: "What Gadgets Are Trending Today?",
    answer: "Mainstream gadgets include TVs, consoles, smart devices, cameras, headphones, and music devices. However, there are a ton of unique gadgets for fun, learning, and more. Here’s a full list of gadgets that are currently trending on Gadget Flow."
  }
  ,
  {
    question: "What Are the Top New Tech Trends?",
    answer: "Technology evolves every day, and some of the most popular tech trends include AI, robotic process automation, edge computing, quantum computing, virtual reality, blockchain, IoT, 5G, augmented reality, self-driving, big data, machine learning, and voice search."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [message, setMessage] = useState("");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Empty!",
        text: "Please write something before submitting."
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Submit Done!",
      text: "Thank you for your message."
    });

    setMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-pink-600 dark:text-pink-50">
        FAQ & Feedback
      </h2>

      {/* FAQ List */}
      <div className="mb-12">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="mb-4 border rounded-md overflow-hidden shadow-sm"
          >
            <motion.button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 bg-blue-100 hover:bg-blue-200 text-black focus:outline-none flex justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="font-medium">{item.question}</span>
              <span>{openIndex === index ? "-" : "+"}</span>
            </motion.button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-white text-gray-700"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Feedback Form */}
      <div className="bg-white shadow-lg rounded-md p-6">
        <h3 className="text-2xl text-black  font-semibold mb-4 text-center">Send Us a Message</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black"
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
          ></textarea>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default FAQSection;
