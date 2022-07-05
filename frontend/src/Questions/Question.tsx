import { Button, TextField } from "@mui/material";
import "./../App.css"

type Props = {

};


export function Question (prop: Props) {
    return (
        // TODO: Replace placeholder data
        <div className="root-container">
            <h1>Mastercard #3: Engine Covers</h1>
            <div className="question-header-container">
                <span id="question-section-text">Page 3: Section 2</span>
                <span id="question-position-text">Question 1/2</span>
            </div>
            <h2>Please specify the used torque for this step: </h2>
            <div>
                <TextField required label="Required" variant="filled" id="question-text-input"></TextField>
                <span id="question-unit-text">Nm</span>
            </div>
            
            <Button id="submit-answer-button" variant="standard">Submit answer</Button>
            <h3>Related Ressource: </h3>
        </div>
    );

}