import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import { Clock, MapPin, ArrowUp } from "lucide-react";

export function InfoPanel({ latitude, longitude, altitude, lastUpdate }) {
  const [timeAgo, setTimeAgo] = useState("0s ago");

  useEffect(() => {
    const updateTime = () => {
      // Safety check: ensure lastUpdate exists and is a number
      if (typeof lastUpdate !== "number") {
        setTimeAgo("Just now");
        return;
      }

      const now = Date.now();
      console.log(now);

      const diffInSeconds = Math.floor((now - lastUpdate) / 1000);

      if (diffInSeconds < 60) {
        setTimeAgo(`${diffInSeconds}s ago`);
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        setTimeAgo(`${minutes}m ago`);
      } else {
        const hours = Math.floor(diffInSeconds / 3600);
        setTimeAgo(`${hours}h ago`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lastUpdate]);

  const formatCoordinate = (value, type) => {
    const direction =
      type === "lat" ? (value >= 0 ? "N" : "S") : value >= 0 ? "E" : "W";
    return `${Math.abs(value).toFixed(4)}° ${direction}`;
  };

  return (
    <Card className="bg-gray-900 border-gray-700 shadow-xl">
      <CardHeader className="pb-3">
        <CardHeader className="text-xl font-bold text-white flex items-center gap-2">
          <MapPin className="text-cyan-400" size={20} />
          ISS Position
        </CardHeader>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <MapPin size={14} />
              Latitude
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              {formatCoordinate(latitude, "lat")}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <MapPin size={14} />
              Longitude
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              {formatCoordinate(longitude, "lon")}
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <ArrowUp size={14} />
                Altitude
              </div>
              <div className="text-2xl font-mono font-bold text-white">
                {altitude.toFixed(1)}{" "}
                <span className="text-lg text-gray-400">km</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1 justify-end">
                <Clock size={14} />
                Last Updated
              </div>
              <div className="text-lg font-mono text-cyan-400">{timeAgo}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
