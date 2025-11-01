import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Topic, Word } from '../types';
import ProgressBar from './ProgressBar';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';
import ShuffleIcon from './icons/ShuffleIcon';
import RestartIcon from './icons/RestartIcon';


interface VocabularyCardProps {
  topic: Topic;
  onReturnToTopics: () => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const VocabularyCard: React.FC<VocabularyCardProps> = ({ topic, onReturnToTopics }) => {
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | 'idle'>('idle');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const resetState = useCallback(() => {
    setShuffledWords(shuffleArray(topic.words));
    setCurrentIndex(0);
    setUserInput('');
    setFeedback('idle');
    setScore(0);
    setIsFinished(false);
  }, [topic.words]);

  useEffect(() => {
    resetState();
  }, [resetState]);

  const currentWord = useMemo(() => shuffledWords[currentIndex], [shuffledWords, currentIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleCheckAnswer = useCallback(() => {
    if (!currentWord || userInput.trim() === '') return;

    const userAnswer = userInput.trim().toLowerCase();
    const fullCorrectAnswer = currentWord.vietnamese.trim().toLowerCase();
    const correctParts = fullCorrectAnswer.split(',').map(s => s.trim());

    if (userAnswer === fullCorrectAnswer || correctParts.includes(userAnswer)) {
      setFeedback('correct');
      setScore(prev => prev + 1);
      setTimeout(() => {
        if (currentIndex < shuffledWords.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setUserInput('');
          setFeedback('idle');
        } else {
          setIsFinished(true);
        }
      }, 1000);
    } else {
      setFeedback('incorrect');
    }
  }, [currentWord, userInput, currentIndex, shuffledWords.length]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && feedback === 'idle') {
      handleCheckAnswer();
    }
    if(e.key === 'Enter' && feedback === 'incorrect') {
        setFeedback('idle');
        setUserInput('');
    }
  };
  
  const handleShuffle = () => {
      resetState();
  };

  if (shuffledWords.length === 0) {
    return <div>Loading...</div>;
  }

  if (isFinished) {
    return (
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg text-center transition-opacity duration-500">
        <h2 className="text-3xl font-bold text-green-500 mb-4">Congratulations!</h2>
        <p className="text-xl mb-6">You've completed the "{topic.title}" topic.</p>
        <p className="text-2xl font-semibold mb-8">Your Score: <span className="text-blue-500">{score} / {topic.words.length}</span></p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={resetState} className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
            Study Again
          </button>
          <button onClick={onReturnToTopics} className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
            Choose Another Topic
          </button>
        </div>
      </div>
    );
  }

  const feedbackRingColor = feedback === 'correct' ? 'ring-green-500' : feedback === 'incorrect' ? 'ring-red-500' : 'ring-slate-300 dark:ring-slate-600';

  return (
    <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg w-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{topic.title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{topic.vietnameseTitle}</p>
        </div>
        <div className="flex gap-2">
            <button onClick={handleShuffle} title="Shuffle" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"><ShuffleIcon /></button>
            <button onClick={resetState} title="Restart" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"><RestartIcon /></button>
        </div>
      </div>

      <ProgressBar current={currentIndex + 1} total={topic.words.length} />
      
      <div className="text-center my-8">
        <p className="text-4xl md:text-5xl font-bold tracking-wider text-slate-800 dark:text-slate-100">{currentWord.english}</p>
        <p className="text-slate-500 dark:text-slate-400 mt-2">({currentWord.type}) - {currentWord.definition}</p>
      </div>
      
      <div className="relative">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type the Vietnamese meaning..."
          disabled={feedback === 'correct'}
          className={`w-full p-4 text-lg border-2 bg-slate-50 dark:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${feedbackRingColor}`}
        />
        {feedback === 'correct' && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"><CheckIcon /></span>}
        {feedback === 'incorrect' && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500"><XIcon /></span>}
      </div>

      {feedback === 'incorrect' && (
        <div className="mt-3 text-center text-red-500 dark:text-red-400 transition-opacity duration-300">
          Correct answer: <strong className="font-semibold">{currentWord.vietnamese}</strong>
        </div>
      )}

      <button
        onClick={handleCheckAnswer}
        disabled={feedback === 'correct' || userInput.trim() === ''}
        className="w-full mt-6 py-3 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 disabled:bg-slate-400 dark:disabled:bg-slate-600 transition-all duration-200 transform active:scale-95"
      >
        Check
      </button>

      <button onClick={onReturnToTopics} className="w-full mt-4 text-center text-sm text-slate-500 hover:text-blue-500 transition-colors">
        &larr; Back to topics
      </button>
    </div>
  );
};

export default VocabularyCard;