type QuestionType = "textfield" | "checkbox" | "step-order";

// TODO: Is caseSensitive Attribute required for textfield string answers?
type QuestionData = {type: "textfield", stepLocation: string, title: string, correctAnswer: string | number, unit: string, } |
    {type: "checkbox", stepLocation: string, title: string, correctAnswers: string[], incorrectAnswers: string[], answersToShow: number, }
    

type AnswerOption = {text: string, isCorrect: boolean, userValue: boolean}; // for checkbox state management
type QuestionState = "answer-mode" | "question-mode" | "result-mode";


export type {QuestionType, QuestionData, AnswerOption, QuestionState};