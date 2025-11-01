
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-sm text-slate-600 dark:text-slate-400">
        <span>Progress</span>
        <span>{current} / {total}</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
