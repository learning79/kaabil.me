import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../Dashboard/Navbar";
import QuestionCard from "./QuestionCard";
import { Button } from "../ui/button";
import back from "../../assets/back.png";
import GPTCard from "./gptCard";

const Chapter = ({ user }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInputs, setUserInputs] = useState({});
  const [interactionHistory, setInteractionHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Load stored state from local storage when component mounts
  useEffect(() => {
    const storedUserInputs = localStorage.getItem('userInputs');
    const storedHistory = localStorage.getItem('interactionHistory');
    const storedQuestionIndex = localStorage.getItem('currentQuestionIndex');

    if (storedUserInputs) {
        setUserInputs(JSON.parse(storedUserInputs));
    }
    if (storedHistory) {
        setInteractionHistory(JSON.parse(storedHistory));
    }
    if (storedQuestionIndex) {
        setCurrentQuestionIndex(parseInt(storedQuestionIndex, 10));
    } else {
        setCurrentQuestionIndex(0); // Default to the first question if no index is stored
    }
}, []);


  // Save to local storage on state changes
  useEffect(() => {
    if (Object.keys(userInputs).length > 0 && interactionHistory.length > 0) {
      localStorage.setItem('userInputs', JSON.stringify(userInputs));
      localStorage.setItem('interactionHistory', JSON.stringify(interactionHistory));
      localStorage.setItem('currentQuestionIndex', currentQuestionIndex.toString());
    }
  }, [userInputs, interactionHistory, currentQuestionIndex]);
  
  const handleCheckAnswer = useCallback((id, userInput) => {
    if (!userInput) {
      alert("Please select an option before talking to the assistant");
      return;
    }
    const question = questions.find((q) => q.id === id);
    setUserInputs((prev) => ({ ...prev, [id]: userInput }));
    console.log(question.solution);
    console.log("Solution is:", question.options[userInput])
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
  }, [questions]);
  

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const handleBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }, [currentQuestionIndex]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col min-h-screen w-full text-black bg-slate-100">
      <Navbar user={user} />
      
      <div className="flex flex-col mt-28 w-full md:w-3/4 md:mx-auto lg:mx-auto">
      <Button className="h-10 flex w-32 rounded-full bg-bluebg hover:bg-blue-700">
        <img src={back} className="h-[10px] w-[10px]"></img>
        Back to Lesson
      </Button>
        <div className="flex flex-col items-center px-2 py-12">
          {questions[currentQuestionIndex] && (
            <QuestionCard
              key={questions[currentQuestionIndex].id}
              questionType={questions[currentQuestionIndex].question_type}
              question={questions[currentQuestionIndex].question}
              options={questions[currentQuestionIndex].options}
              userInput={userInputs[questions[currentQuestionIndex].id] || ""}
              setUserInput={(input) =>
                setUserInputs({ ...userInputs, [questions[currentQuestionIndex].id]: input })
              }
              handleCheckAnswer={() =>
                handleCheckAnswer(
                  questions[currentQuestionIndex].id,
                  userInputs[questions[currentQuestionIndex].id] || ""
                )
              }
            />
          )}
          <div className="flex flex-col items-center">
            {interactionHistory
              .filter(
                (interaction) => interaction.questionId === questions[currentQuestionIndex].id
              )
              .map((interaction) => (
                <GPTCard
                  key={`gpt-${interaction.questionId}`}
                  questionId={interaction.questionId}
                  initialPrompt={interaction.initialPrompt}
                />
              ))}
          </div>
        </div>
        <div className="flex justify-end py-2">
          <Button className="mr-2 rounded-full" onClick={handleBack}>
            Back
          </Button>
          <Button className="rounded-full mr-1" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
