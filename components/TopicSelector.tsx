
import React from 'react';
import { Topic } from '../types';

interface TopicSelectorProps {
  topics: Topic[];
  onSelectTopic: (topic: Topic) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ topics, onSelectTopic }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-slate-700 dark:text-slate-200">Choose a Topic to Start</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic)}
            className="w-full text-left p-4 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200 transform hover:-translate-y-1"
          >
            <p className="font-semibold text-blue-800 dark:text-blue-300">{topic.title}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{topic.vietnameseTitle}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;
