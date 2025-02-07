import { motion } from "framer-motion";

interface Option {
  id: string | number;
  description: string;
  is_correct: boolean;
}

interface QuestionType {
  description: string;
  options: Option[];
}

interface QuestionProps {
  question: QuestionType;
  onAnswerSelected: (selectedOption: string) => void;
}

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const buttonVariants = {
  hover: { scale: 1.03, transition: { duration: 0.2 } },
  tap: { scale: 0.97 },
};

const Question: React.FC<QuestionProps> = ({ question, onAnswerSelected }) => {
  return (
    <motion.div
      className="w-full max-w-2xl p-5 "
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      {/* Question Text */}
      <motion.p
        className="text-lg font-medium text-gray-800 mb-5 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
      >
        <b>Question:</b> {question.description}
      </motion.p>

      {/* Answer Options */}
      <div className="flex flex-col space-y-3">
        {question.options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => onAnswerSelected(option.description)}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-5 py-2 bg-indigo-500 text-white font-medium rounded-lg shadow-md hover:bg-indigo-600 transition-all"
          >
            {option.description}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Question;
