import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const QuestionCard = ({ question, options, userInput, setUserInput, handleCheckAnswer }) => {
    const optionKeys = Object.keys(options);

    // UseEffect to re-render MathJax upon option changes
    // useEffect(() => {
    //     if (window.MathJax) {
    //         window.MathJax.typesetPromise();
    //     }
    // }, [options, userInput]);

    return (
        <MathJaxContext version={3} config={{
          loader: { load: ['input/tex', 'output/svg'] },
          tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
        }}>
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
                            <MathJax inline>{`$${options[key]}$`}</MathJax>
                        </label>
                    ))}
                    <Button onClick={() => handleCheckAnswer(userInput)} className="mt-4 h-10 w-28 rounded-full px-4 py-2">
                        Check Now
                    </Button>
                </div>
            </div>
        </MathJaxContext>
    );
};

export default QuestionCard;
