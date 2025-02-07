// src/components/StartScreen.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface StartScreenProps {
  onStart: () => void;
}

// Animation variants for the container card.
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: 'easeOut' } 
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

// Animation variants for the heading.
const headingVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  },
};

// Animation variants for the paragraph.
const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } 
  },
};

// Animation variants for the button.
const buttonVariants = {
  hover: { 
    scale: 1.05, 
    boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
    transition: { type: 'spring', stiffness: 300 }
  },
};

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <motion.div
      className="flex flex-col items-center p-8 bg-white bg-opacity-30 backdrop-blur-sm shadow-lg rounded-2xl border border-white border-opacity-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1
        className="text-4xl font-extrabold mb-4 text-gray-800 text-center"
        variants={headingVariants}
      >
        Welcome to the Quiz Flow!
      </motion.h1>
      <motion.p
        className="mb-6 text-lg text-gray-600 text-center max-w-md"
        variants={textVariants}
      >
        Test your knowledge and earn bonus points as you go!
      </motion.p>
      <motion.button
        onClick={onStart}
        className="px-8 py-3 bg-blue-500 text-white rounded-full font-semibold focus:outline-none"
        variants={buttonVariants}
        whileHover="hover"
      >
        Start Quiz
      </motion.button>
    </motion.div>
  );
};

export default StartScreen;
