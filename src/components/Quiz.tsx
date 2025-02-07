
import { useState } from 'react';
import Question from './Question';

function Quiz({ quizData, onQuizComplete }) {
  const questions = quizData.questions;
  console.log(questions)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bonusMessage, setBonusMessage] = useState('');

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    let updatedScore = score;
    let updatedStreak = streak;

    if (selectedOption === currentQuestion.correctAnswer) {
      // Award points for the correct answer (default is 10 if not specified)
      const pointsAwarded = currentQuestion.points || 10;
      updatedScore += pointsAwarded;
      updatedStreak += 1;
      // Award bonus points for every 3 consecutive correct answers
      if (updatedStreak % 3 === 0) {
        const bonus = 5;
        updatedScore += bonus;
        setBonusMessage(`Bonus! Extra ${bonus} points for a ${updatedStreak} streak!`);
        setTimeout(() => {
          setBonusMessage('');
        }, 2000);
      }
    } else {
      // Incorrect answer resets the streak
      updatedStreak = 0;
    }

    setScore(updatedScore);
    setStreak(updatedStreak);

    // Move to the next question or complete the quiz
    if (currentQuestionIndex === questions.length - 1) {
      onQuizComplete(updatedScore);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white shadow rounded-lg">
      {/* Header: Displays current question count, score, and streak */}
      <div className="w-full flex justify-between mb-4">
        <div className="text-lg font-semibold">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="text-lg font-semibold">Score: {score}</div>
        <div className="text-lg font-semibold">Streak: {streak}</div>
      </div>
      
      {/* Display the current question */}
      <Question 
        question={questions[currentQuestionIndex]} 
        onAnswerSelected={handleAnswer} 
      />

      {/* Bonus message display */}
      {bonusMessage && (
        <div className="mt-4 p-2 bg-green-500 text-white rounded">
          {bonusMessage}
        </div>
      )}
    </div>
  );
}

export default Quiz;
