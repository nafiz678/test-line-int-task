
function StartScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center p-8 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz Flow!</h1>
      <p className="mb-6 text-gray-600">
        Test your knowledge and earn bonus points as you go!
      </p>
      <button
        onClick={onStart}
        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
      >
        Start Quiz
      </button>
    </div>
  );
}

export default StartScreen;
