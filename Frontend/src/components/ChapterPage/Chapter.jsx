import React, { useState } from "react";
import Navbar from "../Dashboard/Navbar";
import QuestionCard from "./QuestionCard";
import { Button } from "../ui/button";
import GPTCard from "./gptCard";
import ConfettiExplosion from "react-confetti-explosion";

const questions = [
  {
    id: 1,
    question:
      "For any θ in (π/4, π/2), the expression 3(sin θ - cos θ)^4 + 6(sin θ + cos θ)^2 + 4 sin^6 θ equals:",
    options: {
      a: "13 - 4 cos^2 θ + 6 sin^2 θ cos^2 θ",
      b: "13 - 4 cos^6 θ",
      c: "13 - 4 cos^2 θ + 6 cos^4 θ",
      d: "13 - 4 cos^4 θ + 2 sin^2 θ cos^2 θ",
    },
    solution: "b",
    reference: "Main Jan. 9, 2019 (I)",
  },
  // {
  //   id: 2,
  //   question:
  //     "Let f_k(x) = 1/k (sin^k x + cos^k x) where x ∈ R and k ≥ 1. Then f_4(x) - f_6(x) equals",
  //   options: {
  //     a: "1/4",
  //     b: "1/12",
  //     c: "1/6",
  //     d: "1/3",
  //   },
  //   solution: "b",
  //   reference: "Main 2014",
  // },
  // {
  //   id: 3,
  //   question:
  //     "If 2 cos θ + sin θ = 1 (θ ≠ π/2), then 7 cos θ + 6 sin θ is equal to:",
  //   options: {
  //     a: "1/2",
  //     b: "2",
  //     c: "11/2",
  //     d: "46/5",
  //   },
  //   solution: "d",
  //   reference: "Main Online April 11, 2014",
  // },
  // {
  //   id: 4,
  //   question:
  //     "The expression (tan A / (1 - cot A)) + (cot A / (1 - tan A)) can be written as:",
  //   options: {
  //     a: "sin A cos A + 1",
  //     b: "sec A cosec A + 1",
  //     c: "tan A + cot A",
  //     d: "sec A + cosec A",
  //   },
  //   solution: "b",
  //   reference: "Main 2013",
  // },
  // {
  //   id: 5,
  //   question:
  //     "Given both θ and φ are acute angles and sin θ = 1/2, cos φ = 1/3, then the value of θ + φ belongs to",
  //   options: {
  //     a: "(π/3, π/2]",
  //     b: "(π/2, 2π/3)",
  //     c: "(2π/3, 5π/6]",
  //     d: "(5π/6, π)",
  //   },
  //   solution: "b",
  //   reference: "2004S",
  // },
  // {
  //   id: 6,
  //   question:
  //     "If ω is an imaginary cube root of unity then the value of sin {(ω^10 + ω^23)π - π/4} is",
  //   options: {
  //     a: "-√3/2",
  //     b: "-1/√2",
  //     c: "1/√2",
  //     d: "√3/2",
  //   },
  //   solution: "c",
  //   reference: "1994",
  // },
  // {
  //   id: 7,
  //   question: "If tan θ = -4/3, then sin θ is",
  //   options: {
  //     a: "-4/5 but not 4/5",
  //     b: "-4/5 or 4/5",
  //     c: "4/5 but not -4/5",
  //     d: "None of these",
  //   },
  //   solution: "b",
  //   reference: "1998 - 2 Marks",
  // },
  // {
  //   id: 8,
  //   question: "Which of the following number(s) is/are rational?",
  //   options: {
  //     a: "sin 15°",
  //     b: "cos 15°",
  //     c: "sin 15° cos 15°",
  //     d: "sin 15° cos 75°",
  //   },
  //   solution: "c",
  //   reference: "1998 - 2 Marks",
  // },
  // {
  //   id: 9,
  //   question:
  //     "If the triangle PQR varies, then the minimum value of cos (P+Q) + cos (Q+R) + cos (R+P) is",
  //   options: {
  //     a: "-5/3",
  //     b: "-3/2",
  //     c: "3/2",
  //     d: "5/3",
  //   },
  //   solution: "b",
  //   reference: "2004",
  // },
  // {
  //   id: 10,
  //   question:
  //     "Find the range of values of t for which 2 sin t = (1 - 2x + 5x^2) / (3x^2 - 2x - 1), t ∈ [-π/2, π/2].",
  //   options: {
  //     a: "[-π/2, -π/10] ∪ [3π/10, π/2]",
  //     b: "[-π/10, 3π/10]",
  //     c: "[-π/2, π/2]",
  //     d: "None",
  //   },
  //   solution: "a",
  //   reference: "1992 - 2 Marks",
  // },
];

const Chapter = ({ user }) => {
    const [userInputs, setUserInputs] = useState({});
    const [currentQuestions, setCurrentQuestions] = useState([questions[0]]);
    const [animate, setAnimate] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const handleCheckAnswer = (id, userInput) => {
      const questionIndex = questions.findIndex((q) => q.id === id);
      const question = questions[questionIndex];
  
      setUserInputs({ ...userInputs, [id]: userInput });
  
      if (userInput.toLowerCase() === question.solution.toLowerCase()) {
        alert("Correct answer!");
        setShowHelp(false); // Hide help if answer is correct

      } else {
        setShowHelp(true); // Show help if answer is incorrect

        // const nextQuestionIndex = questionIndex + 1;
        // if (nextQuestionIndex < questions.length) {
        //   setTimeout(() => {
        //     setAnimate(true);
        //     setCurrentQuestions((prevQuestions) => [
        //       ...prevQuestions,
        //       questions[nextQuestionIndex]
        //     ]);
        //     setAnimate(false);
        //   }, 500);
        // } else {
        //   alert("No more questions available.");
        // }
      }
    };
  
    return (
      <div className="flex flex-col min-h-screen bg-slate-100 font-Space Grotesk">
        <Navbar user={user} />
        <div className="flex flex-col mt-40 px-4 md:px-0 md:w-3/4 mx-auto">
          <h1 className="font-bold text-slate-800 text-3xl">Advanced Mathematics Quiz</h1>
          <span className="text-slate-500 py-4">
            Detailed context for the quiz or other informative text.
          </span>
          <div className="flex flex-col items-center py-12">
            {currentQuestions.map((q, index) => (
              <React.Fragment key={q.id}>
              <QuestionCard
                key={q.id}
                question={q.question}
                options={q.options}
                userInput={userInputs[q.id] || ""}
                setUserInput={(input) =>
                  setUserInputs({ ...userInputs, [q.id]: input })
                }
                handleCheckAnswer={() =>
                  handleCheckAnswer(q.id, userInputs[q.id] || "")
                }
               
              />
               {showHelp && <GPTCard questionId={q.id} />}

              </React.Fragment>
             
            ))} 
   
          </div>
          <div className="flex justify-end py-2">
            <Button className="mr-2 rounded-full" onClick={() => setCurrentQuestions(currentQuestions.slice(0, -1))}>Back</Button>
            <Button className="rounded-full">Next</Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Chapter;