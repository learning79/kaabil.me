import React, { useState, useEffect } from 'react';
import Navbar from "../Dashboard/Navbar";
import QuestionCard from "./QuestionCard";
import { Button } from '../ui/button';

const questions = [
    { 
      id: 1, 
      question: "Which celestial body is known to influence ocean tides on Earth?", 
      hint: "It's closest to Earth and has a significant gravitational pull.", 
      answer: "The Moon"
    },
    { 
      id: 2, 
      question: "This object is Earth's only natural satellite. What is it?", 
      hint: "It is visible in the night sky and sometimes during the day.", 
      answer: "The Moon"
    },
    { 
      id: 3, 
      question: "Known for its phases, this object undergoes a cycle of appearances through new, quarter, and full stages. What is it?", 
      hint: "It's often full during certain times of the month.", 
      answer: "The Moon"
    },
    { 
      id: 4, 
      question: "Which celestial object did the Apollo missions famously land on in 1969?", 
      hint: "This event was watched by millions of people on Earth.", 
      answer: "The Moon"
    },
    { 
      id: 5, 
      question: "This body controls the night, has no atmosphere, and has been a subject of human fascination for millennia. Name it.", 
      hint: "Often associated with werewolves in mythology.", 
      answer: "The Moon"
    },
    { 
      id: 6, 
      question: "What object orbits the Earth approximately every 27 days?", 
      hint: "Its orbit is the reason we see it move through different phases.", 
      answer: "The Moon"
    },
    { 
      id: 7, 
      question: "Identify the object that is believed to have formed about 4.5 billion years ago, likely as a result of a massive impact between Earth and a Mars-sized body.", 
      hint: "It's the fifth-largest natural satellite in the Solar System.", 
      answer: "The Moon"
    },
    { 
      id: 8, 
      question: "What is the brightest object in the night sky that is not a star?", 
      hint: "Its surface reflects the light of the Sun.", 
      answer: "The Moon"
    },
    { 
      id: 9, 
      question: "This object's gravitational pull causes lunar tides. What is it?", 
      hint: "This pull affects both the oceans and some aspects of weather.", 
      answer: "The  Moon"
    },
    { 
      id: 10, 
      question: "Finally, this object has been a destination for NASA and other space agencies aiming to establish human presence beyond Earth. Name it.", 
      hint: "Future missions may use it as a stepping stone for further space exploration.", 
      answer: "The Moon"
    }
  ];
  
  
const Chapter = ({ user }) => {
  const [userInputs, setUserInputs] = useState({});
  const [currentQuestions, setCurrentQuestions] = useState([questions[0]]);
  const [animate, setAnimate] = useState(false);

  const handleCheckAnswer = (id, userInput) => {
    const question = questions.find(q => q.id === id);
    setUserInputs({...userInputs, [id]: userInput});

    if (userInput.toLowerCase() === question.answer.toLowerCase()) {
      alert("Correct answer!");
    } else {
      const nextQuestionIndex = questions.findIndex(q => q.id === id) + 1;
      if (nextQuestionIndex < questions.length) {
        setTimeout(() => {
          setAnimate(true);  // Trigger animation
          setCurrentQuestions(prevQuestions => [
            ...prevQuestions,
            questions[nextQuestionIndex]
          ]);
          setAnimate(false);  // Reset animation trigger
        }, 500);
      } else {
        alert("No more hints. The correct answer is 'Paris'.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 font-Space Grotesk">
      <Navbar user={user} />
      <div className="flex flex-col mt-40 px-4 md:px-0 md:w-3/4 mx-auto ">
        <h1 className="font-bold text-slate-800 text-3xl">
          UPSC Exam - Complete / Level 1
        </h1>
        <span className="text-slate-500 py-12">
          Sit at nisl tincidunt tortor. Varius bibendum gravida cras egestas.
          Placerat neque risus id elementum et laoreet non dignissim. Ipsum
          tincidunt vitae nunc blandit elementum varius. Nulla velit blandit
          gravida gravida sodales nunc habitant semper fringilla. Sapien vitae
          id bibendum tincidunt. Egestas neque fringilla vulputate tristique
          ullamcorper volutpat egestas pellentesque parturient.
        </span>
        <div className="flex flex-col items-center py-12">
          {currentQuestions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question.question}
              userInput={userInputs[question.id] || ""}
              setUserInput={(input) => setUserInputs({...userInputs, [question.id]: input})}
              handleCheckAnswer={() => handleCheckAnswer(question.id, userInputs[question.id] || "")}
              className={`${index > 0 && animate ? 'opacity-0' : 'opacity-100'}`}
            />
          ))}
        </div>
       <div className='flex  justify-end py-2'>
       <Button variant={'ghost'} className="mr-2 rounded-full">
            Back
        </Button>
        <Button className="rounded-full">
            Next
        </Button>
       </div>
      </div>
      
    </div>
  );
};

export default Chapter;
