const fs = require('fs');
const path = require('path');
const db = require("./Model");
const Lesson = db.lesson;


const parseQuestions = (filePath) => {
    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const questionBlocks = data.split(/\n(?=\d+\. )/); // Split by new question numbers
    return questionBlocks.map(block => {
        const lines = block.split('\n');
        let questionText = [];
        let optionsStartIndex = lines.findIndex(line => line.match(/^\([a-d]\)/));

        if (optionsStartIndex === -1) {
            console.error('Options not found, skipping question:', lines[0]);
            return null; // Skip this question if options are not found
        }

        // Accumulate all lines up to the options as the question text
        for (let i = 0; i < optionsStartIndex; i++) {
            questionText.push(lines[i].trim());
        }

        const options = lines.slice(optionsStartIndex, lines.findIndex(line => line.trim().startsWith('Solution'))).map(line => line.trim());
        const solutionIndex = lines.findIndex(line => line.trim().startsWith('Solution'));
        if (solutionIndex === -1) {
            console.error('Solution not found for question:', questionText.join(' '));
            return null; // Skip if no solution is found
        }

        const solution = lines.slice(solutionIndex).join(' ').replace(/^Solution\s*$$\s*/, '').trim();
        const referenceMatch = lines[0].match(/\[(.+)\]/);
        const reference = referenceMatch ? referenceMatch[1] : 'No reference provided';

        return {
            question: questionText.join(' '),
            options,
            solution,
            reference
        };
    }).filter(question => question !== null);
};





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


  
