
import React, { useState, useCallback } from 'react';
import { Topic } from './types';
import { VOCABULARY_TOPICS } from './constants/vocabulary';
import TopicSelector from './components/TopicSelector';
import VocabularyCard from './components/VocabularyCard';

const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const handleTopicSelect = useCallback((topic: Topic) => {
    setSelectedTopic(topic);
  }, []);

  const handleReturnToTopics = useCallback(() => {
    setSelectedTopic(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center p-4 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400">
          TOEIC Vocabulary Builder
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
          Master the 600 essential words for your success!
        </p>
      </header>
      <main className="w-full max-w-2xl">
        {!selectedTopic ? (
          <TopicSelector topics={VOCABULARY_TOPICS} onSelectTopic={handleTopicSelect} />
        ) : (
          <VocabularyCard topic={selectedTopic} onReturnToTopics={handleReturnToTopics} />
        )}
      </main>
       <footer className="text-center mt-8 text-slate-500 dark:text-slate-500 text-sm">
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
