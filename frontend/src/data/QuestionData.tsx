import { QuestionData } from "../Questions/QuestionType";

const exampleQuestions : QuestionData[] = [{type: "textfield", context: "Page 3: Section 2", title: "Please specify the used torque for this step: ", correctAnswer: 25, unit: "Nm", correctUserResponse: true},
        {type: "checkbox", context: "Page 3: Section 2", title: "Which of the following parts are used in the next step?", correctAnswers: ["Engine Cover Part 3", "Engine Cover Part 7"], incorrectAnswers: ["Engine Cover Part 1", "Engine Cover Part 5"], answersToShow: 4,correctUserResponse: false},
        {type: "checkbox", context: "Page 3: Section 2", title: "Which of the following parts are used in the next step?", correctAnswers: ["Engine Cover Part 2", ], incorrectAnswers: ["Engine Cover Part 4", "Engine Cover Part 6"], answersToShow: 3,correctUserResponse: true},
    ];


const exampleQuestions4 : QuestionData[] = [
    {type: "textfield", context: "Page 10", title: "How many pan head screws are required?", correctAnswer: 10, unit: "", },
    {type: "checkbox", context: "Page 11", title: "Which parts are prone to damages in this step?", correctAnswers: ["Pipes", "Sealings"], incorrectAnswers: ["Cables", ""], answersToShow: 2}
]

const exampleQuestions4New : QuestionData[] = [
    {type: "textfield", context: "Page 10", title: "How many steel bolts are required for the installation of the engine cover?", correctAnswer: 100, unit: "", },
    {type: "checkbox", context: "Page 11", title: "Which parts are prone to damages in this step?", correctAnswers: ["Pipes", "Sealings"], incorrectAnswers: ["Cables", ""], answersToShow: 3}
]

export {exampleQuestions, exampleQuestions4, exampleQuestions4New};