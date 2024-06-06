import React, { useEffect, useState } from "react";
import { Button } from "../ui/button"; 
import  loader  from "../../assets/loader.json";
import Lottie from "lottie-react";



function GPTCard({ questionId, initialPrompt }) {
  const [helpText, setHelpText] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  // Fetch initial help upon mounting if an initial prompt is provided
  useEffect(() => {
    if (initialPrompt && helpText.length === 0) {
      fetchHelp(initialPrompt,true);
    }
  }, [initialPrompt]);

  const fetchHelp = async (userMessage, isInitial = false) => {
    setLoading(true);
    const message = { role: "user", content: userMessage };
    try {
    //  const sessionMessages = [...helpText, { role: "user", content: userMessage }];
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
        // Directly set the fetched data without adding the user input to the array
        setHelpText(data.updatedMessages);
      } else {
        throw new Error('Failed to fetch help');
      }
    } catch (error) {
      console.error('Error fetching help:', error);
      setHelpText(prev => [...prev, { role: 'system', content: "Failed to fetch help, please try again later." }]);
    }
    finally {
        setLoading(false);
        // Only clear the input field if it's not the initial prompt
        if (!isInitial) {
          setUserInput("");
        }
    }
  };

  return (
    <div className="my-4 p-4 border rounded-md bg-white shadow transition-transform duration-500">
      {loading ? (
        <Lottie animationData={loader} loop={true} />
      ) : (
        <>
          {helpText.map((ht, index) => (
            <p key={index} className={ht.role === "user" ? "font-bold bg-slate-200 rounded-xl  text-right p-4" : "text-left p-4"}>
              {ht.content}
            </p>
          ))}
          <div className="mt-4 m-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="border rounded p-2 w-full"
            />
            <Button className="mt-4" onClick={() => fetchHelp(userInput)}>
              Send
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default GPTCard;
