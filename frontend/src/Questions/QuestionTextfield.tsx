import { Card, CardContent, FilledInput, FormControl, IconButton, InputAdornment, Tooltip } from "@mui/material";
import { useState } from "react";
import { ResultCard } from "./Questions.styled";
import { QuestionData, QuestionState } from "./QuestionType";
import { ResponseStatusIcon } from "./ResponseStatusIcon";



type QuestionTextfieldProp = {
    questionData: QuestionData,
    state: QuestionState,
    setUserResponse: (value: boolean) => void,
    textInput: string,
    setTextInput: (value: string) => void,
    //onChangeCallback: (event: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => void, 
}

export function QuestionTextfield (props: QuestionTextfieldProp) {
    


    let solutionText = "";
    let solutionValue = "";


    if(props.questionData.type === "textfield") {
        if(typeof(props.questionData.correctAnswer) === "number") {
            solutionValue = props.questionData.correctAnswer + " " + props.questionData.unit;
            // user input value must have a certain precision (0.00001)
            if(isCorrectAnswer(props.textInput)) {
                solutionText = ("The answer is correct!");
            }else {
                solutionText = ("The answer is incorrect! Correct Value: " + solutionValue);
            }
        }else  if(typeof(props.questionData.correctAnswer) === "string") {
            solutionValue = props.questionData.correctAnswer;
            // string answer is case sensitive
            if(isCorrectAnswer(props.textInput)) {
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
                                value={props.textInput}
                                onChange={handleChange}
                            />
                        </FormControl>
                        
                    </div>
                    {(props.state === "answer-mode") ? <h2> {solutionText}</h2> : null}
                </div>
            );
        }else {
            return (
                <ResultCard>
                    <CardContent>
                        <div className="row-container">
                        <ResponseStatusIcon tag="textfield" correctUserResponse={props.questionData.correctUserResponse === true}/>
                        <h2>{props.questionData.title}</h2>
                    
                        </div>
                    
                        <div className="result-container">
                            <ul>
                                <li>{solutionValue}</li>
                            </ul>
                        </div>
                    </CardContent>
                </ResultCard>
            );
        }
    }else{
        return null; // CASE Question.type !== "textfield"
    }

 

    function isCorrectAnswer(value: string) {
        if(props.questionData.type === "textfield") {
            // user input value must have a certain precision (0.00001)
            if(typeof(props.questionData.correctAnswer) === "number") {
                return Math.abs(props.questionData.correctAnswer - Number(value)) < 0.00001;
            }else{
                return props.questionData.correctAnswer === value;
            }
        }else {
            return false;
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        props.setTextInput(event.target.value);
        props.setUserResponse(isCorrectAnswer(event.target.value));
    }
    

}