import { Button } from "@mui/material";
import { useState } from "react";
import { QuestionCheckbox } from "./QuestionCheckbox";
import { QuestionTextfield,  } from "./QuestionTextfield";
import { AnswerOption, applyUserResponse, generateAnswerOptions, QuestionData, QuestionState } from "./QuestionType";


type QuestionTabProps = {
    onQuestionStateChange: (questionState: QuestionState) => void,
    questionData: QuestionData[],
    questionState: QuestionState,
    questionIndex: number,
    setQuestionIndex: (value: number) => void,
    onSubmitCallback: (index: number, isCorrectAnswer: boolean) => void,
    setQuestionData: (values: QuestionData[]) => void,
    answerOptions: AnswerOption[],
    setAnswerOptions: (array: AnswerOption[]) => void,
    textInput: string,
    setTextInput: (value: string) => void,
}


export function QuestionTab(props: QuestionTabProps) {
    
    
    //let [answerOptions, setAnswerOptions] = useState<AnswerOption[]>(generateAnswerOptions(props.questionData[props.questionIndex]));
    let currentQuestion = props.questionData[props.questionIndex];

    if(props.questionState==="question-mode" || props.questionState === "answer-mode") {
        return (
            <div className="root-container">
                    <div className="question-header-container">
                        <span id="question-section-text">{currentQuestion.context}</span>
                        <span id="question-position-text">{"Question " + (props.questionIndex+1) + "/" + props.questionData.length}</span>
                    </div>
                    
                    {<QuestionTextfield textInput={props.textInput} setTextInput={props.setTextInput} key={"question-textfield-"+props.questionIndex} questionData={currentQuestion} state={props.questionState} setUserResponse={(correctAnswer)=>setUserResponse(props.questionIndex, correctAnswer)}/>}
                    {<QuestionCheckbox {...props} key={"question-checkbox-"+props.questionIndex} question={currentQuestion} state={props.questionState} setUserResponse={(correctAnswer)=>setUserResponse(props.questionIndex, correctAnswer)}/>}
                    
                    <div className="button-bottom-container">
                        <div className="button-bottom-container-inner">
                        {renderButtons()}
                        </div>
                    </div>
            </div>
        );
    }else {
        // Answer Mode: Render all Questions with answers
        return (
            <div className="root-container">
                {
                    props.questionData.map((question, index) => {
                        return (
                            <div>
                                <QuestionTextfield textInput={props.textInput} setTextInput={props.setTextInput} key={"question-textfield-"+index} questionData={question} state={props.questionState} setUserResponse={(correctAnswer)=>setUserResponse(index, correctAnswer)}/>
                                <QuestionCheckbox {...props} key={"question-checkbox-"+index} question={question} state={props.questionState} setUserResponse={(correctAnswer)=>setUserResponse(index, correctAnswer)}/>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    function setUserResponse(index: number, correctAnswer: boolean) {
        props.setQuestionData(applyUserResponse(props.questionData, index, correctAnswer));
    }

    // event to submit an answer
    function onSubmitClick() {
        props.onQuestionStateChange("answer-mode");
        
    }
    function onNextClick() {
        // check whether next question is available
        if(props.questionIndex + 1 < props.questionData.length) {
            const nextValue = props.questionIndex + 1;
            props.setQuestionIndex(nextValue);
            props.onQuestionStateChange("question-mode")
            props.setAnswerOptions(generateAnswerOptions(props.questionData[nextValue]))
            props.setTextInput("");
        }else {
            // no question is available anymore
            // switch to task screen
            //openStepOverview();
            props.onQuestionStateChange("result-mode");
        }
    }


    function renderButtons() {
        if(props.questionState === "question-mode") {
            return <Button id="submit-answer-button" color="actionbutton" variant="contained" onClick={onSubmitClick}>Submit answer</Button>
        }else{
            return <Button id="question-next-button" color="actionbuttonblue" variant="contained" onClick={onNextClick}>{props.questionIndex + 1 < props.questionData.length ? "Next Question" : "COMPLETE QUIZ"}</Button>
        }
    }

    
}