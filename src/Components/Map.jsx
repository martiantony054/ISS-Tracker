import { Satellite } from "lucide-react";
import world from "/world.svg"
export function Map({ latitude, longitude, isLoading }) {
  // Handle null/undefined for calculations (defaults to 0 if data hasn't loaded yet)
  const safeLat = latitude ?? 0;
  const safeLon = longitude ?? 0;

  // Convert longitude (-180 to 180) to left percentage (0 to 100)
  const leftPercent = ((safeLon + 180) / 360) * 100;

  // Convert latitude (-90 to 90) to top percentage (100 to 0, inverted)
  const topPercent = ((90 - safeLat) / 180) * 100;

  return (
    <div className="relative w-full aspect-[2/1] bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
      {/* World Map Background - External SVG Image */}
      <img
        src={world}
        alt="World Map"
        className="absolute inset-0 w-full h-full object-cover"
        // Filter inverts colors to make white oceans dark and land fit the theme
        style={{ filter: 'invert(1) hue-rotate(180deg) brightness(0.6) contrast(1.2)' }}
      />

      {/* ISS Marker */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out"
        style={{
          left: `${leftPercent}%`,
          top: `${topPercent}%`,
        }}
      >
        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-full bg-cyan-400 blur-xl ${
            isLoading ? "animate-pulse" : ""
          }`}
          style={{
            width: "48px",
            height: "48px",
            marginLeft: "-12px",
            marginTop: "-12px",
          }}
        />
        
        {/* Satellite icon */}
        <div
          className={`relative ${isLoading ? "animate-pulse" : ""}`}
          style={{ filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))" }}
        >
          <Satellite
            className="text-cyan-400"
            size={24}
            strokeWidth={2}
          />
        </div>

        {/* Position label */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gray-900/90 px-3 py-1 rounded-lg border border-cyan-500/50 whitespace-nowrap">
          <span className="text-cyan-400 text-xs font-mono">
            {/* FIX: Use ?. to safely access toFixed, and ?? to provide a fallback */}
            {latitude?.toFixed(2) ?? "0.00"}°, {longitude?.toFixed(2) ?? "0.00"}°
          </span>
        </div>
      </div>

      {/* Map overlay gradient for atmosphere effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-900/50 to-transparent" />
    </div>
  );
}