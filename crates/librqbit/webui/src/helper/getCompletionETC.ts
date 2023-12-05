import { TorrentStats } from "../api-types";

export function getCompletionETA(stats: TorrentStats): string {
  let duration = stats?.live?.time_remaining?.duration?.secs;
  if (duration == null) {
    return "N/A";
  }
  return formatSecondsToTime(duration);
}

function formatSecondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formatUnit = (value: number, unit: string) =>
    value > 0 ? `${value}${unit}` : "";

  if (hours > 0) {
    return `${formatUnit(hours, "h")} ${formatUnit(minutes, "m")}`.trim();
  } else if (minutes > 0) {
    return `${formatUnit(minutes, "m")} ${formatUnit(
      remainingSeconds,
      "s"
    )}`.trim();
  } else {
    return `${formatUnit(remainingSeconds, "s")}`.trim();
  }
}
