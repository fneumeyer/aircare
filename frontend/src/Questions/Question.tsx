import { Button, Checkbox, FilledInput, FormControl, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./../App.css"
import { QuestionCheckbox } from "./QuestionCheckbox";
import { QuestionTextfield } from "./QuestionTextfield";
import { AnswerOption, QuestionData, QuestionState } from "./QuestionType";

type Props = {

};

export function Question (prop: Props) {
    let { id, stepId } = useParams();
    let [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);


    const exampleQuestions : QuestionData[] = [{type: "textfield", stepLocation: "Page 3: Section 2", title: "Please specify the used torque for this step: ", correctAnswer: 25, unit: "Nm"},
        {type: "checkbox", stepLocation: "Page 3: Section 2", title: "Which of the following parts are used in the next step?", correctAnswers: ["Engine Cover Part 3", "Engine Cover Part 7"], incorrectAnswers: ["Engine Cover Part 1", "Engine Cover Part 5"], answersToShow: 4,},
    ];

    let [questionData, setQuestionData] = useState<QuestionData[]>(exampleQuestions);
    let [questionState, setQuestionState] = useState<QuestionState>("question-mode");
    let currentQuestion = questionData[currentQuestionIndex];
    let [answerOptions, setAnswerOptions] = useState<AnswerOption[]>(initCurrentQuestion(0));
    let [textInput, setTextInput] = useState<string>("");



    const navigate = useNavigate()
    const openStepOverview = useCallback(
        () => {
        navigate(`/task/${id}/step/${stepId}`)
        },
        [navigate]
    );

    return (
        // TODO: Replace placeholder data
        <div className="root-container">
                <h1>Mastercard #3: Engine Covers</h1>
                <div className="question-header-container">
                    <span id="question-section-text">{currentQuestion.stepLocation}</span>
                    <span id="question-position-text">{"Question " + (currentQuestionIndex+1) + "/" + questionData.length}</span>
                </div>
                <h2>{currentQuestion.title}</h2>
                {<QuestionTextfield questionData={currentQuestion} state={questionState} text={textInput} onChangeCallback={handleChange}/>}
                {<QuestionCheckbox questionData={currentQuestion} state={questionState} answerOptions={answerOptions} handleCheckboxChange={handleCheckboxChange}/>}
                
                <div className="button-bottom-container">
                    <div className="button-bottom-container-inner">
                    {renderButtons()}
                    </div>
                </div>
        </div>
    );

    
    // event to submit an answer
    function onSubmitClick() {
        setQuestionState("answer-mode");
        
    }
    function onNextClick() {
        // check whether next question is available
        if(currentQuestionIndex + 1 < questionData.length) {
            const nextValue = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextValue);
            setQuestionState("question-mode")
            setAnswerOptions(initCurrentQuestion(nextValue));
        }else {
            // no question is available anymore
            // switch to task screen
            openStepOverview();
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setTextInput(event.target.value);
    }

    function renderButtons() {
        if(questionState === "question-mode") {
            return <Button id="submit-answer-button" color="actionbutton" variant="contained" onClick={onSubmitClick}>Submit answer</Button>
        }else{
            return <Button id="question-next-button" color="actionbuttonblue" variant="contained" onClick={onNextClick}>{currentQuestionIndex + 1 < questionData.length ? "Next Question" : "Continue"}</Button>
        }
    }


    

    
    
    function handleCheckboxChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
        if(questionState === "question-mode") {
            // if answers are accepted, change value
            console.log(event.target.checked);
            let nextArray = answerOptions.slice(0, index)
            let nextObj : AnswerOption = {...answerOptions[index], userValue: event.target.checked};
            nextArray.push(nextObj)
            nextArray = nextArray.concat(answerOptions.slice(index + 1, answerOptions.length))
            setAnswerOptions(nextArray);
            console.log(answerOptions);
        }else {
           
        }
    }

    function initCurrentQuestion(index: number) {
        console.log("Call")
        const question = questionData[index];
        // aggregate correct and incorrect answers
        if(question.type === "checkbox") {
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

}

