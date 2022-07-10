import { FilledInput, FormControl, IconButton, InputAdornment, Tooltip } from "@mui/material";
import { useState } from "react";
import { QuestionData, QuestionState } from "./QuestionType";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ColoredIcon } from "../Dashboard/ColoredIcon";

type QuestionTextfieldProp = {
    questionData: QuestionData,
    state: QuestionState,
    text: string,
    onChangeCallback: (event: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => void, 
}

export function QuestionTextfield (props: QuestionTextfieldProp) {
    let solutionText = "";
    let solutionValue = "";


    if(props.questionData.type === "textfield") {
        if(typeof(props.questionData.correctAnswer) === "number") {
            solutionValue = props.questionData.correctAnswer + " " + props.questionData.unit;
            // user input value must have a certain precision (0.00001)
            if(Math.abs(props.questionData.correctAnswer - Number(props.text)) < 0.00001) {
                solutionText = ("The answer is correct!");
            }else {
                solutionText = ("The answer is incorrect! Correct Value: " + solutionValue);
            }
        }else  if(typeof(props.questionData.correctAnswer) === "string") {
            solutionValue = props.questionData.correctAnswer;
            // string answer is case sensitive
            if(props.questionData.correctAnswer === props.text) {
                solutionText = ("The answer is correct!");
            }else {
                solutionText = ("The answer is incorrect! Correct Answer: " + props.questionData.correctAnswer);
            }
        }

        if(props.state === "question-mode" || props.state === "answer-mode") {
            return (
                <div>
                    <h2>{props.questionData.title}</h2>
                    <div className="question-input-container">
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" disabled={props.state === "answer-mode"}>
                            <FilledInput
                                id="question-text-input" 
                                endAdornment={<InputAdornment position="end">{props.questionData.unit}</InputAdornment>}
                                value={props.text}
                                onChange={(event) => props.onChangeCallback(event)}
                            />
                        </FormControl>
                        
                    </div>
                    {(props.state === "answer-mode") ? <h2> {solutionText}</h2> : null}
                </div>
            );
        }else {
            return (
                <div>
                    <div className="row-container">

                    {<Tooltip title="Correctly Answer">
                        <IconButton disableRipple={true} disableTouchRipple={true}>
                            <CheckCircleIcon inheritViewBox  sx={{color: "green", fontSize: "24px"}}></CheckCircleIcon>
                        </IconButton>
                    </Tooltip>}
                    <h2>{props.questionData.title}</h2>
                   
                    </div>
                   
                    <div className="result-container">
                        <span> {"Correct Value: " + solutionValue}</span>
                    </div>
                </div>
            );
        }
    }else{
        return null; // CASE Question.type !== "textfield"
    }

    function isCorrectAnswer() {

    }

}