const fs = require('fs');
const katex = require('katex');

// Function to parse questions from a file
function parseQuestions(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        reject(err);
        return;
      }

      // Regex to split the questions. Each question ends with a line that contains 'Solution'
      const questions = content.split(/\n(?=Solution)/);

      const parsedQuestions = questions.map(question => {
        const questionDict = {};

        // Extract the reference, which is within square brackets
        const refMatch = question.match(/\[(.*?)\]/);
        if (refMatch) {
          questionDict.reference = refMatch[1];
        }

        // Extract the options which end with (d)
        const optionsMatch = question.match(/\(a\)(.*?)\(d\)\s*([^\(]*)/s);
        if (optionsMatch) {
          const options = optionsMatch[0].match(/\([a-d]\)\s*([^\(]*)/g).map(opt => opt.trim());
          questionDict.options = options;
        }

        // Extract the question text itself
        const questionText = optionsMatch ? question.substring(0, optionsMatch.index).trim() : question.trim();
        questionDict.question = questionText;

        // Extract the solution after the options
        const solutionMatch = question.match(/Solution\s*([\s\S]*)/);
        if (solutionMatch) {
          let solutionText = solutionMatch[1].trim();
          // Render LaTeX to plain text using KaTeX (if needed, depends on the purpose)
          try {
            solutionText = katex.renderToString(solutionText, { throwOnError: false });
          } catch (error) {
            console.error("KaTeX rendering error:", error);
          }
          questionDict.solution = solutionText;
        }

        return questionDict;
      });

      resolve(parsedQuestions);
    });
  });
}






// Example file path
const filePath = 'path_to_your_demo_questions.txt';

// Parse the questions
parseQuestions(filePath)
  .then(parsedQuestions => {
    console.log(JSON.stringify(parsedQuestions, null, 4));
  })
  .catch(error => {
    console.error('Error parsing questions:', error);
  });



  /*

// Example Usage:
const questionsJson = parseQuestions(path.join(__dirname, 'demo_questions.txt'));
console.log(JSON.stringify(questionsJson, null, 2));


const insertLessons = async (lessons) => {
   // await Question.sync(); // Ensure the table exists
    for (const lesson of lessons) {
      await Lesson.create(lesson);
    }
  };
  
  // Insert parsed questions into the database
  insertLessons(questionsJson).then(() => {
    console.log('Data inserted successfully.');
  }).catch(err => {
    console.error('Failed to insert data:', err);
  });
*/

