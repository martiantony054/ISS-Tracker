import { Button } from "@mui/material";
import { RefreshCw, Wifi, WifiOff, Loader2 } from "lucide-react";

function Controls({ isLoading, error, onRefresh }) {
  return (
    <div className="flex items-center gap-4">
      {/* Status Indicator */}
      <div className="flex items-center gap-2 text-sm font-medium">
        {isLoading ? (
          <div className="flex items-center gap-2 text-cyan-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Updating...</span>
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-red-400">
            <WifiOff className="w-4 h-4" />
            <span>Offline</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-emerald-400">
            <Wifi className="w-4 h-4" />
            <span>Live</span>
          </div>
        )}
      </div>

      {/* Refresh Button */}
      {/* Changed variant to "default" to prevent crash, styled manually with className */}
      <Button
        onClick={onRefresh}
        disabled={isLoading}
        variant="default"
        size="sm"
        className="bg-transparent text-slate-300 border border-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-600 shadow-none"
      >
        <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
        Refresh
      </Button>
    </div>
  );
}

export default Controls;