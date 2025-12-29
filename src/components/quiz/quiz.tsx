"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/lib/data/stocks";

interface QuizProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctIndex;
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setCompleted(true);
      onComplete?.(score + (isCorrect ? 1 : 0), questions.length);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  if (completed) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">Quiz Complete!</h2>
        <p className="text-4xl font-bold text-primary">
          {finalScore} / {questions.length}
        </p>
        <p className="text-muted-foreground">You scored {percentage}%</p>
        {percentage >= 70 ? (
          <p className="text-green-600 dark:text-green-400 font-medium">
            Great job! You passed the quiz.
          </p>
        ) : (
          <p className="text-amber-600 dark:text-amber-400 font-medium">
            Keep learning! Review the lesson and try again.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Question {currentIndex + 1} of {questions.length}
        </span>
        <span>Score: {score}</span>
      </div>

      <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>

      <div className="space-y-2">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelectAnswer(index)}
            disabled={showFeedback}
            className={cn(
              "w-full rounded-lg border p-4 text-left transition-colors",
              selectedAnswer === index && !showFeedback && "border-primary bg-primary/5",
              showFeedback && index === currentQuestion.correctIndex && "border-green-500 bg-green-50 dark:bg-green-950",
              showFeedback && selectedAnswer === index && index !== currentQuestion.correctIndex && "border-red-500 bg-red-50 dark:bg-red-950",
              !showFeedback && "hover:border-primary/50 hover:bg-muted/50"
            )}
          >
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div
          className={cn(
            "rounded-lg p-4",
            isCorrect
              ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200"
              : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200"
          )}
        >
          <p className="font-medium mb-1">
            {isCorrect ? "Correct!" : "Incorrect"}
          </p>
          <p className="text-sm">{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="flex justify-end gap-2">
        {!showFeedback ? (
          <Button onClick={handleSubmit} disabled={selectedAnswer === null}>
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {isLastQuestion ? "See Results" : "Next Question"}
          </Button>
        )}
      </div>
    </div>
  );
}
