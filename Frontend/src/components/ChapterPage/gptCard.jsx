import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import loader from "../../assets/loader.json";
import Lottie from "lottie-react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import MathInput from "react-math-keyboard";

function GPTCard({ questionId, initialPrompt }) {
  const [helpText, setHelpText] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latexInput, setLatexInput] = useState(""); // LaTeX input state
  const [currentInteractionIndex, setCurrentInteractionIndex] = useState(-1);
  const endOfMessagesRef = useRef(null);
  const mf = useRef(null);  // Ref for MathField

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
      const response = await fetch("http://localhost:3000/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: userMessage || "hint",
          sessionMessages: isInitial ? [] : helpText,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const messagesToSet = data.updatedMessages.map((message, index) => ({
          ...message,
          visible: index > 1,
        }));
        setHelpText(messagesToSet);
        setCurrentInteractionIndex(messagesToSet.length - 1);
      } else {
        throw new Error("Failed to fetch help");
      }
    } catch (error) {
      console.error("Error fetching help:", error);
      setHelpText((prev) => [
        ...prev,
        {
          role: "system",
          content: "Failed to fetch help, please try again later.",
          visible: true,
        },
      ]);
      setCurrentInteractionIndex(helpText.length);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MathJaxContext
      version={3}
      config={{
        loader: { load: ["input/tex", "output/svg", "ui/menu", "[tex]/html"] },
        tex: {
          packages: { "[+]": ["html"] },
        },
      }}
    >
      <div className="my-4">
        {loading ? (
          <Lottie
            animationData={loader}
            loop={true}
            style={{ height: 150, width: 150 }}
          />
        ) : (
          helpText.map(
            (ht, index) =>
              ht.visible && (
                <div
                  key={index}
                  className={`p-4 border rounded-md bg-slate-200 shadow transition-transform duration-500 ${
                    index === currentInteractionIndex ? "mb-0" : "mb-4"
                  }`}
                >
                  <MathJax>
                    <p className={`text-left p-4 ${ht.role === "system" ? "font-bold" : "text-slate-600 bg-slate-200 rounded-xl"}`}>
                      {ht.content}
                    </p>
                  </MathJax>
                  {index === currentInteractionIndex && (
                    <div className="transition-transform duration-500">
                      <MathInput
                        setValue={setLatexInput}
                        setMathfieldRef={(mathfield) => mf.current = mathfield}
                        placeholder="Type your response..."
                      />
                      <Button
                        type="button"
                        className="mt-4 m-2 rounded-full"
                        onClick={() => {
                          console.log("Current LaTeX value:", mf.current.latex());
                          fetchHelp(latexInput);
                          setLatexInput("");
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  )}
                </div>
              )
          )
        )}
        <div ref={endOfMessagesRef} />
      </div>
    </MathJaxContext>
  );
}

export default GPTCard;
