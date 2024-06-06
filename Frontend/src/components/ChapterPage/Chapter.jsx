import React, { useState } from "react";
import Navbar from "../Dashboard/Navbar";
import QuestionCard from "./QuestionCard";
import { Button } from "../ui/button";
import GPTCard from "./gptCard";


const questions = [
  {
      id: 1,
      question: "For any \\(\\theta \\in (\\pi/4, \\pi/2)\\), the expression \\(3(\\sin \\theta - \\cos \\theta)^4 + 6(\\sin \\theta + \\cos \\theta)^2 + 4 \\sin^6 \\theta\\) equals:",
      options: {
        a: "13 - 4 \\cos^2 \\theta + 6 \\sin^2 \\theta \\cos^2 \\theta",
        b: "13 - 4 \\cos^6 \\theta",
        c: "13 - 4 \\cos^2 \\theta + 6 \\cos^4 \\theta",
        d: "13 - 4 \\cos^4 \\theta + 2 \\sin^2 \\theta \\cos^2 \\theta",
      },
      solution: "b",
      reference: "Main Jan. 9, 2019 (I)",
  },
  {
      id: 2,
      question: "Let \\(f_k(x) = \\frac{1}{k} (\\sin^k x + \\cos^k x)\\) where \\(x \\in \\mathbb{R}\\) and \\(k \\geq 1\\). Then \\(f_4(x) - f_6(x)\\) equals:",
      options: {
        a: "\\frac{1}{4}",
        b: "\\frac{1}{12}",
        c: "\\frac{1}{6}",
        d: "\\frac{1}{3}"
      },
      solution: "b",
      reference: "Main 2014"
  },
  {
      id: 3,
      question: "If \\(2 \\cos \\theta + \\sin \\theta = 1\\) (\\(\\theta \\neq \\frac{\\pi}{2}\\)), then \\(7 \\cos \\theta + 6 \\sin \\theta\\) is equal to:",
      options: {
        a: "\\frac{1}{2}",
        b: "2",
        c: "\\frac{11}{2}",
        d: "\\frac{46}{5}"
      },
      solution: "d",
      reference: "Main Online April 11, 2014"
  },
  {
      id: 4,
      question: "The expression \\(\\frac{\\tan A}{1 - \\cot A} + \\frac{\\cot A}{1 - \\tan A}\\) can be written as:",
      options: {
          a: "\\sin A \\cos A + 1",
          b: "\\sec A \\cosec A + 1",
          c: "\\tan A + \\cot A",
          d: "\\sec A + \\cosec A"
      },
      solution: "b",
      reference: "Main 2013"
  },
  {
      id: 5,
      question: "Given both \\(\\theta\\) and \\(\\phi\\) are acute angles and \\(\\sin \\theta = \\frac{1}{2}\\), \\(\\cos \\phi = \\frac{1}{3}\\), then the value of \\(\\theta + \\phi\\) belongs to",
      options: {
          a: "(\\pi/3, \\pi/2]",
          b: "(\\pi/2, 2\\pi/3)",
          c: "(2\\pi/3, 5\\pi/6]",
          d: "(5\\pi/6, \\pi)"
      },
      solution: "b",
      reference: "2004S"
  },
  {
      id: 6,
      question: "If \\(\\omega\\) is an imaginary cube root of unity then the value of \\(\\sin (\\omega^{10} + \\omega^{23})\\pi - \\frac{\\pi}{4}\\) is",
      options: {
          a: "-\\frac{\\sqrt{3}}{2}",
          b: "-\\frac{1}{\\sqrt{2}}",
          c: "\\frac{1}{\\sqrt{2}}",
          d: "\\frac{\\sqrt{3}}{2}"
      },
      solution: "c",
      reference: "1994"
  },
  {
      id: 7,
      question: "If \\(\\tan \\theta = -\\frac{4}{3}\\), then \\(\\sin \\theta\\) is",
      options: {
          a: "-\\frac{4}{5} but not \\frac{4}{5}",
          b: "-\\frac{4}{5} or \\frac{4}{5}",
          c: "\\frac{4}{5} but not -\\frac{4}{5}",
          d: "None of these"
      },
      solution: "b",
      reference: "1998 - 2 Marks"
  },
  {
      id: 8,
      question: "Which of the following number(s) is/are rational?",
      options: {
          a: "\\sin 15^{\\circ}",
          b: "\\cos 15^{\\circ}",
          c: "\\sin 15^{\\circ} \\cos 15^{\\circ}",
          d: "\\sin 15^{\\circ} \\cos 75^{\\circ}"
      },
      solution: "c",
      reference: "1998 - 2 Marks"
  },
  {
      id: 9,
      question: "If the triangle \\(PQR\\) varies, then the minimum value of \\(\\cos (P+Q) + \\cos (Q+R) + \\cos (R+P)\\) is",
      options: {
          a: "-\\frac{5}{3}",
          b: "-\\frac{3}{2}",
          c: "\\frac{3}{2}",
          d: "\\frac{5}{3}"
      },
      solution: "b",
      reference: "Derived from trigonometric identities"
  },
  // More questions can be added here with additional IDs
];

const Chapter = ({ user }) => {
 
  const [userInputs, setUserInputs] = useState({});
  const [currentQuestions, setCurrentQuestions] = useState([questions[0]]);
  const [interactionHistory, setInteractionHistory] = useState([]);

  const handleCheckAnswer = (id, userInput) => {
    const question = questions.find(q => q.id === id);
    setUserInputs(prev => ({ ...prev, [id]: userInput }));

    if (userInput.toLowerCase() === question.solution.toLowerCase()) {
      alert("Correct answer!");
      setInteractionHistory(prev => prev.filter(interaction => interaction.questionId !== id));
    } else {
      const initialPrompt = `Help the student stepwise and let them conclude to answer, be quick with replies`;
      setInteractionHistory(prev => [...prev, { questionId: id, initialPrompt }]);
    }
  };
  
  return (

    <div className="flex flex-col min-h-screen bg-slate-100">
     
      <Navbar user={user} />
      <div className="flex flex-col mt-40 mx-auto w-full md:w-3/4">
        <h1 className="font-bold text-slate-800 text-3xl">Advanced Mathematics Quiz</h1>
        <span className="text-slate-500 py-4">Detailed context for the quiz or other informative text.</span>
        <div className="flex flex-col items-center py-12">
      
          {currentQuestions.map((question, index) => (
            <React.Fragment key={question.id}>
              <QuestionCard
                question={question.question}
                options={question.options}
                userInput={userInputs[question.id] || ""}
                setUserInput={(input) => setUserInputs({ ...userInputs, [question.id]: input })}
                handleCheckAnswer={() => handleCheckAnswer(question.id, userInputs[question.id] || "")}
              />
              {interactionHistory
                .filter(interaction => interaction.questionId === question.id)
                .map(interaction => (
                  <GPTCard
                    key={`gpt-${interaction.questionId}`}
                    questionId={interaction.questionId}
                    initialPrompt={interaction.initialPrompt}
                  />
                ))}
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

