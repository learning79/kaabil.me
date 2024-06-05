import React from 'react';
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea"

const QuestionCard = ({ question, userInput, setUserInput, handleCheckAnswer }) => {
    return (
        <div className="flex flex-col bg-slate-200 rounded-md justify-start w-full my-4 transition-opacity duration-500 ease-in-out">
            <div className='px-8 py-4 flex flex-col '>
            <h1 className='py-4'>{question}</h1>
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your answer here"
              className="input bg-white border py-4 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500 w-full"
            />
            <Button onClick={handleCheckAnswer} className="mt-4 h-10 w-24 rounded-full px-4 py-2">
              Check Now
            </Button>
            </div>
        </div>
    );
};

export default QuestionCard;
