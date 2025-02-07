// src/App.jsx
import  { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stage, setStage] = useState('start'); // 'start', 'quiz', or 'result'
  const [finalScore, setFinalScore] = useState(0);

  // Fetch quiz data from the API endpoint on mount
  useEffect(() => {
    fetch('/api/Uw5CrX')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        return response.json();
      })
      .then((data) => {
        setQuizData(data);
        console.log(data)
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleStart = () => {
    setStage('quiz');
  };

  const handleQuizComplete = (score) => {
    setFinalScore(score);
    setStage('result');
  };

  const handleRestart = () => {
    // Option 1: Reload the page to restart the quiz
    window.location.reload();
    // Option 2: Reset state values if you prefer a smoother restart:
    // setStage('start');
    // setFinalScore(0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading quiz...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {stage === 'start' && <StartScreen onStart={handleStart} />}
      {stage === 'quiz' && (
        <Quiz quizData={quizData} onQuizComplete={handleQuizComplete} />
      )}
      {stage === 'result' && (
        <Result
          score={finalScore}
          totalQuestions={quizData.questions.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
