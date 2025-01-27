const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// User answers are stored in session storage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || new Array(questions.length).fill(null);

// Function to render the questions and their options
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ""; // Clear previous questions
  
  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    
    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // If the user has selected this option, mark it as checked
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      // Event listener to update the answer when a choice is selected
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers)); // Save the progress
      });

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
      questionElement.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionElement);
  });
}

// Function to calculate the user's score
function calculateScore() {
  let score = 0;
  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });
  return score;
}

// Function to display the score
function displayScore(score) {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}`;

  // Store the score in local storage
  localStorage.setItem("score", score);
}

// Check if a score is already stored in local storage
function checkStoredScore() {
  const storedScore = localStorage.getItem("score");
  if (storedScore) {
    document.getElementById("score").textContent = `Your previous score is ${storedScore} out of ${questions.length}`;
  }
}

// Event listener for the submit button
document.getElementById("submit").addEventListener("click", () => {
  const score = calculateScore();
  displayScore(score); // Display the score and store it in localStorage
});

// Initial setup
renderQuestions();
checkStoredScore(); // Display previous score if available