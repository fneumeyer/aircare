import { Button } from "@mui/material";
import { useState } from "react";
import { QuestionCheckbox } from "./QuestionCheckbox";
import { QuestionTextfield,  } from "./QuestionTextfield";
import { AnswerOption, QuestionData, QuestionState } from "./QuestionType";


type QuestionTabProps = {
    onQuestionStateChange: (questionState: QuestionState) => void,
    questionData: QuestionData[],
    questionState: QuestionState,
    questionIndex: number,
    setQuestionIndex: (value: number) => void,
    onSubmitCallback: (index: number, isCorrectAnswer: boolean) => void,
}


export function QuestionTab(props: QuestionTabProps) {
    
    
    
    let currentQuestion = props.questionData[props.questionIndex];
    let [textInput, setTextInput] = useState<string>("");
    if(props.questionState==="question-mode" || props.questionState === "answer-mode") {
        return (
            <div className="root-container">
                    <div className="question-header-container">
                        <span id="question-section-text">{currentQuestion.context}</span>
                        <span id="question-position-text">{"Question " + (props.questionIndex+1) + "/" + props.questionData.length}</span>
                    </div>
                    
                    {<QuestionTextfield questionData={currentQuestion} state={props.questionState} text={textInput} onChangeCallback={handleChange}/>}
                    {<QuestionCheckbox key={"question-checkbox-"+props.questionIndex} question={currentQuestion} state={props.questionState}/>}
                    
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
                    props.questionData.map(question => {
                        return (
                            <div>
                                <QuestionTextfield key={"question-textfield-"+props.questionIndex} questionData={question} state={props.questionState} text={""} onChangeCallback={() => {}}/>
                                <QuestionCheckbox key={"question-checkbox-"+props.questionIndex} question={question} state={props.questionState}/>
                            </div>
                        );
                    })
                }
            </div>
        );
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
        }else {
            // no question is available anymore
            // switch to task screen
            //openStepOverview();
            props.onQuestionStateChange("result-mode");
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setTextInput(event.target.value);
    }

    function renderButtons() {
        if(props.questionState === "question-mode") {
            return <Button id="submit-answer-button" color="actionbutton" variant="contained" onClick={onSubmitClick}>Submit answer</Button>
        }else{
            return <Button id="question-next-button" color="actionbuttonblue" variant="contained" onClick={onNextClick}>{props.questionIndex + 1 < props.questionData.length ? "Next Question" : "COMPLETE QUIZ"}</Button>
        }
    }

    
}