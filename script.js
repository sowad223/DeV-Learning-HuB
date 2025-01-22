// Quiz Data
const quizData = [
    {
        question: "What is the output of typeof null?",
        options: ["null", "undefined", "object", "number"],
        correct: 2
    },
    {
        question: "Which method removes the last element from an array?",
        options: ["pop()", "push()", "shift()", "unshift()"],
        correct: 0
    },
    {
        question: "What is closure in JavaScript?",
        options: [
            "A design pattern",
            "A function having access to parent scope",
            "A programming error",
            "A loop type"
        ],
        correct: 1
    }
];

let currentQuiz = 0;
let score = 0;
let progress = 30;

// Tutorial Data
const tutorialSteps = [
    {
        title: "Variables in JavaScript",
        content: "Learn about var, let, and const declarations.",
        example: "let name = 'John';\nconst age = 25;"
    },
    {
        title: "Functions",
        content: "Understanding function declarations and expressions.",
        example: "function greet(name) {\n    return `Hello, ${name}`;\n}"
    },
    {
        title: "Arrays and Objects",
        content: "Working with complex data structures.",
        example: "const arr = [1, 2, 3];\nconst obj = { key: 'value' };"
    }
];

let currentStep = 0;

// Quiz Functions
function startQuiz() {
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('challengeContainer').style.display = 'none';
    document.getElementById('tutorialContainer').style.display = 'none';
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById('questionContainer');
    const currentQuizData = quizData[currentQuiz];

    const questionHTML = `
        <div class="question">
            <h4>${currentQuizData.question}</h4>
            ${currentQuizData.options.map((option, index) => `
                <div class="option">
                    <input type="radio" name="quiz" value="${index}" id="option${index}">
                    <label for="option${index}">${option}</label>
                </div>
            `).join('')}
        </div>
    `;

    questionContainer.innerHTML = questionHTML;
}

function submitQuiz() {
    const answer = document.querySelector('input[name="quiz"]:checked');
    
    if (answer) {
        if (parseInt(answer.value) === quizData[currentQuiz].correct) {
            score++;
            updateProgress(10);
        }

        currentQuiz++;
        
        if (currentQuiz < quizData.length) {
            showQuestion();
        } else {
            document.getElementById('quizContainer').innerHTML = `
                <h3>You completed the quiz!</h3>
                <p>Your score: ${score}/${quizData.length}</p>
                <button class="btn" onclick="resetQuiz()">Restart Quiz</button>
            `;
        }
    }
}

function resetQuiz() {
    currentQuiz = 0;
    score = 0;
    startQuiz();
}

// Challenge Functions
function showChallenge() {
    document.getElementById('challengeContainer').style.display = 'block';
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('tutorialContainer').style.display = 'none';
}

function testSolution() {
    const code = document.getElementById('codeInput').value;
    const testResults = document.getElementById('testResults');
    
    try {
        eval(`${code}
            const testCases = [
                { input: "hello", expected: "olleh" },
                { input: "javascript", expected: "tpircsavaj" }
            ];
            
            let passed = true;
            testCases.forEach(test => {
                if (reverseString(test.input) !== test.expected) {
                    passed = false;
                }
            });
            passed;
        `);

        if (passed) {
            testResults.innerHTML = '<p style="color: var(--success)">All tests passed! 🎉</p>';
            updateProgress(20);
        } else {
            testResults.innerHTML = '<p style="color: #ef4444">Some tests failed. Try again!</p>';
        }
    } catch (error) {
        testResults.innerHTML = `<p style="color: #ef4444">Error: ${error.message}</p>`;
    }
}

// Tutorial Functions
function startTutorial() {
    document.getElementById('tutorialContainer').style.display = 'block';
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('challengeContainer').style.display = 'none';
    showTutorialStep();
}

function showTutorialStep() {
    const tutorialStep = document.getElementById('tutorialStep');
    const currentTutorial = tutorialSteps[currentStep];

    tutorialStep.innerHTML = `
        <h4>${currentTutorial.title}</h4>
        <p>${currentTutorial.content}</p>
        <pre><code class="javascript">${currentTutorial.example}</code></pre>
    `;

    hljs.highlightAll();
}

function nextStep() {
    currentStep++;
    if (currentStep >= tutorialSteps.length) {
        currentStep = 0;
        updateProgress(15);
    }
    showTutorialStep();
}

// Progress Functions
function updateProgress(increment) {
    progress = Math.min(progress + increment, 100);
    document.querySelector('.progress').style.width = `${progress}%`;
}

// Initialize highlight.js
document.addEventListener('DOMContentLoaded', () => {
    hljs.highlightAll();
});