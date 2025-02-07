import { motion } from "framer-motion";

interface ResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ score, totalQuestions, onRestart }) => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  // Animation variants for the text
  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Animation variants for the button
  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)", 
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center py-6 bg-white shadow-lg rounded-2xl w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4"
        variants={textVariants}
      >
        Quiz Completed!
      </motion.h1>
      <motion.p
        className="text-xl sm:text-2xl mb-2 text-gray-600"
        variants={textVariants}
      >
        Your total score: <strong>{score}</strong>
      </motion.p>
      <motion.p
        className="text-lg sm:text-xl mb-6 text-gray-600"
        variants={textVariants}
      >
        You answered all {totalQuestions} questions.
      </motion.p>
      <motion.button
        onClick={onRestart}
        className="px-8 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition"
        variants={buttonVariants}
        whileHover="hover"
      >
        Restart Quiz
      </motion.button>
    </motion.div>
  );
};

export default Result;
