import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000); // Update every second

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-xl font-mono text-gray-800 dark:text-gray-200 px-5">
      {time}
    </div>
  );
}

export default Clock;
