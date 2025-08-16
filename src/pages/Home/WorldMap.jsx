"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes"; // Optional: for dark/light theme

export function WorldMap({
  dots = [],
  lineColor = "#C60074",
  width = 800,
  height = 400,
}) {
  const svgRef = useRef(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const { theme } = useTheme(); // If not using next-themes, remove this line and theme usage below

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#00000040",
    shape: "circle",
    backgroundColor: theme === "dark" ? "black" : "white",
  });

  // Project latitude/longitude to SVG X/Y
  const projectPoint = (lat, lng) => {
    const x = ((lng + 180) * (width / 360));
    const y = ((90 - lat) * (height / 180));
    return { x, y };
  };

  // Create smooth quadratic Bezier curve path string
  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50; // Curve control point above line
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full aspect-[2/1] rounded-lg relative font-sans dark:bg-black bg-pink-100">
      <img
        src="https://i.postimg.cc/8CKTRYYx/Screenshot-2025-08-16-030530.png"
        alt="world map"
        className="h-full w-full pointer-events-none select-none"
        draggable={false}
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)",
        }}
        width={width}
        height={height}
      />

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
      >
        {/* Paths */}
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <motion.path
              key={`path-${i}`}
              d={createCurvedPath(startPoint, endPoint)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 * i, ease: "easeOut" }}
            />
          );
        })}

        {/* Gradient for stroke */}
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Start & End Dots with pulse animation */}
        {dots.map((dot, i) => {
          const start = projectPoint(dot.start.lat, dot.start.lng);
          const end = projectPoint(dot.end.lat, dot.end.lng);

          return (
            <g key={`dots-${i}`}>
              {[start, end].map((point, idx) => (
                <g key={`dot-${i}-${idx}`}>
                  <circle cx={point.x} cy={point.y} r="2" fill={lineColor} />
                  <circle cx={point.x} cy={point.y} r="2" fill={lineColor} opacity="0.5">
                    <animate
                      attributeName="r"
                      from="2"
                      to="8"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.5"
                      to="0"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
