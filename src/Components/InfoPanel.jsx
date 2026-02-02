import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { MapPin, ArrowUp, Gauge, Clock } from "lucide-react";

function InfoPanel({ position, lastUpdated, isLoading }) {
  const [timeAgo, setTimeAgo] = useState("0s ago");

  // Update the "time ago" text every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((now - lastUpdated) / 1000);
      
      if (diff < 60) {
        setTimeAgo(`${diff}s ago`);
      } else if (diff < 3600) {
        setTimeAgo(`${Math.floor(diff / 60)}m ago`);
      } else {
        setTimeAgo(`${Math.floor(diff / 3600)}h ago`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

  // Helper to format coordinates with N/S/E/W
  const formatCoord = (val, type) => {
    const direction = val >= 0 ? (type === "lat" ? "N" : "E") : (type === "lat" ? "S" : "W");
    return `${Math.abs(val).toFixed(4)}° ${direction}`;
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardHeader className="text-lg text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            Telemetry
          </CardHeader>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Clock className="w-4 h-4" />
            <span>{timeAgo}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!position ? (
          <div className="text-center py-8 text-slate-500">
            {isLoading ? "Acquiring signal..." : "Waiting for data..."}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Latitude */}
            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Latitude
              </p>
              <p className="text-lg font-mono text-black">
                {formatCoord(position.latitude, "lat")}
              </p>
            </div>

            {/* Longitude */}
            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Longitude
              </p>
              <p className="text-lg font-mono text-black">
                {formatCoord(position.longitude, "lon")}
              </p>
            </div>

            {/* Altitude (Real data from new API) */}
            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1">
                <ArrowUp className="w-3 h-3" /> Altitude
              </p>
              <p className="text-lg font-mono text-cyan-400">
                {position.altitude.toFixed(1)} <span className="text-sm text-slate-500">km</span>
              </p>
            </div>

            {/* Velocity (New data from new API) */}
            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1">
                <Gauge className="w-3 h-3" /> Velocity
              </p>
              <p className="text-lg font-mono text-cyan-400">
                {position.velocity.toFixed(0)} <span className="text-sm text-slate-500">km/h</span>
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default InfoPanel;