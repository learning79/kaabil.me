import React, { useState } from "react";
import { Button } from "../ui/button";

function GPTCard({ questionId, triggerHelp }) {
  const [helpText, setHelpText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHelp = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tutoring', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput: 'hint',
          sessionMessages: [{ role: "user", content: `Need help with question ID ${questionId}` }],
        }),
      });
      const data = await response.json();
      setHelpText(data.systemResponse);
    } catch (error) {
      console.error('Error fetching help:', error);
      setHelpText("Failed to fetch help, please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="my-4 p-4 border rounded-md bg-white shadow">
      {loading ? (
        <p>Loading help...</p>
      ) : helpText ? (
        <p>{helpText}</p>
      ) : (
        <Button onClick={fetchHelp}>
          Get Help
        </Button>
      )}
    </div>
  );
}

export default GPTCard;
