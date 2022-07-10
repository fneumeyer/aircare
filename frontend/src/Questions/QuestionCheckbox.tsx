import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import { AnswerOption, generateAnswerOptions, QuestionData, QuestionState } from "./QuestionType";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ResponseStatusIcon } from "./ResponseStatusIcon";

type QuestionCheckboxProps = {
    question: QuestionData,
    //answerOptions: AnswerOption[],
    state: QuestionState,
    setUserResponse: (value: boolean) => void,
    //handleCheckboxChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void,
}


// className={!isQuestionState && item.userValue=== item.isCorrect ? "chk-correct": (!isQuestionState ? "chk-incorrect" : "")}
export function QuestionCheckbox(props : QuestionCheckboxProps) {
    let [answerOptions, setAnswerOptions] = useState<AnswerOption[]>(generateAnswerOptions(props.question));
    

    let solutionText = "";

    if(props.question.type === "checkbox") {
        // count amount of correct answers
        const counterCorrectAnswers : number = answerOptions.filter(item => item.isCorrect === item.userValue).length;
        if(counterCorrectAnswers === 0) {
          solutionText = ("The answer is incorrect!");
        }else if(counterCorrectAnswers < answerOptions.length) {
          solutionText = ("The answer is partially correct! (" + counterCorrectAnswers + "/" + answerOptions.length + ")");
        }else {
           solutionText = ("The answer is correct!");
        }

        if(props.state === "question-mode" || props.state === "answer-mode") {
            return (
                <div>
                <h2>{props.question.title}</h2>
                    <div className="question-checkbox-container">
                        {answerOptions.map(function (item: AnswerOption, index: number) {
                            return <FormControlLabel 
                                label={item.text}
                                key={"fcl" + item.text + ""}
                                control = {
                                    <div>
                                    <Checkbox
                                        disableRipple={props.state === "answer-mode"}
                                        checked={item.userValue}
                                        onChange={(event) => handleCheckboxChange(index, event)}
                                        key={"chk" + item.text + ""}
                                        size="medium" 
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 34 }}} 
                                    />
                                    {(props.state === "answer-mode")? <Checkbox
                                        disableRipple={true}
                                        checked={ item.isCorrect}
                                        onChange={(event) => handleCheckboxChange(index, event)}
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
                </div>
            );
        }else {
            // result-mode
            return (
                <div>
                    <div className="row-container">
                        <ResponseStatusIcon tag="textfield" correctUserResponse={props.question.correctUserResponse === true}/>
                        <h2>{props.question.title}</h2>
                    </div>
                    
                    <div className="result-container">
                        <ul>
                            {props.question.correctAnswers.map(answer => {
                                return (
                                    <li>{answer}</li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )
        }
    }else {
        return null; // CASE type !== "checkbox"
    }



    function handleCheckboxChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
        if(props.state === "question-mode"&& props.question.type==="checkbox") {
            // if answers are accepted, change value
            
            let nextArray = answerOptions.slice(0, index)
            let nextObj : AnswerOption = {...answerOptions[index], userValue: event.target.checked};
            nextArray.push(nextObj)
            nextArray = nextArray.concat(answerOptions.slice(index + 1, answerOptions.length))
            setAnswerOptions(nextArray);
            const isCorrectAnswer = nextArray.filter(item => item.isCorrect === item.userValue).length === nextArray.length;
            props.setUserResponse(isCorrectAnswer);
        }
    }
}


