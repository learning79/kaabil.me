
/*
const OpenAIApi = require('openai');

const openai = new OpenAIApi.OpenAI({
  apiKey:process.env.API_KEY,
});

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

async function interactiveTutoringJson(sessionPrompt) {
  let messages = [{
    role: "system",
    content: sessionPrompt
  }];

  while (true) {
    const getUserInput = () => {
      return new Promise(resolve => {
        readline.question("Your response: ", input => {
          resolve(input);
        });
      });
    };

    const user_input = await getUserInput();

    if (user_input.trim().toLowerCase() === 'exit' || user_input.trim().toLowerCase() === 'end session' || user_input.trim().toLowerCase() === 'quit') {
      console.log("Tutor: Thank you for participating! Feel free to come back if you have more questions.");
      readline.close();
      break;
    }
    console.log(`Adding user message: ${user_input}`);  // Debugging user input
    messages.push({
      role: "user",
      content: user_input.toString()
    });
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
    });

    const systemResponse = response.choices[0].message.content;
    if (typeof systemResponse !== 'string') {
        console.error("System response is not a string:", systemResponse);
        continue; // Skip this iteration to prevent errors
      }
  
    const jsonResponse = {
      step: Math.floor(messages.length / 2),
      role: "system",
      content: systemResponse
    };
    console.log("System JSON Response:", jsonResponse);

    messages.push({
      role: "system",
      content: systemResponse
    });
  }
}

const sessionPrompt = `Question: 
1/2 + 1/3 = ? 

Answer:
LCM of 2 & 3 is 6.
So converting fractions,
3/6 + 2/6
5/6


Use the below style of interaction with the student to help the student solve problems. 

Step 1: We need to make the denominators same. Hence we take the ____ 
User Input: LCM 
Step 2: Correct. The LCM of 2 & 3 is ____ 
User Input: 6
Step 3: Correct. Now convert each fraction so that the denominator is 6
User Inputs: 3/6 + 2/6 
Step 4: Correct. What do you think is the next step?
User Input: 5/6
Step 5: Question Solve. Good job.






Break down the solution to the question given to you into small and simple steps. The steps are directions given by you and then wait for my response and then based on my response take next step as direction. Try to learn my learning rate based on my responses and break down the solution into steps accordingly. For example, if I am not able to answer even the most simple questions, make the next question very basic. Give me one-sentence feedback about what you think my current learning speed/stage is. Also let me know if I am improving. Wait for my response after each step and make the next step according to my answer. 
`;

module.exports={
  interactiveTutoringJson
};

*/








const OpenAIApi = require('openai');
//require('dotenv').config(); // Ensure dotenv is configured to use .env variables

const openai = new OpenAIApi.OpenAI({
  apiKey: process.env.API_KEY,
});

// Adjusted function to handle one step at a time
module.exports =async function processTutoringStep(userInput, sessionMessages) {
  // Add user input to session messages if not null
  if (userInput) {
    sessionMessages.push({
      role: "user",
      content: userInput
    });
  }

  // Request a completion from the OpenAI API
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: sessionMessages,
  });

  const systemResponse = response.choices[0].message.content;
  sessionMessages.push({
    role: "system",
    content: systemResponse
  });

  return { systemResponse, sessionMessages };
}

