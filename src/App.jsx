import { useState, useEffect } from "react";
import { Map } from "./Components/Map";
import { InfoPanel } from "./Components/InfoPanel";
import { Controls } from "./Components/Controls";
import { fetchISSPosition } from "./Utils/issapi";

function App() {
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
    altitude: 408,
    timestamp: Date.now(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("updating");

  const updatePosition = async () => {
    setIsLoading(true);
    setStatus("updating");
    
    try {
      const data = await fetchISSPosition();
      setPosition(data);
      setStatus("live");
    } catch (error) {
      console.error("Failed to fetch ISS position:", error);
      setStatus("error");
      // Retry after 3 seconds on error
      setTimeout(updatePosition, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    updatePosition();

    // Set up interval for updates every 5 seconds
    const interval = setInterval(updatePosition, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-6 h-6 text-white"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Orbit</h1>
              <p className="text-xs text-gray-400">ISS Real-Time Tracker</p>
            </div>
          </div>
          <Controls
            isRefreshing={isLoading}
            status={status}
            onRefresh={updatePosition}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Map Section */}
        <section>
          <Map
            latitude={position.latitude}
            longitude={position.longitude}
            isLoading={isLoading}
          />
        </section>

        {/* Info Panel */}
        <section>
          <InfoPanel
            latitude={position.latitude}
            longitude={position.longitude}
            altitude={position.altitude}
            lastUpdate={position.timestamp}
          />
        </section>

        {/* Footer Info */}
        <div className="text-center text-gray-500 text-sm py-4">
          <p>Data updates every 5 seconds • Position accuracy: ±5km</p>
          <p className="mt-1">Powered by Open-Notify API</p>
        </div>
      </main>
    </div>
  );
}

export default App;