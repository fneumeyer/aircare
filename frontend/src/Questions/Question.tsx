import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import "./../App.css"

type Props = {

};
type QuestionType = "textfield" | "checkbox" | "step-order";


export function Question (prop: Props) {

    const [isQuestionState, setQuestionState] = useState<Boolean>(true);
    return (
        // TODO: Replace placeholder data
        <div className="root-container">
                <h1>Mastercard #3: Engine Covers</h1>
                <div className="question-header-container">
                    <span id="question-section-text">Page 3: Section 2</span>
                    <span id="question-position-text">Question 1/2</span>
                </div>
                <h2>Please specify the used torque for this step: </h2>
                {renderQuestionTextfield()}
                {renderQuestionCheckbox()}
                <div className="question-button-container">
                    {renderButtons()}
                </div>
            <h3>Related Ressource: </h3>
        </div>
    );

    function onSubmitClick() {
        setQuestionState(false);
    }
    function onNextClick() {
        // check whether next question available
        // otherwise switch to task screen
    }

    function renderButtons() {
        if(isQuestionState) {
            return <Button className="question-button" id="submit-answer-button" variant="contained" onClick={onSubmitClick}>Submit answer</Button>
        }else{
            return <Button className="question-button" id="question-next-button" variant="contained">Continue</Button>
        }
    }

    function renderQuestionTextfield() {
        return (
            <div className="question-input-container">
                <TextField required label="Required" variant="filled" id="question-text-input"></TextField>
                <span id="question-unit-text">Nm</span>
                
            </div>
        );
    }
    function renderQuestionCheckbox() {
        const options : String[] = ["Option 1", "Option 2", "Option 3", "Option 4"]
        return (
            <div className="question-checkbox-container">
                {options.map(function (item) {
                    return <FormControlLabel label={item}
                        control = {<Checkbox 
                        size="medium" 
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 34 }}} 
                    />}
                   />
                })}
            </div>
        );
    }

}