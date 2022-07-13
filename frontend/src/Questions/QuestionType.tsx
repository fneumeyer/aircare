type QuestionType = "textfield" | "checkbox" | "step-order";

// TODO: Is caseSensitive Attribute required for textfield string answers?
type QuestionData = {type: "textfield", context: string, title: string, correctAnswer: string | number, unit: string, correctUserResponse?: boolean} |
    {type: "checkbox", context: string, title: string, correctAnswers: string[], incorrectAnswers: string[], answersToShow: number, correctUserResponse?: boolean}
    

type AnswerOption = {text: string, isCorrect: boolean, userValue: boolean}; // for checkbox state management
type QuestionState = "answer-mode" | "question-mode" | "result-mode";



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

function applyUserResponse(questionData: QuestionData[], index: number, correctResponse: boolean) : QuestionData[] {
    if(index >= 0 && index < questionData.length) {
        let nextArray = questionData.slice(0, index);
        nextArray = nextArray.concat({...questionData[index], correctUserResponse: correctResponse}).concat(questionData.slice(index + 1, questionData.length));
        return nextArray;
    }else{
        return questionData;
    }
}

export type {QuestionType, QuestionData, AnswerOption, QuestionState};
export  {generateAnswerOptions, applyUserResponse};