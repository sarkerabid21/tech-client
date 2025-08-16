import React from "react";

const products = [
  {
    icon: "https://img.icons8.com/color/48/artificial-intelligence.png",
    name: "Bhindi AI",
    description: "Talk to your apps in plain english!",
    followers: 20,
    categories: ["Productivity", "User Experience"],
  },
  {
    icon: "https://img.icons8.com/color/48/startup.png",
    name: "Corella",
    description: "Workspace for early stage startup teams",
    followers: 53,
    categories: ["Productivity", "Task Management"],
  },
  {
    icon: "https://img.icons8.com/color/48/blackjack.png",
    name: "Hit21",
    description: "Clean, modern blackjack with provable fairness built in",
    followers: null,
    categories: ["Card Games", "Indie Games"],
  },
  {
    icon: "https://img.icons8.com/color/48/windows-10.png",
    name: "Taskbar Buddy",
    description: "Make Your Own Pet From Anything",
    followers: 111,
    categories: ["Windows", "Pets"],
  },
  {
    icon: "https://img.icons8.com/color/48/chatbot.png",
    name: "Broxi AI",
    description: "No-code AI agent builder from text to AI agents in minutes",
    followers: 30,
    categories: ["Artificial Intelligence", "Tech"],
  },
  {
    icon: "https://img.icons8.com/color/48/voice-recognition-scan.png",
    name: "Harmony AI Voice Assistant",
    description: "Manage email and calendar with voice",
    followers: 4,
    categories: ["Email", "Calendar"],
  },
  {
    icon: "https://img.icons8.com/color/48/briefcase.png",
    name: "Carrie AI",
    description: "The first proactive AI tool for work.",
    followers: 20,
    categories: ["Task Management", "Messaging"],
  },
  {
    icon: "https://img.icons8.com/color/48/mental-state.png",
    name: "MindfulSpace",
    description: "The psychotherapist built AI counsellor",
    followers: null,
    categories: ["Health & Fitness", "Artificial Intelligence"],
  },
  {
    icon: "https://img.icons8.com/color/48/automation.png",
    name: "Siden",
    description: "AI Native Workspace",
    followers: 47,
    categories: ["Productivity", "SaaS"],
  },
  {
    icon: "https://img.icons8.com/color/48/website.png",
    name: "Bodly - Multi Tool Website",
    description: "Multi Tool Website",
    followers: null,
    categories: ["Web App", "Productivity"],
  },
  {
    icon: "https://img.icons8.com/color/48/discount.png",
    name: "MaxWorth",
    description: "Simple app to manage your coupon book credit card benefits",
    followers: null,
    categories: ["Money", "Personal Finance"],
  },
  {
    icon: "https://img.icons8.com/color/48/conference-call.png",
    name: "EvolveX Space for Founders",
    description: "Find co-founders, grants, investors",
    followers: null,
    categories: ["Events", "Venture Capital"],
  },
  {
    icon: "https://img.icons8.com/color/48/article.png",
    name: "DeepScan Article Summarizer AI",
    description: "Summarize articles fast, understand & save hours daily",
    followers: null,
    categories: ["AI", "Productivity"],
  },
  {
    icon: "https://img.icons8.com/color/48/robot.png",
    name: "BotForge",
    description: "Build advanced AI chatbots without coding",
    followers: 15,
    categories: ["Artificial Intelligence", "Automation"],
  },
  {
    icon: "https://img.icons8.com/color/48/calendar.png",
    name: "Planify Pro",
    description: "Smart AI-powered daily planner",
    followers: 42,
    categories: ["Productivity", "Scheduling"],
  },
  {
    icon: "https://img.icons8.com/color/48/translation.png",
    name: "LinguaMate",
    description: "AI translator for real-time conversations",
    followers: 35,
    categories: ["Language", "Travel"],
  },
  {
    icon: "https://img.icons8.com/color/48/music.png",
    name: "TuneCraft AI",
    description: "Generate original music tracks with AI",
    followers: null,
    categories: ["Music", "AI"],
  },
  {
    icon: "https://img.icons8.com/color/48/recipe-book.png",
    name: "ChefGenie",
    description: "Create recipes from ingredients you have",
    followers: 27,
    categories: ["Food & Drink", "AI"],
  },
  {
    icon: "https://img.icons8.com/color/48/fitness.png",
    name: "FitTrack AI",
    description: "Personalized fitness coach in your pocket",
    followers: null,
    categories: ["Health & Fitness", "AI"],
  },
  {
    icon: "https://img.icons8.com/color/48/photo-editor.png",
    name: "PixelPerfect AI",
    description: "AI photo editing for social media creators",
    followers: 58,
    categories: ["Photography", "Design"],
  },
  {
    icon: "https://img.icons8.com/color/48/shopping-cart.png",
    name: "ShopMate",
    description: "Find best deals and coupons instantly",
    followers: 19,
    categories: ["Shopping", "Money"],
  },
  {
    icon: "https://img.icons8.com/color/48/coding.png",
    name: "CodePilot",
    description: "AI assistant for faster coding",
    followers: 66,
    categories: ["Programming", "AI"],
  },
  {
    icon: "https://img.icons8.com/color/48/idea.png",
    name: "IdeaFlow",
    description: "Brainstorm and organize ideas visually",
    followers: null,
    categories: ["Creativity", "Productivity"],
  },
  {
    icon: "https://img.icons8.com/color/48/goal.png",
    name: "GoalSetter",
    description: "Track and achieve personal goals",
    followers: 24,
    categories: ["Lifestyle", "Motivation"],
  },
  {
    icon: "https://img.icons8.com/color/48/security-checked.png",
    name: "SecurePass AI",
    description: "Generate and store passwords safely",
    followers: 13,
    categories: ["Security", "Tools"],
  },
  {
    icon: "https://img.icons8.com/color/48/reading.png",
    name: "ReadEase",
    description: "Read faster with AI-guided summaries",
    followers: null,
    categories: ["Education", "AI"],
  },
  {
    icon: "https://img.icons8.com/color/48/weather.png",
    name: "WeatherWise",
    description: "Hyperlocal weather forecasts with AI",
    followers: 29,
    categories: ["Weather", "AI"],
  },
  {
    icon: "https://img.icons8.com/color/48/travel.png",
    name: "TripAI",
    description: "Plan trips with AI recommendations",
    followers: 22,
    categories: ["Travel", "AI"],
  },
  {
    icon: "https://img.icons8.com/color/48/business.png",
    name: "PitchMaster",
    description: "Create winning pitch decks with AI",
    followers: 31,
    categories: ["Business", "Productivity"],
  },
  {
    icon: "https://img.icons8.com/color/48/stock-share.png",
    name: "StockBot",
    description: "AI stock market analysis",
    followers: 40,
    categories: ["Finance", "AI"],
  }
];


const ComingSoon = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Page Title */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1">Coming soon</h2>
        <p className="text-gray-600 text-sm">
          Be among the first to know when new products launch
        </p>
      </div>

      {/* Layout: Left list + Right sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Product list */}
        <div className="lg:col-span-2 space-y-5">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b pb-4"
            >
              {/* Product Info */}
              <div className="flex items-start gap-3">
                <img
                  src={product.icon}
                  alt={product.name}
                  className="w-10 h-10 rounded"
                />
                <div>
                  <h3 className="font-semibold text-base">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    {product.followers !== null && `${product.followers} followers`}
                    {product.followers !== null && " • "}
                    {product.categories.join(", ")}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button className="px-3 py-1 border text-sm hover:text-pink-900 rounded hover:bg-gray-100">
                  Share
                </button>
                <button className="px-3 py-1 dark:bg-pink-50 text-black text-sm bg-gray-200 rounded hover:bg-gray-300">
                  Notify me
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="border p-4 rounded-md bg-gray-50 h-fit">
          <h4 className="font-semibold text-sm mb-2">ABOUT THIS PAGE</h4>
          <p className="text-sm text-gray-600 mb-4">
            This page shows products that are launching soon. Click 'Notify me'
            to be the first to find out when they go live.
          </p>
          <p className="text-sm text-gray-600">
            If you would like your launch to be listed here, schedule it in
            advance, and create a teaser — it's free!
          </p>
          <a
            href="#"
            className="block mt-4 text-sm text-blue-600 hover:underline"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
