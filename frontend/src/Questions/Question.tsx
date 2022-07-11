import { Button, Checkbox, FilledInput, FormControl, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./../App.css"
import { QuestionCheckbox } from "./QuestionCheckbox";
import { QuestionTextfield } from "./QuestionTextfield";
import { AnswerOption, exampleQuestions, QuestionData, QuestionState, applyUserResponse, generateAnswerOptions } from "./QuestionType";

type Props = {

};

export function Question (prop: Props) {
    let { id, stepId } = useParams();
    let [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    
    let [textInput, setTextInput] = useState<string>("");
    

    let [questionData, setQuestionData] = useState<QuestionData[]>(exampleQuestions);
    let [questionState, setQuestionState] = useState<QuestionState>("question-mode");
    let currentQuestion = questionData[currentQuestionIndex];

    let [answerOptions, setAnswerOptions] = useState<AnswerOption[]>(generateAnswerOptions(questionData[currentQuestionIndex]));

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
                    <span id="question-section-text">{currentQuestion.context}</span>
                    <span id="question-position-text">{"Question " + (currentQuestionIndex+1) + "/" + questionData.length}</span>
                </div>
                <h2>{currentQuestion.title}</h2>
                {<QuestionTextfield textInput={textInput} setTextInput={setTextInput} questionData={currentQuestion} state={questionState} setUserResponse={(correctAnswer)=>setUserResponse(currentQuestionIndex, correctAnswer)}/>}
                {<QuestionCheckbox  answerOptions={answerOptions} setAnswerOptions={setAnswerOptions} key={"question-checkbox-"+currentQuestionIndex}  question={currentQuestion} state={questionState} setUserResponse={(correctAnswer)=>setUserResponse(currentQuestionIndex, correctAnswer)}/>}
                
                <div className="button-bottom-container">
                    <div className="button-bottom-container-inner">
                    {renderButtons()}
                    </div>
                </div>
        </div>
    );


    function setUserResponse(index: number, correctAnswer: boolean) {
        setQuestionData(applyUserResponse(questionData, index, correctAnswer));
    }
    
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
        }else {
            // no question is available anymore
            // switch to task screen
            openStepOverview();
        }
    }

    function renderButtons() {
        if(questionState === "question-mode") {
            return <Button id="submit-answer-button" color="actionbutton" variant="contained" onClick={onSubmitClick}>Submit answer</Button>
        }else{
            return <Button id="question-next-button" color="actionbuttonblue" variant="contained" onClick={onNextClick}>{currentQuestionIndex + 1 < questionData.length ? "Next Question" : "Continue"}</Button>
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

