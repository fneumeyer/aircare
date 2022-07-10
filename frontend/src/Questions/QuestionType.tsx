type QuestionType = "textfield" | "checkbox" | "step-order";

// TODO: Is caseSensitive Attribute required for textfield string answers?
type QuestionData = {type: "textfield", context: string, title: string, correctAnswer: string | number, unit: string, } |
    {type: "checkbox", context: string, title: string, correctAnswers: string[], incorrectAnswers: string[], answersToShow: number,}
    

type AnswerOption = {text: string, isCorrect: boolean, userValue: boolean}; // for checkbox state management
type QuestionState = "answer-mode" | "question-mode" | "result-mode";

const exampleQuestions : QuestionData[] = [{type: "textfield", context: "Page 3: Section 2", title: "Please specify the used torque for this step: ", correctAnswer: 25, unit: "Nm"},
        {type: "checkbox", context: "Page 3: Section 2", title: "Which of the following parts are used in the next step?", correctAnswers: ["Engine Cover Part 3", "Engine Cover Part 7"], incorrectAnswers: ["Engine Cover Part 1", "Engine Cover Part 5"], answersToShow: 4,},
        {type: "checkbox", context: "Page 3: Section 2", title: "Which of the following parts are used in the next step?", correctAnswers: ["Engine Cover Part 2", ], incorrectAnswers: ["Engine Cover Part 4", "Engine Cover Part 6"], answersToShow: 3,},
    ];

function generateAnswerOptions(question: QuestionData) {
    if(question.type === "checkbox") {
        // aggregate correct and incorrect answers
        let answerOptions : AnswerOption[] = question.correctAnswers.map(item => {
            return {text: item, isCorrect: true, userValue: false}
        });
        // add incorrect answers
        let incOptions : AnswerOption[] = question.incorrectAnswers.map(item => {
            return {text: item, isCorrect: false, userValue: false}
        });
        incOptions = shuffle(incOptions);
        const ctrIncorrect = (question.answersToShow === 0) ? incOptions.length : question.answersToShow - answerOptions.length; // keep only a few options, case 0: show all answer options
        incOptions = incOptions.slice(0, ctrIncorrect);
        let allOptions : AnswerOption[] = answerOptions.concat(incOptions);
        allOptions = shuffle(allOptions);
        return allOptions;
        //console.log(allOptions);
    }else {
        return [];
    }
}

// Shuffle array - https://stackoverflow.com/a/2450976
function shuffle(array: AnswerOption[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}



export type {QuestionType, QuestionData, AnswerOption, QuestionState};
export  {exampleQuestions, generateAnswerOptions};