import { useState, useEffect } from "react";
import { Satellite } from "lucide-react";
import Controls from "./Components/Controls";
import InfoPanel from "./Components/InfoPanel";
import Map from "./Components/Map";

function App() {
  const [position, setPosition] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the new, reliable API
  const fetchISSPosition = async () => {
    try {
      // Using api.wheretheiss.at - HTTPS enabled and reliable
      const response = await fetch(
        "https://api.wheretheiss.at/v1/satellites/25544",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      // The new API returns numbers directly
      const newPosition = {
        latitude: data.latitude,
        longitude: data.longitude,
        altitude: data.altitude,
        velocity: data.velocity,
        timestamp: data.timestamp * 1000, // Convert to milliseconds
      };

      setPosition(newPosition);
      setLastUpdated(Date.now());
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      // CRITICAL: Do NOT set position to null on error to keep marker at last known spot
      setError("Failed to update. Retrying...");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchISSPosition();

    // Poll every 5 seconds
    const interval = setInterval(fetchISSPosition, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/20">
              <Satellite className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Orbit
              </h1>
              <p className="text-xs text-slate-400">ISS Tracker</p>
            </div>
          </div>

          <Controls
            isLoading={isLoading}
            error={error}
            onRefresh={fetchISSPosition}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto space-y-6">
        {/* Map Section */}
        <div className="w-full">
          {position && (
            <Map
              latitude={position.latitude}
              longitude={position.longitude}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Info Panel */}
        <div className="w-full max-w-3xl mx-auto">
          <InfoPanel
            position={position}
            lastUpdated={lastUpdated}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
