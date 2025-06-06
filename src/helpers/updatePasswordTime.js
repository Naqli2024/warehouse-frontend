const timeAgo = (date) => {
    const currentDate = new Date();
    const previousDate = new Date(date);
  
    // Normalize both dates to UTC
    const currentUTC = new Date(currentDate.toISOString());
    const previousUTC = new Date(previousDate.toISOString());
  
    const seconds = Math.floor((currentUTC - previousUTC) / 1000);
  
    if (seconds < 5) return "just now";
    if (seconds < 60) return "a few seconds ago";
  
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };
  
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
      }
    }
  
    return "just now";
  };
  
  export default timeAgo;
  