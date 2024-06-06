import React from 'react';
import { Button } from "../ui/button";

const QuestionCard = ({ question, options, userInput, setUserInput, handleCheckAnswer }) => {
    const optionKeys = Object.keys(options); // Get all the keys of the options object

    return (
        <div className="flex flex-col bg-slate-200 rounded-md justify-start w-full my-4 transition-opacity duration-500 ease-in-out">
            <div className='px-8 py-4 flex flex-col'>
                <h1 className='py-4'>{question}</h1>
                {optionKeys.map((key) => (
                    <label key={key} className="text-lg mb-2 flex items-center">
                        <input
                            type="radio"
                            name="option"
                            value={key}
                            checked={userInput === key}
                            onChange={() => setUserInput(key)}
                            className="mr-2"
                        />
                        {options[key]}
                    </label>
                ))}
                <Button onClick={() => handleCheckAnswer(userInput)} className="mt-4 h-10 w-28 rounded-full  px-4 py-2">
                    Check Now
                </Button>
            </div>
        </div>
    );
};

export default QuestionCard;
