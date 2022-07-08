import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { AnswerOption, QuestionData, QuestionState } from "./QuestionType";

type QuestionCheckboxProps = {
    questionData: QuestionData,
    answerOptions: AnswerOption[],
    state: QuestionState,
    handleCheckboxChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void,
}


// className={!isQuestionState && item.userValue=== item.isCorrect ? "chk-correct": (!isQuestionState ? "chk-incorrect" : "")}
export function QuestionCheckbox(props : QuestionCheckboxProps) {

    

    let solutionText = "";

    if(props.questionData.type === "checkbox") {
         // count amount of correct answers
         const counterCorrectAnswers : number = props.answerOptions.filter(item => item.isCorrect === item.userValue).length;
         if(counterCorrectAnswers === 0) {
            solutionText = ("The answer is incorrect!");
         }else if(counterCorrectAnswers < props.answerOptions.length) {
            solutionText = ("The answer is partially correct! (" + counterCorrectAnswers + "/" + props.answerOptions.length + ")");
         }else {
            solutionText = ("The answer is correct!");
         }


        return (
            <div className="question-checkbox-container">
                {props.answerOptions.map(function (item: AnswerOption, index: number) {
                    return <FormControlLabel 
                        
                        label={item.text}
                        key={"fcl" + item.text + ""}
                        control = {
                            <div>
                            <Checkbox
                                disableRipple={props.state === "answer-mode"}
                                checked={item.userValue}
                                onChange={(event) => props.handleCheckboxChange(index, event)}
                                key={"chk" + item.text + ""}
                                size="medium" 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 34 }}} 
                            />
                            {(props.state === "answer-mode")? <Checkbox
                                disableRipple={true}
                                checked={ item.isCorrect}
                                onChange={(event) => props.handleCheckboxChange(index, event)}
                                color="success"
                                key={"chk2" + item.text + ""}
                                size="medium" 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 34 }}} 
                            /> : null}
                            </div>
                            }
                        />
                })}
                {(props.state === "answer-mode") ? <h2> {solutionText}</h2> : null}
            </div>
        );
    }else {
        return null;
    }

    
}