export function formatTimeRemaining(ms) {
  if (ms <= 0) return "Already passed";

  const totalSeconds = Math.floor(ms / 1000);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days === 0 && hours === 0 && minutes === 0 && seconds <= 5) {
    return "Starts now";
  }

  return `In ${days}d ${hours}h ${minutes}m ${seconds}s`;
}
