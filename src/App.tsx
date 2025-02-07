// src/App.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Result from './components/Result';

// Define the structure of a single quiz question.
export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  points?: number; // Optional points value (default to 10 if not provided)
}

// Define the structure of the overall quiz data.
export interface QuizData {
  questions: Question[];
}

// Define a type for the stage of the quiz.
type Stage = 'start' | 'quiz' | 'result';

// Variants for the outer container.
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// Variants for the card container.
const cardVariants = {
  initial: { opacity: 0, scale: 0.95, rotate: -3 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
  exit: { opacity: 0, scale: 0.9, rotate: 3, transition: { duration: 0.3 } },
};

// Variants for each screen, using a custom property to adjust the animation direction.
const screenVariants = {
  initial: (custom: string) => {
    switch (custom) {
      case 'start':
        return { x: '-100%', opacity: 0 };
      case 'quiz':
        return { x: '100%', opacity: 0 };
      case 'result':
        return { y: '100%', opacity: 0 };
      default:
        return { opacity: 0 };
    }
  },
  animate: { x: 0, y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: (custom: string) => {
    switch (custom) {
      case 'start':
        return { x: '100%', opacity: 0, transition: { duration: 0.6, ease: 'easeIn' } };
      case 'quiz':
        return { x: '-100%', opacity: 0, transition: { duration: 0.6, ease: 'easeIn' } };
      case 'result':
        return { y: '-100%', opacity: 0, transition: { duration: 0.6, ease: 'easeIn' } };
      default:
        return { opacity: 0, transition: { duration: 0.6 } };
    }
  },
};

function App() {
  // State declarations with proper types.
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [stage, setStage] = useState<Stage>('start');
  const [finalScore, setFinalScore] = useState<number>(0);

  // Fetch quiz data from the API endpoint on mount.
  useEffect(() => {
    fetch('/api/Uw5CrX')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        return response.json();
      })
      .then((data: QuizData) => {
        setQuizData(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err as Error);
        setLoading(false);
      });
  }, []);

  // Handler to start the quiz.
  const handleStart = (): void => {
    setStage('quiz');
  };

  // Handler for when the quiz is completed.
  const handleQuizComplete = (score: number): void => {
    setFinalScore(score);
    setStage('result');
  };

  // Handler to restart the quiz.
  const handleRestart = (): void => {
    window.location.reload();
    // Or reset state values for a smoother restart:
    // setStage('start');
    // setFinalScore(0);
  };

  // Animated loading state.
  if (loading) {
    return (
      <motion.div
        className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="text-3xl font-extrabold text-white"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'mirror' }}
        >
          Loading...
        </motion.div>
      </motion.div>
    );
  }

  // Animated error state.
  if (error) {
    return (
      <motion.div
        className="flex items-center justify-center h-screen bg-gradient-to-r from-red-600 to-pink-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div className="text-3xl font-extrabold text-white">
          Error: {error.message}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-6"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10"
        variants={cardVariants}
      >
        <AnimatePresence mode="wait" initial={false}>
          {stage === 'start' && (
            <motion.div
              key="start"
              custom="start"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <StartScreen onStart={handleStart} />
            </motion.div>
          )}
          {stage === 'quiz' && quizData && (
            <motion.div
              key="quiz"
              custom="quiz"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Quiz quizData={quizData} onQuizComplete={handleQuizComplete} />
            </motion.div>
          )}
          {stage === 'result' && quizData && (
            <motion.div
              key="result"
              custom="result"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Result
                score={finalScore}
                totalQuestions={quizData.questions.length}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default App;
