import { useContext } from "react";
// import { ThemeContext } from "../contexts/ThemeContext";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { ThemeContext } from "./ThemeContext";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 py-1.5 transition-colors relative z-10";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="relative flex w-fit items-center rounded-full border border-gray-300 dark:border-gray-600">
      <button
        className={`${TOGGLE_CLASSES} ${
          theme === "light" ? "text-white" : "text-gray-300"
        }`}
        onClick={() => toggleTheme()}
      >
        <FiMoon className="text-lg" />
        <span>Light</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
        onClick={() => toggleTheme()}
      >
        <FiSun className="text-lg" />
        <span>Dark</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          theme === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
};

export default ThemeToggle;
