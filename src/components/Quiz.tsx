import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Question from "./Question";

interface Option {
  description: string;
  is_correct: boolean;
}

interface QuestionType {
  question: string;
  options: Option[];
}

interface QuizData {
  questions: QuestionType[];
}

interface QuizProps {
  quizData: QuizData;
  onQuizComplete: (score: number) => void;
}

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};

const Quiz: React.FC<QuizProps> = ({ quizData, onQuizComplete }) => {
  const questions = quizData.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bonusMessage, setBonusMessage] = useState<string>("");

  const handleAnswer = (selectedOption: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    let updatedScore = score;
    let updatedStreak = streak;

    const isCorrect = currentQuestion.options.find(
      (item) => item.description === selectedOption
    );

    if (isCorrect && isCorrect.is_correct) {
      const pointsAwarded = 1;
      updatedScore += pointsAwarded;
      updatedStreak += 1;

      if (updatedStreak % 3 === 0) {
        const bonus = 5;
        updatedScore += bonus;
        setBonusMessage(`🔥 Bonus! Extra ${bonus} points for a ${updatedStreak} streak!`);

        setTimeout(() => {
          setBonusMessage("");
        }, 2000);
      }
    } else {
      updatedStreak = 0;
    }

    setScore(updatedScore);
    setStreak(updatedStreak);

    if (currentQuestionIndex === questions.length - 1) {
      setTimeout(() => onQuizComplete(updatedScore), 500);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <motion.div
      className="flex max-w-3xl flex-col items-center p-6 bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-3xl border border-gray-200"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Header: Question number, Score, Streak */}
      <motion.div
        className="w-full flex justify-between mb-4 text-lg font-semibold text-gray-700"
        variants={textVariants}
      >
        <div>📌 Question {currentQuestionIndex + 1} / {questions.length}</div>
        <div>💯 Score: {score}</div>
        <div>🔥 Streak: {streak}</div>
      </motion.div>

      {/* Display animated question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
          className="w-full"
        >
          <Question question={questions[currentQuestionIndex]} onAnswerSelected={handleAnswer} />
        </motion.div>
      </AnimatePresence>

      {/* Animated bonus message */}
      <AnimatePresence>
        {bonusMessage && (
          <motion.div
            className="mt-4 p-2 px-4 bg-green-500 text-white rounded-lg font-semibold shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {bonusMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Quiz;
