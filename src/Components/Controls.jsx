import { Button } from "@mui/material";
import { RefreshCw, Activity } from "lucide-react";

export function Controls({ isRefreshing, status, onRefresh }) {
  const statusConfig = {
    live: {
      text: "Live Tracking",
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
      borderColor: "border-emerald-400/30",
      icon: <Activity size={14} className="text-emerald-400" />,
    },
    error: {
      text: "Connection Error",
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      borderColor: "border-red-400/30",
      icon: <Activity size={14} className="text-red-400" />,
    },
    updating: {
      text: "Updating...",
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10",
      borderColor: "border-cyan-400/30",
      icon: <Activity size={14} className="text-cyan-400 animate-pulse" />,
    },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center justify-between gap-4">
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full border ${config.bgColor} ${config.borderColor}`}
      >
        {config.icon}
        <span className={`text-sm font-medium ${config.color}`}>
          {config.text}
        </span>
      </div>

      <Button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-6 gap-2 shadow-lg shadow-cyan-500/25 transition-all"
      >
        <RefreshCw
          size={16}
          className={isRefreshing ? "animate-spin" : ""}
        />
        Refresh Now
      </Button>
    </div>
  );
}