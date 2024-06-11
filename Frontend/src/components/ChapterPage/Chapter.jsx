import React, { useState, useEffect } from "react";
import Navbar from "../Dashboard/Navbar";
import QuestionCard from "./QuestionCard";
import { Button } from "../ui/button";
import GPTCard from "./gptCard";

const Chapter = ({ user }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInputs, setUserInputs] = useState({});
  const [interactionHistory, setInteractionHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];
  // Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/lessons");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setQuestions(data); // Assuming the data is in the format expected
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  console.log(questions);

  // const currentQuestion = questions[currentQuestionIndex] || {};

  const handleCheckAnswer = (id, userInput) => {
    if (!userInput) {
      alert("Please select an option before talking to the assistant");
      return;
    }
    const question = questions.find((q) => q.id === id);
    setUserInputs((prev) => ({ ...prev, [id]: userInput }));
    console.log(question.solution);
    console.log("Solution is:",question.  options[userInput])
    if (userInput.toLowerCase() === question.solution.toLowerCase()) {
      alert("Correct answer!");
      setInteractionHistory((prev) =>
        prev.filter((interaction) => interaction.questionId !== id)
      );
    } else {
      const initialPrompt = `the student doesn't know about you so introduce urself in one sentence (make a mythical identity) and mention that you have selected the wrong option
      Help the student stepwise answer in maths with proper spacing and let them conclude to answer, be quick with replies`;
      setInteractionHistory((prev) => [
        ...prev,
        { questionId: id, initialPrompt },
      ]);
    }
  };

  const handleNext = () => {
    if (!userInputs[currentQuestion.id]) {
      alert("Please select an option before moving to the next question.");
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col min-h-screen w-full text-blacks bg-slate-100 ">
      <Navbar user={user} />
      <div className="flex flex-col mt-28 w-full md:w-3/4 md:mx-auto lg:mx-auto px-2">
        <h1 className="font-bold text-slate-800 text-3xl">
          Advanced Mathematics Quiz
        </h1>
        <span className="text-slate-500 py-4">
          Detailed context for the quiz or other informative text.
        </span>
        <div className="flex flex-col items-center py-12">
          {currentQuestion && (
            <QuestionCard
              key={currentQuestion.id}
              questionType={currentQuestion.question_type}
              question={currentQuestion.question}
              options={currentQuestion.options}
              userInput={userInputs[currentQuestion.id] || ""}
              setUserInput={(input) =>
                setUserInputs({ ...userInputs, [currentQuestion.id]: input })
              }
              handleCheckAnswer={() =>
                handleCheckAnswer(
                  currentQuestion.id,
                  userInputs[currentQuestion.id] || ""
                )
              }
            />
          )}
          {interactionHistory
            .filter(
              (interaction) => interaction.questionId === currentQuestion.id
            )
            .map((interaction) => (
              <GPTCard
                key={`gpt-${interaction.questionId}`}
                questionId={interaction.questionId}
                initialPrompt={interaction.initialPrompt}
              />
            ))}
        </div>
        <div className="flex justify-end py-2">
          <Button className="mr-2 rounded-full" onClick={handleBack}>
            Back
          </Button>
          <Button className="rounded-full" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
