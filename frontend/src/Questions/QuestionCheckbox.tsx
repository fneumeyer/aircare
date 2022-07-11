import { Card, CardContent, Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import { AnswerOption, generateAnswerOptions, QuestionData, QuestionState } from "./QuestionType";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ResponseStatusIcon } from "./ResponseStatusIcon";
import { ResultCard } from "./Questions.styled";

type QuestionCheckboxProps = {
    question: QuestionData,
    //answerOptions: AnswerOption[],
    state: QuestionState,
    setUserResponse: (value: boolean) => void,
    answerOptions: AnswerOption[],
    setAnswerOptions: (answerOptions: AnswerOption[]) => void,
    //handleCheckboxChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void,
}


// className={!isQuestionState && item.userValue=== item.isCorrect ? "chk-correct": (!isQuestionState ? "chk-incorrect" : "")}
export function QuestionCheckbox(props : QuestionCheckboxProps) {
    //let [answerOptions, setAnswerOptions] = useState<AnswerOption[]>(generateAnswerOptions(props.question));
    

    let solutionText = "";

    if(props.question.type === "checkbox") {
        // count amount of correct answers
        const counterCorrectAnswers : number = props.answerOptions.filter(item => item.isCorrect === item.userValue).length;
        if(counterCorrectAnswers === 0) {
          solutionText = ("The answer is incorrect!");
        }else if(counterCorrectAnswers < props.answerOptions.length) {
          solutionText = ("The answer is partially correct! (" + counterCorrectAnswers + "/" + props.answerOptions.length + ")");
        }else {
           solutionText = ("The answer is correct!");
        }

        if(props.state === "question-mode" || props.state === "answer-mode") {
            return (
                <div>
                <h2>{props.question.title}</h2>
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
                <ResultCard>
                    <CardContent>
                    <div className="row-container">
                        <ResponseStatusIcon tag="textfield" correctUserResponse={props.question.correctUserResponse === true}/>
                        <h2>{props.question.title}</h2>
                    </div>
                    
                    <div className="result-container">
                        <ul>
                            {props.question.correctAnswers.map(answer => {
                                return (
                                    <li key={"li-" + answer}>{answer}</li>
                                );
                            })}
                        </ul>
                    </div>
                </CardContent>
                </ResultCard>
            )
        }
    }else {
        return null; // CASE type !== "checkbox"
    }



    function handleCheckboxChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
        if(props.state === "question-mode"&& props.question.type==="checkbox") {
            // if answers are accepted, change value
            
            let nextArray = props.answerOptions.slice(0, index)
            let nextObj : AnswerOption = {...props.answerOptions[index], userValue: event.target.checked};
            nextArray.push(nextObj)
            nextArray = nextArray.concat(props.answerOptions.slice(index + 1, props.answerOptions.length))
            props.setAnswerOptions(nextArray);
            const isCorrectAnswer = nextArray.filter(item => item.isCorrect === item.userValue).length === nextArray.length;
            props.setUserResponse(isCorrectAnswer);
        }
    }
}


