import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const QuestionCard = ({ id,questionType, question, options, userInput, setUserInput, handleCheckAnswer, answer }) => {
    const handleNumericalInput = (input) => {
        setUserInput(input);
    };
    const specificIds = [258, 259, 260]; 
 
    const submitNumericalAnswer = () => {
        // Assuming the correct answer is in the 'answer' prop
        if (userInput === answer) {
            alert("Correct answer!");
            // Possibly update the interaction history or other state to reflect the correct answer
        } else {
            alert("Incorrect, try again!");
            // Update interaction history with an incorrect attempt
            handleCheckAnswer(userInput); // You can adjust handleCheckAnswer to handle this scenario
        }
    };

    useEffect(() => {
        async function typesetMath() {
            if (window.MathJax) {
                await window.MathJax.typesetPromise().catch(error => console.error('MathJax typesetting failed:', error));
            }
        }
        typesetMath();
    }, [question, options, userInput]);
    
    return (
        <MathJaxContext version={3} config={{
            loader: { load: ['input/tex', 'output/svg'] },
            tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
        }}>
            <div className="flex flex-col bg-slate-200 rounded-md justify-start w-full my-4">
                <div className='px-6 py-4 flex flex-col'>
                    <MathJax><h1 className='py-4 font-bold'>{`Q. ${question}`}</h1></MathJax>
                    {questionType === "Numerical" ? (
                        <div>
                            <input
                                type="text"
                                value={userInput}
                                onChange={e => handleNumericalInput(e.target.value)}
                                className="border rounded p-2 text-lg w-full"
                                placeholder="Enter your answer"
                            />
                            <Button onClick={submitNumericalAnswer} className="mt-4 h-10 w-28 rounded-full">
                                Submit Answer
                            </Button>
                        </div>
                    ) : (
                        options ? (
                            options.map((option, key) => (
                              <label key={key} className="text-lg mb-2 flex hover:bg-slate-300 rounded-xl p-1 items-center">
                                <input
                                  type="radio"
                                  name={`option-${id}`}
                                  value={key}
                                  checked={userInput === key.toString()}
                                  onChange={() => setUserInput(key.toString())}
                                  className="mr-2"
                                />
                                {specificIds.includes(id) ? (
                                  <MathJax inline>{`$${option}$`}</MathJax>
                                ) : (
                                  <MathJax>{option}</MathJax>
                                )}
                              </label>
                            ))
                          ) : (
                            <div>
                            <input
                                type="text"
                                value={userInput}
                                onChange={e => handleNumericalInput(e.target.value)}
                                className="border rounded p-2 text-lg w-full"
                                placeholder="Enter your answer"
                            />
                            {/* <Button onClick={submitNumericalAnswer} className="mt-4 h-10 w-28 rounded-full">
                                Submit Answer
                            </Button> */}
                        </div>
                          )
                        )}
                    {questionType !== "Numerical" && (
                        <Button onClick={() => handleCheckAnswer(userInput)} className="mt-4 h-10 w-28 rounded-full">
                            Check Now
                        </Button>
                    )}
                </div>
            </div>
        </MathJaxContext>
    );
};

export default QuestionCard;
