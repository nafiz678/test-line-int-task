
function Result({ score, totalQuestions, onRestart }) {
  return (
    <div className="flex flex-col items-center p-8 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>
      <p className="text-xl mb-2">
        Your total score: <strong>{score}</strong>
      </p>
      <p className="text-lg mb-6">
        You answered all {totalQuestions} questions.
      </p>
      <button 
        onClick={onRestart} 
        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default Result;
