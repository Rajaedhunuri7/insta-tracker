import { useEffect, useState } from 'react';

function App() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    chrome.storage.local.get(['usageTime'], (res) => {
      setTime(res.usageTime || 0);
    });
  }, []);

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return (
    <div className="p-4 w-64 text-center rounded-xl bg-white shadow-xl">
      <h1 className="text-xl font-bold text-indigo-700">Instagram Tracker</h1>
      <p className="text-gray-600 mt-2">Time Spent Today:</p>
      <div className="text-3xl font-semibold mt-2 text-green-600">
        {minutes}m {seconds}s
      </div>
    </div>
  );
}

export default App;
