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
  
  const Question: React.FC<QuestionProps> = ({ question, onAnswerSelected }) => {
    return (
      <div className="w-full min-w-5xl">
        <p className="text-xl mb-4">{question.description}</p>
        <div className="flex flex-col space-y-2">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onAnswerSelected(option.description)}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              {option.description}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default Question;
  