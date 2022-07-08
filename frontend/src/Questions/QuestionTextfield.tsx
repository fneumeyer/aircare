import { FilledInput, FormControl, InputAdornment } from "@mui/material";
import { useState } from "react";
import { QuestionData, QuestionState } from "./QuestionType";

type QuestionTextfieldProp = {
    questionData: QuestionData,
    state: QuestionState,
    text: string,
    onChangeCallback: (event: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => void, 
}

export function QuestionTextfield (props: QuestionTextfieldProp) {
    let solutionText = "";


    if(props.questionData.type === "textfield") {
        if(typeof(props.questionData.correctAnswer) === "number") {
            // user input value must have a certain precision (0.00001)
            if(Math.abs(props.questionData.correctAnswer - Number(props.text)) < 0.00001) {
                solutionText = ("The answer is correct!");
            }else {
                solutionText = ("The answer is incorrect! Correct Value: " + props.questionData.correctAnswer + " " + props.questionData.unit);
            }
        }else  if(typeof(props.questionData.correctAnswer) === "string") {
            // string answer is case sensitive
            if(props.questionData.correctAnswer === props.text) {
                solutionText = ("The answer is correct!");
            }else {
                solutionText = ("The answer is incorrect! Correct Value: " + props.questionData.correctAnswer);
            }
        }
        return (
            <div>
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
    }else{
        return null;
    }

}