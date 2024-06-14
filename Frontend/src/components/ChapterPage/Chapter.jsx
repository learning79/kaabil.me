import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../Dashboard/Navbar";
import QuestionCard from "./QuestionCard";
import { useNavigate, useLocation } from "react-router-dom";
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
  // const [isCurrentQuestionCorrect, setIsCurrentQuestionCorrect] = useState(false);

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const location = useLocation();
  const { subject, courseId, lessonId } = location.state; // Assuming subject is passed in route state
  console.log("Subject:", subject);
  // const lessonId=1;
  console.log("Lesson ID:", lessonId);

  // Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        //  console.log(`http://localhost:3000/api/lessons/questions/${subject}/${lessonId}`);
        const response = await fetch(
          `http://localhost:3000/api/lessons/questions/${subject}/${lessonId}`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setQuestions(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const storedUserInputs = localStorage.getItem("userInputs");
    const storedHistory = localStorage.getItem("interactionHistory");
    //    const storedQuestionIndex = localStorage.getItem('currentQuestionIndex');
    const storedIndex = localStorage.getItem(
      `currentQuestionIndex-${lessonId}`
    );
    if (storedUserInputs) {
      setUserInputs(JSON.parse(storedUserInputs));
    }
    if (storedHistory) {
      setInteractionHistory(JSON.parse(storedHistory));
    }
    if (storedIndex) {
      setCurrentQuestionIndex(parseInt(storedIndex, 10));
    } else {
      setCurrentQuestionIndex(0); // Default to the first question if no index is stored
    }
  }, []);

  // Save to local storage on state changes
  useEffect(() => {
    if (Object.keys(userInputs).length > 0 && interactionHistory.length > 0) {
      localStorage.setItem(
        `currentQuestionIndex-${lessonId}`,
        JSON.stringify(currentQuestionIndex)
      );
      localStorage.setItem("userInputs", JSON.stringify(userInputs));
      localStorage.setItem(
        "interactionHistory",
        JSON.stringify(interactionHistory)
      );
      localStorage.setItem(
        "currentQuestionIndex",
        currentQuestionIndex.toString()
      );
    }
  }, [currentQuestionIndex, userInputs, interactionHistory]);

  const handleCheckAnswer = useCallback(
    (id, userInput) => {
      if (!userInput) {
        alert(
          "Please select an option before talking to the interactive assistant"
        );
        return;
      }
      const inputToOption = ["A", "B", "C", "D"];
      const userAnswer = inputToOption[userInput];
      const question = questions.find((q) => q.id === id);
      setUserInputs((prev) => ({ ...prev, [id]: userInput }));
      console.log(question.answer);
      console.log("Solution is:", question.options[userInput]);
      if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
        alert("Correct answer!");
        setInteractionHistory((prev) =>
          prev.filter((interaction) => interaction.questionId !== id)
        );
      } else {
        console.log(question.question);
        console.log(question.options);
        console.log(question.answer);
        console.log(question.options[userInput]);
        const initialPrompt = `The student doesn't know about you so introduce yourself in one sentence (make a mythical identity) and mention that you have selected the wrong option. Here's the question: '${question.question}', here are the options:${question.options} The correct answer was: '${question.answer}'. The user selected the input ${userInput} Please try again, and let's solve it step by step.`;
        setInteractionHistory((prev) => [
          ...prev,
          { questionId: id, initialPrompt },
        ]);
      }
    },
    [questions]
  );

  const handleNext = useCallback(() => {
    const currentInput = userInputs[questions[currentQuestionIndex].id];
    // Explicitly check for undefined or any non-allowed value
    if (currentInput === undefined || currentInput === null) {
      alert(
        "Please answer the current question before moving to the next one."
      );
      return; // Stop the function if there's no answer
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Optional: Handle what happens if it's the last question (e.g., navigate away or show a message)
      alert("You have reached the end of the questions.");
    }
  }, [currentQuestionIndex, questions.length, userInputs]);

  const handleBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      alert("can't navigate");
    }
  }, [currentQuestionIndex]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col min-h-screen w-full text-black bg-slate-100">
      <div className="flex flex-col mt-28 w-full md:w-3/4 md:mx-auto lg:mx-auto">
        <div className="px-2">
          <Button
            variant="ghost"
            className="bg-slate-200"
            onClick={handleGoBack}
          >
            Lesson-{lessonId}
          </Button>
        </div>
        <div className="flex flex-col items-center px-2 py-12">
          {questions[currentQuestionIndex] && (
            <QuestionCard
              answer={questions[currentQuestionIndex].answer}
              key={questions[currentQuestionIndex].id}
              questionType={questions[currentQuestionIndex].question_type}
              question={questions[currentQuestionIndex].question}
              options={questions[currentQuestionIndex].options}
              userInput={userInputs[questions[currentQuestionIndex].id] || ""}
              setUserInput={(input) =>
                setUserInputs({
                  ...userInputs,
                  [questions[currentQuestionIndex].id]: input,
                })
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
                (interaction) =>
                  interaction.questionId === questions[currentQuestionIndex].id
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
        <div className="flex justify-start pt-2"></div>
        <div className="flex justify-between w-full py-2">
          <Button variant="ghost" onClick={handleGoBack}>
            <img src={back} className="h-[10px] w-[10px] mr-1"></img>
            Back to Lesson
          </Button>
          <div>
            <Button className="mr-2 rounded-full" onClick={handleBack}>
              Back
            </Button>
            <Button className="rounded-full mr-1" onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      </div>
      <Navbar user={user} className="" />
    </div>
  );
};

export default Chapter;
