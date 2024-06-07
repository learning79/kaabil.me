import React, { useEffect,useRef, useState } from "react";
import { Button } from "../ui/button";
import loader from "../../assets/loader.json";
import Lottie from "lottie-react";
import { MathJax, MathJaxContext } from 'better-react-mathjax';



function GPTCard({ questionId, initialPrompt }) {
  const [helpText, setHelpText] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [currentInteractionIndex, setCurrentInteractionIndex] = useState(-1);
  const endOfMessagesRef = useRef(null);

  // Fetch initial help upon mounting if an initial prompt is provided
  useEffect(() => {
    if (initialPrompt && helpText.length === 0) {
      fetchHelp(initialPrompt, true);
    }
  }, [initialPrompt]);
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [helpText]);

  const fetchHelp = async (userMessage, isInitial = false) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput: userMessage || 'hint',
          sessionMessages: isInitial ? [] : helpText,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const messagesToSet = data.updatedMessages.map((message, index) => ({
          ...message,
          visible:  index > 1  // Make the first message of initial fetch invisible
        }));
        setHelpText(messagesToSet);
        setCurrentInteractionIndex(messagesToSet.length - 1);
      } else {
        throw new Error('Failed to fetch help');
      }
    } catch (error) {
      console.error('Error fetching help:', error);
      setHelpText(prev => [...prev, { role: 'system', content: "Failed to fetch help, please try again later.", visible: true }]);
      setCurrentInteractionIndex(helpText.length);
    } finally {
      setLoading(false);
    }
  };
  

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    if (userInput.trim()) {
      fetchHelp(userInput);
      setUserInput("");
    }
  };

  return (
    <MathJaxContext version={3} config={{
      loader: { load: ['input/tex', 'output/svg'] },
      tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
    }}>
    <div className="my-4">
      {loading ? (
        <Lottie animationData={loader} loop={true} style={{ height: 150, width: 150 }} />
      ) : (
        helpText.map((ht, index) =>ht.visible && (
          <div key={index} className={`p-4 border rounded-md bg-slate-200 shadow  transition-transform duration-500 ${index === currentInteractionIndex ? "mb-0" : "mb-4"}`}>
            
            <p  className={ht.role === "user" ? " text-slate-600 overflow-x-hidden  bg-slate-200 rounded-xl text-left p-4" : " font-bold text-left p-4"}>
            {ht.content}
            </p>
           
            {index === currentInteractionIndex && (
              <div className="transition-transform duration-500  ">
                <input
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder="Type your response..."
                  className="border p-4 m-2 mt-2 w-full bg-white rounded-xl"
                />
                <Button className="mt-4 m-2 rounded-full" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            )}
          </div>
        ))
      )}
    <div ref={endOfMessagesRef} />
    </div>
    </MathJaxContext>
  );
}

export default GPTCard;
