import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const QuestionCard = ({ questionType, question, options, userInput, setUserInput, handleCheckAnswer }) => {
    const optionKeys = Object.keys(options);
   // const [buttonDisabled, setButtonDisabled] = useState(false);
   const preprocessLatex = (latexString) => {
    // Remove unwanted outer braces or adjust based on your specific needs
    return latexString.replace(/^\{|\}$/g, ''); // This regex removes braces at the start or end of the string
};

    console.log("This question type is:",{questionType});
    // UseEffect to re-render MathJax upon option changes
        
        useEffect(() => {
            async function typesetMath() {
                if (window.MathJax) {
                    try {
                        await window.MathJax.typesetPromise();
                    } catch (error) {
                        console.error('MathJax typesetting failed:', error);
                    }
                }
            }

            typesetMath();
        }, [question, options, userInput]);




    return (
        <MathJaxContext version={3} config={{
    
          loader: { load: ['input/tex', 'output/svg'] },
          tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
        }}>
        
            <div className="flex flex-col  bg-slate-200 rounded-md justify-start w-full my-4 transition-opacity duration-500 ease-in-out">
                <div className='px-6 py-4 flex flex-col '>
                    <MathJax><h1 className='py-4 font-bold'>{`Q) `+question}</h1></MathJax>
                    {optionKeys.map((key) => (
                        <label key={key} className="text-lg mb-2 flex hover:bg-slate-300 rounded-xl lg:w-3/4 w-full md:w-3/4 p-1 px duration-500 items-center">
                            <input
                                type="radio"
                                name="option"
                                value={key}
                                checked={userInput === key}
                                onChange={() => setUserInput(key)}
                                className="mr-2"
                            />
                           <MathJax>{preprocessLatex(options[key])}</MathJax>
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
